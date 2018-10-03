const CONST_MAP_DEFAULT_LONGITUDEX              = -5.2999988;
const CONST_MAP_DEFAULT_LATITUDEY               = 35.8999964;
const CONST_MAP_INITIAL_ZOOM                    =  3;

const CONST_MAP_TEXT_CONTROL_WIDTH              = 380;
const CONST_MAP_TEXT_CONTROL_MESSAGE_WIDTH      = 460;
const CONST_MAP_TEXT_CONTROL_MESSAGE_TEXT       = "There may be a short pause while the API spins up from sleep on Heroku.com"

const CONST_MAP_TEXT_CONTROL_MESSAGE_MARGIN_TOP = '-75px';

const CONST_MAP_MAP_CURSOR_TIMEOUT_MS           = 100;
const CONST_MAP_MESSAGE_DISPLAY_TIME_MS         = 15000;

const CONST_MAP_DEFAULT_BASE_LAYER_INDEX        = 0

// definition of map layers
const CONST_MAP_LAYERS = [
    {
        name: "Esri OSM",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        minZoom:  5,
        maxZoom: 17
    },
    {
        // not https so can generate warnings due to mixed content
        // 2018-08-12 - https site currently has a NET::ERR_CERT_COMMON_NAME_INVALID
        name: "Grayscale OSM",
        url: "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",      
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        minZoom:  5,
        maxZoom: 17
    },
    {
        name: "Basic OSM",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        minZoom:  5,
        maxZoom: 17
    },
    {
        name: "Esri World Imagery",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        minZoom:  5,
        maxZoom: 17
    }
];