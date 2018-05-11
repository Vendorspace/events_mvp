const express = require('express');
const router = express.Router();
var User = require('../../models/user')
const bcrypt = require('bcryptjs');


//@route GET api/users/test
//@desc tests users route
//@access public
router.get('/test', (req, res) => res.json({message: "users works"}));

//@route POST api/users/register
//@desc registers new users and checks if email already taken
//@access public
router.post('/register', (req, res) => {
	
	User.findOne({ contact_email: req.body.contact_email })
		.then(user => {
			if(user) {
				return res.status(400).json({contact_email: "email already exists"});
			} else {
			    var user = new User({
				    bizName: req.body.bizName,
				    owner: req.body.owner,
				    userType: req.body.userType,
				    address: req.body.address,
				    contact_phone: req.body.contact_phone,
				    contact_email: req.body.contact_email,
				    password: req.body.password,
				    avatar: req.body.avatar,			    	
			    }); //new instance of a vehicle

			    bcrypt.genSalt(10, (err, salt) => {
			    	bcrypt.hash(user.password, salt, (err, hash) =>{
			    		if(err) throw err;
			    		user.password = hash;
			    		user.save()
			    			.then(encrypt_user => res.json(encrypt_user))
			    			.catch(err => console.log(err));
			    	});
			    });
			console.log('user added to db');
		}
	})
});

//@route GET api/users/login
// @desc login user / returning jwt 
// @access public
router.post('/login', (req, res) => {
	const contact_email = req.body.contact_email;
	const password = req.body.password;

	User.findOne({contact_email})
		.then(user => {
			if(!user) {
				return res.status(404).json({contact_email: "User not found"});
			}

			//check password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						res.json({message: "success"});
					} else {
						return res.status(400).json({password: 'Password incorrect'});
					}
				})
		});
});

module.exports = router;
