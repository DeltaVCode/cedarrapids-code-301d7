'use strict';
const dogs = [];
// console.log('are we getting dogs ? ',dogs);
function Dog (name, url, hobby){
  this.name = name;
  this.image_url = url;
  this.hobbies = hobby;
}

Dog.prototype.render = function(){
  //this is going to get us the whole jquery object and then we can grab the inner html of the template.
  const htmlTemplatedString = $('#dog-template').html();
  // within the prototype what variable do I have access too.
  const dogObject =   this ;
  // console.log('dont forget the identifer',object);
  const renderedHtml = Mustache.render(htmlTemplatedString, dogObject);

  // console.log('this is the rendered htmllllll', renderedHtml);
  $('ul').append(renderedHtml);
};





//pass in call back function the stuffThatComesBack
$.ajax('/data.json').then(stuffThatComesBack => {
  // console.log(stuffThatComesBack);
  stuffThatComesBack.forEach( (dog) => {
    dogs.push(new Dog(dog.name, dog.image_url, dog.hobbies));
  });
  dogs.forEach(dog => { dog.render(); });


  dogs.sort((left, right) => {
    if(left.hobbies.length > right.hobbies.length){
      return 1;
    }else if (left.hobbies.length < right.hobbies.length){
      return -1;
    } else {
      return 0;
    }
  });
  $('li').remove();

  dogs.forEach(dog => { dog.render(); });





   console.log('dog hobbies length ', dogs);








});




// Clicking and 'filtering'
$('button').on('click', () => { // In today's lab you need to filter only the images with
  $('li').hide();
  // console.log($li:contains(Clifford));
  $('li:contains(Clifford)').show();

});
