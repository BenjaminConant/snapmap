'use strict';

var _ = require('lodash');
var Place = require('./placeDetails.model');

// Get list of things
exports.index = function(req, res) {
  Place.find(function (err, places) {
    if(err) { return handleError(res, err); }
    return res.json(200, places.slice(0,100));
  });
};

// Get a single thing
exports.show = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.send(404); }
    return res.json(place);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}