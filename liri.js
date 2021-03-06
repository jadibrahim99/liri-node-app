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
    case "movie-this":
      movieGet(term);
      break;

  }
  // Function that loops through bandsintown API and pulls Name, Date, Time, and Location of event
  function concertThis(term) {
    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var datetime = response.data[i].datetime; 
          var results = 
          "\n------------------------------------------------------------\n\n" +
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
        function spotifySong(term) {
           if(!term){
               term = "Carry on my Wayward Son";
           }
           spotify.search({type:"track", query:"value"}).then(function(response){
            for(var i=0;i=5;i++){
                var spotifyResults = 
                "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                "\nSong Name: " + response.tracks.items[i].name + 
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link " + response.tracks.items[i].preview_url;
                console.log(spotifyResults);
            }
            fs.appendFile("random.txt", spotifyResults + divider, function(err) {
                if (err) throw err;
                console.log(spotifyResults);
              });
              })
              .catch(function (error) {
              console.log(error);
            
           
           });
        }


        function movieGet(term) {
          if(!term){
            term = "Mr. Nobody";
          }
          axios.get("https://www.omdbapi.com/?t=" + term + 
          "&y=&plot=short&apikey=trilogy").then(function(response){
            var movieResponse = 
            "\nMovie Title: " + response.data.Title + 
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Rating[1].term +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot + 
            "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResponse);
         
          fs.appendFile("random.txt", movieResponse + divider, function(err) {
            if (err) throw err;
            console.log(movieResponse);
          });
          })
          .catch(function (error) {
          console.log(error);
        
       
       });
      }
