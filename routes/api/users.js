const express = require('express');
const router = express.Router();
var User = require('../../models/user')


//@route GET api/users/test
//@desc tests users route
//@access public
router.get('/test', (req, res) => res.json({message: "users works"}));

router.post('/newuser', (req, res) => {
	console.log("now");
    var user = new User(); //new instance of a vehicle
    user.bizName = req.body.bizName;
    user.owner = req.body.owner;
    user.userType = req.body.userType;
    user.address = req.body.address;
    user.contact_phone = req.body.contact_phone;
    user.contact_email = req.body.contact_email;
    user.password = req.body.password;
    user.avatar = req.body.avatar;
    console.log('here');
	
	user.save(function(err){
      if(err){
        res.send(err);
      }
      res.json(user);
  });
  console.log('user added to db');
});


module.exports = router;
