'use strict';

var _ = require('lodash');
var Store = require('./store.model');



// Get list of stores
exports.index = function(req, res) {
  //req.query  = {lng, lang}
  // var zipcodes = [10027, 10025, 10026, 10030, 10031]; 
  console.log('req:', req.query)
  var lng, lat, dist, j, k;
  lng = Number(req.query.coords[0])
  lat = Number(req.query.coords[1])
  dist = Number(req.query.dist)
  j = [Number(req.query.j[0]), Number(req.query.j[1]) ];
  k = [Number(req.query.k[0]), Number(req.query.k[1])];
  console.log('lng: ', lng, 'lat: ', lat, 'dist: ', dist, "j", j, "k", k)




// var p1 = [-74.01604745507814, 40.70703572651906 ]

// var p2 = [-74.00231454492189, 40.70353842756843]


  // Store.find({location: {$near: [lng, lat], $maxDistance: dist/68.91}}, function (err, stores) {
    // Store.find({location: { $geoWithin: { $box: [ [ lng1, lat1 ], [lng2, lat2] ] } }}, function (err, stores) {

  // Store.find({location: { $geoWithin: { $centerSphere: [ [ lng, lat ], dist/3963.2 ] } }}, function (err, stores) {
  Store.find({location: { $geoWithin: { $box: [ j, k] } }}, function (err, stores) {
    if(err) { return handleError(res, err); }
    console.log('stores: ', stores)
    return res.json(200, stores);
  });
};

// Get a single store
exports.show = function(req, res) {
  console.log(req.params.id);
  Store.findById(req.params.id, function (err, store) {
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