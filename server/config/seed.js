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
var _ = require('lodash');
var config = {
  'secrets': {
   'clientId' : 'Z51AIBECHYHKUHK2R03STTEPGYQDCCI5POSPWURJL1JBVEQC',
   'clientSecret' : 'L2OZZ00F3BODOHK4OEVJL3JXTMMRNRAIVDL2XQ1SDZZ0HXJX',
   'redirectUrl' : 'http://localhost:9000/'
 }
}

request('https://foursquare.com/v2/venues/search?ll=40.821,-73.821&client_id='+config.secrets.clientId+'&client_secret=' + config.secrets.clientSecret+ '&v=20150320',  function (error, response, body) {
  console.log("Hello", error);
  // console.log("hello", response);
  console.log("Hello body", body);
  if (!error && response.statusCode == 200) {
    
    console.log('BODY!!!!: ', body) // Show the HTML for the Google homepage.
  }
})

 var categoryObj = {
      'Food': '4d4b7105d754a06374d81259',
      'healthfood': '50aa9e744b90af0d42d5de0e', 
      'foodCourt': '4bf58dd8d48988d120951735', 
      'foodAllTypes': '4d4b7105d754a06374d81259', 
      'FastFood': '4bf58dd8d48988d16e941735', 
      'FoodTruck': '4bf58dd8d48988d1cb941735',
      'SoulFood': '4bf58dd8d48988d14f941735', 
      'Seafood': '4bf58dd8d48988d1ce941735', 
      'farmersMarket': '4bf58dd8d48988d1fa941735', 
      'GroceryStore': '4bf58dd8d48988d118951735', 
      'SuperMarket': '52f2ab2ebcbc57f1066b8b46', 
      'OrganicGrocery': '52f2ab2ebcbc57f1066b8b45', 
      'FishMarket': '4bf58dd8d48988d10e951735'
    }


// var finalArr = []; 
// request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(error, response, body){
//   body = JSON.parse(body);
//   finalArr = finalArr.concat(body.response.venues)
//   request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&offset=50&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(e, r, b){
//     b = JSON.parse(b)
//     finalArr = finalArr.concat(b.response.venues)
//     request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&offset=100&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(e2, r2, b2){
//       b2 = JSON.parse(b2)
//       finalArr = finalArr.concat(b2.response.venues)
//       request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&offset=150&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(e3, r3, b3){
//         b3 = JSON.parse(b3)
//         finalArr = finalArr.concat(b3.response.venues)
//         request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&offset=200&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(e4, r4, b4){
//           b4 = JSON.parse(b4)
//           finalArr = finalArr.concat(b4.response.venues)
//           request('https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&intent=browse&ne=40.827292,-73.935042&sw=40.809104,-73.965598&limit=50&offset=250&v=20150321&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5', function(e5, r5, b5){
//             b5 = JSON.parse(b5); 
//             console.log('1.-----------------', body.length)
//             console.log('2.-----------------', b.length)
//             console.log('3.-----------------', b2.length)
//             console.log('4.-----------------', b3.length)
//             console.log('5.-----------------', b4.length)
//             console.log('6.-----------------', b5.length)
//             // if (error) console.log('error from request: ', error); 
//                 // console.log('body: ', body);
//                 // var data = body.response.venues; 
//             finalArr.forEach(function(store, index){
//               if (store){
//                 if (!store.delivery) {
//                   store.delivery = {
//                     provider: {
//                       name: null,
//                       url: null
//                     }
//                   }
//                 }
//                 Foursquare.create({
//                   name: store.name, 
//                   storeId: store.id, 
//                   storeUrl: store.url,
//                   categories: [{
//                     name: store.categories[0].name, 
//                     id: store.categories[0].id, 
//                     icon: {
//                       prefix: store.categories[0].icon.prefix, 
//                       suffix: store.categories[0].icon.suffix
//                     }
//                   }], 
//                   contactInfo: {
//                     phone: store.contact.phone, 
//                     formattedPhone: store.contact.formattedStore, 
//                     address: store.location.address, 
//                     crossStreet: store.location.crossStreet, 
//                     formattedAddress: store.location.formattedAddress, 
//                     lat: store.location.lat, 
//                     lng: store.location.lng, 
//                     postalCode: store.location.postalCode
//                   }, 
//                   delivery: {
//                     name: store.delivery.provider.name, 
//                     url: store.delivery.provider.url
//                   }
//                 })
//                 .then(function success(successdata){
//                   console.log('store: ', successdata)
//                 }, function failed(error){
//                   console.log('err during creation: ', error)
//                 })
//               } //end of if condition
//             }); 
//           })
//         })
//       })
//     })
//   })
// });

