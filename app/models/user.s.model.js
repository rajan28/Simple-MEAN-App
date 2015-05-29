var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema( {
	firstname : String,
	lastname : String,
	email : {
		type : String,
		match : [/.+\@.+\..+/, "Please enter a valid e-mail address"]
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
		    return password && password.length > 6;
		}, 'Password should be longer'
		]
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

UserSchema.virtual('fullName').get(function() {
 	return this.firstname + ' ' + this.lastname;
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		console.log(this.salt);
		this.password = this.hashPassword(this.password);
		console.log(this.password);
	}
 	next();
});

UserSchema.methods.hashPassword = function(password) {
	console.log(this.salt);
 	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	console.log(this.password);
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


// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var lowerCase = function toLower(input) {
// 	return input.toLowerCase();
// };

// var UserSchema = new Schema( {
// 	firstname : {
// 		type : String,
// 		//required : true
// 	},
// 	lastname : {
// 		type : String,
// 		//required : true
// 	},
// 	role : {
// 		type : String,
// 		enum : ['Overlord', 'Peon']
// 	},
// 	email : {
// 		type : String,
// 		//required : true,
// 		set : lowerCase, //calls toLower function, where user email is the input parameter
// 		unique : true,
// 		match : /.+\..+/
// 	},
// 	username : {
// 		type : String,
// 		//required : true,
// 		trim : true,
// 		unique : true
// 	},
// 	password : {
// 		type : String,
// 		//required : true,
// 		validate : [
// 			function(password) {
// 				return password.length >= 8;
// 			},
// 			'Your password must be at least 8 characters'
// 		]
// 	},
// 	createdAt : {
// 		type : Date,
// 		default : Date.now
// 	}
// });

// //Creates a static method (need to learn more about this)
// UserSchema.statics.findOneByUsername = function(username, callback) {
// 	this.findOne({username : new RegExp(username, 'i') }, callback);
// }

// //Defines a custom instance method (learn more)
// UserSchema.methods.auth = function(password) {
// 	return this.password === password;
// }

// //creates a virtual fullname attribute
// UserSchema.virtual('fullname').get(function() {
// 	return this.firstname + ' ' + this.lastname;
// });

// //Virtuals to true creates a stringified version of _id, and creates virtual attributes which are not persisted to MongoDB
// UserSchema.set('toJSON', {
// 	getters : true,
// 	virtuals : true
// });

// var ReviewSchema = new Schema ( {
// 	title : {
// 		type : String,
// 		required : true
// 	},
// 	content : {
// 		type : String,
// 		required : true
// 	},
// 	author : {
// 		type : Schema.ObjectId,
// 		ref : 'User' //learn more about this
// 	}
// });


// mongoose.model('User', UserSchema);
// mongoose.model('Post', ReviewSchema);