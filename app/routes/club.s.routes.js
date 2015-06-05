var user = require('../../app/controllers/user.s.controller.js');
var club = require('../../app/controllers/club.s.controller.js');

// module.exports = function(app) {
// 	app.route('/api/clubs')
// 		.get(club.list)
// 		.post(user.requiresLogin, club.add);

// 	app.route('/api/clubs/:clubId')
// 		.get(club.read)
// 		.put(user.requiresLogin, club.hasAuthorization, club.update)
// 		.delete(user.requiresLogin, club.hasAuthorization, club.delete);

// 	app.param('clubId', club.clubByID);

// };