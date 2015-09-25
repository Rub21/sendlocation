require('mapbox.js');
var socket = require('socket.io-client')('http://54.86.113.107:3000');
document.location.hash = '';
var token = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var mapid = 'ruben.n9e0l5jk';
L.mapbox.accessToken = token;
var map = L.mapbox.map('map', mapid, {
	infocontrol: true,
	zoomControl: false,
	center: [-13, -74],
	zoom: 10
});
new L.Control.Zoom({
	position: 'topright'
}).addTo(map);
var myLayer = L.mapbox.featureLayer().addTo(map);
//{ lat: '-13.155797329153975', lon: '-74.2178891948596' }
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