//////////////////////////////////////////////////////////////////////
// read in url parameters and parse into an object
// function is unforgiving, any error returns empty object
function getUrlParameterOptions(url, fnCallback) {

    try {
        var paramsArr = url.split("&")
        var myObject  = {}
        var params, myKey, myValue

        for (var counter = 0; counter < paramsArr.length; counter++) {
            params  = paramsArr[counter].split("=");
            myKey   = params[0]
            myValue = params[1];

            myObject[myKey]  = myValue;
        }
        fnCallback(myObject);
    } catch (error) {
        fnCallback({});
    }
};
//////////////////////////////////////////////////////////////////////

var gTypeDB

//////////////////////////////////////////////////////////////////////
// read and set url parameters to variables
function processParams(params) {
    if (params['db']) { gTypeDB = params['db'] }
    else { gTypeDB = 'pg' }
}

//////////////////////////////////////////////////////////////////////

var gMyControl

//////////////////////////////////////////////////////////////////////
// display text informaiton in textControl
function textControl(map, displayText) {

    if (gMyControl) map.removeControl(gMyControl)  // remove control if it already exists

    var textCustomControl = L.Control.extend({
        options: {
            position: 'topright' 
        },

        onAdd: function() {
            var container;

            container = L.DomUtil.create('div', 'highlight-background custom-control cursor-pointer leaflet-bar', L.DomUtil.get('map'));
            container.innerHTML = "<center>" + displayText + "</center>"

            // top-center the control on the map
            container.style.position = 'absolute'
            container.style.right    = Math.round(($(window).width() - CONST_MAP_TEXT_CONTROL_WIDTH) / 2) + 'px'

            gContainer = container  // need this reference for later

            return container;
        },

        onRemove: function(map) { }
    });

    gMyControl = new textCustomControl();
    map.addControl(gMyControl);
}
////////////////////////////////////////////////////////////////

var gMyControlMessage

//////////////////////////////////////////////////////////////////////
// display text informaiton in textControl
function textControlMessage(map) {

    if (gMyControlMessage) map.removeControl(gMyControlMessage)  // remove control is already exists

    var textCustomControl = L.Control.extend({
        options: {
            position: 'bottomright' 
        },

        onAdd: function() {
            var container;

            container = L.DomUtil.create('div', 'highlight-background-message custom-control-message cursor-pointer leaflet-bar', L.DomUtil.get('map'));
            container.innerHTML = "<center>" + CONST_MAP_TEXT_CONTROL_MESSAGE_TEXT + "</center>"

            // bottom-center the control on the map
            container.style.position = 'absolute'
            container.style.top      = CONST_MAP_TEXT_CONTROL_MESSAGE_MARGIN_TOP 
            container.style.right    = Math.round(($(window).width() - CONST_MAP_TEXT_CONTROL_MESSAGE_WIDTH) / 2) + 'px'

            gContainerMessage = container    // need this reference for later
            return container;
        },

        onRemove: function(map) { }
    });

    gMyControlMessage = new textCustomControl();
    map.addControl(gMyControlMessage);
}
////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// read in and process url parameters
var params = getUrlParameterOptions(window.location.search.slice(1), function(params) {
    if (params !== {}) processParams(params)
});
//////////////////////////////////////////////////////////////////////


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


//////////////////////////////////////////////////////////////////////
$(document).ready(function() {

    // create map and define position, zoom and baselayer
    var map = L.map('map', {
        center: [ CONST_MAP_DEFAULT_LATITUDEY, CONST_MAP_DEFAULT_LONGITUDEX ],
        zoom: CONST_MAP_INITIAL_ZOOM,
        layers: [mapLayers[CONST_MAP_DEFAULT_BASE_LAYER_INDEX]],
        worldCopyJump: true
    });

    L.control.layers(baseMaps).addTo(map)                      // add map layers to layer control
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

            var apiString = "http://zotac1.ddns.net:3100/api/v1/coord_info?db=" + gTypeDB + "&latitude_y=" + coordLatLng.lat + "&longitude_x=" + coordLatLng.lng

            $.ajax({ url: apiString }).done(function(response){
               
                if (response.success == 1 && response.results !== null) {

                    var myText = ""
                    if (response.results.municipality_nl1 !== null && response.results.municipality_nl2 !== null &&
                        response.results.municipality_nl1 !== ""   && response.results.municipality_nl2 !== "") {

                        myText = response.results.country + "</br>" + response.results.municipality1 + " (" + response.results.municipality_nl1 + ")</br>" + response.results.municipality2 + " (" + response.results.municipality_nl2 + ")"
                    } else {
                        myText = response.results.country + "</br>" + response.results.municipality1
                        if (response.results.municipality2 !== null) myText += "</br>" + response.results.municipality2
                    }
                    textControl(map, myText)  // display information in textControl
                } else {
                    if (gMyControl) map.removeControl(gMyControl)  // remove control is already exists
                }
            })
        }, CONST_MAP_MAP_CURSOR_TIMEOUT_MS);
    })


    // 
    // 
    // CoofdinateInfo-API moved off of Heroku so the followoing user message is no longer needed
    // 
    // 
    // // display api 'spinning up' message
    // textControlMessage(map)

    // setTimeout(function() { 
    //     map.removeControl(gMyControlMessage)  // remove text message
    // }, CONST_MAP_MESSAGE_DISPLAY_TIME_MS)


    // // reposition text control message boxes
    // $(window).resize( function() {

    //     // top text control
    //     gContainer.style.position        = 'absolute'
    //     gContainer.style.right           = Math.round(($(window).width() - CONST_MAP_TEXT_CONTROL_WIDTH) / 2) + 'px'

    //     // bottom text control displayed on start up
    //     gContainerMessage.style.position = 'absolute'
    //     gContainerMessage.style.top      = CONST_MAP_TEXT_CONTROL_MESSAGE_MARGIN_TOP
    //     gContainerMessage.style.right    = Math.round(($(window).width() - CONST_MAP_TEXT_CONTROL_MESSAGE_WIDTH) / 2) + 'px'

    // })

})

