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
  active: Boolean, 
  phone: String, 
  formattedPhone: String, 
  crossStreet: String, 
  addressFour: String, 
  formattedAddress: String, 
  storeUrl: String, 
  categories: [{
    name: String, 
    id: String, 
    icon: {
      prefix: String, 
      suffix: String
    }
  }],
  delivery: {
    name: String, 
    url: String
  } 
});

module.exports = mongoose.model('Store', StoreSchema);