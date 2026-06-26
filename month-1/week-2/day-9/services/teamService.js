import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "../config.js";
//import { delay, isEmptyArray } from "../utils/helper.js"

const getTeamById = async (teamId) => {
    const allTeams = await loadData(DATA_PATH.teams);
    const teamData = allTeams.find(aT => aT.teamId === teamId);
    if (teamData === undefined) {
        throw new Error("No such team with that specified id");
    }
    return teamData;

};

const getTeamWithMembers = async (teamId) => {
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

const getAllTeams = async () => {
    return await loadData(DATA_PATH.teams);
};

export { getAllTeams, getTeamById, getTeamWithMembers };