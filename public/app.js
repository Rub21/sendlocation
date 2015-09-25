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
        "iconSize": [30, 30],
        "iconAnchor": [15, 15],
        "popupAnchor": [0, -15],
        "className": "dot"
      }
    }
  }
  myLayer.on('layeradd', function(e) {
    var marker = e.layer,
      feature = marker.feature;
    marker.setIcon(L.icon(feature.properties.icon));
  });
  myLayer.setGeoJSON(geoJson);
}