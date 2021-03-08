const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pg = require('pg');

const app = express();
app.use(cors());


//const DATABASE_URL = 'postgres://craigbarkley:root@localhost:5432/pizza';

const DATABASE_URL = process.env.DATABASE_URL;


//server asking chef to make food.
const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.log(error));




















//Pizza Server
// const pizza  = [];
// new Pizza('New York Style', 'Thin Crust');
// new Pizza('Chicago Style', 'Deep Dish');
// new Pizza('Calzone', 'CalzoneZone');

// function Pizza(pizzaStyle, crustyType){
//   this.pizzaStyle = pizzaStyle;
//   this.crustyType = crustyType;
//   pizza.push(this);
// }

//Routes

app.get('/pizzas', (request, response) => {

  const sqlQuery = 'SELECT * FROM PIZZA';
  client.query(sqlQuery)
    .then(resultPizza => {
      console.log(resultPizza);
      response.send(resultPizza.rows);
    });
});



app.get('/addPizza', (request, response) => {


  // new Pizza(request.query.pizzaStyle, request.query.crustyType);
  // response.send(pizza);



});




client.connect();

// ==== Start the server ====
app.listen(3000, () => console.log(`Server running on PORT : 3000`));

