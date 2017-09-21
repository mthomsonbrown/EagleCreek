const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DailyEntry = require('../models/daily_entry');

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

router.get('/', function(req, res) {
  res.send('api works');
});

/** TODO: write a meaningful comment... */
module.exports = router;
