const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/post");

//Profile Model
const Profile = require("../../models/profile");

//User model
const User = require("../../models/user");

router.get("/test", (req, res) => res.json({ message: "search works" }));

router.get('/usersList/:type/', (req, res) => {
	User.find({ userType: req.params.type }, (err, users) => {
		res.send(users);
	})
	.catch(err =>
		res.status(404)
		.json({ profile: "not a category"})
	);
});


// router.get("/:type/", (req, res) => {
// 	const errors = {};

// 	User.find({ userType: req.params.type })
// 		.populate({
// 			model: "User",
// 			path: "user",
// 			select: ["bizName", "owner"]
// 		})
// 		.then(profile => {
// 			if (!profiles) {
// 				errors.noprofile = "There is no kljprofile for this user";
// 				res.status(404).json(errors);
// 			} 
// 			res.json(profiles);
// 		})
// 		.catch(err =>
// 			res
// 				.status(404)
// 				.json({ profile: "There is no profile for this user" })
// 		);
// });
module.exports = router;