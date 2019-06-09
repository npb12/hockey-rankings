//
//  index.js
//  Ditto.io
//
//  Created by Neil Ballard on 6/09/19.
//

const readline = require('readline');
require('fs');
const util = require('util');
var exports = module.exports = {};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//var pointTotals = [];
var lines = [];

rl.on('line', function(line) {
	lines.push(line);
});

rl.on('close', () => {

	var pointTotals = [];


	lines.forEach((line) => {
		let game = parseLine(line);
		let results = getResult(game.home, game.away);
		setResult(pointTotals, game.home, results.homePts);
		setResult(pointTotals, game.away, results.awayPts);
	})

	var sorted = sortTeams(pointTotals);
	const rankings = rankTeams(sorted);
	outputTable(rankings);
});

function outputTable(rankings)
{
	rankings.forEach((object) => {
		let suffix = 'pts'; 
		if (object.points == 1) {
			suffix = 'pt'
		}
		let output = util.format('%d. %s, %d %s', (object.rank + 1), object.name, object.points, suffix);
		console.log(output);
	})
}

function sortTeams(pointTotals)
{
	//sort the teams by points total in decsending order
	//sort alphabetically if points are equal
	return pointTotals.sort((a, b) => b.points-a.points || a.name.charCodeAt(0)-b.name.charCodeAt(0));
}

function rankTeams(rankings)
{
	//As long as index is higher than 1 it will pass
	//Check if the previous points are the same as the current points
	//true -- use previous rank
	//false -- use current index
	rankings.forEach((one, index) => {
  		one.rank = index
  		if (index && rankings[index-1].points == one.points) {
    		one.rank = rankings[index-1].rank
  		}
	})

	return rankings;
}

//parse each line of the text file
//split the line into Team1 score vs Team2 score
//Set object rank to zero initially; wait till all games are handled
function parseLine(line) {

	let game = line.split(',');
	let str1 = game[0];
	let str2 = game[1].trim();
	let homeData = parseString(str1);
	let awayData = parseString(str2);

	let home = new Team(homeData.name, homeData.points, 0);
	let away = new Team(awayData.name, awayData.points, 0);

    return {home, away};
}

//parse the string and return data for object creation
function parseString(str) {
	let name = str.slice(0, -2);
	let points = parseInt(str.slice(-1));
	name.trim();
	return {name, points};
}

//passed in home and away team and get points awarded for game result
function getResult(home, away) {
	let awayPts = 0
	let homePts = 0

	if (home.points > away.points) {
		homePts = 3
	} 
	else if (home.points < away.points) {
		awayPts = 3
	}
	else {
		homePts = 1
		awayPts = 1
	}

	return {homePts, awayPts};
}

//set the result and add to points total array
function setResult(pointTotals, team, pts) {
	teamObj = pointTotals.find(object => object.name === team.name);
	if (teamObj === void 0)
	{
		team.points = pts;
		pointTotals.push(team);
	}
	else
	{
		teamObj.points += pts;
		return teamObj;
	}
}

function Team (name, points, rank) {
	this.name = name
  	this.points = points
  	this.rank = rank
}

module.exports = {
	Team,
	getResult,
	parseLine,
	sortTeams,
	rankTeams,
}