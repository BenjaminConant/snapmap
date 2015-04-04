'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird');

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
  rating: {type: Number, default: 0},
  numReviews: {type: Number, default: 0},
  active: Boolean, 
  crossStreet: String, 
  storeUrl: String, 
  delivery: {
    name: String, 
    url: String
  } 
}, {strict: false});    // this enables us to assign key-value pairs that are defined by this schema to store documents


StoreSchema.index({ location: "2d" })

StoreSchema.set('toJSON', {
  virtuals: true
});

//average the data here 
StoreSchema
  .virtual('averageRating')
  .get(function(){
    return (this.rating / this.numReviews).toFixed(2); // rounds to 2 decimals
  })

StoreSchema.methods = {
  calculateRating: function(){
    var savedStore; 
    var self = this; 
    return Promise.resolve(this)
    .then(function fulfilled(store){
        // console.log('reviews array: ', reviewsArray)
      var rating = 0; 
        self.reviews.forEach(function(review){
          rating += review.stars; 
          console.log('rating: ', rating)
        })
        self.numReviews = self.reviews.length;
        self.rating = rating/self.numReviews;
        return new Promise(function (resolve, reject){
          self.save(function(err, savedS){
            console.log('savedS: ', savedS.numReviews, savedS.rating)
            if (err) return reject(err)
            resolve(savedS)
          })
        })
      }, function failed(err){
        console.log('err: ', err)
        return err; 
      })
  }
}

module.exports = mongoose.model('Store', StoreSchema);