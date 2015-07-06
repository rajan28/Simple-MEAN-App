var mongoose = require('mongoose');
var Bar = mongoose.model('Bar');
var BarReviews = mongoose.model('BarReviews');
// var BarRatings = mongoose.model('BarRatings');

//Error Handling Function

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

//Add Functions

exports.add = function(req, res) {
	var bar = new Bar(req.body);

	bar.save(function(err) {
		if (err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(bar);
		}
	});
};

exports.addReviews = function(req, res) {
	var barReviews = new BarReviews(req.body);

	barReviews.save(function(err) {
		if (err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(barReviews);
		}
	});
};

// exports.addRatings = function(req, res) {
// 	var barRatings = new BarRatings(req.body);

// 	barRatings.save(function(err) {
// 		if (err) {
// 			return res.status(400).send( {
// 				message : getErrorMessage(err)
// 			});
// 		}
// 		else {
// 			res.json(barRatings);
// 		}
// 	});
// };

//List Functions

exports.list = function(req, res) {
    Bar.find({}, function(err, bars) {
        if (err) {
            return next(err);
        }
        else {
            res.json(bars);
        }
    });
};

exports.listReviews = function(req, res, next) {
	BarReviews.find({barNameAndCity : req.bar.name+' '+req.bar.city}).populate('creator', 'firstname lastname').exec(function(err, reviews) {
		if (err) {
			return next(err);
		}
		else {
			res.json(reviews);
		}
	});
};

// exports.listRatings = function(req, res) {
// 	BarRatings.find({}, function(err, ratings) {
// 		if (err) {
// 			return next(err);
// 		}
// 		else {
// 			res.json(ratings);
// 		}
// 	});
// };

// Find by ID Functions

exports.barByID = function(req, res, next, id) {
	Bar.findById(id).populate('creator', 'firstname lastname').exec(function(err, bar) {
		if(err) {
			return next(err);
		}
		if(!bar) {
			return next(new Error('Failed to load bar ' + id));
		}
		req.bar = bar;
		next();
	});
};

exports.reviewByID = function(req, res, next, id) {
	BarReviews.findById(id).populate('creator', 'firstname lastname').exec(function(err, review) {
		if(err) {
			return next(err);
		}
		if(!review) {
			return next(new Error('Failed to load review ' + id));
		}
		req.review = review;
		next();
	});
};

// exports.ratingByID = function(req, res, next, id) {
// 	BarRatings.findById(id).populate('creator', 'firstname lastname').exec(function(err, rating) {
// 		if(err) {
// 			return next(err);
// 		}
// 		if(!rating) {
// 			return next(new Error('Failed to load review ' + id));
// 		}
// 		req.rating = rating;
// 		next();
// 	});
// };

// Read Functions

exports.read = function(req, res) {
	res.json(req.bar);
};

exports.readReview = function(req, res) {
	res.json(req.review);
};

// exports.readRating = function(req, res) {
// 	res.json(req.rating);
// };

exports.update = function(req, res) {
	var bar = req.bar;
	bar.name = req.body.name;
	bar.city = req.body.city;
	bar.address = req.body.address;
	bar.ageMin = req.body.ageMin;
	bar.ageMax = req.body.ageMax;
	bar.price = req.body.price;
	bar.latitude = req.body.latitude;
	bar.longitude = req.body.longitude;
	bar.information = req.body.information;
	bar.hours = req.body.hours;
	bar.featured = req.body.featured;
	bar.pictures = req.body.pictures;
	bar.save(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(bar);
		}
	});
};

// Delete Functions

exports.delete = function(req, res) {
	var bar = req.bar;

	bar.remove(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage
			});
		}
		else {
			res.json(bar);
		}
	});
};

exports.deleteReview = function(req, res) {
	var review = req.review;

	review.remove(function(err) {
		if (err) {
			return res.status(400).send( {
				message : getErrorMessage
			});
		}
		else {
			res.json(review);
		}
	});
};

exports.deleteAllReviews = function(req, res, next) {
    BarReviews.find({}, function(err, reviews) {
        var numReviews = reviews.length;
        for (i = 0; i < numReviews; i++) {
            reviews[i].remove(function (err) {
                if (err) {
                    return next(err);
                }
            })
        }
        console.log('All Reviews Have Been Deleted!');
        res.redirect('/');
    });
};

// exports.deleteRating = function(req, res) {
// 	var rating = req.rating;

// 	rating.remove(function(err) {
// 		if (err) {
// 			return res.status(400).send( {
// 				message : getErrorMessage
// 			});
// 		}
// 		else {
// 			res.json(rating);
// 		}
// 	});
// };

// exports.deleteAllRatings = function(req, res, next) {
//     BarRatings.find({}, function(err, ratings) {
//         var numRatings = ratings.length;
//         for (i = 0; i < numRatings; i++) {
//             ratings[i].remove(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//             })
//         }
//         console.log('All Ratings Have Been Deleted!');
//         res.redirect('/');
//     });
// };

exports.hasAuthorization = function(req, res, next) {
	if(req.bar.creator.id !== req.user.id) {
		return res.status(403).send( {
			message : 'User is not authorized to perform this action'
		});
	}
	next();
};