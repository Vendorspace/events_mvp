var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	bizName: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
	},
	userType: {
		type: String,
		required: true

	},	
	address: {
		street: String,
		zip: String,
		state: String
	},
	contact_phone: {
		type: String,
		required: true
	},
	contact_email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);
