import { players, memberships, teams, rosters, events } from '../data/mockData.js';
import { delay } from './utils/helper.js';


const isPlayerAvailableAsync = async (playerId, eventId) => {
    console.log(`Checking if player ${playerId} is available for event ${eventId}`);
    await delay(1000);

    const alreadyRegistered = rosters.some(
        r => r.playerId === playerId && r.eventId === eventId
    );

    return !alreadyRegistered;
}
const selectPlayerForRosterAsync = async (captainId, playerId, teamId, eventId) => {

    console.log(`Lets see if we can register player ${playerId} for event ${eventId}`);

    // New version
    await delay(1000);
    const playerIsMemberOfTeam = memberships.some(m => m.playerId === playerId && m.teamId === teamId);
    const playerAlreadyRigistered = rosters.some(r => r.playerId === playerId && r.eventId === eventId);
    const captainStatus = teams.some(t => t.teamId === teamId && t.teamCaptainId === captainId);

    if (!captainStatus) {
        throw new Error(`Only the captain of team can register rosters.`);
    }
    if (!playerIsMemberOfTeam) {
        throw new Error(`Player  is not member of team. Permission not granted!`);
    }
    if (playerAlreadyRigistered) {
        throw new Error(`Player is already registerd as a roster.`);
    }
    const [playerName, teamName, eventName] = await Promise.all([
        findEntityNameByIdAsync(playerId, "player"),
        findEntityNameByIdAsync(teamId, "team"),
        findEntityNameByIdAsync(eventId, "event")
    ]);

    // Push new object data to roster array        
    await rosters.push({ playerId, teamId, eventId });
    console.log(`Player ${playerName} confirmed for team ${teamName} in ${eventName}`);


}
const findEntityNameByIdAsync = async (entityId, entityType) => {
    let entityNewArray = [];
    let fieldName = "";
    let idField = ""
    switch (entityType) {
        case "player":
            entityNewArray = players;
            fieldName = "playerName";
            idField = "playerId";
            break;
        case "team":
            entityNewArray = teams;
            fieldName = "teamName";
            idField = "teamId";
            break;
        case "event":
            entityNewArray = events;
            fieldName = "eventName";
            idField = "eventId";
        default:
            throw new Error(`Invalid entity type: ${entityType}`);

    }

    console.log(`Retreiving entity names...`);
    await delay(1000); // Wait 1 second
    const newData = entityNewArray.find(eNA => eNA[idField] === entityId)?.[fieldName];
    if (!newData) {
        throw new Error(`Database request failed for entity data`);
    }
    return newData;

}
export { isPlayerAvailableAsync, selectPlayerForRosterAsync };
