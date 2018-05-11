var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var User = require("../models/user");
var passport = require("passport");
//added for deployment:
const path = require("path");
const users = require("../routes/api/users");
const profile = require("../routes/api/profile");
const posts = require("../routes/api/posts");

require("dotenv").config();

//configure bodyparser, grabs data from body of post
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//MAYBE SHOULD BE FALSE?
app.use(bodyParser.json());

//things added for deployment
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

//set up port for server to listen on
var port = process.env.PORT || 5000;

//connet to DB
var dbConnection =
  process.env.MONGODB_URI || "mongodb://localhost:27017/vendorspace";
mongoose.connect(dbConnection);

app.use(passport.initialize());

//passport config
require("../config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// //middleware
// //middleware is useful for validations, we can log
// //things from here or stop the request from continuing
// //in the even that the request is not safe.
// //middleware to use for all requests

// router.use(function(req, res, next) {
//   console.log("there is some processing currently happening");
//   next();
// });

// //test route
// router.get('/', function(req, res) {
//   res.json({message: 'Welcome to our API!'});
// });

// router.route('/user')
//   .get(function(req, res) {
//     User.find(function(err, user) {
//       if(err) {
//         res.send(err);
//       }
//     res.json(user);
//   });
// });

// router.route('/userone')
//   .get(function(req, res) {
//     User.findOne(function(err, user) {
//       if(err) {
//         res.send(err);
//       }
//     res.json(user);
//   });
// });

// router.route('/newuser')
//   .post(function(req, res) {
//     var user = new User(); //new instance of a vehicle
//     user.name = req.body.name;
//     user.owner = req.body.owner;
//     user.address = req.body.address;
// user

//     user.save(function(err){
//       if(err){
//         res.send(err);
//       }
//       res.json(user);
//   });
//   console.log('user added to db');
// });

// //added for deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// //sneaking suspicion this should be changed for deployment
app.listen(port);

console.log("server listening on port " + port);
