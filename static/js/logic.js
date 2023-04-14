
//create the tile layer that will be the backgroun of the map

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//create a baseMaps object to hold the streetmap layer

let baseMaps = {
    'Street Map': streetmap

};



//Create the Map with object options.
let map = L.map('map', {
    center: [0, 0],
    zoom: 3,
    layers: [streetmap]
});

let allEarthquakes = new L.LayerGroup();

let overlay = {
    'all earthquakes': allEarthquakes
};

//create a layer control and pass baseMaps and overlayMaps. Add the layer to control the map. 
L.control.layers(baseMaps,overlay).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    function styleInfo(feature){
        return {
            color: 'black',
            fillColor: getColor(feature.properties.mag)
        }
    }

    function getColor(mag){
        if (mag > 5) {
            return 'red'
        }
        return 'green'
    }


    L.geoJson(data,{
        pointToLayer : function(feature,latLong){
            console.log(latLong);
            return L.circleMarker(latLong);
        },
        style : styleInfo
    }).addTo(allEarthquakes);

allEarthquakes.addTo(map);
});









