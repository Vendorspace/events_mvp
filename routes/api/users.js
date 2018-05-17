const express = require("express");
const router = express.Router();
var User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET api/users/test
// @desc tests users route
// @access public
router.get("/test", (req, res) => res.json({ message: "users works" }));

// @route POST api/users/register
// @desc registers new users and checks if email already taken
// @access public
router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	//check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ contact_email: req.body.contact_email }).then(user => {
		if (user) {
			errors.contact_email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			var user = new User({
				bizName: req.body.bizName,
				owner: req.body.owner,
				userType: req.body.userType,
				address: req.body.address,
				contact_phone: req.body.contact_phone,
				contact_email: req.body.contact_email,
				password: req.body.password,
				avatar: req.body.avatar
			}); //new instance of a vehicle

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					if (err) throw err;
					user.password = hash;
					user
						.save()
						.then(encrypt_user => res.json(encrypt_user))
						.catch(err => console.log(err));
				});
			});
			console.log("user added to db");
		}
	});
});

// @route POST api/users/login
// @desc login user / returning jwt
// @access public
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	//check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const contact_email = req.body.contact_email;
	const password = req.body.password;

	User.findOne({ contact_email }).then(user => {
		if (!user) {
			errors.contact_email = "User not found";
			return res.status(404).json(errors);
		}

		//check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//user matched
				const payload = { id: user.id, bizName: user.bizName }; //create jwt payload
				//sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json(errors);
			}
		});
	});
});

// @route GET api/users/current
// @desc Return current user
// @access private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			bizName: req.user.bizName,
			contact_email: req.user.contact_email
		});
	}
);

module.exports = router;
