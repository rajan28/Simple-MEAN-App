var config = require('./config.js');

var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	
	require('../app/models/user.s.model.js');
	require('../app/models/article.s.model.js');
	require('../app/models/restaurant.s.model.js');
	require('../app/models/bar.s.model.js');
	require('../app/models/club.s.model.js');

	return db;
};