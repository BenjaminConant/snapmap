'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: String,
  phone: String, 
  description: String,
  hours: Object, 
  images: Object,
  address: String,
  addressLineTwo: String,
  category: Array,
  lon: {type: Number},
  lat: {type: Number},
  avatar: String,
  zip5: Number,
  zip4: Number,
  location: [Number, Number],
  county: String,
  state: String,
  city: String,
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  active: Boolean, 
  crossStreet: String, 
  storeUrl: String, 
  delivery: {
    name: String, 
    url: String
  } 
}, {strict: false});    // this enables us to assign key-value pairs that are defined by this schema to store documents


StoreSchema.index({ location: "2d" })

module.exports = mongoose.model('Store', StoreSchema);