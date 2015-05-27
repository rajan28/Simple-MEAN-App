var user = require('../controllers/user.s.controller.js');
var mongoose = require('mongoose');
var collection = mongoose.Collection;

module.exports = function(app) {
	app.route('/users')
		.get(user.list)
		.post(user.createNewUser);

	app.route('/users/:userId')
		.get(user.read)
		.put(user.updateByID)
		.delete(user.deleteByID);

	//will be executed before any middleware registered...
	//...with the :userId request parameter
	app.param('userId', user.userByID);
}