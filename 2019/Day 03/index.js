console.time('Time to Calculate');
const fs = require('fs');
const debug = true;

const calcWirePaths = wires => wires.map(wire => {
    let coordinates = [];

    wire.forEach(path => {
        //Each path has a letter at the beginning signifiying direction: U, R, D, and L.
        //Everything else after that is the distance the wire travels in that direction.
        const direction = path[0];
        const distance = Number(path.slice(1));

        let newX = 0;
        let newY = 0;

        //Check the direction and section the new axis values based on that.
        switch (direction) {
            case 'U':
                newY = distance;
                break;
            case 'R':
                newX = distance;
                break;
            case 'D':
                newY = -distance;
                break;
            case 'L':
                newX = -distance;
                break;
            default:
                console.log('Unknown direction: ' + direction);
        }

        //This will add an entry into the coordinates for every step taken by the wire, which results in a massive array.
        while (newX !== 0 || newY !== 0) {
            const [prevX, prevY] = coordinates.length > 0 ? coordinates[coordinates.length - 1] : [0, 0];

            let x = newX > 0 ? 1 : newX < 0 ? -1 : 0;
            let y = newY > 0 ? 1 : newY < 0 ? -1 : 0;

            newX = newX > 0 ? --newX : newX < 0 ? ++newX : newX;
            newY = newY > 0 ? --newY : newY < 0 ? ++newY : newY;

            coordinates.push([prevX + x,  prevY + y]);
        }
    });

    return coordinates;
});

//Loop through each coordinate in path A and compare it to path B
const findIntersections = ([pathA, pathB]) => pathA.reduce((acc, [aX, aY]) =>  {

    //Does path B have a matching coordinate from path A?
    const intersection = pathB.some(([bX, bY]) => aX === bX && aY === bY);

    //If there is a matching coordinate, add it to the array
    return intersection ? [...acc, [aX, aY]] : acc;
}, []);

//Go through each intersection coordinate, add the absolute values together, and sort them to find the lowest number at the first position.
const closestIntersection = intersections => intersections.map(([x, y]) => Math.abs(x) + Math.abs(y)).sort()[0];

//Loop through each of the intersections, find their position in each of the wire paths, and add them together
const fewestSteps =  (intersections, wirePaths) => intersections.map(([x, y]) => {

    //Loop through each wire path and find the index of each intersection
    const steps = wirePaths.map(path => path.findIndex(([pX, pY]) => pX === x && pY === y));

    //Add the indexes of the wire paths together.
    //Arrays are 0-based indexes, so must add one to include the intersection as a step.
    return steps.reduce((acc, step) => acc + step + 1, 0);
}).sort()[0];

const text = fs.readFileSync('input.txt', 'utf8');
const directions = text.split('\n').map(wire => wire.split(','));

if (debug) {
    console.log('List of directions, split by line and commas:');
    console.log(directions);
}

const wirePaths = calcWirePaths(directions);

if (debug) {
    console.log('Coordinates of the the wire paths for each wire:');
    console.log(wirePaths);
}

const intersections = findIntersections(wirePaths);

if (debug) {
    console.log('List of all of the intersecting coordinates for each wire:');
    console.log(intersections);
}

console.log(`The closest intersection to the central port is ${closestIntersection(intersections)} units away.`);
console.log(`The fewest steps to an intersection is ${fewestSteps(intersections, wirePaths)} units.`);
console.timeEnd('Time to Calculate');