// Singletons are Evil!
var StatsDClient = require('statsd-client');

var StatsService = function StatsService() {
  var sdc = new StatsDClient({ host: '192.168.99.103' });
  var start = new Date();
  var timers = {};

  this.initExpressHelper = function() {
    return sdc.helpers.getExpressMiddleware('express');
  };

  this.increment = function(key) {
    sdc.increment(key); 
  };

  this.startTimer = function(key) {
    timers[key] = new Date();
  };

  this.endTimer = function(key) {
    sdc.timing(key, new Date() - timers[key]); 
  };

  if (StatsService.caller != StatsService.getInstance) {
    throw new Error("This object cannot be instantiated");
  }
};

StatsService.instance = null;

StatsService.getInstance = function(){
    if(this.instance === null){
        this.instance = new StatsService();
    }
    return this.instance;
}
 
module.exports = StatsService.getInstance();
