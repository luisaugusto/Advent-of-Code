const fs = require('fs');

//Part One: Find the Checksum
const checkSum = (ids, multipliers) => {
  //Count the number of words that have a count of any letter matching one of the multipliers
  const sumCounter = {};
  multipliers.forEach(number => sumCounter[number] = 0);

  ids.forEach(id => {
    //Count how often a letter appears in an id
    //Number counted determines if a particular number in the multiplier has been accounted for
    const letterCounter = {
      numberCounted: {}
    };

    //Split each id into an array of letters and count how often each letter appears
    id.split('').forEach(letter => {
      letterCounter[letter] = (letterCounter[letter] || 0) + 1;
    });

    //Check if this id has any letter count that matches a number in the multiplier array
    for (let letter in letterCounter) {
      //How many times did this letter appear
      const number = letterCounter[letter];

      //Is this a number we are looking for in the multiplier array
      if (number in sumCounter) {
        //If multiple letters have the same count (i.e., three letters appear twice),
        //We don't want it to count this ID three times for the 2 multiplier
        //So we add a property and check for it in the conditional
        if (number in letterCounter.numberCounted) continue;

        sumCounter[number]++;
        letterCounter.numberCounted[number] = true;
      }
    }
  });

  return multipliers.reduce((acc, num) => acc * sumCounter[num], 1);
};

//Part Two
const commonId = ids => {
  const similarities = {};

  let mostSimilar = {
    id1: '',
    id2: '',
    count: 0
  };

  ids.forEach(id => {
    similarities[id] = {};

    id.split('').forEach((letter, index) => {
      const matchingIDs = ids.filter(fId => fId[index] === letter && fId !== id);

      matchingIDs.forEach(matchingId => {
        const counter = similarities[id];
        counter[matchingId] = (counter[matchingId] || 0) + 1;
      });
    });

    for (let simId in similarities[id]) {
      if (similarities[id][simId] <= mostSimilar.count) continue;
      mostSimilar = {
        id1: id,
        id2: simId,
        count: similarities[id][simId]
      }
    }
  });

  return mostSimilar.id1.split('').reduce((acc, letter, index) => {
    if (letter === mostSimilar.id2[index]) return acc + letter;
    else return acc;
  }, '');
};

const text = fs.readFileSync('input.txt', 'utf8');
const ids = text.split('\n');

console.time('Time to Calculate');
console.log(`The checksum for this set of IDs is ${checkSum(ids, [2, 3])}`);
console.log(`The common letters between the two most similar box IDs is ${commonId(ids)}`);
console.timeEnd('Time to Calculate');
