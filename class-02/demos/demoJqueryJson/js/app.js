'use strict';


// const $dogClone = $('li').clone(); // get all the li, take the first
// console.log($dogClone);

//what was the vanilla js way of doing this?
//when doing this it checks the clone and sees it there and does not continue to add new dogs. 
// we are cloning the amount that was left, intented behavior it selects all instead of just the first one. instead of grabbing all of them 

// $('ul').append($dogClone);

// const $dogClone2 = $('li').clone(); // only get the first li
// $('ul').append($dogClone2);

// const $dogClone3 = $('li').clone(); // only get the first li
// $('ul').append($dogClone3);


//--------------------------------------------refactor------------------------
// const $dogClone = $('li').clone()[0]; // get all the li, take the first
// //can do either way in lab but the [0] may be better for a list that will grow. 

// const $dogClone2 = $('li:first-child').clone(); // only get the first li
// $('ul').append($dogClone2);
// const $dogClone3 = $('li:first-child').clone(); // only get the first li
// $('ul').append($dogClone3);


function Dog (name, url, hobby){
  this.name = name;
  this.image_url = url;
  this.hobbies = hobby;
}

//dont use arrow function here, because we want access to contextual this.

Dog.prototype.render = function(){
  const $dogClone2 = $('li:first-child').clone();
//Goal: target h2 of cloned li
//getter method .find();
//.find() === $() except it only looks inside the object we call it on.

const $h2 = $dogClone2.find('h2');
$h2.text(this.name);
const $image = $dogClone2.find('img');
//remember how to set the id in the getter and setter. 
$image.attr('src', this.image_url);
$image.attr('alt', this.hobbies);
$dogClone2.find('p').text(this.hobbies);



$('ul').append($dogClone2);




}




// const odie = new Dog('Odie', '/labradorDog.jpeg', 'Annoying Garfield');
// const lassie = new Dog('Lassie', '/labradorDog.jpeg', 'Saving Jimmy from the well');
// odie.render();
// lassie.render();
 

//json part of demo

//retrieving data from an outside source USE for lab
// $.ajax('/data.json').then(stuffThatComesBack => {
//   console.log(stuffThatComesBack);
// });



//pass in call back function the stuffThatComesBack
$.ajax('/data.json').then(stuffThatComesBack => {
  console.log(stuffThatComesBack);
// Code that needs the stuff from the other file belongs here
// take the stuff that came back and put it through my constructor and then render it all
const dogs = [];
// stuffThatComesBack.forEach((value, index, array)) => {
  stuffThatComesBack.forEach( (dog) => {
    dogs.push(new Dog(dog.name, dog.image_url, dog.hobbies));
  });

  console.log(dogs);

dogs.forEach(dog => {  dog.render(); });


dogs.forEach(dog => {
    dog.render(); 
    dog.render(); 
    dog.render(); 
    dog.render(); 
    dog.render(); 
  });



});


//Look at Lab Technical Requirements. 
//Look at Solution for tomorrow. an example. 



// Clicking and 'filtering'
$('button').on('click', () => { // In today's lab you need to filter only the images with the specific keyword
  //goal is to only show The Clifford li

  // get rid of the other ones
  // iterate and check if the name is clifford
  // if the name is clifford : render

  // OR

  // target all the list items and hide them
  // target the one with an h2 with text of 'clifford' and show it
  $('li').hide();
  // console.log($li:contains(Clifford));
  $('li:contains(Clifford)').show();




// in the lab the filter has one extra layer to it
// so that you can choose the others and  check which one we are filtering by not just clifford
});