var baseLayer = 0

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
        layers: [mapLayers[baseLayer]]
    });

    L.control.layers(baseMaps).addTo(map)                     // add all map layers to layer control
    L.control.scale({imperial: true, metric: true}).addTo(map) // add scalebar

})

