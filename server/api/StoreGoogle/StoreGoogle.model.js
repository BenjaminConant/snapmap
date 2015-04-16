'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird');

var StoreGoogleSchema = new Schema({
  formatted_address: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  icon: String,
  id: String,
  name: String,
  place_id: String,
  reference: String,
  types: [String]
}, {strict: false});    // this enables us to assign key-value pairs that are defined by this schema to store documents


StoreGoogleSchema.index({ location: "2d" })

StoreGoogleSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('StoreGoogle', StoreGoogleSchema);