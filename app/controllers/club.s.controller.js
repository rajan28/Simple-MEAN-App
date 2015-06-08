var mongoose = require('mongoose');
var Club = mongoose.model('Club');

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
	var club = new Club(req.body);

	club.save(function(err) {
		if (err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(club);
		}
	});
};

exports.list = function(req, res) {
    Club.find({}, function(err, clubs) {
        if (err) {
            return next(err);
        }
        else {
            res.json(clubs);
        }
    });
};

exports.clubByID = function(req, res, next, id) {
	Club.findById(id).populate('creator', 'firstname lastname').exec(function(err, club) {
		if(err) {
			return next(err);
		}
		if(!club) {
			return next(new Error('Failed to load club ' + id));
		}
		req.club = club;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.club);
};

exports.update = function(req, res) {
	var club = req.club;
	club.title = req.body.title;
	club.content = req.body.content;
	club.save(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage(err)
			});
		}
		else {
			res.json(club);
		}
	});
};

exports.delete = function(req, res) {
	var club = req.club;

	club.remove(function(err) {
		if(err) {
			return res.status(400).send( {
				message : getErrorMessage
			});
		}
		else {
			res.json(club);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if(req.club.creator.id !== req.user.id) {
		return res.status(403).send( {
			message : 'User is not authorized to perform this action'
		});
	}
	next();
};