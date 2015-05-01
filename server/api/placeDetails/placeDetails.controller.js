'use strict';

var _ = require('lodash');
var mongoose = require('mongoose'); 
var Promise = require('bluebird')
var Places = require('./placeDetails.model');
Promise.promisifyAll(mongoose)

// Get stores for the map
exports.index = function(req, res) {
  var j, k;
  j = [Number(req.query.j[0]), Number(req.query.j[1])];
  k = [Number(req.query.k[0]), Number(req.query.k[1])];
  // Places.find({'geometry.location': { $geoWithin: { $box: [ j, k] } }}).exec()
  // .then(function (stores) {
  //     console.log('stores: ', stores)
  //     return res.json(stores);
  // })
  //
  //Places front end route calls this at present.  We can change back to the commented out call once geometry.location is converted to an array
  Places.find({'geometry.location.lat': '37.808895'}).exec()
  .then(function (stores) {
    console.log('stores: ', stores);
    return res.json(stores);
  })
  .then(null, handleError(res));
};

// Get a single store
exports.show = function(req, res) {
  console.log(req.params.id);
  Places.findById(req.params.id).exec()
  .then(function (store) {
    if(!store) { throw new Error('store not found') }
    return res.json(store);
  })
  .then(null, handleError(res))
};

// Creates a new store in the DB.
exports.create = function(req, res) {
  Places.create(req.body, function(err, store) {
    if(err) { return handleError(res, err); }
    return res.json(201, store);
  });
};

// Updates an existing store in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Places.findById(req.params.id).exec()
  .then(function (store) {
    if(!store)  { throw new Error('store not found') }
    var updated = _.merge(store, req.body);
    return updated.saveAsync()
  })
  .then(function(saved){
    return res.json(saved);
  })
  .then(null, handleError(res))
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
  Store.findById(req.params.id).exec()
  .then(function (store) {
    if(!store) { throw new Error('store not found') }
    return store.removeAsync()
  })
  .then(function() {
    return res.status(204).end();
  })
  .then(null, handleError(res))
};

function handleError(res, err) {
  return function(err){
    console.log('err: ', err)
    return res.status(500).json(err);
  }
}