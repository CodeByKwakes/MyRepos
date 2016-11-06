var express   = require('express');
var fs        = require('fs');
var request   = require('request');
var cheerio   = require('cheerio');
var app       = express();
var mongoose  = require("mongoose");
var Event     = require('./models/event')

mongoose.connect('mongodb://localhost:27017/crawler-test');




app.listen('3000');
console.log('this is your local friendly web crawler!!!')
module.exports = app;
