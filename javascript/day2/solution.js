// read the input file
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

// parse games
const parseGame = (input) => {
    const lines = input.split('\n');
    const games = lines.map(parseGameLine);
    return games;
};

// parse each game line e.g. Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const parseGameLine = (line) => {
    // split the line into game and cubes
    const [game, cubes] = line.split(': ');
    const gameNumber = game.split(' ')[1];
    // split the cubes into game sets
    const gameSets = cubes.split('; ').map(parseGameSets);
    // find the maximum number of cubes of each colour
    const maximum = gameSets.reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
            acc[key] = Math.max(acc[key] || 0, curr[key]);
        });
        return acc;
    }, {});
    const power = Object.values(maximum).reduce((acc, curr) => {
        return acc * curr;
    }, 1);
    return { game, gameNumber, gameSets, maximum, power };
};

// parse each game set e.g. 3 blue, 4 red
const parseGameSets = (gameSets) => {
    // split the game sets into cube picks
    const cubePicks = gameSets.split(', ').map(parseCubePick);
    // count the number of cubes of each colour
    const colours = cubePicks.reduce((acc, curr) => {
        acc[curr.colour] = (acc[curr.colour] || 0) + curr.count;
        return acc;
    }, {});
    return colours;
};

const parseCubePick = (cubePick) => {
    const [count, colour] = cubePick.trim().split(' ');
    return { count: parseInt(count), colour };
};

const part1 = (input) => {
    // solve part 1
    // set game limits
    const limits = {
        red: 12,
        green: 13,
        blue: 14,
    };
    // parse games
    const games = parseGame(input);
    // validate games by checking if the maximum number of cubes of each colour is less than or equal to the limit
    const validateGames = games.filter((game) => {
        return Object.keys(game.maximum).every((key) => {
            return game.maximum[key] <= limits[key];
        });
    });

    // sum the game numbers of the valid games
    const sumValidGames = validateGames.reduce((acc, curr) => {
        // for every valid game add the game number to the accumulator
        return acc + parseInt(curr.gameNumber);
    }, 0);

    // print the solution
    console.log('solution:', sumValidGames);
};

const solve = (input) => {
    // print the solution to part 1
    part1(input);
};

// run the solution
solve(input);

module.exports = { solve };
