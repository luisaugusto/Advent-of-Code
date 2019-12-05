console.time('Time to Calculate');

const [min, max] = '183564-657474'.split('-').map(Number);
const count = max - min;

//Create an array of all numbers between the min and max values, then filter them based on the requisites
const possibilities = [...Array(count)].map((num, index) => index + min).filter((num, index) => {
    const integers = String(num).split('').map(Number);

    //Two adjacent digits are the same (like 22 in 122345)
    //Loop through each integer and check if the next integer is the same number. Remove non-duplicates
    const duplicates = integers.map((int, index) => index !== integers.length - 1 && int === integers[index + 1] ? int : 0).filter(int => int > 0);

    //Find unique pairs in the duplicates
    const uniquePairs = duplicates.map(int => duplicates.filter(fInt => int === fInt).length);
    const hasUniquePair = uniquePairs.some(pair => pair === 1);

    //Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679)
    const increasing = integers.every((int, index) => index === 0 || int >= integers[index - 1]);

    return increasing && duplicates.length > 0 && hasUniquePair;
});

console.log(`There are ${possibilities.length} possible passwords.`);

console.timeEnd('Time to Calculate');