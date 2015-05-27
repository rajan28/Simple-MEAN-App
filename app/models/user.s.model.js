var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lowerCase = function toLower(input) {
	return input.toLowerCase();
};

var UserSchema = new Schema( {
	firstname : {
		type : String,
		//required : true
	},
	lastname : {
		type : String,
		//required : true
	},
	role : {
		type : String,
		enum : ['Overlord', 'Peon']
	},
	email : {
		type : String,
		//required : true,
		set : lowerCase, //calls toLower function, where user email is the input parameter
		unique : true,
		match : /.+\..+/
	},
	username : {
		type : String,
		//required : true,
		trim : true,
		unique : true
	},
	password : {
		type : String,
		//required : true,
		validate : [
			function(password) {
				return password.length >= 8;
			},
			'Your password must be at least 8 characters'
		]
	},
	createdAt : {
		type : Date,
		default : Date.now
	}
});

//Creates a static method (need to learn more about this)
UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({username : new RegExp(username, 'i') }, callback);
}

//Defines a custom instance method (learn more)
UserSchema.methods.auth = function(password) {
	return this.password === password;
}

//creates a virtual fullname attribute
UserSchema.virtual('fullname').get(function() {
	return this.firstname + ' ' + this.lastname;
});

//Virtuals to true creates a stringified version of _id, and creates virtual attributes which are not persisted to MongoDB
UserSchema.set('toJSON', {
	getters : true,
	virtuals : true
});

var ReviewSchema = new Schema ( {
	title : {
		type : String,
		required : true
	},
	content : {
		type : String,
		required : true
	},
	author : {
		type : Schema.ObjectId,
		ref : 'User' //learn more about this
	}
});


mongoose.model('User', UserSchema);
mongoose.model('Post', ReviewSchema);