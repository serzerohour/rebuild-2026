import {rosters, players} from '../data/mockData.js';
import { getTeamMembers, isCaptain} from './teams.js';
import { isPlayerRegisteredIndividual, isPlayerAlreadyInEventRoster , isPlayerMemberOfTeam, findEntityNameById} from './players.js';
import { isTeamEvent } from './events.js';



const getEventRoster = (teamId, eventId) => {
    const teamRosterEntries = rosters.filter(rs => rs.teamId === teamId && rs.eventId === eventId);
    return teamRosterEntries.map(gcrot => players.find(player => player.playerId === gcrot.playerId));

}


// Return all players in a team who are still eligible to be selected for that event.
const getAvailablePlayersForEvent = (teamId, eventId) => {
    const confirmedRosters = rosters.filter(r => r.eventId === eventId);
    const teamMembers = getTeamMembers(teamId);
    return teamMembers.filter(tm => !confirmedRosters.some(cR => cR.playerId === tm.playerId));

}

const selectPlayerForRoster = (captainId, playerId, teamId, eventId) => {
    if (!isCaptain(teamId, captainId)) {
        console.log("Only the captain can select roster");
    }
    else if (!isPlayerMemberOfTeam(playerId, teamId)) {
        console.log("Player is not a member of this team");
    }
    else if (isPlayerAlreadyInEventRoster(playerId, eventId)) {
        console.log("Player is already registered in this event");
    }
    else {

        // Push new object data to roster array        
        rosters.push({ playerId, teamId, eventId });
        console.log(`Player ${findEntityNameById(playerId, "player")} confirmed for team ${findEntityNameById(teamId, "team")} in ${findEntityNameById(eventId, "event")}`);
    }
}

const registerPlayerIndividually = (playerId, eventId) => {
    
    if(isTeamEvent(eventId)){
        console.log("This event is made for the teams.");
        return false;
    }

    if (isPlayerRegisteredIndividual(playerId, eventId)) {
        console.log("Already registered");
        return false;
    }
        const tempPlayerName = findEntityNameById(playerId, "player");
        const tempEventName = findEntityNameById(eventId, "event");
        individualRegistrations.push({ playerId, eventId });
        console.log(`Player ${tempPlayerName} registered for ${tempEventName}`);
        return true;    
}

export{isPlayerAlreadyInEventRoster, registerPlayerIndividually,  selectPlayerForRoster, getAvailablePlayersForEvent, getEventRoster};