import { rosters, events } from '../data/mockData.js';
import { getTeamsInEvent } from './teams.js';

/*
Goal
Return an object like:
{
  eventName: "Iran Dota Championship",
  totalConfirmedPlayers: 3,
  totalTeams: 1
}
*/
const getEventSummary = (eventId) => {
    const eventData = events.find(ev => ev.eventId === eventId);

    const totalConfirmedPlayers = rosters.filter(rs => rs.eventId == eventId).reduce((acc) => acc + 1, 0);

    const totalTeams = getTeamsInEvent(eventId).length;
    return { eventName: eventData["eventName"], totalConfirmedPlayers: totalConfirmedPlayers, totalTeams: totalTeams };

}

const isTeamEvent  = (eventId) => {
     // New version:
         return events.some(e => e.eventId == eventId && e.eventEligibleParticipants === "team" );
}

const isIndividualEvent  = (eventId) => {
     // New version:
         return events.some(e => e.eventId == eventId && e.eventEligibleParticipants === "individual" );
}

 
export { getEventSummary, isIndividualEvent, isTeamEvent};