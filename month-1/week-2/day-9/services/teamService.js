import { getDB } from '../db/dbConnect.js';
import { isCaptain, isMemberOfTeam, getAnEntityById, getAllEntity } from '../utils/db_helper.js';

const getTeamById = (teamId) => {
    const db = getDB();
    return getAnEntityById(db, teamId, "teams");
};
const getAllTeams = () => {
    const db = getDB();
    return getAllEntity(db, "teams");
};

const getTeamWithMembers = (teamId) => {
    const db = getDB();
    let team = getTeamById(teamId);
    let teamMembers = db.prepare(`
        SELECT p.playerId, p.playerName, p.playerEmail
        FROM memberships m
        INNER JOIN players p ON p.playerId = m.playerId
        WHERE m.teamId = ? AND m.left_at IS NULL
        `);
    teamMembers = teamMembers.all(teamId);
    if (teamMembers.length === 0) {
        throw new Error("There are no players within this team");
    }
    return { ...team, members: teamMembers };

};

const kickMember = (captainId, playerId, teamId) => {
    const db = getDB();
    // Does this team exist ?
    getTeamById(teamId);
    // Is captainId really the captain of team?
    isCaptain(db, captainId, teamId);
    // Is the unfortunate playerId member of the team?
    isMemberOfTeam(db, playerId, teamId);

    // Remove(update) the player from team by going into memberships table
    let statement = db.prepare(`
        UPDATE memberships
        SET left_at = CURRENT_TIMESTAMP
        WHERE playerId = @varPlayerId AND teamId = @varTeamId
        `);
    let updateResult = statement.run({ varPlayerId: playerId, varTeamId: teamId });
    if(updateResult.changes !== 1) throw new Error("Failed to remove player from the team.");    

};

export { getTeamById, getTeamWithMembers, getAllTeams, kickMember };

/*
const getTeamByIdJson = async (teamId) => {
    const allTeams = await loadData(DATA_PATH.teams);
    const teamData = allTeams.find(aT => aT.teamId === teamId);
    if (teamData === undefined) {
        throw new Error("No such team with that specified id");
    }
    return teamData;

};
const getTeamWithMembersJson = async (teamId) => {
    // your code here
    await getTeamById(teamId);
    const allPlayers = await loadData(DATA_PATH.players);
    const newMemberships = await loadData(DATA_PATH.memberships);
    const teamMembers = newMemberships
        .filter(ms => ms.teamId === teamId)
        .map(ms => allPlayers
            .find(player => player.playerId === ms.playerId));

    return teamMembers;

};

const getAllTeamsWithJson = async () => {
    return await loadData(DATA_PATH.teams);
};
*/
