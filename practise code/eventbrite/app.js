var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var mongoose = require('mongoose');
var Event = require('./models/event')

mongoose.connect('mongodb://localhost:27017/crawler-test2');

// var token = process.env.PERSONAL_OAUTH_TOKEN;
// var base_url = "https://www.eventbriteapi.com/v3/events/search/"
// var keywords = "hackathon";
// var page     = null;
var url      = "https://www.eventbriteapi.com/v3/events/search/?token=NCAH3ZPTXEHOERFOORZJ&q=hackathon";
// var url      = "http://api.eventful.com/json/events/search?keywords=hackathon&app_key=7J9d96cGpbJWRxZV";

request(url, function (err, res, body) {
  if (err) return console.log(err);
  if (res.statusCode == 200) {
    var data = JSON.parse(body)

    // console.log(data)

    var events = data.events;
    
    for (i in events) {
      if (events[i]) {
        console.log("Event title: " + events[i].name.text + " Description: " + events[i].description.text)

        // var newEvent = new Event();
        // newEvent.title = events[i].title;
        // newEvent.city = events[i].city_name;
        // newEvent.description = events[i].description;
        // newEvent.location = events[i].venue_address;
        // newEvent.date = events[i].start_time;

        // newEvent.save(function (err, event) {
        //   if (err) return res.status(500).json(err);
        //   // console.log(newEvent.title + " saved.")
        // });
      };
    };
  };
});

module.exports = app;
