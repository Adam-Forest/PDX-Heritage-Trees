var treeIcon = new L.Icon({
  iconUrl: './static/images/marker-icon-2x-tree.png',
  shadowUrl: './static/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Adding tile layer to the map

var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?title=view&access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  tileSize: 512,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});


var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var pirate = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pirates",
  accessToken: API_KEY
});

var baseMaps = {
  Streets: streets
};

// Creating map object
var myMap = L.map("map", {
  center: [45.5051, -122.6750],
  zoom: 11,
  layers: streets
});

var url = "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson"
// Grab data with d3

var markers = L.markerClusterGroup();
// Grab the data with d3
d3.json(url, function (response) {
  console.log(response);
  // Create a new marker cluster group

  markers.addLayer(L.geoJson(response, {
    pointToLayer: function (feature, latlng) {
              return L.marker(latlng, {icon: treeIcon});
      },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.COMMON}</h1><h1>${feature.properties.SCIENTIFIC}</h1><h2>${feature.properties.NOTES}</h2>`);
    }
  }));

  myMap.locate({setView: true, maxZoom: 16});
  myMap.addLayer(markers);
  

  L.control.layers(baseMaps).addTo(myMap);
  L.control.locate().addTo(myMap);
});

