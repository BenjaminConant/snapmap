'use strict';

var _ = require('lodash');
var Review = require('./review.model');
var Store = require('../store/store.model');
var User = require('../user/user.model');
var Promise = require('bluebird');  

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

// // Creates a new review in the DB.
// exports.create = function(req, res) {
//   // console.log('req user: ', req.user._id, 'user body:', req.user)
//   // console.log('user?:', req.body.user, 'body:', req.body)
//   req.body.user = req.user._id; 
//   var finalReview; 
//   Review.create(req.body)
//     .then(function fulfilled (review) {
//       return Review.findById(review._id).populate('user').exec()
//     })
//     .then(function(popReview){
//       console.log('popReview: ', popReview)
//       finalReview = popReview; 
//       //.update() does not return the document, just returns 1 if successful, 0 if unsuccessful
//       return new Promise(function (resolve, reject){
//         Store.findByIdAndUpdate(req.body.store, {$push: {reviews: popReview._id}}, function (err, store){
//           if (err) return reject(err)
//           resolve(store)
//         })
//       })
//     })
//     .then(function (store){
//       console.log('store: ', store)
//       return Store.findById(store._id).populate('reviews').exec()
//     }, function failed(err){
//       console.log('err: ', err)
//     })
//     .then(function(storeWReviewsPOP){
//       return storeWReviewsPOP.calculateRating(); 
//     })
//     .then(function(ratedStore){
//       console.log('ratedStore: ', ratedStore.rating, ratedStore.numReviews)
//       return new Promise(function (resolve, reject){
//         User.findByIdAndUpdate(req.user._id, {$push: {reviews: finalReview._id}}, function(err, user){
//           if (err) return reject(err)
//           resolve(user)
//         })
//       })
//     })
//     .then(function(user){
//       console.log('user: ', user )
//       return res.json(201, finalReview);  // we'll want to send store object back w/ updated reviews
//     }, function(err){
//       console.log('err here: ', err)
//       return handleError(res, err);
//     })   
// };

// Creates a new review in the DB.
exports.create = function(req, res) {
  // console.log('req user: ', req.user._id, 'user body:', req.user)
  // console.log('user?:', req.body.user, 'body:', req.body)
  req.body.user = req.user._id; 
  var finalReview; 
  return Review.create(req.body)
    .then(function fulfilled (review) {
      return new Promise(function(resolve, reject){
        review.populate('user', function(err, popReview){
          if (err) return reject(err)
          resolve(popReview)
        })
      })
    })
    .then(function(popReview){
      console.log('popReview: ', popReview)
      finalReview = popReview; 
      //.update() does not return the document, just returns 1 if successful, 0 if unsuccessful
      return new Promise(function (resolve, reject){
        Store.findByIdAndUpdate(req.body.store, {$push: {reviews: popReview._id}}, function (err, store){
          store.numReviews += 1; 
          store.rating += req.body.stars;
          store.save(function(err, saved){
            if (err) return reject(err)
            resolve(store)
          })
        })
      })
    })
    .then(function(ratedStore){
      console.log('ratedStore: ', ratedStore.rating, ratexdStore.numReviews)
      return new Promise(function (resolve, reject){
        User.findByIdAndUpdate(req.user._id, {$push: {reviews: finalReview._id}}, function(err, user){
          if (err) return reject(err)
          resolve(user)
        })
      })
    })
    .then(function(user){
      console.log('user: ', user )
      return res.json(201, finalReview);  // we'll want to send store object back w/ updated reviews
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