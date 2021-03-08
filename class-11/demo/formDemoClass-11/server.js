'use strict';

const express = require('express');
const cors = require('cors');
//pg dotenv superagent
const app = express();
app.use(cors());


app.use(express.urlencoded({extended: true}));

app.use(express.static('/public'));

//First thing to do.

//we can make the form talk to the ice cream routes
//Start on the front end, live-server, and make a form request, then we are going to check local host server side on 3000, to see the results and console.log them


app.get('/ice-cream', getIceCream);


function getIceCream(req, res){
console.log(req.query);
res.send( `${req.query.name} : here is your ${req.query.quantity} ${req.query.flavor} ice cream`);
}
/**
 * 
 * 
 * 
 * client : localhost: 8080                           Server Side localhost:3000
 * Form action '"localhost:3000/'ice-cream"            app.get('/ice-cream');
 * input name="flavor" value="vanilla"                 req.query === { flavor: "vanilla"
 * input name="quanity" value="99"                                     quanity=99}
 * 
 * visits. 
 * 
 * http://localhost:3000/ice-cream?flavor=vanilla&quantity=99
 * 
 * 
 * Teams will predefine this name set ahead of time in the documentation. Something like a UML Doc.
 * 
 * 
 */









//Second thing to do is to look at forms from the server side. 

//this will return the first form on cookies.html
//this a path url that has access to req.query. 
app.get('/order', orderCookies);

function orderCookies(req, res){
console.log('this is the order ',req.query);
res.send(`${req.query.name} ${req.query.flavor} quantity= ${req.query.quantity} will be 99$`);

}


// add a listener for when someone visits /cookies with a GET,
// add a listener to a click on some element 
//Lets create a route a .get() to render the cookies html page. 





app.get('/cookies', displayCookiePage);

function displayCookiePage(req, res){

console.log(req.query);
res.sendFile('cookies.html', {root: './public'});


}

/**
 *                     
 * GET    - visiting URL                 - these are meant to read Data.
 * POST   - visiting URL w/data          - add data. 
 * PUT    - visiting URL w/data          - update data 
 * DELETE - visiting URL with a Value    - delete data. 
 * 
 * 
 * 
 */


// add a listener for when someone visits /cookies with a POST,
// in html  <form method="POST"> method="POST" turns the request into a POST

// req.query does not exist in a post by default. becase we are storing the info encoded in the request, like a letter stored inside an envelope



app.post('/cookies', buyCookies);


function buyCookies(req, res){

  // console.log('req.query in the post', req.query);
  console.log('req.body in the post', req.body);
  // res.send(`${req.query.name} you bought cookies`);
    
  //body is a property of super agent request, sa decodes and puts in the body property. 

  // res.send('you bought cookies');
  res.send(`${req.body.name} you bought cookies`);

  // req.query in the post {}
  // req.body in the post { name: 'Dan', flavor: 'Grey', quantity: '890' }
  res.send();
}












app.listen(3000, () => console.log('up on 3000'));