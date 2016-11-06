// Require packages
// var async = require('async');
var request = require('request');
var config = require('../config/config');
var Show = require('../models/show');

var mongoose  = require("mongoose");
mongoose.connect(config.database);


var baseUrl = "https://ibl.api.bbci.co.uk";
var letters  = "a";
var url = baseUrl + "/ibl/v1/atoz/" + letters[i] + "/programmes?page=";



    request(url, function(err, res, body) {
      console.log(url);

      if (err) return console.log(err);
      if (res.statusCode == 200) {
        var data = JSON.parse(body)

        console.log(data)

        var shows = data.atoz_programmes.elements;


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

