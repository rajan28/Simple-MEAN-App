var config = require('./config.js');

var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	
	require('../app/models/user.s.model.js');

	return db;
};