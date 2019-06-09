//
//  index.js
//  Blackbird.us
//
//  Created by Neil Ballard on 6/09/19.
//

const assert = require('assert');
const main = require('./index.js');

//rankings are offset by one in the output
//for testing purposes start at 0
const expectedResult = [
  	{
    	name: "Lions",
    	points: 7,
    	rank: 0
  	},
  	{
    	name: "Snakes",
    	points: 5,
    	rank: 1
  	},
  	{
    	name: "FC Awesome",
    	points: 2,
    	rank: 2
  	},
  	{
    	name: "Grouches",
    	points: 2,
    	rank: 2
  	},
  	{
    	name: "Tarantulas",
    	points: 2,
    	rank: 2
  	},
	];


runTests();

function runTests() {
	testParseLine();
	testSortTeams();
	testRankTeams();
	console.log("-All tests passed");
	process.exit();
}

function testParseLine()
{
	const line = "Lions 3, Snakes 3\n"
	const home = new main.Team("Lions", 3, 0);
	const away = new main.Team("Snakes", 3, 0);
	const parsed = main.parseLine(line);
	assert.deepEqual(home, parsed.home);
	assert.deepEqual(away, parsed.away);
	console.log("-Passed ParseLine test");
}

function testSortTeams()
{
	const teams = [
  	{
    	name: "Grouches",
    	points: 2,
    	rank: 2
  	},
  	{
    	name: "Lions",
    	points: 7,
    	rank: 0
  	},
  	{
    	name: "FC Awesome",
    	points: 2,
    	rank: 2
  	},
  	{
    	name: "Tarantulas",
    	points: 2,
    	rank: 2
  	},
  	{
    	name: "Snakes",
    	points: 5,
    	rank: 1
  	}
	];

	main.sortTeams(teams);
  	assert.deepEqual(teams, expectedResult);
	console.log("-Passed sortTeams test");
}

function testRankTeams()
{

	const teams = [
  	{
    	name: "Grouches",
    	points: 2,
    	rank: 0
  	},
  	{
    	name: "Lions",
    	points: 7,
    	rank: 0
  	},
  	{
    	name: "FC Awesome",
    	points: 2,
    	rank: 0
  	},
  	{
    	name: "Tarantulas",
    	points: 2,
    	rank: 0
  	},
  	{
    	name: "Snakes",
    	points: 5,
    	rank: 0
  	}
	];
	main.sortTeams(teams);
	main.rankTeams(teams);
  	assert.deepEqual(teams, expectedResult);
	console.log("-Passed rankTeams test");
}
