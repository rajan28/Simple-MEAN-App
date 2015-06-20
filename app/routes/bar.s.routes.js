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

	app.route('/api/bars/:barId/reviews')
		.get(bar.listReviews)
		.post(user.requiresLogin, bar.addReviews);

	app.route('/api/bars/:barId/ratings')
		.get(bar.listRatings)
		.post(user.requiresLogin, bar.addRatings);

	app.param('barId', bar.barByID);

};