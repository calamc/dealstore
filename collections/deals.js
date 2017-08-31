"use strict"

var mongoose = require('mongoose');

var dealsSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

var Deals = mongoose.model('Deals', dealsSchema);


module.exports = Deals;
