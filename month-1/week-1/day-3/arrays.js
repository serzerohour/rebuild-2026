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

const events = [
    { eventId: 1, eventName: "Iran Dota Championship", gameId: 1, eventEligibleParticipants: "team" },
    { eventId: 2, eventName: "CS Masters League", gameId: 2, eventEligibleParticipants: "team" },
    { eventId: 3, eventName: "CoD FFA Night", gameId: 3, eventEligibleParticipants: "individual" }
];

const rosters = [];

// Pre-populate some roster data for testing
rosters.push({ playerId: 1, teamId: 1, eventId: 1 });
rosters.push({ playerId: 2, teamId: 1, eventId: 1 });
rosters.push({ playerId: 3, teamId: 1, eventId: 1 });
rosters.push({ playerId: 2, teamId: 2, eventId: 2 });
rosters.push({ playerId: 4, teamId: 2, eventId: 2 });


// Function that print result
const echo = (message) => {
    console.log(message);
};

//Returns all teams a specific player belongs to. It returns the team names
const getPlayerTeamData = (playerId) => {
    let resultArray = memberships
        .filter(membership => membership.playerId === playerId)
        .map(membership => teams.find(t => t.teamId === membership.teamId));
    //.map(t => t.teamName);
    return resultArray;
}
// Return all players that belong to a specific team.
const getTeamMembers = (teamId) => {
    const teamMembers = memberships
        .filter(ms => ms.teamId === teamId)
        .map(ms => players
            .find(player => player.playerId === ms.playerId));
    return teamMembers;

}
// Return all confirmed players of one team in one event.
const getEventRoster = (teamId, eventId) => {
    const teamRosterEntries = rosters.filter(rs => rs.teamId === teamId && rs.eventId === eventId);
    return teamRosterEntries.map(gcrot => players.find(player => player.playerId === gcrot.playerId));

}
//echo(getEventRoster(2, 2));

// Return all players in a team who are still eligible to be selected for that event.
const getAvailablePlayersForEvent = (teamId, eventId) => {
    const confirmedRosters = rosters.filter(r => r.eventId === eventId);
    const teamMembers = getTeamMembers(teamId);
    return teamMembers.filter(tm => !confirmedRosters.some(cR => cR.playerId === tm.playerId));



}
//echo(getAvailablePlayersForEvent(2, 1));

//Return the list of teams that already have at least one confirmed player in that event.
const getTeamsInEvent = (eventId) => {
    let teamIdsInEvent = rosters.filter(rs => eventId === rs.eventId).map(rs => rs.teamId);
    teamIdsInEvent = [...new Set(teamIdsInEvent)];
    return teamIdsInEvent.map(teamId => teams.find(t => t.teamId === teamId));
}

//echo(getTeamsInEvent(1));
//echo(getTeamsInEvent(2));

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
//echo(getEventSummary(1));

//must return:
const countMembersPerTeam = () => {
    const teamMemberCounts = memberships.reduce((acc, member) => {
        const teamObjectData = teams.find(t => t.teamId === member.teamId);
        if (acc[teamObjectData.teamName]) {
            acc[teamObjectData.teamName] = acc[teamObjectData.teamName] + 1;
        } else {
            acc[teamObjectData.teamName] = 1;
        }
        return acc;

    }, {});
    return teamMemberCounts;
};

echo(countMembersPerTeam());