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

function dbSeedString(collection) {
  return "mongoexport --db snapmap-dev --collection " + collection + " --out " + path.join(__dirname,"/db_data") + "/" + collection + ".json"
}


//exports the store collection into a json file 
// exec("mongoexport --db snapmap-dev --collection stores --out stores.json")

// Store.find({}).remove(function(){
//  fs.readFile(__dirname+"/../stores.json", function(err, data){
//     if (err){
//       console.log('err: ', err)
//       throw err; 
//     }
//     // var storeString = data.toString();
//     JSON.parse(data, function(err, stores){
//         // console.log(err);

//         /*
//           this is where we will make our api calls !!!
//         */
//       stores.forEach(function(store, index) { 
//         if (index !== 0 && store[5] === "New York") {
//           // console.log(index + " thing");
//           Store.create({
//               name: store[0],
//               address: store[3],
//               addressLineTwo: store[4],
//               lon: store[1],
//               lat: store[2],
//               zip5: store[7],
//               zip4: store[8],
//               county: store[9],
//               state: store[6],
//               city: store[5]
//           }, function(err, data){
//             // console.log("fdsafdsafdsaf");
//             // console.log(err);
//             // console.log(data);
//           });

//         } else {
//           // console.log("not creating " + index);
//         }
//       });
//     });
//   });
// })

// //////////////////////////////////////// LOAD DATA IN DB ////////////////////////////////////////////////////////

// resArray.forEach(function(store, index){
//   if (store){
//     if (!store.delivery) {
//       store.delivery = {
//         provider: {
//           name: null,
//           url: null
//         }
//       }
//     }
//     Foursquare.create({
//       name: store.name, 
//       storeId: store.id, 
//       storeUrl: store.url,
//       categories: [{
//         name: store.categories[0].name, 
//         id: store.categories[0].id, 
//         icon: {
//           prefix: store.categories[0].icon.prefix, 
//           suffix: store.categories[0].icon.suffix
//         }
//       }], 
//       contactInfo: {
//         phone: store.contact.phone, 
//         formattedPhone: store.contact.formattedStore, 
//         address: store.location.address, 
//         crossStreet: store.location.crossStreet, 
//         formattedAddress: store.location.formattedAddress, 
//         lat: store.location.lat, 
//         lng: store.location.lng, 
//         postalCode: store.location.postalCode
//       }, 
//       delivery: {
//         name: store.delivery.provider.name, 
//         url: store.delivery.provider.url
//       }
//     })
//     .then(function success(successdata){
//       console.log('store: ', successdata)
//     }, function failed(error){
//       console.log('err during creation: ', error)
//     })
//   } //end of if condition
// }); 


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

///////////////////////////////// LOAD GOVERNMENT DATA IN DB //////////////////////////////////////////////////////////



var Store = require('../api/store/store.model'); 
var Promise = require('bluebird'); 
var pRequest = require('promisified-request'); 
var StoreGoogle = require('../api/StoreGoogle/StoreGoogle.model')
var requestP = Promise.promisify(request)


// var Worker = require('webworker-threads').Worker
//var request = require('request'); 
//Promise.promisifyAll(request)
// StoreGoogle.find({}).remove().exec()
// .then(function(){
//   Store.find({}).exec()
//   .then(function(storeObjs){
//     console.log('in then', storeObjs[0])
//     storeObjs = storeObjs.slice(0, 50)
//     storeObjs.forEach(makeApiCallToPlaceSearch)
//   })
// })

// //'https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + place.location[1]+','+ place.location[0] + '&radius=1&sensor=true' +'&query=' + store.name + '&key=AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k'

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

//textsearch
// 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + place.location[1]+','+ place.location[0] + '&radius=1&sensor=true' +'&query=' + store.name + '&key=AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k'


// //nearbysearch
// 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + place.lat+','+ place.lon + '&radius=' 10 + '&sensor=true' + 'query=' + store.name + '&key=AddYourOwnKeyHere'


// //most precise queries: 
// 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=' + place.lat + ',' + place.lon + '&radius=10&types=food&key=AddYourOwnKeyHere'

// //example of precise query: 
// 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=48.859294,2.347589&radius=5000&types=food|cafe&keyword=vegetarian&key=AddYourOwnKeyHere'



// apikey: AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k


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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //Place Details Request: 
// 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AddYourOwnKeyHere'





/*
API LIMITS 

Limit is 150,000 requests per 24 hour period with verification of identity: credit card 


Note that the Text Search service is subject to a 10-times multiplier. That is, each Text Search request that you make will count as 10 requests against your quota.

So the first time through, if we use the text search 
it'll take us 17 days to get the data ---- TOO LONG


so we'll have to use nearby search --- two days to get the placeids
and another two days to get the place details



*/
















// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });

  // User.find({}).remove(function() { 
  //   console.log('beginning to populate')  
  //   User.create({
  //     provider: 'local',
  //     name: 'Test User',
  //     email: 'test@test.com',
  //     password: 'test', 
  //     firstName: 'testy', 
  //     lastName: 'testy'
  //   }, {
  //     provider: 'local',
  //     role: 'admin',
  //     name: 'Admin',
  //     email: 'admin@admin.com',
  //     password: 'admin', 
  //     firstName: 'adminy', 
  //     lastName: 'adminy'
  //   }, function() {
  //       console.log('finished populating users');
  //     }
  //   );
  // });
