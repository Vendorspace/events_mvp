
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var Supplier = require('../models/supplier');
//added for deployment:
const path = require('path');

require('dotenv').config();

//configure bodyparser, grabs data from body of post
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//things added for deployment
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//set up port for server to listen on
var port = process.env.PORT || 5000;

//connet to DB
var dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_api_chrono';
mongoose.connect(dbConnection);

var router = express.Router();

//routes will all be prefixed with /api
app.use('/api', router);


//middleware
//middleware is useful for validations, we can log
//things from here or stop the request from continuing
//in the even that the request is not safe.
//middleware to use for all requests

router.use(function(req, res, next) {
  console.log("there is some processing currently happening");
  next();
});

//test route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

router.route('/supplier')
  .get(function(req, res) {
    Supplier.find(function(err, supplier) {
      if(err) {
        res.send(err);
      }
    res.json(supplier);
  });
});

router.route('/supplierone')
  .get(function(req, res) {
    Supplier.findOne(function(err, supplier) {
      if(err) {
        res.send(err);
      }
    res.json(supplier);
  });
});

router.route('/newsupplier')
  .post(function(req, res) {
    var supplier = new Supplier(); //new instance of a vehicle
    supplier.name = req.body.name;
    supplier.owner = req.body.owner;
    supplier.address = req.body.address;


    supplier.save(function(err){
      if(err){
        res.send(err);
      }
      res.json(supplier);
  });
  console.log('supplier added to db');
});
    




//added for deployment
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//sneaking suspicion this should be changed for deployment
app.listen(port);

console.log('server listening on port ' + port);
