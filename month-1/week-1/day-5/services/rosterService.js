import { players, memberships, teams, rosters, events } from '../data/mockData.js';
import { delay, echo } from './utils/helper.js';


const isPlayerAvailableAsync = async (playerId, eventId) => {
    console.log(`Lets see if player is available ${playerId} to register in the event ${eventId}`);
    await delay(1000); // Wait 1 second
    const playerStatus = rosters.some(r => r.playerId === playerId && r.eventId === eventId);
    if (!playerStatus) {
        throw new Error(`Database request failed for player ${playerId} status`);
    }
    return playerStatus;
}
const selectPlayerForRosterAsync = async (captainId, playerId, teamId, eventId) => {

    console.log(`Lets see if we can register player ${playerId} for event ${eventId}`);

    // New version
    await delay(1000);
    const playerIsMemberOfTeam = await memberships.some(m => m.playerId === playerId && m.teamId === teamId);
    const playerAlreadyRigistered = await rosters.some(r => r.playerId === playerId && r.eventId === eventId);
    const captainStatus = await teams.some(t => t.teamId === teamId && t.teamCaptainId === captainId);

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
