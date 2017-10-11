/**
 * @fileoverview Schema for a user.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  password_confirmation: String
});

/** Export model. */
module.exports = mongoose.model(
    'user', userSchema, 'users'
);
