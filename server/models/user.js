const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  password_confirmation: String
});

/** TODO: write a meaningful comment... */
module.exports = mongoose.model(
    'user', userSchema, 'users'
);
