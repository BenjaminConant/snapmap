'use strict';

var _ = require('lodash');
// var mongoose = require('mongoose');
var Review = require('./review.model');
var Store = require('../store/store.model');
var User = require('../user/user.model');
var Promise = require('bluebird');  
// Promise.promisifyAll(mongoose); 
var mongoose = require('mongoose-bird')(); 

console.log('mongoose: ', mongoose.modelSchemas.Review.statics)

// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  console.log('params: ', req.params.storeId)
  Review.find({store: req.params.storeId})
    .sort('-date')
    .populate('user')
    .exec()
    .then(function fulfilled(populatedReviews) {
      console.log('reviews: ', populatedReviews)
      return res.json(populatedReviews)
  }, function failed(err){
     console.log('err: ', err)
      return handleError(res, err);
  })
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  // console.log('req user: ', req.user._id, 'user body:', req.user)
  req.body.user = req.user._id; 
  var finalReview, finalStore; 
  return Review.create(req.body)
  .then(function fulfilled (review) {
  return review.populateAsync('user')
  })  
  .then(function(popReview){
    console.log('popReview: ', popReview)
    finalReview = popReview; 
    return Store.findByIdAndUpdate(req.body.store, {$push: {reviews: popReview._id}}).execAsync();
  })
  .then(function (store){
    store.numReviews += 1; 
    store.rating += Number(req.body.stars);
    return store.saveAsync();
  })
  .then(function(ratedStore){
    finalStore = ratedStore;              // execAsync ensures that we can .catch off this return -- can't .catch off .exec() normally
    return User.findByIdAndUpdate(req.user._id, {$push: {reviews: finalReview._id}}).execAsync();
  })
  .then(function(user){
    console.log('finalReview: ', finalReview, 'finalStore: ', finalStore)
    //sending both the review and store back so we can update the store/:id view which displays review
    return res.json(201, {finalReview: finalReview, finalStore: finalStore})
  }, function(err){
    console.log('err here: ', err)
    return handleError(res, err);
  })   
};

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
  return res.send(500, err);
}