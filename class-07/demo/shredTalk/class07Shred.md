//Array.prototype.map



// let newArray = arr.map(callback(currentValue[, index[, array]])){
//   //return element for newArray, after executing some code. 
// }


// identical in its structure to forEach
// iterates over every element
// it puts items in the new array as it iterates, one for every element no matter waht an array of 5 things, as the input will always have 5 things as the output. It's a forEach that makes arrays. 


// map() is buitl in method call array


const nums = [10, 30, 35, 50, 88];


const output = nums.map(() => 'I am returning now.');

console.log('output:', output);
console.log('nums array: ',nums);

//Tenent of functional programming, is that we dont change th original thing array



nums.map((value, index, array) => {
console.log('V_I_A', value, index, array);

  return value * 7;
});

nums.map(number => number * number);



// function callback(value, index){

//   return value * index;
// }

// nums.map(callback);



// function fakeMap(array, callback){

//   const newArray = [];
//   for(let i =0; i < array.length; i++){
//     newArray.push(callBack(array[i], i, array);
//   }
//   return newArray;
// }

// fakeMap(nums, callback);



//map() is great to pass info into our constructors
// map will work with labs. 
// one of the goals for today.
// you will do this week. 



function callback(value, index){
  // return value * value;
  //for below
  console.log('this is the call back ', value);
  return value * index;
}

nums.map(callback);


function fakeMap(array, callback){
  const newArray = [];
    console.log('this is the array ', array);

  for(let i = 0; i < array.length; i++){
newArray.push(callback(array[i], i, array));
  }
    console.log('this is the newArray ', newArray);

  return newArray;
}

fakeMap(nums, callback);