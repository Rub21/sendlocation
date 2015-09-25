var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function(req, res) {
    console.log(req.body);
    //res.sendfile("index.html");
    res.end("test")
});
app.post('/', function(req, res) {
    console.log(req.body);
    res.end("yes");
});
app.listen(3000, function() {
    console.log("Started on PORT 3000");
})