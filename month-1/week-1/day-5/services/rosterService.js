import { players, memberships, teams, rosters, events } from '../data/mockData.js';
import { delay } from './playerService.js';


const isPlayerAvailableAsync = async (playerId, eventId) => {
    console.log(`Lets see if player is available ${playerId} to register in the event ${eventId}`);
    await delay(1000); // Wait 1 second
    const playerStatus = rosters.some(r => r.playerId == playerId && r.eventId == eventId);
    if (!playerStatus) {
        throw new Error(`Database request failed for player ${playerId} status`);
    }
    return playerStatus;
}
const selectPlayerForRosterAsync = async (captainId, playerId, teamId, eventId) => {

    console.log(`Lets see if we can register player ${playerId} for event ${eventId}`);

    // New version
    await delay(3000);
    const playerMemberofTeam = memberships.some(m => m.playerId == playerId && m.teamId == teamId);
    const PlayerAlreadyInEventRoster = rosters.some(r => r.playerId == playerId && r.eventId == eventId);
    const isCaptainExist = teams.find(t => t.teamId == teamId && t.teamCaptainId == captainId);

    if (!isCaptainExist) {
        throw new Error("You are not a captain of this team.");
    }
    if (!playerMemberofTeam) {
        throw new Error("This player is not a member of our team.");
    }
    if (PlayerAlreadyInEventRoster) {
        throw new Error("This player have already registered in Event");
    }

    // Push new object data to roster array        
    const pushResult = rosters.push({ playerId, teamId, eventId });
    const playerName = await findEntityNameByIdAsync(playerId,"player");
    const teamName = await findEntityNameByIdAsync(teamId,"team");
    const eventName = await findEntityNameByIdAsync(eventId,"event");
    console.log(`Player ${playerName} confirmed for team ${teamName} in ${eventName}`);

}
const findEntityNameByIdAsync = async (entityId, entityType) => {
    let entityNewArray = [];
    let fieldName = "";
    switch (entityType) {
        case "player":
            entityNewArray = players;
            fieldName = "playerName";
            break;
        case "team":
            entityNewArray = teams;
            fieldName = "teamName";
            break;
        case "event":
            entityNewArray = events;
            fieldName = "eventName";
    }

    console.log(`Retreiving entity names...`);
    await delay(1000); // Wait 1 second

    for (let index = 0; index < entityNewArray.length; index++) {
        const entitySelectedObject = entityNewArray[index];
        for (const key in entitySelectedObject) {
            if (entitySelectedObject[key] == entityId)
                return entitySelectedObject[fieldName];
        }

    }
    throw new Error(`Database request failed for entity names`);

}
export { isPlayerAvailableAsync, selectPlayerForRosterAsync };
