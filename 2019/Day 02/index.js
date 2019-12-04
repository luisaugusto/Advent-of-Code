const fs = require('fs');

const runIntcode = array => {
    let calculatedIntegers = [...array];
    let intcodeHalted = false;

    for (i = 0; i < array.length; i += 4) {
        if (intcodeHalted) break;

        const program = calculatedIntegers.slice(i, i + 4);
        const [opcode, x, y, pos] = program;

        switch (opcode) {
            case 1:
                calculatedIntegers[pos] = calculatedIntegers[x] + calculatedIntegers[y];
                break;
            case 2:
                calculatedIntegers[pos] = calculatedIntegers[x] * calculatedIntegers[y];
                break;
            case 99:
                intcodeHalted = true;
                break;
            default:
                console.log('Unknown opcode: ' + opcode);
        }
    }

    return calculatedIntegers;
};

const calibrateIntcode = (desiredResult, array) => {
    let noun = 0;
    let verb = 0;
    let resultFound = false;

    while (resultFound === false) {
        const newArray = [...array];
        newArray.splice(1, 2, noun, verb);

        const result = runIntcode(newArray)[0];

        if (result === desiredResult) {
            resultFound = true;
        } else if (noun === 99 && verb === 99) {
            resultFound = null;
        } else {
            if (noun < 99) {
                noun++;
            } else if (verb < 99) {
                noun = 0;
                verb++;
            }
        }
    }

    if (resultFound) {
        return 100 * noun + verb;
    } else {
        return null;
    }
};

const text = fs.readFileSync('input.txt', 'utf8');
const integers = text.split(',').map(Number);

console.time('Time to Calculate');
console.log(`The value at position 0 is ${ runIntcode(integers)[0] }`);
console.log(`The result after calibrating the intcode to 19690720 is ${ calibrateIntcode(19690720, integers) }`)
console.timeEnd('Time to Calculate');