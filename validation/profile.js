const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.userType = !isEmpty(data.userType) ? data.userType : "";
	data.company = !isEmpty(data.company) ? data.company : "";
	data.website = !isEmpty(data.website) ? data.website : "";
	data.location = !isEmpty(data.location) ? data.location : "";

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = "Handle needs to be between 2 and 40 characters";
	}
	if (Validator.isEmpty(data.handle)) {
		errors.handle = "Profile handle is required";
	}
	
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = "Not a valid URL";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
