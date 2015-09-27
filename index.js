var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log("GET files");
	res.sendfile(__dirname + '/public');
});
app.post('/', function(req, res) {
	console.log(req.body);
	var data = req.body;
	data.lat = parseFloat(data.lat);
	data.lon = parseFloat(data.lon);
	if (data.id === 'null') socket.emit('location', {
		done: 'Done',
		data: data
	});
	res.send({
		status: true
	});
});
socket.on('connection', function(socket) {
	console.log('socket.io connected');
});
server.listen(3000, function() {
	console.log("Started on PORT 3000");
})