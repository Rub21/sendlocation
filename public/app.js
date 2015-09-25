var socket = io.connect(window.location.href);
L.mapbox.accessToken = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([-13, -74], 8);

var myLayer = L.mapbox.featureLayer().addTo(map);

socket.on("location", onReceiveData);

function onReceiveData(obj) {
  console.log(obj)
  var geoJson = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [obj.data.lon, obj.data.lat]
    },
    "properties": {
      "title": "Ruben",
      "icon": {
        "iconUrl": "https://avatars1.githubusercontent.com/u/1152236?v=3&u=e344ade6ac71291d92e19fabd26f2992b4a1f581&s=140",
        "iconSize": [30, 30], // size of the icon
        "iconAnchor": [15, 15], // point of the icon which will correspond to marker's location
        "popupAnchor": [0, -15], // point from which the popup should open relative to the iconAnchor
        "className": "dot"
      }
    }
  }
  myLayer.on('layeradd', function(e) {
    var marker = e.layer,
      feature = marker.feature;

    marker.setIcon(L.icon(feature.properties.icon));
  });

  // Add features to the map.
  myLayer.setGeoJSON(geoJson);


  // L.mapbox.featureLayer({
  //   type: 'Feature',
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [obj.data.lon, obj.data.lat]
  //   },
  //   properties: {
  //     title: 'Peregrine Espresso',
  //     description: '1718 14th St NW, Washington, DC',
  //     'marker-size': 'large',
  //     'marker-color': '#BE9A6B',
  //     'marker-symbol': 'cafe'
  //   }
  // }).addTo(map);
}