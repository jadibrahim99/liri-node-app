require("dotenv").config();
var keys = require("./keys.js");
// Spotify API that pulls from keys.js
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// Acessing moment through Node
var moment = require("moment");
// This will use Axios to pull info from OMDB and BandsInTown API
var axios = require("axios");
// This will read the random.txt file for do-what-it-says function
var fs = require("fs");
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
var divider = "\n------------------------------------------------------------\n\n";

switch (search) {
    case "concert-this":
      concertThis(term);
      break;
    case "spotify-this-song":
      spotifySong(term);
      break;
    case "movieThis":
      movieThis(term);
      break;
    case "do-what-it-says":
      doThis(term);
      break;
  }
  // Function that loops through bandsintown API and pulls Name, Date, Time, and Location of event
  function concertThis(term) {
    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var datetime = response.data[i].datetime; 
          var results = 
          "--------------------------------------------------------------------" +
              "\nVenue Name: " + response.data[i].venue.name + 
              "\nVenue Location: " + response.data[i].venue.city +
              "\nDate of the Event: " + moment(datetime, "YYYY-MM-DD").format("MM/DD/YYYY")
      console.log(results);
  }
  fs.appendFile("random.txt", results + divider, function(err) {
    if (err) throw err;
    console.log(results);
  });
  })
  .catch(function (error) {
  console.log(error);
  });
        }
  
  