const fs = require('fs');

//Regex to get all digits from a string
const extractNumbers = claim => claim.match(/\d+/g).map(Number);

//Part 1:
const analyzeGuards = (log, method) => {
  const guards = {};

  //Used to keep track of which guard is asleep or awake during the loop
  const currentGuard = {
    id: 0,
    sleepTime: 0
  };

  log.forEach(entry => {
    let [,,,, min, guard] = extractNumbers(entry);
    if (guard) currentGuard.id = guard;
    if ( !(currentGuard.id in guards) ) guards[currentGuard.id] = [];

    if (entry.includes('falls asleep')) {
      currentGuard.sleepTime = min;
    }

    if (entry.includes('wakes up')) {
      const sleepDuration = min - currentGuard.sleepTime;

      [...Array(sleepDuration)].forEach((_, minute) => {
        guards[currentGuard.id].push(minute + currentGuard.sleepTime);
      });
    }
  });

  return findSleepiestGuard(guards, method);
};

const findSleepiestGuard = (guards, method) => {
  //Method should be 'by total sleep' or 'by minute'.
  //The first option is used for part one, and the second option is used for part two.
  let sleepyGuard = {
    id: 0,
    timeAsleep: 0,
    mostFreqMin: {
      min: 0,
      freq: 0
    }
  };

  for (let guard in guards) {
    const timestamps = guards[guard];

    if (method === 'by total sleep') {
      if (timestamps.length <= sleepyGuard.timeAsleep) continue;

      sleepyGuard.id = guard;
      sleepyGuard.timeAsleep = timestamps.length;
      sleepyGuard.mostFreqMin.min = 0;
      sleepyGuard.mostFreqMin.freq = 0;
    }

    const timeDistribution = {};
    timestamps.forEach(minute => {
      timeDistribution[minute] =  (timeDistribution[minute] || 0) + 1;

      if (timeDistribution[minute] > sleepyGuard.mostFreqMin.freq) {

        if (method === 'by minute') {
          sleepyGuard.id = guard;
          sleepyGuard.timeAsleep = timestamps.length;
        }

        sleepyGuard.mostFreqMin.min = minute;
        sleepyGuard.mostFreqMin.freq = timeDistribution[minute];
      }
    });
  }

  const byTotalSleep = method === 'by total sleep' ? `asleep the most at ${sleepyGuard.timeAsleep} minutes. They were ` : ``;
  return `Guard #${sleepyGuard.id} was ${byTotalSleep}most frequently asleep at 00:${sleepyGuard.mostFreqMin.min}, a total of ${sleepyGuard.mostFreqMin.freq} minutes. The ID of the guard multiplied by the most frequent minute is ${sleepyGuard.id * sleepyGuard.mostFreqMin.min}`;
};

const text = fs.readFileSync('input.txt', 'utf8');
const textArray = text.split('\n').sort();

console.time('Time to Calculate');
console.log(analyzeGuards(textArray, 'by total sleep'));
console.log(analyzeGuards(textArray, 'by minute'));
console.timeEnd('Time to Calculate');