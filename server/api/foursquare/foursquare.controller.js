'use strict';

var _ = require('lodash');
var Foursquare = require('./foursquare.model');
var request = require('request');
var config = {
  'secrets': {
   'clientId' : 'Z51AIBECHYHKUHK2R03STTEPGYQDCCI5POSPWURJL1JBVEQC',
   'clientSecret' : 'L2OZZ00F3BODOHK4OEVJL3JXTMMRNRAIVDL2XQ1SDZZ0HXJX',
   'redirectUrl' : 'http://localhost:9000/'
 }
}



// request('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&categoryId=4d4b7105d754a06374d81259&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5&v=20150321',  function (error, response, body) {
//   console.log("Hello", error);
//   // console.log("hello", response);
//   console.log("Hello body", body);
//   if (!error && response.statusCode == 200) {
    
//     console.log('BODY!!!!: ', body) // Show the HTML for the Google homepage.
//   }
// })

// function queryBuilder(categoryIdsArray){
//     var categories; 
//     for (var i = 0; i < categoryIdsArray.length; i++){
//         if (typeof categoryIdsArray[i] !== 'string'){
//             console.log('category is not a string')
//         } 
//     categories = categoryIdsArray.join(',');


//     return 'https://api.foursquare.com/v2/venues/search?categoryId='+categories+'&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=200&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5';
// }





// // Get list of foursquares
exports.index = function(req, res) {
  request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=200&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5',  function (error, response, body) {
    console.log('body: ', body)
  var data = body.response.venues; 
    data.forEach(function(store, index){
    if (store){
      Foursquare.create({
        name: store.name, 
        storeId: store.id, 
        storeUrl: store.url,
        categories: [{
          name: store.categories[0].name, 
          id: store.categories[0].id, 
          icon: {
            prefix: store.categories[0].icon.prefix, 
            suffix: store.categories[0].icon.suffix
          }
        }], 
        contactInfo: {
          phone: store.contact.phone, 
          formattedPhone: store.contact.formattedStore, 
          address: store.location.address, 
          crossStreet: store.location.crossStreet, 
          formattedAddress: store.location.formattedAddress, 
          lat: store.location.lat, 
          lng: store.location.lng, 
          postalCode: store.location.postalCode
        }, 
        delivery: {
          name: store.delivery.provider.name, 
          url: store.delivery.provider.url
        }
      })
      .then(function success(successdata){
        console.log('store: ', successdata)
      }, function failed(error){
        console.log('err during creation: ', error)
      })
    }
  })
});
};

// Get a single foursquare
exports.show = function(req, res) {
  Foursquare.findById(req.params.id, function (err, foursquare) {
    if(err) { return handleError(res, err); }
    if(!foursquare) { return res.send(404); }
    return res.json(foursquare);
  });
};

// Creates a new foursquare in the DB.
exports.create = function(req, res) {
  Foursquare.create(req.body, function(err, foursquare) {
    if(err) { return handleError(res, err); }
    return res.json(201, foursquare);
  });
};

// Updates an existing foursquare in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Foursquare.findById(req.params.id, function (err, foursquare) {
    if (err) { return handleError(res, err); }
    if(!foursquare) { return res.send(404); }
    var updated = _.merge(foursquare, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, foursquare);
    });
  });
};

// Deletes a foursquare from the DB.
exports.destroy = function(req, res) {
  Foursquare.findById(req.params.id, function (err, foursquare) {
    if(err) { return handleError(res, err); }
    if(!foursquare) { return res.send(404); }
    foursquare.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}