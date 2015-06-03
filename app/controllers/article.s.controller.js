var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var getErrorMessage = function(err) { 
	if (err.errors) { 
		for (var errName in err.errors) { 
			if (err.errors[errName].message) { 
				return err.errors[errName].message;
			}
		} 
	}; 
	else { 
		return 'Unknown server error'; 
	};
};