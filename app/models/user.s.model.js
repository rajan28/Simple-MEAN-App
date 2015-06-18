var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema( {
	firstname : {
		type : String,
    	required : true
	},
	lastname : {
		type : String,
		required : true
	},
	gender : {
		type : String,
		required : true,
		enum : ['Male', 'Female', 'Other']
	},
	birthday : {
		type : String,
		required : true,
		validate : [
			function isValidDate(birthday) {
			    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthday)) {
			        return false;
			    }

			    var parts = birthday.split("/");
			    var day = parseInt(parts[1], 10);
			    var month = parseInt(parts[0], 10);
			    var year = parseInt(parts[2], 10);
			    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
			        monthLength[1] = 29;
			    };

			    if(year < 1900 || year > 2100 || month == 0 || month > 12 || day == 0 || day >= monthLength[month - 1]) {
			        return false;
			    };

			    return true;
			},
			"Month must be in the following format: MM/DD/YYYY"
		]
	},
	email : {
		type : String,
    unique : true,
		match : [/.+\@.+\..+/, "Please enter a valid e-mail address"],
		required : true
	},
	username : {
		type : String,
		unique : true,
		required : 'Username is required',
		trim : true
	},
	password : {
		type : String,
		validate : [
		function(password) {
		    return password && password.length > 7;
		}, 'Password should be longer'
		]
	},
	preferences : {
		type : Array
	},
	salt : {
		type : String
	},
	provider : {
		type : String,
		required : 'Provider is required'
	},
	providerId : {
		type : String
	},
	providerData : {
	},
	created : {
		type : Date,
		default : Date.now
	}
});

UserSchema.virtual('fullname').get(function() {
 	return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('age').get(function() {
    var today = new Date();
    var birthDate = new Date(this.birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    };
    return age;
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
 	next();
});

UserSchema.methods.hashPassword = function(password) {
 	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
 	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne( {
		username: possibleUsername
  	}, function(err, user) {
    	if (!err) {
      		if (!user) {
        		callback(possibleUsername);
      		} else {
       			return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      		}	
    	} else {
      		callback(null);
    	}
  	});
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);