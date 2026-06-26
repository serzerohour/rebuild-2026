import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "../config.js";

const selectPlayerForRosterAsync = async (captainId, playerId, teamId, eventId) => {

   
    //Load data
    const teams = await loadData(DATA_PATH.teams);
    const memberships = await loadData(DATA_PATH.memberships);
    const rosters = await loadData(DATA_PATH.rosters);

    // 2. Validation (Same logic as yesterday, but using the files we just loaded)
    const isCaptain = teams.some(t => t.teamId === teamId && t.teamCaptainId === captainId);
    if (!isCaptain) throw new Error("Only the captain can select roster.");

    const isMember = memberships.some(m => m.playerId === playerId && m.teamId === teamId);
    if (!isMember) throw new Error("Player is not a member of this team.");

    const isAlreadyRegistered = rosters.some(r => r.playerId === playerId && r.eventId === eventId);
    if (isAlreadyRegistered) throw new Error("Player is already registered in this event.");

    // 3. Update the local array
    rosters.push({ playerId, teamId, eventId });

    await saveData(DATA_PATH.rosters, rosters);
    console.log(`Success: Player ${playerId} added to Team ${teamId} for Event ${eventId}`);

}
const getAllRosters = async () => {
        return await loadData(DATA_PATH.rosters);
};
export {getAllRosters, selectPlayerForRosterAsync};