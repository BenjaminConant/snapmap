'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  stars: Number,
  text: String,
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  store: {type : mongoose.Schema.Types.ObjectId, ref: 'Store'},
  date: { type: Date, default: Date.now }
}, {strict: false});

module.exports = mongoose.model('Review', ReviewSchema);