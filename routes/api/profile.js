const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validateProfileInput = require("../../validation/profile");
// Load Profile Model
const Profile = require("../../models/profile");
// Load User Model
const User = require("../../models/user");

//@route GET api/profile/test
//@desc tests profile route
//@access public
router.get("/test", (req, res) => res.json({ message: "profile works" }));

//@route GET api/profile/
//@desc get current user's profile
//@access private

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate({
				model: "User",
				path: "user",
				select: ["bizName", "owner"]
			})
			.then(profile => {
				if (!profile) {
					errors.noprofile = "There is no profile for this user";
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

//@route GET api/profile/profile/all
//@desc get all profiles
//@access public

router.get("/all", (req, res) => {
	const errors = {};

	Profile.find()
		.populate({
			model: "User",
			path: "user",
			select: ["bizName", "owner"]
		})
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles";
				return res.status(404).json();
			}
			res.json(profiles);
		})
		.catch(err =>
			res.status(404).json({ profile: "There are no profiles" })
		);
});

//@route GET api/profile/handle/:handle
//@desc get profile by handle
//@access public
//edit this to limit non logged in users ability
//to view profiles

router.get("/handle/:handle", (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate({
			model: "User",
			path: "user",
			select: ["bizName", "owner"]
		})
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

//@route GET api/profile/user/:user_id
//@desc get profile by user ID
//@access public
//edit this to limit non logged in users ability
//to view profiles

router.get("/user/:user_id", (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate({
			model: "User",
			path: "user",
			select: ["bizName", "owner"]
		})
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err =>
			res
				.status(404)
				.json({ profile: "There is no profile for this user" })
		);
});

//@route POST api/profile/
//@desc create or edit user profile
//@access private

router.post(
	"/",
	passport.authenticate("jwt", { session: false }), //protected route
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		//check validation
		if (!isValid) {
			//return any errors with 400 status
			return res.status(400).json(errors);
		}

		// get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.userType) profileFields.userType = req.body.userType;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => res.json(profile));
			} else {
				//create

				//check if handle exists
				Profile.findOne({ handle: profileFields.handle }).then(
					profile => {
						if (profile) {
							errors.handle = "That handle already exits";
							res.status(400).json(errors);
						}

						//save profile
						new Profile(profileFields)
							.save()
							.then(profile => res.json(profile));
					}
				);
			}
		});
	}
);

module.exports = router;
