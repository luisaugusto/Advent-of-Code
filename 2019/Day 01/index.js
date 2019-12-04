console.time('Time to Calculate');
const fs = require('fs');

const sumOfFuelReqs = (masses, recurse = false) => masses.reduce((acc, mass) => {
    if (recurse) {
        let totalFuelReqs = 0;
        let currentFuelReqs = mass;

        while (currentFuelReqs > 0) {
            const fuel = Math.max(0, fuelReqs(currentFuelReqs));
            totalFuelReqs += fuel;
            currentFuelReqs = fuel;
        }

        return acc + totalFuelReqs;
    } else {
        return acc + fuelReqs(mass);
    }
}, 0);

const fuelReqs = mass => Math.floor(mass / 3) - 2;

const text = fs.readFileSync('input.txt', 'utf8');
const masses = text.split('\n');

console.time('Time to Calculate');
console.log(`The sum of the fuel requirements for all of the modules on your spacecraft is ${sumOfFuelReqs(masses)}`);
console.log(`The recursive sum of the fuel requirements for all of the modules on your spacecraft is ${sumOfFuelReqs(masses, true)}`);
console.timeEnd('Time to Calculate');