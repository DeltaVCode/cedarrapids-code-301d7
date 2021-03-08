'use strict';
console.log('js is connected!');

//get stuff jquery
//getters
//getters always return jquery objects, if console log the look like S.fn.init(9)
//all jquery variables should be defined with a $. This helps with readability.
// jquery uses the same targets as css so we can...
const $h1Element = $('h1');
console.log($h1Element);


// const vanillaH1Element = document.getElementsByTagName('h1')[0];
// console.log(vanillaH1Element);


const h1Text = $h1Element.text(); //jquery to get text

// const vanillaText = vanillaH1Element.textContent; //vanilla get the text.

//.textContent(vanilla) is a property of the DOM elements it is static and we can just read it so we can always update that property.
//.text() jquery is a method that has to find the text.

console.log(h1Text);
console.log($('p').text());


//setters in jquery

//.text() is a setter, is the same function but when we give it new information it becomes a setter
//change things on the page (set value to something new)
$h1Element.text('OMG we change the h1 with $.text(\'some text changed\')');


//.text() is a getter and setter depending on if we pass it an argument
//jquery cheat sheet link https://oscarotero.com/jquery/

//as far as modify we use the attributes or manipulation we can use as getters and setters.
//look at attr documentation

// .attr
// .attr(attribute), .attr(attribute, newValue)

console.log('Button id', $('button:first-of-type').attr('id'));

$('button:first-of-type').attr('id', 'Jquery did this to me!');


console.log($('body').html());


const doTheThing = event => console.log(event);

$('button').on('click', doTheThing);


/*
vanilla js 
const button = document.getElementById('button1');
button.addEventListener('click', doTheThing);
*/

