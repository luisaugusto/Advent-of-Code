const fs = require('fs');
const debug = false;

const extractNumbers = claim => claim.match(/\d+/g).map(Number);

//Part One:
const overlappedCoordinates = claims => {
  if (debug) {
    console.group();
    console.time();
    console.info("Begin calculating overlapping coordinates...");
  }

  const coordinates = [];
  const duplicates = [];

  claims.forEach(claim => {
    //Find all numbers in the string, output them as an array,
    //Change the array of number strings into number values
    let [id, x, y, width, height] = extractNumbers(claim);

    [...Array(width)].forEach((_, w) => {
      [...Array(height)].forEach((__, h) => {
        const coordinate = JSON.stringify([x + w, y + h]);

        if (coordinates.indexOf(coordinate) < 0) {
          coordinates.push(coordinate)
        } else if (duplicates.indexOf(coordinate) < 0) {
          duplicates.push(coordinate)
        }
      });
    });

    if (debug) console.log(`Processed claim #${id}, ${duplicates.length} duplicates currently found.`);
  });

  if (debug) {
    console.timeEnd();
    console.groupEnd();
  }

  return duplicates.length;
};

//Part Two:
const between = (num, [min, len]) => num >= min && num <= min + len;
const checkOverlap = ([min, len], [cMin, cLen]) => {
  return between(min, [cMin, cLen]) || between(min + len, [cMin, cLen]) || min < cMin && min + len > cMin + cLen;
};

const findUniqueClaim = claims => {
  const overlapObj = {
    uniqueClaim: 0
  };

  claims.forEach(claim => {
    let [id, x, y, w, h] = extractNumbers(claim);
    overlapObj[id] = [];

    claims.forEach(c => {
      let [cId, cX, cY, cW, cH] = extractNumbers(c);
      if (id === cId) return;

      const xOverlap = checkOverlap([cX, cW], [x, w]);
      const yOverlap = checkOverlap([cY, cH], [y, h]);

      if (xOverlap && yOverlap) {
        overlapObj[id].push(cId);
      }
    });
  });

  for (let claim in overlapObj) {
    if (overlapObj[claim].length === 0) {
      overlapObj.uniqueClaim = claim;
      break;
    }
  }
  return overlapObj.uniqueClaim;
};

const text = fs.readFileSync('input.txt', 'utf8');
const claims = text.split('\n');

console.time('Time to Calculate');
console.log(`There are ${overlappedCoordinates(claims)} square inches of overlapping fabric.`);
console.log(`The claim with all unique coordinates is ${findUniqueClaim(claims)}`);
console.timeEnd('Time to Calculate');