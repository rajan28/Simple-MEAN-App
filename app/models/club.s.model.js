var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClubSchema = new Schema( {
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
	}
	// hours : {
	// 	type
	// }
});

mongoose.model('Club', ClubSchema);