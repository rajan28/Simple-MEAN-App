var user = require('../../app/controllers/user.s.controller.js');
var bar = require('../../app/controllers/bar.s.controller.js');

module.exports = function(app) {
	app.route('/api/bars')
		.get(bar.list)
		.post(user.requiresLogin, bar.add);

	app.route('/api/bars/:barId')
		.get(bar.read)
		.put(user.requiresLogin, bar.hasAuthorization, bar.update)
		.delete(user.requiresLogin, bar.hasAuthorization, bar.delete);

	app.param('barId', bar.barByID);

};