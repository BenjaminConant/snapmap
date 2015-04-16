/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Store = require('../api/store/store.model');
var fs = require('fs');
var exec = require('child_process').exec; 
var path = require('path'); 
var csv = require('csv');
var Foursquare = require('../api/foursquare/foursquare.model'); 
var request = require('request');
var Promise = require('bluebird'); 
var requestP = Promise.promisify(require('request')); 
var StoreGoogle = require('../api/StoreGoogle/StoreGoogle.model')
var Worker = require('webworker-threads').Worker


// function dbSeedString(collection) {
//   return "mongoexport --db snapmap-dev --collection " + collection + " --out " + path.join(__dirname,"/db_data") + "/" + collection + ".json"
// }


//exports the store collection into a json file 
// exec("mongoexport --db snapmap-dev --collection stores --out stores.json")



///////////////////////////////// LOAD GOVERNMENT DATA IN DB //////////////////////////////////////////////////////////

// Store.find({}).remove().exec() 

// var promisify = require("promisify-node");
// var readFile = Promise.promisify(require('fs').readFile);
// var csvParse = Promise.promisify(require('csv').parse);

// Store.find({}).remove().exec()
// .then(function fulfilled(){
//   console.log('hello!')
// return readFile(__dirname+"/../nydata.csv")
// }).then(function success(data){
//   data = data.toString(); 
//   return csvParse(data)
// }).then(function s(stores){
//   console.log('beginning recursive call')
//   loadDB(1, stores)
// })



// function loadDB(index, stores){
//   if (index === stores.length-1){
//     return;
//   }
//   console.log('starting create')
//   Store.create({
//     name: stores[index][0],
//     address: stores[index][3],
//     addressLineTwo: stores[index][4],
//     location: [stores[index][1], stores[index][2]],
//     zip5: stores[index][7],
//     zip4: stores[index][8],
//     county: stores[index][9],
//     state: stores[index][6],
//     city: stores[index][5]
//   }).then(function success(data){
//     console.log('rec: ', index)
//     loadDB(index + 1, stores)
//     console.log('after create: ', data)
//   }, function failed(err){
//     console.log('err: ', err)
//   })
// }

///////////////////////////////// PING GOOGLE PLACES TEXT SEARCH API //////////////////////////////////////////////////////////

// var readFile = Promise.promisify(require('fs').readFile);

// readFile(__dirname + '/../../stores.json')
// .then(function fulfilled (stores){
//   //shouldn't be necessary
//   //data = JSON.parse(data)
//   return data
// })
// .then (function (arrayOfStores){                //.each(makeApiCallToPlaceSearch)
//   return Promise.map(arrayofStores, function(store){
//     return makeApiCallToPlaceSearch(store)
//   })
// }).then(function (resolved){
//   // export the transformed objects so we can double check seriality
//   exec("mongoexport --db snapmap-dev --collection stores --out stores.json")
// })


// function makeApiCallToPlaceSearch(store){

//   var urlPlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + store.location[1] + ',' + store.location[0] + '&radius=1&sensor=true&query=' + store.name + "&key=AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k";
//   var body; 
//   console.log('url: ', urlPlaceSearch)
//   requestP(urlPlaceSearch).then(function(response){
//     console.log('body: ', response[0].body)
//   // choose the first object in the array -- big gamble, should add err handling here as well as some checking that this is the right place 
//     body = JSON.parse(response[0].body)
//     // console.log('parsed response: ', body)
//     //store entire response object -- create schema that matches this structure 
//     StoreGoogle.create(body.results[0])
//     .then(function(createdGoogleStore){
//       console.log('store created: ', createdGoogleStore)
//     })
//     .then(null, function(err){
//       console.log('err: ', err)
//     })
//   }, function(err){
//     console.log('err: ', err)
//   }) 
// }




/////////////////////////////////////// PLACE DETAILS //////////////////////////////////////////////////////////////////////////////

// var urlPlaceDetails = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +placeId + '&key=' + apiKey; 

// StoreGoogle.find({}).exec()
// .then(function(storeObjs){
//   console.log('in then', storeObjs[0])
//   storeObjs = storeObjs.slice(0, 4)
//   storeObjs.forEach(makeApiCallToPlaceDetails)
// })

// function makeApiCallToPlaceDetails(place){

//   var urlPlaceDetails = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +place_id + '&key=AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k';
//   var body; 
//   requestP(urlPlaceDetails).then(function(response){
//     console.log('body: ', response[0].body)
//     // choose the first object in the array -- big gamble, should add err handling here as well as some checking that this is the right place 
//       body = JSON.parse(response[0].body)
      // console.log('parsed response: ', body)
      //store entire response object -- create schema that matches this structure; need to create StoreDetails model*/
//       StoreDetails.create(body.results[0])
//       .then(function(createdGoogleStore){
//         console.log('store created: ', createdGoogleStore)
//       })
//       .then(null, function(err){
//         console.log('err: ', err)
//       })
//     // })
//   }, function(err){
//     console.log('err: ', err)
//   }) 
// }









