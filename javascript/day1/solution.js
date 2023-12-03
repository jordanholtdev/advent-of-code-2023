// read the input file
const { on } = require('events');
const fs = require('fs');
const { get } = require('http');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const getCalibrationTotal = (values) => {
    return values.reduce(
        (sum, current) => sum + current.at(0) * 10 + current.at(-1),
        0
    );
};

const part1 = (input) => {
    // intialize the sum variable
    let sum = 0;

    // loop through each line of the input file
    for (let i = 0; i < input.length; i++) {
        // find the first occurrence of a digit in the string
        const firstDigit = input[i].match(/\d/);
        // find the last occurrence of a digit in the string
        const lastDigit = input[i].match(/\d(?=\D*$)/);
        // concatenate the first and last digit
        const digits = firstDigit + lastDigit;
        // convert the concatenated string to an integer
        const number = parseInt(digits);
        // add the integer to the sum
        sum += number;
    }
    console.log(sum);
};

const part2 = (input) => {
    const letterNumbers = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
    ];

    const numbers = input.map((line) =>
        [
            ...line.matchAll(
                /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
            ),
        ]
            .map((match) => match[1])
            .map((n) =>
                /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1
            )
    );
    console.log(getCalibrationTotal(numbers));
};

const solve = (input) => {
    // print the solution to part 1
    part1(input);
    // print the solution to part 2
    part2(input);
};

// run the solution
solve(input);

module.exports = { solve };
