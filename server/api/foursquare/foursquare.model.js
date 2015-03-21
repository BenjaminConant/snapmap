'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FoursquareSchema = new Schema({
  name: String, 
  storeId: String,
  categories: [{
  	name: String, 
  	id: String, 
  	icon: {
  		prefix: String, 
  		suffix: String
  	}
  }],
  contactInfo: {
  	phone: String, 
  	formattedPhone: String, 
  	address: String, 
  	crossStreet: String, 
  	formattedAddress: String, 
  	lat: Number, 
  	lng: Number, 
  	postalCode: Number
  },
  delivery: {
  	name: String, 
  	url: String
  },
  storeUrl: String


});



module.exports = mongoose.model('Foursquare', FoursquareSchema);