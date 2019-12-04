const fs = require('fs');

const runIntcode = integers => {
    let calculatedIntegers = integers;
    let intcodeHalted = false;

    for (i = 0; i < integers.length; i += 4) {
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

const text = fs.readFileSync('input.txt', 'utf8');
const integers = text.split(',').map(Number);

console.time('Time to Calculate');
console.log(`The value at position 0 is ${ runIntcode(integers)[0] }`);
console.timeEnd('Time to Calculate');