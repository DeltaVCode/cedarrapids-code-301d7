function sayHello()
{
  console.log('hi');

  [1,3,5].forEach(n => {
    console.log(n);
  });

  [2,4,6].forEach(function printNumber(n) {
    console.log(n);
  })

  const printNumber2 = n => {
    console.log;
    throw new Error('oops');
  };


  [3,6,9].forEach(printNumber2);
}

function receivesCallbackFunction(callback) {
  console.log('received function');
  callback();
}

sayHello();


receivesCallbackFunction(() => console.log('callback!'));
