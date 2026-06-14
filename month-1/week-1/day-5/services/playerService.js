import { players, memberships, teams } from '../data/mockData.js';

// Simulate a database delay (1 second)
const delay = (ms) => {
    new Promise(resolve => setTimeout(resolve, ms));
}

const getPlayerByIdAsync = async (id) => {
    console.log(`Searching for player ${id}...`);
    await delay(1000); // Wait 1 second
    const player = players.find(p => p.playerId === id);
    if (!player) {
        throw new Error("Database Error: Player ${id} not found.");
    }
    return player;

}
const getPlayerTeamsAsync = async (playerId) => {
    console.log(`Fetching teams for player ${playerId}...`);
    await delay(1500);
    const teamIds = memberships.filter(ms => ms.playerId === playerId).map(ms => ms.teamId);
    return teams.filter(tm => teamIds.includes(tm.teamId));
}

export { getPlayerByIdAsync, getPlayerTeamsAsync, delay };

