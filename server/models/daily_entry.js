/**
 * @fileoverview Schema for a daily entry.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyEntrySchema = new Schema({
  worked_all_day: Boolean,
  flavor_text: String
});


/** Export model. */
module.exports = mongoose.model(
    'daily_entry', dailyEntrySchema, 'daily_entries'
);