// request('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=ASYR2H1AHNFDD2TUHKJXCPUOKQ3SFKNTZUGOBQCAMBATHGA5&v=20150321',  function (error, response, body) {
//   console.log("Hello", error);
//   // console.log("hello", response);
//   console.log("Hello body", body);
//   if (!error && response.statusCode == 200) {
    
//     console.log('BODY!!!!: ', body) // Show the HTML for the Google homepage.
//   }
// })



// var foursquare = require('node-foursquare')



// Store.find({}).remove(function(){
//   fs.readFile(__dirname+"/../nydata.csv", function(err, data){
//     // console.log(err);
//     var storeString = data.toString();
//     csv.parse(storeString, function(err, stores){
//         // console.log(err);
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

var storeObjs = Store.find().exec(); 
var fourObjs = Foursquare.find().exec(); 

function similar_text(first, second, percent) {
  //  discuss at: http://phpjs.org/functions/similar_text/
  // original by: Rafał Kukawski (http://blog.kukawski.pl)
  // bugfixed by: Chris McMacken
  // bugfixed by: Jarkko Rantavuori original by findings in stackoverflow (http://stackoverflow.com/questions/14136349/how-does-similar-text-work)
  // improved by: Markus Padourek (taken from http://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
  //   example 1: similar_text('Hello World!', 'Hello phpjs!');
  //   returns 1: 7
  //   example 2: similar_text('Hello World!', null);
  //   returns 2: 0

  if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
    return 0;
  }

  first += '';
  second += '';

  var pos1 = 0,
    pos2 = 0,
    max = 0,
    firstLength = first.length,
    secondLength = second.length,
    p, q, l, sum;

  max = 0;

  for (p = 0; p < firstLength; p++) {
    for (q = 0; q < secondLength; q++) {
      for (l = 0;
        (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++)
      ;
      if (l > max) {
        max = l;
        pos1 = p;
        pos2 = q;
      }
    }
  }

  sum = max;

  if (sum) {
    if (pos1 && pos2) {
      sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));
    }

    if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
      sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,
        secondLength - pos2 - max));
    }
  }

  if (!percent) {
    return sum;
  } else {
    return (sum * 200) / (firstLength + secondLength);
  }
}


storeObjs.then(function(resolvedStoreObjs){
  fourObjs.then(function(resolvedFourObjs){
    return resolvedStoreObjs.map(function(store, index){
      for (var i = 0; i <= resolvedFourObjs.length; i++){
       if (store && resolvedFourObjs[i]){
        if (!resolvedFourObjs[i].delivery){
          resolvedFourObjs[i].delivery = {
            name: null, 
            url: null 
          }
        }
         var bool = similar_text(store.name, resolvedFourObjs[i].name, true)
         if (bool){
            console.log('in if!!!!!!!!!!: ', store)
            // console.log('phone from four: ', resolvedFourObjs[i])
            store.formattedAddress = resolvedFourObjs[i].contactInfo.formattedAddress;
            store.crossStreet = resolvedFourObjs[i].contactInfo.crossStreet; 
            store.categories = [{
              name: resolvedFourObjs[i].categories[0].name, 
              id: resolvedFourObjs[i].categories[0].id,
              icon: {
                prefix: resolvedFourObjs[i].categories[0].icon.prefix, 
                suffix: resolvedFourObjs[i].categories[0].icon.suffix 
              }
            }]; 
            store.storeUrl = resolvedFourObjs[i].storeUrl; 
            // console.log('store2: ', store)
            store.save(function(err, saved){
              return new Promise(function(resolve, reject){
                if (err) return reject(err)
                resolve(saved); 
              })  
            })
          } // end of if
          else {
            // console.log('in else: ', store)
            return new Promise(function(resolve, reject){
              store.save(function(err, saved, num){
                // console.log('num: ', num)
                if (err) return reject(err)
                resolve(saved); 
              }) 
            })
          }   //end of else      
        }
      }   //end of for loop 
    })  
  }).then(function success(arrayOfPromises){
    return Promise.all(arrayOfPromises); 
  }, function failed(error){
    console.log('error:', error)
  }).then(function success(resolvedNewStores){
      console.log('resolved: ', resolvedNewStores.length)
  }, function failed(error){
    console.log('error: ', error)
  })
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