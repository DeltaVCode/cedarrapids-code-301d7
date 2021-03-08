'use strict';

const express =require('express');
const app = express();



//Lets load in the EJS we use it like cors we use and app.set
app.set('view engine', 'ejs');




//we have done this a bunch of times before but today we are going to upgrade our template our pages or part of a web page. 
//lets load a library called ejs. 
//lets check out the docs. 

//EJS and Mustache. we could of done this week as well. 
//Main thing for this week is to know that these templating libraries behavior similiarly. 
//and that we can see that by looking at these to 
//--s and -S work the same. 


const shoppingList = [

  {product: 'ice cream', quantity: 99 },
  {product: 'animal crackers', quantity: 199},
  {product: 'pizza', quantity: 4},
  {product: 'bananas', quantity: 32},
  {product: 'coffee', quantity: 1},
  {product: 'toilet paper', quantity: 300 }

];










app.get('/shopping-list', displayList);

function displayList(req, res){

  const arr = shoppingList.map(item => {

return `<h2>${item.product}</h2>`;

  });
  res.send(arr.join(''));
}







app.get('/ejs-shopping-list', displayListWithEjs);





function displayListWithEjs(req, res){
  // 1. create a source file to hold your template
  //    1a. this file needs to live in a folder called `views`
  //    1b. the file needs the .ejs fileType
  // 2. we render like mustache by calling a render method
  // instead of res.send we call res.render
  
  // res.render('plan-to-shop.ejs');
  // no need for views folder name in the path because it is implied. It always looks there



// 3. pass some data as an Object in res.render (JUST LIKE MUSTACHE)
  //    Mustache.render(sourceHTML, {data object})
  //    EJS === res.render(sourceHTML, {data Object})

res.render('plan-to-shop.ejs', {
  iceCream: 'vanilla',
  cookie: ' thin mint',
  candyCane : true
});


}






const names = ['Mikey', 'Brand' , 'Mouth', 'Chunck', 'Data'];


//create route 
app.get('/list-with-ejs', showList);



// {[

//   {product: 'ice cream', quantity: 99 },
//   {product: 'animal crackers', quantity: 199},
//   {product: 'pizza', quantity: 4},
//   {product: 'bananas', quantity: 32},
//   {product: 'coffee', quantity: 1},
//   {product: 'toilet paper', quantity: 300 }

// ],
// [names]
// }

function showList(req, res){



  // I am required to pass an object, so lets store our list in an object 
  // ejs needs to use syntax like <%=KEYNAME %> and arrays just have indexes
  // list is still an array, stored in an object so we get access to the key to make use of the array. 
  // js just wants the array. ejs is using the object.

  // object Object is the stringifyed object from js its trying to display to the page we need list items. 

  const obj = {
       iAmtheListKey: shoppingList,
       namesArrayKey: names

  }


//  console.log('names array ', names[0]);

 res.render ('list.ejs', obj);


}
















app.listen(3000, console.log('SERVER on 3000'));
