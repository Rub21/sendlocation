require('mapbox.js');
var st = require('./settings')
var socket = require('socket.io-client')(st.host);
var _ = require('underscore');
var turf = require('turf');

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

socket.on("location", onReceiveData);


var users = [];

function onReceiveData(obj) {


	var user1 = turf.point([obj.data.lon, obj.data.lat]);
	user1.properties.icon = st.icon;
	user1.properties.title = obj.data.username;
	user1.properties.id = obj.data.id;
	console.log(user1);



	var user = {
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [obj.data.lon, obj.data.lat]
		},
		"properties": {
			"id": obj.data.id,
			"title": obj.data.username,
			"icon": {
				"iconUrl": "https://dl.dropboxusercontent.com/u/43116811/astronaut15.png",
				"iconSize": [30, 30],
				"iconAnchor": [15, 15],
				"popupAnchor": [0, -15],
				"className": "dot"
			}

		}
	};

	var flag = true;
	_.map(users, function(val) {
		if (val.properties.id === user.properties.id) {
			val.geometry.coordinates = user.geometry.coordinates;
			flag=false;
		}
	});
	if (flag) {
		users.push(user);
	}
	myLayer.on('layeradd', function(e) {
		var marker = e.layer,
			feature = marker.feature;
		marker.setIcon(L.icon(feature.properties.icon));
	});
	myLayer.setGeoJSON(users);
}