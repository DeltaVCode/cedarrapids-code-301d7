

'use strict';

const express = require('express');
const pg =require('pg');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));

const PORT = process.env.PORT || 3111;

/*
  REST representational state transfer
  that we always modify data in a database based on the routes that talk to the server in exactly the same way
  get should read
  post should create
  put should update
  delete should delete
  you should be able to do this to the data

  In a RESTful server our route names relate to the data they interact with
*/
//source of truth.
app.get('/todos', getTodos);// get all todos
//colon indicates that there will be a value :index.
app.get('/todo/:index', getTodo); // get one todo
app.post('/todo', createTodo); // create a single todo
// app.put('/todo'); // update a single todo
// app.put('/todos'); // update a single todo
// app.delete('/todo'); // delete a single todo
// app.delete('/todos'); // delete a single todo

const todos = [
  {task: 'drink coffee', dueDate: 'now' },
  {task: 'eat lunch', dueDate: 'soon'},
  {task: 'make server', dueDate: '1 hour'},
  {task: 'wash car', dueDate: '4 months'},

];

function getTodos(req, res){
  console.log('this is the og array ', todos);
  res.render('pages/todos-list.ejs', {todos: todos});
}

function getTodo(req, res){
  // I could send the index through post or get
  // post: encoded url data => req.body
  // get: query string parameter => req.query ::: /todo?index=1

  // When I visit the url /todo?index=1 -> I need the ?index=1 or it fails
  // if I make the index a part of the url it will tell me when I am wrong

  // if my route is adjusted to /todo/:index
  // and i visit it at          /todo/1
  // i can access my third location for data from the client
  // req.params.index contains path variables/parameters

  //we have three ways to send data in a url
  //form action ="soda/5(XX)/red(XX)?flavor="pepsi
  //input name=value     value=204oz
  //input name=price     value=.39

  //on the server side we have
  //route: /soda/index/:color
  //              definition
  //   app.post:
  /**
  * The route parameters end up in the req.params
  * req.params{
  * index: (XX)
  * color: (XX)
  *  }
  *
  * req.query {
  * flavor:
  * }
  *
  *
  * req.body {
  *
  * volume:  defined by the front end. 
  * price:
  *
  * }
  *
  *
  */



  const index = req.params.index;
  res.render('pages/single-todo.ejs', {todo: todos[index]});
}

function createTodo(req, res){
  // req.body looks like { task: 'stuff', dueDate: '2021-01-30' }
  // req.body is the info from the form
  todos.push(req.body);
  // res.render('pages/todos-list.ejs', { todos: todos });
  // rendering ourselves 1. is repetitive 2. this functions purpose is not to show a webpage
  res.redirect('/todos');

  console.log('newnewnewnewnew',todos);
}





app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));
