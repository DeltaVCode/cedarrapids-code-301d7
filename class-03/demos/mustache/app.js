'use strict';
console.log('js file connected');


//Mustache js takes a string and puts a value in it, just like a template literal.
// if we want to insert html into htmlpage using mustache you need double mustaches {{}}
//every single templated piece is built using the keys from an object. 
//This will be one of those objects. 
// {
//   name: 'Fremont',
//   city: 'Seattle',
//   population: '23,566',
//   founded: '1820',
//   body: '<p>This is example text to show you how <strong>HTML</strong> can be escaped using <em>Mustache</em>.</p>'
// },

/* <li>
    <h2>{{Bisbee}}, {{AZ.}}</h2>
    <p>Pop: {{5,203}}</p>
    <p>Founded: {{1902}}</p>
   {{{<p>This is an example text to show you how <strong>HTML</strong> can be escaped using<em>Mustache</em>.</p>}}} 
    </li> */

    // const stringOfHtml = `
    //   <li>
    //     <h2>{{name}}, {{city}}</h2>
    //     <p>Pop: {{population}}</p>
    //     <p>Founded: {{founded}}</p>
    //      {{{body}}} 
    //     </li>
    // `;

// console.log('this is the data set ', neighborhoodDataSet);

//     const renderedHtml = Mustache.render(stringOfHtml, neighborhoodDataSet[0]);
//     console.log(renderedHtml);


    //one line of code. and we get html for rendering of our objects. 
    // here we get access to the Mustache is a function we access in order to make use of the library. Same as we did for chart.js. We then pass in a string and pass in the object 


    //we need template literals for the mulitline string. 
    // we can template this without talking to the DOM lets go through example. 
   // intheHood is an object 
    // neighborhoodDataSet.forEach(intheHood => {
    //   const renderedHtml = Mustache.render(stringOfHtml, intheHood);
    //   console.log(renderedHtml);
    //   $('ul').append(renderedHtml);
    // });


    neighborhoodDataSet.forEach( inTheHood => {
//so we need the template string
const htmlString = $('#inTheHood-Template').html(); // === innerhtml
console.log('this is the html string ',htmlString);
//we also need our hood objects. 
const object = inTheHood;
//we are going to be purposely verbose. 
const renderedHtml = Mustache.render(htmlString, object);
//call the string and the object which isthe inTheHood, so we can get a stringifyed html with jquery. 

$('ul').append(renderedHtml);

});