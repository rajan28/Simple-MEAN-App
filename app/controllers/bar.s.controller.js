var mongoose = require('mongoose');
var Bar = mongoose.model('Bar');

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

exports.create = function(req, res) {
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

exports.read = function(req, res) {
	res.json(req.bar);
};

exports.update = function(req, res) {
	var bar = req.bar;
	bar.title = req.body.title;
	bar.content = req.body.content;
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

exports.hasAuthorization = function(req, res, next) {
	if(req.bar.creator.id !== req.user.id) {
		return res.status(403).send( {
			message : 'User is not authorized to perform this action'
		});
	}
	next();
};