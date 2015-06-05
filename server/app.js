var express = require('express'),
    path = require('path'),
    StatsService = require('./StatsService');

var app = module.exports = express.createServer();

var socket = require('./socket.js');

// Hook Socket.io into Express
var io = require('socket.io').listen(app);

// Configuration
app.configure(function(){
  app.use(StatsService.initExpressHelper());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Socket.io Communication
io.sockets.on('connection', socket);

// Start server
app.listen(3000, '0.0.0.0', function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
