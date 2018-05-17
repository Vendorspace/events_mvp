const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/post");

//Profile Model
const Profile = require("../../models/profile");

//Validation

const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc tests posts route
//@access public
router.get("/test", (req, res) => res.json({ message: "posts works" }));

//@route GET api/posts
//@desc get posts
//@access public

router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

//@route GET api/posts/:id
//@desc get post by post id
//@access public

router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({ nopostfound: "No post found with that ID" })
		);
});

//@route POST api/posts
//@desc create post
//@access private

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//check validation
		if (!isValid) {
			//if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then(post => res.json(post));
	}
);

//@route DELETE api/posts/:id
//@desc delete post by ID
//@access private

router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					//check for  post owner
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: "User not authorized" });
					}

					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err =>
					res.status(404).json({ postnotfound: "No post found" })
				);
		});
	}
);

//@route POST api/posts/comment/:id
//@desc add comment to post
//@access private

router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//check validation
		if (!isValid) {
			//if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				post.comments.unshift(newComment);

				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ postnotfound: "No post found" })
			);
	}
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc remove comment from post
//@access private

router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.comments.filter(
						comment =>
							comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentnotexists: "Comment does not exist" });
				}

				//Get remove index
				const removeIndex = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);
				//splice comment out of array

				post.comments.splice(removeIndex, 1);

				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ postnotfound: "No post found" })
			);
	}
);

module.exports = router;
