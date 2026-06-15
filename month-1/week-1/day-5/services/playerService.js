import { players, memberships, teams } from '../data/mockData.js';
import { delay, echo } from './utils/helper.js';

const getPlayerByIdAsync = async (id) => {
    console.log(`Searching for player ${id}...`);
    await delay(1000); // Wait 1 second
    const player = players.find(p => p.playerId === id);
    if (!player) {
        throw new Error(`Database Error: Player ${id} not found.`);
    }
    return player;

}
const getPlayerTeamsAsync = async (playerId) => {
    console.log(`Fetching teams for player ${playerId}...`);
    await delay(1500);
    const teamIds = memberships.filter(ms => ms.playerId === playerId).map(ms => ms.teamId);
    if(!teamIds){
        throw new Error(`Database Error: Player ${playerId} not found.`);
    }
    return teams.filter(tm => teamIds.includes(tm.teamId));
}

export { getPlayerByIdAsync, getPlayerTeamsAsync, delay };

