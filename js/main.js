
var gMyControl

function createIncidentTextControl(map, title) {

    if (gMyControl) map.removeControl(gMyControl)

    var textCustomControl = L.Control.extend({
        options: {
            position: 'topright' 
        },

        onAdd: function() {
            var container;

            container = L.DomUtil.create('div', 'highlight-background custom-control cursor-pointer leaflet-bar', L.DomUtil.get('map'));
            container.innerHTML = "<center>" + title + "</center>"

            return container;
        },

        onRemove: function(map) { }

    });

    gMyControl = new textCustomControl();
    map.addControl(gMyControl);
}


//////////////////////////////////////////////////////////////////////
// build map layers dynamically from CONST_MAP_LAYERS
var mapLayers  = [];
var baseMaps   = {};

for (n = 0; n < CONST_MAP_LAYERS.length; n++) {
    mapLayers[n] = L.tileLayer(CONST_MAP_LAYERS[n].url, { 
        attribution: CONST_MAP_LAYERS[n].attribution, 
        minZoon:     CONST_MAP_LAYERS[n].minZoom, 
        maxZoom:     CONST_MAP_LAYERS[n].maxZoom 
    })
    baseMaps[[CONST_MAP_LAYERS[n].name]] = mapLayers[n];
}
//////////////////////////////////////////////////////////////////////

var baseLayer             = 0   // index of initial map layer to display
var timeSinceMouseMoveEnd = 0
//////////////////////////////////////////////////////////////////////
$(document).ready(function() {

    // create map and define position, zoom and baselayer
    var map = L.map('map', {
        center: [ CONST_MAP_DEFAULT_LATITUDEY, CONST_MAP_DEFAULT_LONGITUDEX ],
        zoom: CONST_MAP_INITIAL_ZOOM,
        layers: [mapLayers[baseLayer]]
    });

    // L.control.layers(baseMaps).addTo(map)                      // add all map layers to layer control
    L.control.scale({imperial: true, metric: true}).addTo(map) // add scalebar


    var timeout
    var coordLatLng

    // credit: https://stackoverflow.com/questions/15066849/how-to-detect-when-mousemove-has-stopped
    map.on('mousemove', function (e) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
            coordLatLng = e.latlng
        }

        timeout = window.setTimeout(function (e) {

            var apiString = "https://coordinate-info.herokuapp.com/api/v1/coord_info?db=mongo&latitude_y=" + coordLatLng.lat + "&longitude_x=" + coordLatLng.lng
            $.ajax({ type: "GET", url: apiString }).done(function(response){
                var results = response.results
                var myText = ""
                if (response.success == 1) {
                    myText = results.country + "</br>" + results.municipality1 + "</br>" + results.municipality2
                    if (results.municipality_nl1 !== null && results.municipality_nl2 !== null) {
                        myText = results.country + "</br>" + results.municipality1 + " (" + results.municipality_nl1 + ")</br>" + results.municipality2 + " (" + results.municipality_nl2 + ")"
                    } else {
                        myText = results.country + "</br>" + results.municipality1 + "</br>" + results.municipality2
                    }
                }
                console.log(response)
                createIncidentTextControl(map, myText)
            })
        }, 500);
    })

})

