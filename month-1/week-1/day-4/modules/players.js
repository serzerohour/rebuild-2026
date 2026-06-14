// modules/players.js

import { players, memberships, teams, rosters, events } from '../data/mockData.js';
import { isTeamEvent } from './events.js';


// Returns all teams a player belongs to
const getPlayerTeams = (playerId) => {
    return memberships
        .filter(m => m.playerId === playerId)
        .map(m => teams.find(t => t.teamId === m.teamId));
};

// Returns a player object by ID
const getPlayerById = (playerId) => {
    return players.find(p => p.playerId === playerId) || null;
};

// Returns all players
const getAllPlayers = () => {
    return players;
};

const isPlayerMemberOfTeam = (playerId, teamId) => {
    // New version
    return  memberships.some(m => m.playerId == playerId && m.teamId == teamId);
}
const isPlayerAlreadyInEventRoster = (playerId, eventId) => {

   // New version
    return  rosters.some(r => r.playerId == playerId && r.eventId == eventId);

}


const isPlayerRegisteredIndividual = (playerId, eventId) => {
 
   // New way:
   return individualRegistrations.some(iR => iR.playerId === playerId && iR.eventId === eventId);

}

const findEntityNameById = (entityId, entityType) => {
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

    for (let index = 0; index < entityNewArray.length; index++) {
        const entitySelectedObject = entityNewArray[index];
        for (const key in entitySelectedObject) {
            if (entitySelectedObject[key] == entityId)
                return entitySelectedObject[fieldName];
        }

    }
    return false;
}

export { getPlayerTeams, getPlayerById, getAllPlayers, isPlayerRegisteredIndividual, isPlayerAlreadyInEventRoster, isPlayerMemberOfTeam, findEntityNameById};