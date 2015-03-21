'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: String,
  category: Array,
  description: String,
  hours: Object, 
  address: String,
  addressLineTwo: String,
  lon: {type: Number},
  lat: {type: Number},
  avatar: String,
  photos: Array,
  zip5: Number,
  zip4: Number,
  county: String,
  state: String,
  city: String,
  reviews: [{type: mongoose.Types.ObjectId, ref: 'Review'}],
  active: Boolean
});

module.exports = mongoose.model('Store', StoreSchema);