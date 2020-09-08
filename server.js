// # SimpleServer
// A simple chat bot server

var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var router = express();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var server = http.createServer(app);


app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'maxacnhantrongungdungserverjs') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP);

server.listen(app.get('port'), app.get('ip'), function() {
    console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});