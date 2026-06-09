

// This is a simple JavaScript code that demonstrates the use of variables and constants.
const myCountry = "Iran";
let internetStatus = "disconnected";
internetStatus = "connected";
console.log("My country is: "+ myCountry);
console.log("The internet status is: "+ internetStatus);

// This code demonstrates the use of a ternary operator to assign a function based on a condition.
let aNumber = 10;
let sampleFunction = (aNumber > 10) ? () => console.log("The number is greater than 10") : () => console.log("The number is smaller or equal to 10");
sampleFunction();

// This code demonstrates the use of an object to store multiple related properties and values.
let myStatus = {
    name: "Behi",
    age: 31,
    city: "Classified",
    daySinceRestart: 1,
    isReadyToCommit: true,
    goal: "To be a professional js developer",
    hobbies: ["coding", "gaming", "watching movies"]    
};
console.log("My name is: " + myStatus.name);
console.log("My age is: " + myStatus.age);
console.log("I live in: " + myStatus.city);
console.log("Days since last restart: " + myStatus.daySinceRestart);
console.log("Am I ready to commit? " + myStatus.isReadyToCommit);
console.log("My goal is: " + myStatus.goal);
console.log("My main hobby should be: " + myStatus.hobbies[0]);

// This code demonstrates the use of an if-else statement to make a decision based on a condition.
if (myStatus.age > 30) {
    console.log("I am over 30 years old and I should wrap up my learning journey and start working on real projects." + " Consistency over speed!");
}else{
    console.log("I am under 30 years old and I have plenty of time to learn and grow as a developer.");
}

const maxPlayersPerTeam = 10;
let calculateTeamWinrate = (teamTotalMatches, teamtotalVictories) => (teamtotalVictories / teamTotalMatches) * 100;
let sampleTeamTotalMatches = 31;
let sampleTeamTotalVictories = 20;
console.log("This sample team winrate is: "+calculateTeamWinrate(sampleTeamTotalMatches, sampleTeamTotalVictories) + "%");
//console.log("The team's win rate is: " + calculateTeamWinrate(teamTotalMatches, teamtotalVictories) + "%");
