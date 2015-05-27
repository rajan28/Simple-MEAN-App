var mongoose = require('mongoose');
var User = mongoose.model('User');

// var newUser = User({
// 	firstname : "bob",
// 	lastname : "jones",
// 	email : "bob@jones.com",
// 	username : "bobjones",
// 	password : "bobbyjones"
// });

// // save the user
// newUser.save(function(err) {
//   if (err) throw err;

//   console.log('User created!');
// });

exports.createNewUser = function(req, res, next) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne( {
		_id : id
	}, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			req.user = user;
			next();
		}
	});
};

exports.updateByID = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});

};

exports.deleteByID = function(req, res, next) {
	req.user.remove( function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	});
};

// exports.listEmailsOnly = function(req, res, next) {
// 	User.find({}, 'email', function(err, users) {
// 		if (err) {
// 			return next(err);
// 		}
// 		else {
// 			res.json(users);
// 		}
// 	});
// };