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
var Foursquare = require('../api/foursquare/foursquare.model'); 
var request = require('request');
var Promise = require('bluebird'); 
var requestP = Promise.promisify(require('request')); 



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

Store.find({}).remove().exec() 

var promisify = require("promisify-node");
var readFile = Promise.promisify(require('fs').readFile);
var csvParse = Promise.promisify(require('csv').parse);

Store.find({}).remove().exec()
.then(function fulfilled(){
  console.log('hello!')
return readFile(__dirname+"/../nydata.csv")
}).then(function success(data){
  data = data.toString(); 
  return csvParse(data)
}).then(function s(stores){
  console.log('beginning recursive call')
  loadDB(1, stores)
})



function loadDB(index, stores){
  if (index === stores.length-1){
    return;
  }
  console.log('starting create')
  Store.create({
    name: stores[index][0],
    address: stores[index][3],
    addressLineTwo: stores[index][4],
    location: [stores[index][1], stores[index][2]],
    zip5: stores[index][7],
    zip4: stores[index][8],
    county: stores[index][9],
    state: stores[index][6],
    city: stores[index][5]
  }).then(function success(data){
    console.log('rec: ', index)
    loadDB(index + 1, stores)
    console.log('after create: ', data)
  }, function failed(err){
    console.log('err: ', err)
  })
}


















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

  User.find({}).remove(function() { 
    console.log('beginning to populate')  
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test', 
      firstName: 'testy', 
      lastName: 'testy'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin', 
      firstName: 'adminy', 
      lastName: 'adminy'
    }, function() {
        console.log('finished populating users');
      }
    );
  });
