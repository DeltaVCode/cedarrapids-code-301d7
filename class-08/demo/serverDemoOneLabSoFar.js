'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies Loaded Packages
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');



// Application Setup
const PORT = process.env.PORT || 3111;
const app = express();





// we can plan what we expect ahead of time.

// Locations
// URL = GET https://us1.locationiq.com/v1/search.php?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
//In location what does req.query have? ceity  = seattle q = key   city="seattle"
// query: String [q, key, format=json]

// {
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// }

// Weather
// url = http://api.weatherbit.io/v2.0/forecast/daily
// query: string  lon lat days keys
//what does req.query have? location, 'search_query', formatted_query, latitude, longitude
// data
// [
//   {
//     "forecast": "Partly cloudy until afternoon.",
//     "time": "Mon Jan 01 2001"
//   },
//   {
//     "forecast": "Mostly cloudy in the morning.",
//     "time": "Tue Jan 02 2001"
//   }
// ]




//Parks => [{},{},{}] has location, 'search_query', formatted_query, latitude, longitude
/** [
    {
     "name": "Klondike Gold Rush - Seattle Unit National Historical Park",
     "address": "319 Second Ave S." "Seattle" "WA" "98104",
     "fee": "0.00",
     "description": "Seattle flourished during and after the Klondike Gold Rush. Merchants supplied people from around the world passing through this port city on their way to a remarkable adventure in Alaska. Today, the park is your gateway to learn about the Klondike Gold Rush, explore the area's public lands, and engage with the local community.",
     "url": "https://www.nps.gov/klse/index.htm"
    },
    {
     "name": "Mount Rainier National Park",
     "address": ""55210 238th Avenue East" "Ashford" "WA" "98304",
     "fee": "0.00"
     "description": "Ascending to 14,410 feet above sea level, Mount Rainier stands as an icon in the Washington landscape. An active volcano, Mount Rainier is the most glaciated peak in the contiguous U.S.A., spawning five major rivers. Subalpine wildflower meadows ring the icy volcano while ancient forest cloaks Mount Rainier’s lower slopes. Wildlife abounds in the park’s ecosystems. A lifetime of discovery awaits.",
     "url": "https://www.nps.gov/mora/index.htm"
    }
] */





//We are going to separate our routes from our callbacks.
//Routes////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', homePage);
app.get('/location', gpsLocationHandler);
app.get('/weather', getWeather);
app.get('/parks', getParks);



function homePage(request, response){
  response.send('<h1>Welcome to the server Home Page!</h1>');
}


function gpsLocationHandler(request, response){

  // URL = GET https://us1.locationiq.com/v1/search.php?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
  //In location what does req.query have? ceity  = seattle q = key   city="seattle"
  // query: String [q, key, format=json]
  const key = process.env.GEOCODE_API_KEY;
  const city = request.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  superagent.get(url)
    .then(result => {
      console.log('this is the result body ', result.body[0]);
      response.send();
    }).catch(error => {
      console.log(error);
    });

}






























function getWeather(request, response){

  // url = http://api.weatherbit.io/v2.0/forecast/daily

  //query: string lat, lon, days, keys
  //when client makes request sending info over http
  //the data is stored here at req.query data from the from end. request.
  //this is a deterministic server call.
  //our pre built front end in app.js is how we get it back in the server
  console.log(request.query);


  const key = process.env.WEATHER_API_KEY;
  const longitude = request.query.lon;
  const latitude = request.query.lat;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&days=8&lon=${longitude}&lat=${latitude}`;

  superagent.get(url)
    .then(result => {
      console.log('this is the result body ', result.body[0]);
      const arr = result.body.data.map(object => new Weather(object));
      response.send(arr);
    }).catch(error => {
      console.log(error);
    });


  // response.send([
  //   {
  //     'forecast': 'Partly cloudy until afternoon.',
  //     'time': 'Mon Jan 01 2001'
  //   },
  //   {
  //     'forecast': 'Mostly cloudy in the morning.',
  //     'time': 'Tue Jan 02 2001'
  //   }
  // ]);


}


















function getParks(request, response){
  response.send([
    {
      'name': 'Klondike Gold Rush - Seattle Unit National Historical Park',
      'address': '319 Second Ave S.',
      'fee': '0.00',
      'description': 'Seattle flourished during and after the Klondike Gold Rush. Merchants supplied people from around the world passing through this port city on their way to a remarkable adventure in Alaska. Today, the park is your gateway to learn about the Klondike Gold Rush, explore the area\'s public lands, and engage with the local community.',
      'url': 'https://www.nps.gov/klse/index.htm'
    },
    {
      'name': 'Mount Rainier National Park',
      'address': '55210 238th Avenue East',
      'fee': '0.00',
      'description': 'Ascending to 14,410 feet above sea level, Mount Rainier stands as an icon in the Washington landscape. An active volcano, Mount Rainier is the most glaciated peak in the contiguous U.S.A., spawning five major rivers. Subalpine wildflower meadows ring the icy volcano while ancient forest cloaks Mount Rainier’s lower slopes. Wildlife abounds in the park’s ecosystems. A lifetime of discovery awaits.',
      'url': 'https://www.nps.gov/mora/index.htm'
    }
  ]);


}







//Route Callbacks////////////////////////////////////////////////////////////////////////////////////



//Helper functions////////////////////////////////////////////////////////////////////////////
function Weather(weatherObject){
  this.forcast = weatherObject.weather.desciption;
  this.time = weatherObject.valid_date;
}


// ==== Start the server ====
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
