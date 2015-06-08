var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

var getErrorMessage = function(err) { 
	if (err.errors) { 
		for (var errName in err.errors) { 
			if (err.errors[errName].message) { 
				return err.errors[errName].message;
			}
		} 
	} 
	else { 
		return 'Unknown server error'; 
	}
};

exports.add = function(req, res) {
	var restaurant = new Restaurant(req.body);

	restaurant.save(function(err) {
		if (err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(restaurant);
		}
	});
};

exports.list = function(req, res) {
    Restaurant.find({}, function(err, restaurants) {
        if (err) {
            return next(err);
        }
        else {
            res.json(restaurants);
        }
    });
};

exports.restaurantByID = function(req, res, next, id) {
	Restaurant.findById(id).populate('creator', 'firstname lastname').exec(function(err, restaurant) {
		if(err) {
			return next(err);
		}
		if(!restaurant) {
			return next(new Error('Failed to load restaurant ' + id));
		}
		req.restaurant = restaurant;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.restaurant);
};

exports.update = function(req, res) {
	var restaurant = req.restaurant;
	restaurant.title = req.body.title;
	restaurant.content = req.body.content;
	restaurant.save(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(restaurant);
		}
	});
};

exports.delete = function(req, res) {
	var restaurant = req.restaurant;

	restaurant.remove(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage
			});
		}
		else {
			res.json(restaurant);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if(req.restaurant.creator.id !== req.user.id) {
		return res.status(403).send( {
			message : 'User is not authorized to perform this action'
		});
	}
	next();
};