```js


let a = 7;
let b = a;
//they no nothing about each other after the assignment
let c = b;
let d = c; 


// console.log(a,b,c,d);

//7,7,7,7

b = 5000; //this deletes the 7 in b and replaces it with 5000

// What are your predictions for the outcome
// 7, 5000, 7, 7
// console.log(a,b,c,d);


// javascript primitive values are passed as the value not the original entity 
// when we change one variable, only one variable changes because the rest are unrelated
// unique 

//primitives in js are numbers, strings, booleans, undefined, NaN, null
// the equal sign is not changing a 7 to 5000  

// Primitive types: booleans, numbers, strings, ...
// Objects: Arrays, functions, and of course object literals, or custom types (instantiated with new), ...


let z = ['cat'];
let y = z;
let x = y;
let w = x;


// console.log(z,y,x,w);//cats 


y.push('dog');
y.push('llama');

// console.log(z,y,x,w);

//when passing non primitives like objects and arrays, they are passed by reference and never contain the original they always point at the original so when the original is modified they all see the changes.


//it has changed just one, the equal sign operator sets the variable, so if all our hands are on the cup but we tell it to point to a new cup and the rest are still pointing to the original 

x = ['dragon','unicorn'];
x.push('monkey');

// console.log(z,y,x,w);



//we are changing the value stored in the array, 
// z[0] = 'Spartan';
// console.log(z);
// console.log(y);
// console.log(x);
// console.log(w);


// so if we change a key in an object it will effect all the objects where as if I reassign the object it just changes it for that one object. 

//object example. 

const doggo = {
  name: 'nova',
  cool: true,
  eats: 'kibble'
}

const dog1 = doggo;
const dog2 = dog1;

console.log(doggo);
console.log(dog1);
console.log(dog2);
// use dot notation or object access notation
doggo.name = 'catdog';
doggo['cool'] = 'mega cool';

console.log(doggo);
console.log(dog1);
console.log(dog2);



```