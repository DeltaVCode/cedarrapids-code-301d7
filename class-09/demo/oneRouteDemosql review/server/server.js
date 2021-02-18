'use strict';

// 1. Create db
// 2. add pg, the package
// 3. create the client variable and pass it the DATABASE_URL
// 3.5 create the .env variable for DATABASE_URL
// 4. conenct to the db
// 6. create the table
// 7. create a schema.sql file
// 8. run the schema.sql file with psql -d city_explorer_301d70 -f schema.sql
// 9. add to our route a check for if there is data in the db
// 10. check the table for the location
// Load Environment Variables from the .env file

require('dotenv').config();

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());
const pg = require('pg');


// Route Definitions
app.get('/location', locationHandler);
// app.get('/restaurants', restaurantHandler);
app.get('/places', placesHandler);
app.use('*', notFoundHandler);

const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);



function locationHandler(req, res) {
  // single responsibiliy : res.send(location);
  lookupAndMaybeAPISearch(req, res)
    .then(location => {
      console.log('This is end location', location);
      res.send(location); // TODO: this line will not work yet
    });
  return req.lat;
}


function lookupAndMaybeAPISearch(req, res){
  const searchedCity = req.query.city;
  const key = process.env.GEOCODE_API_KEY;

  // if it is in the db already, just use that
  const sqlQuery = 'SELECT * FROM location WHERE search_query=$1';
  const sqlArray = [searchedCity];

  return client.query(sqlQuery, sqlArray) // returns a Promise
    .then(result => {
      // console.log('result.rows', result.rows);

      if (result.rows.length !== 0) {
        console.log('it exists');
        return result.rows[0];
      } else {

        // const theDataArrayFromTheLocationJson = require('./data/location.json');
        const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${searchedCity}&format=json`;
        return superagent.get(url)
          .then(result => {
            // console.log(result.body); // always check the body with superagent

            const theDataObjFromJson = result.body[0]; // since my data is identical, i just need to use the superagent data in place of the location.json file data

            const newLocation = new Location(
              searchedCity,
              theDataObjFromJson.display_name,
              theDataObjFromJson.lat,
              theDataObjFromJson.lon
            );

            // TODO: save the location to the database so that the next time someone searches, they can use it
            const sqlQuery = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
            const sqlArray = [newLocation.search_query, newLocation.formatted_query, newLocation.latitude, newLocation.longitude];

            client.query(sqlQuery, sqlArray);
            return newLocation;

          })
          .catch(error => {
            res.status(500).send('locationiq failed');
            console.log(error.message);
          });

      }
    });
}















// const locations = {};
// function locationHandler(request, response) {
//   const city = request.query.city;
//   const url = 'https://us1.locationiq.com/v1/search.php';

//   // If we already got data for this city, don't fetch it again
//   if (locations[city]) {
//     response.send(locations[city]);
//   }
//   else {

//     const queryParams = {
//       key: process.env.GEOCODE_API_KEY,
//       q: city,
//       format: 'json',
//       limit: 1,
//     };
//     superagent.get(url)
//       .query(queryParams)
//       .then(data => {
//         const geoData = data.body[0]; // first one ...
//         const location = new Location(city, geoData);
//         locations[city] = location; // Save it for next time
//         response.send(location);
//       })
//       .catch((error) => {
//         console.log('ERROR', error);
//         response.status(500).send('So sorry, something went wrong.');
//       });
//   }
// }

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
}



function placesHandler(request, response) {
  console.log('rrrrrrr',request.query.latitude);
  const lat = request.query.latitude;
  const lng = request.query.longitude;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`;

  const queryParams = {
    access_token: process.env.MAPBOX_API_KEY,
    types: 'neighborhood',
    limit: 10,
  };

  superagent.get(url)
    .query(queryParams)
    .then((data) => {
      const results = data.body;
      const places = [];
      results.features.forEach(entry => {
        places.push(new Place(entry));
      });
      response.send(places);
    })
    .catch((error) => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });
}

function Place(data) {
  this.name = data.text;
  this.type = data.properties.category;
  this.address = data.place_name;
}


function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

// Make sure the server is listening for requests
// ==== Start the server ====
client.connect();
app.listen(PORT, () => console.log(`App is listening on PORT:  ${PORT}`));