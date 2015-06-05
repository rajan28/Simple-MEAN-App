var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy(function(login, password, done) {
		User.findOne( {
			$or: [ {username : login}, {email : login} ]
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message : 'Unknown User'
				});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					message : 'Incorrect Password'
				});
			}
			return done(null, user);
		});
	}));
};