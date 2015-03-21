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



Store.find({}).remove(function(){
  fs.readFile(__dirname+"/../nydata.csv", function(err, data){
    console.log(err);
    var storeString = data.toString();
    csv.parse(storeString, function(err, stores){
        console.log(err);
      stores.forEach(function(store, index) { 
        if (index !== 0 && store[5] === "New York") {
          console.log(index + " thing");
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
            console.log("fdsafdsafdsaf");
            console.log(err);
            console.log(data);
          });

        } else {
          console.log("not creating " + index);
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