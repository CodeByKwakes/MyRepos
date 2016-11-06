// Require packages
var async = require('async');
var request = require('request');
var config = require('../config/config');
var Show = require('../models/show');

var mongoose  = require("mongoose");
mongoose.connect(config.database);


var baseUrl = "https://ibl.api.bbci.co.uk";
var letters  = ["a", "b", "c", "d", "e"];
var fetchUrls = [];
var pageUrls = [];

// Push each keyword URLs into array
for (var i = 0; i < letters.length; i++) {
  var url = baseUrl + "/ibl/v1/atoz/" + letters[i] + "/programmes?page=";
  pageUrls.push(url);
  console.log(url);
};

// For each keyword, async call each url and grab the page count, then populate
// the fetch URL array with all URLs to fetch.

var q = async.queue(function (task, done) {
  request(task.url, function(err, res, body) {
    if (err) return console.log(err);
    if (res.statusCode == 200) {
      var data = JSON.parse(body);
      var pageCount = data.atoz_programmes.page;

      console.log('Page count for ' + letters + ' is ' + pageCount );

      for (var i = 0; i < pageCount; i++) {
        var finalUrl = task.url + i
        console.log('Pushing URL: ' + finalUrl);
        fetchUrls.push(finalUrl);
      };
    };
  });
}, pageUrls.length);

for (var n = 0; n < pageUrls.length; n++) {
  q.push({url: pageUrls[n]});
};

setTimeout(populateDB, 10000);

function populateDB() {
  console.log('*****************************************************');
  console.log('[+] URLs populated. Fetching shows from each page...');
  console.log('*****************************************************');
  
  var q = async.queue(function (task, done) {
    request(task.url, function(err, res, body) {
      console.log(task.url + fetchUrls);

      if (err) return console.log(err);
      if (res.statusCode == 200) {
        var data = JSON.parse(body)
        var shows = data.atoz_programmes.elements;
        var letterPartial = task.url.split("atoz/");
        var letter = letterPartial[1].split("/");

        for (n in shows) {
          var newShow = new Show();
          newShow.title = shows[n].title;
          // newShow.image = shows[n].image.standard;

          newShow.save(function (err, show) {
            if (err) return console.log(err);
            console.log('[+] ' + newShow.title + 'added to DB');
          });
        };
      };
    });
  }, fetchUrls.length);

  for (var k = 0; k < fetchUrls.length; k++) {
    q.push({ url: fetchUrls[k]});
  };
};