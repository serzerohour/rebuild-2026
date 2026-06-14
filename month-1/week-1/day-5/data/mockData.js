// data/mockData.js

const players = [
    { playerId: 1, playerName: "Ali", email: "ali@fm.com" },
    { playerId: 2, playerName: "Reza", email: "reza@fm.com" },
    { playerId: 3, playerName: "Sara", email: "sara@fm.com" },
    { playerId: 4, playerName: "Nima", email: "nima@fm.com" },
    { playerId: 5, playerName: "Darya", email: "darya@fm.com" },
    { playerId: 6, playerName: "Kaveh", email: "kaveh@fm.com" }
];

const teams = [
    { teamId: 1, teamName: "ZeroHour", teamCaptainId: 1 },
    { teamId: 2, teamName: "ShadowStrike", teamCaptainId: 4 },
    { teamId: 3, teamName: "IronWolves", teamCaptainId: 6 }
];

const memberships = [
    { playerId: 1, teamId: 1 },
    { playerId: 2, teamId: 1 },
    { playerId: 3, teamId: 1 },
    { playerId: 2, teamId: 2 },
    { playerId: 4, teamId: 2 },
    { playerId: 5, teamId: 2 },
    { playerId: 5, teamId: 3 },
    { playerId: 6, teamId: 3 },
    { playerId: 3, teamId: 3 }
];

const games = [
    { gameId: 1, gameName: "Dota 2" },
    { gameId: 2, gameName: "Counter-Strike: Global Offensive" },
    { gameId: 3, gameName: "Call of Duty: Modern Warfare 3" }
];

const events = [
    { eventId: 1, eventName: "Iran Dota Championship", gameId: 1, eventEligibleParticipants: "team" },
    { eventId: 2, eventName: "CS Masters League", gameId: 2, eventEligibleParticipants: "team" },
    { eventId: 3, eventName: "CoD FFA Night", gameId: 3, eventEligibleParticipants: "individual" }
];

const rosters = [
    { playerId: 1, teamId: 1, eventId: 1 },
    { playerId: 2, teamId: 1, eventId: 1 },
    { playerId: 3, teamId: 1, eventId: 1 },
    { playerId: 2, teamId: 2, eventId: 2 },
    { playerId: 4, teamId: 2, eventId: 2 }
];

const individualRegistrations = [];

export { players, teams, memberships, games, events, rosters, individualRegistrations };