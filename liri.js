require("dotenv").config();
var keys = require("./keys.js");
// Spotify API that pulls from keys.js
//var Spotify = require("node-spotify-api");
//var spotify = new Spotify(keys.spotify);
// Acessing moment through Node
var moment = require("moment");
// This will use Axios to pull info from OMDB and BandsInTown API
var axios = require("axios");
// This will read the random.txt file for do-what-it-says function
var fs = require("fs");
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");


