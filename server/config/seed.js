/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Store = require('../api/store/store.model');
var fs = require('fs');
var csv = require('csv');
var Promise = require('bluebird'); 
var Foursquare = require('../api/foursquare/foursquare.model'); 
var request = require('request');
var config = {
  'secrets': {
   'clientId' : 'Z51AIBECHYHKUHK2R03STTEPGYQDCCI5POSPWURJL1JBVEQC',
   'clientSecret' : 'L2OZZ00F3BODOHK4OEVJL3JXTMMRNRAIVDL2XQ1SDZZ0HXJX',
   'redirectUrl' : 'http://localhost:9000/'
 }
}

// request('https://foursquare.com/v2/venues/search?ll=40.821,-73.821&client_id='+config.secrets.clientId+'&client_secret=' + config.secrets.clientSecret+ '&v=20150320',  function (error, response, body) {
//   console.log("Hello", error);
//   // console.log("hello", response);
//   console.log("Hello body", body);
//   if (!error && response.statusCode == 200) {
    
//     console.log('BODY!!!!: ', body) // Show the HTML for the Google homepage.
//   }
// })

 // var categoryObj = {
 //      'Food': '4d4b7105d754a06374d81259',
 //      'healthfood': '50aa9e744b90af0d42d5de0e', 
 //      'foodCourt': '4bf58dd8d48988d120951735', 
 //      'foodAllTypes': '4d4b7105d754a06374d81259', 
 //      'FastFood': '4bf58dd8d48988d16e941735', 
 //      'FoodTruck': '4bf58dd8d48988d1cb941735',
 //      'SoulFood': '4bf58dd8d48988d14f941735', 
 //      'Seafood': '4bf58dd8d48988d1ce941735', 
 //      'farmersMarket': '4bf58dd8d48988d1fa941735', 
 //      'GroceryStore': '4bf58dd8d48988d118951735', 
 //      'SuperMarket': '52f2ab2ebcbc57f1066b8b46', 
 //      'OrganicGrocery': '52f2ab2ebcbc57f1066b8b45', 
 //      'FishMarket': '4bf58dd8d48988d10e951735'
 //    }

// 'https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=200&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5'


request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=200&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(error, response, body){
  
  body = JSON.parse(body);
  console.log(body);
    if (error) console.log('error from request: ', error); 
    console.log('body: ', body);
    var data = body.response.venues; 
    data.forEach(function(store, index){
    if (store){
      if (!store.delivery) {
        store.delivery = {
          provider: {
            name: null,
            url: null
          } 
        }
      }
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

// request('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5&v=20150321',  function (error, response, body) {
//   console.log("Hello", error);
//   // console.log("hello", response);
//   console.log("Hello body", body);
//   if (!error && response.statusCode == 200) {
    
//     console.log('BODY!!!!: ', body) // Show the HTML for the Google homepage.
//   }
// })



var foursquare = require('node-foursquare')



Store.find({}).remove(function(){
  fs.readFile(__dirname+"/../nydata.csv", function(err, data){
    // console.log(err);
    var storeString = data.toString();
    csv.parse(storeString, function(err, stores){
        // console.log(err);
      stores.forEach(function(store, index) { 
        if (index !== 0 && store[5] === "New York") {
          // console.log(index + " thing");
          Store.create({
              name: store[0],
              address: store[3],
              addressLineTwo: store[4],
              lon: store[1],
              lat: store[2],
              zip5: store[7],
              zip4: store[8],
              county: store[9],
              state: store[6],
              city: store[5]
          }, function(err, data){
            // console.log("fdsafdsafdsaf");
            // console.log(err);
            // console.log(data);
          });

        } else {
          // console.log("not creating " + index);
        }
      });
    });
  });
})













Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});