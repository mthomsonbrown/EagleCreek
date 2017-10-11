/**
 * @fileoverview All of the API routes exposed by Express.
 */

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


/**
 * Mongoose mpromise is deprecated, so I'm supposed to plug in my own
 * promise library.
 */
mongoose.Promise = global.Promise;


/**
 * generateAuthToken - Given a valid user object, generate a jwt token
 *    for that user.
 *
 * @param  {User} user Valid user object returned from the database
 * @return {token}      A token returned by jwt TODO: what is the type?
 */
function generateAuthToken(user) {
  return jwt.sign({
    user
  }, secret, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}


/**
 * verifyAuthToken - Middleware that can be applied to any API request to
 *    authenticate a token passed in either the request body or header.
 *
 * @param  {Request} req   The request
 * @param  {Result} res    The result passed back by this function if
 *    authentication failed.
 * @param  {Function} next Function called to pass computation to the next.
 *    middleware or the last handler.
 * @return {Result}        Value returned if an error occurred
 */
function verifyAuthToken(req, res, next) {
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
}


/**
 * mongoose.connect - Associates the database with Mongoose.
 *
 * @param  {String} db      URI for the database to connect to.
 * @param  {Function} func  Callback to handle errors connecting to db.
 */
mongoose.connect(db, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});


/**
 * TODO: API docs
 * GET /daily_entries
 *
 * Current stub test data to render for an authenticated user.
 *
 *  @return {String} String representing a daily entry
 */
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


/**
* TODO: API docs
* POST /user
*
* Adds a User object to the database.  The user object should be an element of
* the request.
*
* @return {String} A token to identify the user
*/
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
      var token = generateAuthToken(user);
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  });
});


/**
 * TODO: API docs
 * POST /authenticate
 *
 * Used for login.  Takes identifying data from the body object to create a
 * request to the database.
 *
 * @return {String} A token to identify the user
 */
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
        var token = generateAuthToken(user);

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


/**
 * TODO: API docs
 * GET /
 *
 * Default path.  This should never be rendered.
 */
router.get('/', function(req, res) {
  res.send('api works');
});

/**
 * Exports the router object.
 */
module.exports = router;
