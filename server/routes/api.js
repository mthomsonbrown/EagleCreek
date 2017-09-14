const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = "mongodb://test_userr:pw_test_user@ds135574.mlab.com:35574/eagle_creek_db"
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
  if(err) {
    console.error("Error! " + err)
  }
});

router.get('/', function(req, res) {
  res.send('api works');
});

module.exports = router;
