const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.contact_email = !isEmpty(data.contact_email) ? data.contact_email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (!Validator.isEmail(data.contact_email)) {
		errors.contact_email = "Email is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (Validator.isEmpty(data.contact_email)) {
		errors.contact_email = "Email is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
