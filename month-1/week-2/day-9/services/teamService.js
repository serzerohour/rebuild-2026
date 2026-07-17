import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "../config.js";
import { getDB } from '../db/dbConnect.js';
//import { delay, isEmptyArray } from "../utils/helper.js"

const getTeamByIdJson = async (teamId) => {
    const allTeams = await loadData(DATA_PATH.teams);
    const teamData = allTeams.find(aT => aT.teamId === teamId);
    if (teamData === undefined) {
        throw new Error("No such team with that specified id");
    }
    return teamData;

};
const getTeamById = (teamId) => {
    const db = getDB();
    let team = db.prepare(`
        SELECT * FROM teams
        WHERE teamId = ?
        `);
    team = team.get(teamId);
    if (team === undefined) throw new Error("No such team with that specific Id");
    else return team;    
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
const getTeamWithMembers = (teamId) => {
    // your code here
    let team = getTeamById(teamId);
    const db = getDB();
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
    return {...team, members: teamMembers};

};


const getAllTeamsWithJson = async () => {
    return await loadData(DATA_PATH.teams);
};
// db.get() returns only 1 row but all() returns all result
const getAllTeams = () => {
    const db = getDB();
    let allTeams =  db.prepare(
        'SELECT * FROM teams'
    );
    allTeams = allTeams.all();
    if (allTeams.length === 0) {
        throw new Error("There no teams in the database yet!");
    }
    return allTeams;

};

export { getTeamById, getTeamWithMembers, getAllTeams };