import { getDB } from "../db/dbConnect.js";
import { isCaptain, isMemberOfTeam, isAlreadyRegistered, getAllEntity, isPlayerActiveRoster } from "../utils/db_helper.js";

const selectPlayerForRoster = (captainId, playerId, teamId, eventId) => {
    const db = getDB();
    isCaptain(db, captainId, teamId);
    isMemberOfTeam(db, playerId, teamId);
    isAlreadyRegistered(db, playerId, eventId);  
    const insertRosterStatement = db.prepare(`
        INSERT INTO rosters ( playerId, teamId, eventId)
        VALUES (?, ?, ?)
        `).run(playerId, teamId, eventId);
    return { latestChange: insertRosterStatement, insertData: [playerId, teamId, eventId] };
}

const kickRoster = (captainId, playerId, teamId, eventId) => {
    const db = getDB();
    isCaptain(db, captainId, teamId);
    isMemberOfTeam(db, playerId, teamId);
    isPlayerActiveRoster(db, playerId, eventId);
    console.log(111111111);
    const statement = db.prepare(`
        UPDATE rosters
        SET withdrawn_at = CURRENT_TIMESTAMP
        WHERE playerId = @varPlayerId AND eventId = @varEventId
        `);
    let updateResult = statement.run({varPlayerId: playerId, varEventId: eventId})    
    if(updateResult.changes !== 1) throw new Error("Failed to remove player from the rosters");    
};

const getAllRosters = () => {
    const db = getDB();
    return getAllEntity(db,"rosters");
};

export { getAllRosters, selectPlayerForRoster, kickRoster };

/*
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
    const getAllRostersJson = async () => {
    return await loadData(DATA_PATH.rosters);
};
    */