import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "./config.js";

const getTeamById = async (teamId) =>{
    const allTeams = await loadData(DATA_PATH.teams);
    const teamData = allTeams.find(aT => aT.teamId === teamId);
    if(teamData === undefined){
        throw new Error("No such team with that specified id");        
    }
   return teamData;

};

const getTeamWithMembers = async (teamId) => {
    // your code here
    const teamMembers = memberships
        .filter(ms => ms.teamId === teamId)
        .map(ms => players
            .find(player => player.playerId === ms.playerId));
    return teamMembers;
};

export { getTeamById, getTeamWithMembers };