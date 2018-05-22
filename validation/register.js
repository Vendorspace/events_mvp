const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.bizName = !isEmpty(data.bizName) ? data.bizName : "";
	data.contact_email = !isEmpty(data.contact_email) ? data.contact_email : "";
	data.contact_phone = !isEmpty(data.contact_phone) ? data.contact_phone : "";
	data.owner = !isEmpty(data.owner) ? data.owner : "";
	data.userType = !isEmpty(data.userType) ? data.userType : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (!Validator.isLength(data.bizName, { min: 2, max: 30 })) {
		errors.bizName = "Name must be between 2 and 30 characters";
	}

	if (Validator.isEmpty(data.bizName)) {
		errors.bizName = "Name field is required";
	}

	if (Validator.isEmpty(data.contact_email)) {
		errors.contact_email = "Email is required";
	}

	if (!Validator.isEmail(data.contact_email)) {
		errors.contact_email = "Email is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	if (Validator.isEmpty(data.owner)) {
		errors.owner = "Business owner required";
	}

	if (Validator.isEmpty(data.contact_phone)) {
		errors.contact_phone = "Contact phone is required";
	}

	if (Validator.isEmpty(data.userType)) {
		errors.userType = "Please select user type";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
