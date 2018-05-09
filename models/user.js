var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	bizName: String,
	owner: String,
	userType: {
		type: String,
		required: true

	}	
	address: {
		street: String,
		zip: String,
		state: String
	},
	contact_phone: String,
	contact_email: String
});

module.exports = mongoose.model('User', UserSchema);
