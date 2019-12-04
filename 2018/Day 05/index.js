console.time('Time to Calculate');
const fs = require('fs');
const debug = false;

const isOppositeCase = (a, b) => a.toLowerCase() === a ? b.toUpperCase() === b : b.toLowerCase() === b;

const reducePolymer = polymer => {
    if (debug) console.log(polymer);
    const newPolymer =  polymer.split('').reduce((acc, letter, index, arr) => {
        const nextLetter = index + 1 === arr.length ? '' : arr[index + 1];

        //Check if the next two letters are the same and different casing
        if (letter.toLowerCase() === nextLetter.toLowerCase() && isOppositeCase(letter, nextLetter)) {
            if (debug) console.log(`removing ${letter} and ${nextLetter} at index ${index}`);
            arr.splice(index, 1);
            return acc;
        } else {
            return [...acc, letter];
        }
    }, []).join('');

    if (polymer === newPolymer) return newPolymer;
    else return reducePolymer(newPolymer);
};

const improvedReducePolymer = polymer => {
    return `The letter X has been removed from the polymer and the reduced polymer has 10 units`;
};

const text = fs.readFileSync('input.txt', 'utf8');
const test = 'dabAcCaCBAcCcaDA';

console.log(`The polymer has been reduced and has ${reducePolymer(text).length} units.`);
console.log(improvedReducePolymer(test));
console.timeEnd('Time to Calculate');