var mongoose = require('mongoose');
var config = require('../config').config;
      
mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./seat');
require('./message');

exports.User = mongoose.model('User');
exports.Seat = mongoose.model('Seat');
exports.Message = mongoose.model('Message');
