'use strict';

var _ = require('lodash');
// var mongoose = require('mongoose');
var Review = require('./review.model');
var Store = require('../store/store.model');
var User = require('../user/user.model');
var Promise = require('bluebird');  
var Places = require('../placeDetails/placeDetails.model');
// Promise.promisifyAll(mongoose); 
var mongoose = require('mongoose-bird')(); 

// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.find({store: req.params.storeId})
    .sort('-date')
    .populate('user')
    .exec()
    .then(function fulfilled(populatedReviews) {
      return res.json(populatedReviews)
    })
    .then(null, function failed(err){
      return handleError(res, err);
    })
};

/*
This is the create route we've been using for the Store Collection, which holds
the government stores

Creates a new review in the DB.

*/ 
exports.create = function(req, res) {
  req.body.user = req.user._id; 
  var finalReview, finalStore; 
  return Review.create(req.body)
  .then(function fulfilled (review) {
  return review.populateAsync('user')
  })  
  .then(function(popReview){
    finalReview = popReview; 
    return Store.findByIdAndUpdate(req.body.store, {$push: {reviews: popReview._id}}).execAsync();
  })
  .then(function (store){
    store.numReviews += 1; 
    store.rating += Number(req.body.stars);
    return store.saveAsync()
    .spread(function(ratedStore){
      // finalStore = ratedStore[0] bc saveAsync returns promise
      finalStore = ratedStore;           
      return User.findByIdAndUpdate(req.user._id, {$push: {reviews: finalReview._id}}).execAsync();
    })
  })
  .then(function(user){
    //sending both the review and store back so we can update the store/:id view which displays review
    return res.json(201, {finalReview: finalReview, finalStore: finalStore})
  })
  .then(null, function(err){
    return handleError(res, err);
  })   
};

/*
This is a create route customized for the Places/placeDetails
Collection
It is designed to provide the same functionality as the above create
controller
Notice that I've added fields to the Places collection 
to accommodate both internal snapmap reviews and reviews from the 
google places api

*/

// // Creates a new review in the DB.
// exports.createReviewsForPlaces = function(req, res) {
//   req.body.user = req.user._id; 
//   var finalReview, 
//       finalStore; 
//   Review.create(req.body)
//   .then(function (review) {
//     return review.populateAsync('user')
//   })  
//   .then(function(popReview){
//     finalReview = popReview; 
//     return Places.findByIdAndUpdate(req.body.store, {$push: {reviews: popReview._id}}).execAsync();
//   })
//   .then(function (place){
//     place.numReviews += 1; 
//     place.ratingInternal += Number(req.body.stars);
//     return place.saveAsync()
//   })
//   .spread(function(ratedStore){
//     // finalStore = ratedStore[0] bc saveAsync returns promise
//     finalStore = ratedStore;           
//     return User.findByIdAndUpdate(req.user._id, {$push: {reviews: finalReview._id}}).execAsync();
//   })
//   .then(function(user){
//     //sending both the review and store back so we can update the store/:id view which displays review
//     return res.json(201, {finalReview: finalReview, finalStore: finalStore})
//   })
//   .then(null, function(err){
//     return handleError(res, err);
//   })   
// };

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}