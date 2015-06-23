var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BarSchema = new Schema( {
	name : {
		type : String,
		required : true
	},
	// type : {
	// 	type : String,
	// 	required : true,
	// 	//enum : []
	// },
	city : {
		type : String,
		required : true
	},
	address : {
		type : String,
		required : true
	},
	ageMin : {
		type : Number,
		required : true
	},
	ageMax : {
		type : Number,
		required : true
	},
	price : {
		type : Number
	},
	latitude : {
		type : Number
	},
	longitude : {
		type : Number
	}
	// hours : {
	// 	type
	// }

});

var BarReviewsSchema = new Schema( {
	created : {
		type : Date,
		default : Date.now
	},
	title : {
		type : String,
		default : '',
		trim : true,
		required : 'Title cannot be blank'
	},
	content : {
		type : String,
		default : '',
		trim : true
	},
	user : {
		type : String
	},
	creator : {
		type : Schema.ObjectId,
		ref : 'User'
	}
});

var BarRatingsSchema = new Schema( {
	created : {
		type : Date,
		default : Date.now
	},
	rating : {
		type : Number,
		required : true
	},
	user : {
		type : String,
		required : true
	},
	creator : {
		type : Schema.ObjectId,
		ref : 'User'
	}
});

mongoose.model('Bar', BarSchema);
mongoose.model('BarReviews', BarReviewsSchema);
mongoose.model('BarRatings', BarRatingsSchema);