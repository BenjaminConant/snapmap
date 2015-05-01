'use strict';

var _ = require('lodash');
var Store = require('./store.model');

// Get stores for the map
exports.index = function(req, res) {
  var j, k;
  j = [Number(req.query.j[0]), Number(req.query.j[1]) ];
  k = [Number(req.query.k[0]), Number(req.query.k[1])];
  Store.find({location: { $geoWithin: { $box: [ j, k] } }}, function (err, stores) {
      if(err) { return handleError(res, err); }
      console.log('stores: ', stores)
      return res.json(200, stores);
  });
};

// Get a single store
exports.show = function(req, res) {
  console.log(req.params.id);
  Store.findById(req.params.id).populate('reviewsInternal').exec()
  .then(function (err, store) {
    if(err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    return res.json(store);
  });
};

// Creates a new store in the DB.
exports.create = function(req, res) {
  Store.create(req.body, function(err, store) {
    if(err) { return handleError(res, err); }
    return res.json(201, store);
  });
};

// Updates an existing store in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Store.findById(req.params.id, function (err, store) {
    if (err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    var updated = _.merge(store, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, store);
    });
  });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
  Store.findById(req.params.id, function (err, store) {
    if(err) { return handleError(res, err); }
    if(!store) { return res.send(404); }
    store.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log('err: ', err)
  return res.send(500, err);
}