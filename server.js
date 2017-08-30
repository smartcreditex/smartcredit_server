var config = require('./config.js');
var express = require('express'),
app = express(),
port = process.env.PORT || config.port;

var routes = require('./api/routes/smartcreditRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);