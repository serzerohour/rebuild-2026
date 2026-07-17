import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "../config.js";
import { getDB } from "../db/dbConnect.js";

const selectPlayerForRosterAsyncJson = async (captainId, playerId, teamId, eventId) => {


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
const selectPlayerForRoster = (captainId, playerId, teamId, eventId) => {
    const db = getDB();
    let isCaptain = db.prepare(`
        SELECT t.teamId,t.teamCaptainId
        FROM teams t
        WHERE t.teamId = ? AND t.teamCaptainID = ? 
    `);
    isCaptain = isCaptain.get(teamId, captainId);
    if (isCaptain === undefined) throw new Error("Only the captain can select roster.");

    let isMember = db.prepare(`
        SELECT * FROM memberships m 
        WHERE m.playerId = ? AND m.teamId = ? AND left_at is NULL
        `).get(playerId, teamId);
    if (isMember === undefined) throw new Error("Player is not a member of this team.");

    let isAlreadyRegistered = db.prepare(`
        SELECT * FROM rosters r
        WHERE r.playerId = ? AND r.eventId = ? AND r.withdrawn_at IS NULL
`).get(playerId, eventId);
    if (isAlreadyRegistered) throw new Error("Player is already registered in this event.");

    const insertRosterStatement = db.prepare(`
        INSERT INTO rosters ( playerId, teamId, eventId)
        VALUES (?, ?, ?)
        `).run(playerId, teamId, eventId);
    return { latestChange: insertRosterStatement, insertData: [playerId, teamId, eventId] }

}
const getAllRostersJson = async () => {
    return await loadData(DATA_PATH.rosters);
};
const getAllRosters = () => {
    const db = getDB();
    let allRosters = db.prepare(
        'SELECT * FROM rosters'
    );
    allRosters = allRosters.all();
    if (allRosters.length === 0) {
        throw new Error("There is no roster in the database yet!");
    }
    return allRosters;

};

export { getAllRosters, selectPlayerForRoster };