var user = require('../../app/controllers/user.s.controller.js');
var bar = require('../../app/controllers/bar.s.controller.js');

module.exports = function(app) {
	app.route('/api/bars')
		.get(bar.list)
		.post(user.requiresLogin, bar.add);

	app.route('/api/bars/:barId')
		.get(bar.read)
		.put(user.requiresLogin, /*bar.hasAuthorization,*/ bar.update)
		.delete(user.requiresLogin, /*bar.hasAuthorization,*/ bar.delete);

	app.route('/api/bars/:barId/reviews')
		.get(bar.listReviews)
		.post(user.requiresLogin, bar.addReviews);

	app.route('/api/bars/:barId/reviews/:reviewId')
		.get(bar.readReview)
		.delete(user.requiresLogin, /*bar.hasReviewAuthorization,*/ bar.deleteReview);

	app.route('/api/bars/:barId/ratings')
		.get(bar.listRatings)
		.post(user.requiresLogin, bar.addRatings)
		.delete(user.requiresLogin, bar.deleteAllRatings);

	app.route('/api/bars/:barId/ratings/:ratingId')
		.get(bar.readRating)
		.delete(user.requiresLogin, /*bar.hasRatingAuthorization,*/ bar.deleteRating);

	app.param('barId', bar.barByID);
	app.param('reviewId', bar.reviewByID);
	app.param('ratingId', bar.ratingByID);

};