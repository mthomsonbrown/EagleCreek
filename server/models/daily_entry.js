const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyEntrySchema = new Schema({
  worked_all_day: Boolean,
  flavor_text: String
});

/** TODO: write a meaningful comment... */
module.exports = mongoose.model(
    'daily_entry', dailyEntrySchema, 'daily_entries'
);
