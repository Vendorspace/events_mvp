const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	userType: {
		type: String,
		required: true
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	company: {
		type: String,
		required: true
	},
	website: {
		type: String
	},
	location: {
		type: String
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
