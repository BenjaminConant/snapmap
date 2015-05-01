'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird');
Promise.promisifyAll(mongoose); 

/*
unless otherwise marked, all fields are defined by the 
responses returned from the google places api
*/


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
  //field that points to the reviews that snapmap users submit 
  reviewsInternal: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  // a count for calculating the average 
  numReviews: {type: Number, default: 0}, 
  // internal rating will be for snapmap users
  ratingInternal: {type: Number, default: 0},
  types: [String],
  url: String,
  vicinity: String,
  website: String, 
  formattedCoordinates: Array
}, {strict: false});    // this enables us to assign key-value pairs that are defined by this schema to store documents


PlaceDetailsSchema.index({ formattedCoordinates: "2d" })


PlaceDetailsSchema.set('toJSON', {
  virtuals: true
});

//average the data here 
PlaceDetailsSchema
  .virtual('averageRating')
  .get(function(){
    return (this.ratingInternal / this.numReviews).toFixed(2); // rounds to 2 decimals
  })

module.exports = mongoose.model('PlaceDetails', PlaceDetailsSchema);