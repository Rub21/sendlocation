var socket = io.connect(window.location.href);
L.mapbox.accessToken = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([-13, -74], 8);

socket.on("location", onReceiveData);

function onReceiveData(obj) {
  console.log(obj)
  L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [obj.data.lon, obj.data.lat]
    },
    properties: {
      title: 'Peregrine Espresso',
      description: '1718 14th St NW, Washington, DC',
      'marker-size': 'large',
      'marker-color': '#BE9A6B',
      'marker-symbol': 'cafe'
    }
  }).addTo(map);
}