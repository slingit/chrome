var EventEmitter = require("events").EventEmitter;

var api = new EventEmitter();

api.put = function() {
  var group_id = arguments[1].group_id;
  var _this = this;
  setTimeout(function() {
    _this.emit("group:join", group_id);
  }, 5000);
};

module.exports = api;
