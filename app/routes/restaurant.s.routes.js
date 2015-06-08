var user = require('../../app/controllers/user.s.controller.js');
var restaurant = require('../../app/controllers/restaurant.s.controller.js');

module.exports = function(app) {
	app.route('/api/restaurants')
		.get(restaurant.list)
		.post(user.requiresLogin, restaurant.add);

	app.route('/api/restaurants/:restaurantId')
		.get(restaurant.read)
		.put(user.requiresLogin, restaurant.hasAuthorization, restaurant.update)
		.delete(user.requiresLogin, restaurant.hasAuthorization, restaurant.delete);

	app.param('restaurantId', restaurant.restaurantByID);
};