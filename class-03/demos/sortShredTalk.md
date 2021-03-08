
```js


//arr.sort([comparisonFunction])
//Q. what does the sort method take in?
//A. it takes in a comparisonFunction
//Q. in MDN what does the [] represent
//A. it means that it is an optional argument, its optional in the that the sort works all on its own.


const arr = [9,6,7,8,5];

arr.sort();
//numbers are now sorted,

arr;
//sort method is a destructive comparisonFunction
//sort the og array elements and does not create a new array. on its own by default it will sort alophabetically.


const words = ['cat','dog','Elephant','Anteater','pig','shark'];


words.sort();

//Capitols come first for our sort order because js doesnt know the alophabetically. 

const bigNums = [9, 90, 99, 10, 1, 129, 20, 30, 50, 60, 6, 7,8];

bigNums.sort();


//this is a common approach to sorting
// bigNums.sort((first, second)=> first - second);


//call back function has one job. to return a number greater than zero, less than zero or equal to zero, 
//this will decide to swap, leave alone, or skip ahead in the sort

// bigNums.sort((first, second) => {
//   if(false){
//  return 1;
//   }else if(true){
//   return -1;
//   }else{
//     return 0;
//   }
// });

bigNums.sort((first, second) => {
  if(first > second ){
 return 1;
  }else if(first < second){
  return -1;
  }else{
    //these must be equal
    return 0;
  }
});


words.sort((left, right ) => {
if(left.toLowerCase() > right.toLowerCase()){
  // leave it alone
return 1;
}else if(left.toLowerCase() < right.toLowerCase()){
return -1;
}else{
  //these must be equal
return 0;
}
});




// const people = [
//   {name: 'Zarry', power: 5},
//   {name: 'Craig' , power: 70},
//   {name: 'Garry', power: 9000},
//   {name: 'Dog Dog',power: 65}
// ];


const people = [
  {name: 'Zarry', power: 3, thirdKey: 56},
  {name: 'Craig' , power: 20,thirdKey: 9},
  {name: 'Garry', power: 900,thirdKey: 526},
  {name: 'Dog Dog',power: 6,thirdKey: 156},
   {name: 'Zarry', power: 5, thirdKey: 5556},
  {name: 'Craig' , power: 70, thirdKey: 3456},
  {name: 'Garry', power: 9000, thirdKey: 756},
  {name: 'Dog Dog',power: 65, thirdKey: 6}
];

people.sort((first, second) => {
    if(first.name > second.name) {
       return 1;
    }else if(first.name < second.name){
      return -1;
    }else{
    return 0;
    }
});


people.sort((first, second) => {
    if(first.power > second.power) {
       return 1;
    }else if(first.power < second.power){
      return -1;
    }else{
    return 0;
    }
});
console.log(people);
people.sort((first, second) => {

    if(first.name > second.name) {
       return 1;
    }else if(first.name < second.name){
      return -1;
    }else{
          if(first.thirdKey > second.thirdKey) {
            return 1;
          }else if(first.thirdKey < second.thirdKey){
            return -1;
          }else{
          return 0;
          }

    }
});




```