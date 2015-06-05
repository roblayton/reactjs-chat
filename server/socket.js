var StatsService = require('./StatsService');

var usernames = (function() {

  var names = {};

  var candidate = function(name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  var generateGuestName = function() {
    var name,
        idCtr = 1;

    do {
      name = 'Guest' + idCtr;
      idCtr++;
    } while (!candidate(name));

    return name;
  };

  var fetch = function() {
    var arr = [];
    for (n in names) {
      arr.push(n);
    }

    return arr;
  };

  var free = function(name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    candidate: candidate,
    free: free,
    fetch: fetch,
    generateGuestName: generateGuestName
  }

}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = usernames.generateGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: usernames.fetch()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:joined', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      content: data.content
    });
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    usernames.free(name);
  });

  // metrics
  socket.on('metrics:ctr', function(key) {
    StatsService.increment(key); 
  });

  socket.on('metrics:strtmr', function(key) {
    StatsService.startTimer(key);
  });

  socket.on('metrics:endtmr', function(key) {
    StatsService.endTimer(key);
  });
};
