const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DailyEntry = require('../models/daily_entry');
const User = require('../models/user');
const mongo_creds = 'test_userr:pw_test_user';
const mongo_uri = `ds135574.mlab.com:35574/eagle_creek_db`;
const db = 'mongodb://' + mongo_creds + '@' + mongo_uri;

/** TODO: write a meaningful comment... */
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});

router.get('/daily_entries', function(req, res) {
    console.log('Get request for daily entries.');
    DailyEntry.find({})
    .exec(function(err, daily_entries) {
      if (err) {
        console.error('Error retrieving videos: ' + err);
      }
      else {
        res.json(daily_entries);
      }
    });
});

router.post('/user', function(req, res) {
    console.log('Posting a user');
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.password_confirmation = req.body.password_confirmation;
    console.log('User is ' + req.body.name);
    user.save(function(err, user) {
      if (err) {
        console.log('Error saving user: ' + err);
      }
      else {
        res.json(user);
      }
    });
});

router.get('/', function(req, res) {
  res.send('api works');
});

/** TODO: write a meaningful comment... */
module.exports = router;
