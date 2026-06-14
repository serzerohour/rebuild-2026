import { players, memberships, teams, rosters } from '../data/mockData.js';

const isCaptain = (teamId, playerId) => {
    // New version
    const isCaptainExist = teams.find(t => t.teamId == teamId && t.teamCaptainId == playerId);
    if(isCaptainExist){
        return true;
    }else{
        return false;
    }

}
const getTeamsInEvent = (eventId) => {
    let teamIdsInEvent = rosters.filter(rs => eventId === rs.eventId).map(rs => rs.teamId);
    teamIdsInEvent = [...new Set(teamIdsInEvent)];
    return teamIdsInEvent.map(teamId => teams.find(t => t.teamId === teamId));
}
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
const getTeamMembers = (teamId) => {
    const teamMembers = memberships
        .filter(ms => ms.teamId === teamId)
        .map(ms => players
            .find(player => player.playerId === ms.playerId));
    return teamMembers;

}


export { getTeamMembers, countMembersPerTeam, getTeamsInEvent, isCaptain };