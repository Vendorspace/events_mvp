const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/post");

//Profile Model
const Profile = require("../../models/profile");

router.get("/test", (req, res) => res.json({ message: "search works" }));


router.get("/search/:type/:keyword?", (req, res) => {
	const errors = {};

	Profile.find({ bizType: req.params.type })
		.populate({
			model: "User",
			path: "user",
			select: ["bizName", "owner"]
		})
		.then(profile => {
			if (!profiles) {
				errors.noprofile = "There is no profile for this user";
				res.status(404).json(errors);
			} 
			res.json(profiles);
		})
		.catch(err =>
			res
				.status(404)
				.json({ profile: "There is no profile for this user" })
		);
});
module.exports = router;