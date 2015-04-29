/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Store = require('../api/store/store.model');
var PlaceDetails = require('../api/placeDetails/placeDetails.model');

var fs = require('fs');
var exec = require('child_process').exec; 
var path = require('path'); 
var csv = require('csv');
var request = require('request');
var Promise = require('bluebird'); 
var requestP = Promise.promisify(require('request')); 
var StoreGoogle = require('../api/StoreGoogle/StoreGoogle.model'); 
// var Worker = require('webworker-threads').Worker; 
var isJSON = require('is-json');
var csvParse = Promise.promisify(require('csv').parse);
var readFile = Promise.promisify(require('fs').readFile);
var LineReader = Promise.promisify(require('node-line-reader').LineReader);
var mongoose = require('mongoose'); 
Promise.promisifyAll(mongoose);

// var promisify = require("promisify-node");

// function dbSeedString(collection) {
//   return "mongoexport --db snapmap-dev --collection " + collection + " --out " + path.join(__dirname,"/db_data") + "/" + collection + ".json"
// }


// exec('mongoimport --db snapmap-dev --collection placedetails nydata_one_asArray.json --jsonArray')

// exec("mongoexport --db snapmap-dev --collection placedetails --out NYDATA_ALL_asArray.json --jsonArray"); 

//exports the store collection into a json file 
// exec("mongoexport --db snapmap-dev --collection stores --out stores.json")



///////////////////////////////// LOAD GOVERNMENT DATA IN DB //////////////////////////////////////////////////////////

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


// StoreGoogle.find({}).remove().exec()
// .then(function (){
// 	console.log('in here')
// 	return readFile(__dirname + '/../nydata.csv')
// })
// .then(function fulfilled (stores){
// 	console.log('in first')
//   stores = stores.toString(); 
//   return csvParse(stores);
// })
// .then (function (arrayOfStores){ 
// 	console.log('in second')
// 	// first array is a key for the structure of all other objects
// 	arrayOfStores = arrayOfStores.slice(1)		
// 	// change this line to slice the part of the subarray you're responsible for 
// 	// note that the last index is not inclusive 
// 	arrayOfStores = arrayOfStores.slice(43003, 53003)
// 	return makeApiCallToPlaceSearch(0, arrayOfStores)
// })
// .then(null, function(err){
// 	console.log('err3: ', err)
// })


// function makeApiCallToPlaceSearch(index, array){
// console.log('array:', Array.isArray(array))
// if (index === array.length-1){
// 	// when we're at the end of our subarray, we export the collection
// 	// export the transformed objects so we can double check seriality
// 	// change the name of the file to appropriate designate the range of objects retrieved before uncommenting this out 
//   exec("mongoexport --db snapmap-dev --collection storegoogles --out storegoogles_43003_53003.json"); 
//   return;
// }

// 	var queryString, 
// 			body,
// 			urlPlaceSearch; 

// 	// construct query string by concatenating store name, street address and zip code for optimal search accuracy
// 	var store = array[index]; 
//   queryString = store[0]; 
// 	// remove any numbers in the name before concatenating address and zip code 
// 	queryString = queryString.replace(/[0-9]/g, '');
// 	if (store[8]) queryString = queryString + ' ' + store[3] + ' ' + store[7] + '-' + store[8]; 
// 	else queryString = queryString + ' ' + store[3] + ' ' + store[7];
// 	queryString = queryString.split(',');
// 	queryString = queryString.join(' ');
// 	//verify that the query string looks as it is supposed to 
// 	console.log('new store name: ', queryString)
// 	// add your own api key at the end of this url 
//   urlPlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + Number(store[2]) + ',' + Number(store[1]) + '&radius=1&sensor=true&query=' + queryString + "&key=AIzaSyDl2B0kbv7OI2PqqvwX6vMboXK9d333G_k";
//   //make request
//   requestP(urlPlaceSearch)
//   .then(function(response){
//   // choose the first object in the array -- comprehensiveness of queryString does not make this much of a gamble 
//     body = JSON.parse(response[0].body)
//     //store entire response object 
//     return StoreGoogle.create(body.results[0])
//   })
//   .then(function(createdGoogleStore){
//   		// see that the created object matches expectations 
//      console.log('created: ', createdGoogleStore)
//      //recursive call
//      return makeApiCallToPlaceSearch(index + 1, array)
//   })
// }


/////////////////////////////////////// PLACE DETAILS //////////////////////////////////////////////////////////////////////////////

// PlaceDetails.find({}).remove().exec()
// .then(function(){
// 	return readFile(__dirname + '/../../allNY_asArray.json')
// })
// .then(function(storeObjs){
// 	storeObjs = JSON.parse(storeObjs)
// 	console.log('in then', storeObjs[0].place_id, storeObjs[1])
// 	console.log('LENGTH!!', storeObjs.length)
// 	//take a portion of the array
// 	storeObjs = storeObjs.filter(function(store){
// 		return typeof store.place_id === 'string'; 
// 	})
// 	console.log('storeOBj: ', storeObjs.length) 		//15328 out of 18582
// 	// console.log('LENGTH2: ', storeObjs.length)
// 	// console.log('first: ', storeObjs[2000])
// 	// filter to ensure that every obj has a place_id; 
// 	// var newStoreArray = storeObjs.filter(function(store){
// 	// 	return typeof store.place_id !== 'undefined'; 
// 	// })
// 	// console.log('new: ', newStoreArray[0])
// 	storeObjs = storeObjs.slice(1769)
// 	console.log('LENGTH: ', storeObjs.length)
// 	return makeApiCallToPlaceDetails(0, storeObjs)
// })
// .then(null, function(err){
// 	console.log('err: ', err)
// })

// function makeApiCallToPlaceDetails(index, array){

// 	if(index === array.length-1){
// 		exec("mongoexport --db snapmap-dev --collection placedetails --out NewYorkData_asArray.json -jsonArray"); 
// 		return;
// 	}

// 	var store = array[index];
// 	console.log('store: ', store)

// 	if (store && store.place_id){
	 
// 	  var urlPlaceDetails = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +store.place_id + '&key=AIzaSyAT__B68i6m_QFqf8pf2kCKGy5s2o20iG4';
// 	  var body; 
// 	  requestP(urlPlaceDetails)
// 	  .then(function(response){
// 	    // console.log('body!!!!!: ', response[0].body)
// 	    // choose the first object in the array -- big gamble, should add err handling here as well as some checking that this is the right place 
// 	    body = JSON.parse(response[0].body)
// 	    // console.log('parsed response: ', body)
// 	    // store entire response object -- create schema that matches this structure; need to create StoreDetails model*/
// 	   return PlaceDetails.create(body.result)
// 	  })
// 	  .then(function(created){
// 	    created.formattedCoordinates = [created.geometry.location.lng, created.geometry.location.lat]
// 	    return created.saveAsync()
// 	  })
// 		.then(function(createdPlaceDetails){  
// 	    console.log('store created: ', createdPlaceDetails[0])
// 	    return makeApiCallToPlaceDetails(index + 1, array)
// 	  })
// 	}

// 	else {
// 		return makeApiCallToPlaceDetails(index + 1, array);
// 	} 

// }

