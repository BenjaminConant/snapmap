'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird');

var PlaceDetailsSchema = new Schema({
  address_components : [
         {
            long_name: String,
            short_name: String,
            types: [String]
         }
      ],
  formatted_address: String,
  formatted_phone_number: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  icon: String,
  id: String,
  international_phone_number: String,
  name: String,
  opening_hours: {
         open_now: Boolean,
         periods: [
            {
               close: {
                  day: Number,
                  time: String
               },
               open: {
                  day: Number,
                  time: String
               }
            }  
         ],
         weekday_text: [String]
       },

  place_id: String,
  scope: String,
  alt_ids: [
         {
            place_id: String,
            scope: String
         }
      ],
  rating: Number,
  reference: String,
  reviews: [
         {
            aspects: [
               {
                  rating: Number,
                  type: String
               }
            ],
            author_name: String,
            author_url: String,
            language: String,
            rating: Number,
            text: String,
            time: Number
         } 
      ],
  types: [String],
  url: String,
  vicinity: String,
  website: String
}, {strict: false});    // this enables us to assign key-value pairs that are defined by this schema to store documents


PlaceDetailsSchema.index({ location: "2d" })

PlaceDetailsSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('PlaceDetails', PlaceDetailsSchema);