const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DailyEntry = require('../models/daily_entry');
const User = require('../models/user');
const mongo_creds = 'test_userr:pw_test_user';
const mongo_uri = `ds135574.mlab.com:35574/eagle_creek_db`;
const db = 'mongodb://' + mongo_creds + '@' + mongo_uri;


// JWT stuff
const secret = 'NotARealSecret';
const jwt = require('jsonwebtoken');

/** TODO: write a meaningful comment... */
mongoose.Promise = global.Promise;

verifyAuthToken = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {

        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

mongoose.connect(db, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});

router.get('/daily_entries', verifyAuthToken, function(req, res) {
  console.log('Get request for daily entries.');
  DailyEntry.find({})
    .exec(function(err, daily_entries) {
      if (err) {
        console.error('Error retrieving daily entries: ' + err);
      } else {
        res.json(daily_entries);
      }
    });
});

router.post('/user', function(req, res) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.password_confirmation = req.body.password_confirmation;
  console.log('User is ' + req.body.name);
  user.save(function(err, user) {
    if (err) {
      console.log('Error saving user: ' + err);
    } else {
      res.json(user);
    }
  });
});

router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          user
        }, secret, {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

router.get('/', function(req, res) {
  res.send('api works');
});

/** TODO: write a meaningful comment... */
module.exports = router;
