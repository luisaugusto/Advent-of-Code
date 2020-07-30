console.time('Time to Calculate');
const fs = require('fs');

const runIntcode = (array, input) => {
    let calculatedIntegers = [...array];
    let diagnosticCode = [];

    let intcodeHalted = false;

    let loopIndex = 0;
    while (loopIndex < array.length) {
        if (intcodeHalted) break;

        const opcode = calculatedIntegers[loopIndex];
        const codeLength = opcode === 3 || opcode === 4 ? 2 : 4;

        const program = calculatedIntegers.slice(loopIndex + 1, loopIndex + codeLength);
        const [x, y, pos] = program;

        switch (opcode) {
            case 1:
                console.log(`Setting pos ${pos} to ${ calculatedIntegers[x] } + ${ calculatedIntegers[y] }`)
                calculatedIntegers[pos] = calculatedIntegers[x] + calculatedIntegers[y];
                break;
            case 2:
                console.log(`Setting pos ${pos} to ${ calculatedIntegers[x] } * ${ calculatedIntegers[y] }`)
                calculatedIntegers[pos] = calculatedIntegers[x] * calculatedIntegers[y];
                break;
            case 3:
                console.log(`Setting pos ${x} to ${ input }`)
                calculatedIntegers[x] = input;
                break;
            case 4:
                console.log(`Outputting ${calculatedIntegers[x]} to diagnostic codes`);
                diagnosticCode.push(calculatedIntegers[x]);
                break;
            case 99:
                intcodeHalted = true;
                break;
            default:
                console.log('Unknown opcode: ' + opcode);
        }

        loopIndex += codeLength;
    }

    return diagnosticCode;
};

const text = fs.readFileSync('input.txt', 'utf8');
const integers = text.split(',').map(Number);

console.log(`The diagnostic code is ${ runIntcode(integers, 1) }`);
console.timeEnd('Time to Calculate');