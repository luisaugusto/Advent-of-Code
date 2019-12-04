const fs = require('fs');

//Part One: Find the sum of all numbers in the list
const sum = numbers => numbers.reduce((acc, num) => acc + Number(num), 0);

//Part Two:
const firstFrequency = (numbers, prev = [0]) => {

  //We have to slice the array in order to create a new array that we can mutate
  const frequencies = numbers.slice(0).reduce((acc, number, i, array) => {
    const newFrequency = sum([acc[0], number]);
    const sumInArray = acc.find(num => num === newFrequency);

    if (sumInArray) {
      //Mutates the array that is being reduced as a way of ending the loop immediately.
      //We already found a duplicate, no need to continue looping.
      array.splice(1);
      return newFrequency;
    } else {
      return [newFrequency, ...acc];
    }
  }, prev);

  //If no duplicate was found, frequencies will output an array, so we should continue looping
  //If a duplicate was found, we have found the first frequency of the loop and should return it
  if (frequencies instanceof Array) {
    return firstFrequency(numbers, frequencies);
  } else {
    return frequencies;
  }
};

const text = fs.readFileSync('input.txt', 'utf8');
const numbers = text.split('\n');

console.time('Time to Calculate');
console.log(`The sum of all numbers in the list is ${sum(numbers)}`);
console.log(`The first frequency in the loop is ${firstFrequency(numbers)}`);
console.timeEnd('Time to Calculate');