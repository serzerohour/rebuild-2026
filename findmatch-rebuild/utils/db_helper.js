// isCaption: Check if someone Id is a captain of specific teamId

/* --- Global variables */
const TABLE_CONFIG = {
    players: 'playerId',
    teams: 'teamId',
    games: 'gameId',
    events: 'eventId',
    memberships: 'membershipId',
    rosters: 'rosterId'
};

/* ---Validator helpers section--- */
const isCaptain = (dbObject, captainId, teamId, shouldThrow = true) => {
    let result = dbObject.prepare(`
        SELECT t.teamId,t.teamCaptainId
        FROM teams t
        WHERE t.teamId = ? AND t.teamCaptainID = ? 
    `).get(teamId, captainId);
    if (shouldThrow && result === undefined) throw new Error("Only the captain of the team is authorized to execute the task");
};

const isMemberOfTeam = (dbObject, playerId, teamId, shouldThrow = true) => {
    let result = dbObject.prepare(`
        SELECT * FROM memberships m 
        WHERE m.playerId = ? AND m.teamId = ? AND left_at is NULL
        `).get(playerId, teamId);
    if (shouldThrow && result === undefined) throw new Error("Player is not a member of this team.");
};

const isAlreadyRegistered = (dbObject, playerId, eventId, shouldThrow = true) => {
    let result = dbObject.prepare(`
        SELECT * FROM rosters r
        WHERE r.playerId = ? AND r.eventId = ? AND r.withdrawn_at IS NULL
`).get(playerId, eventId);
    if (shouldThrow && result) throw new Error("Player is already registered in this event.");
};

/* ---Retriever functions Section--- */

const getAnEntityById = (dbObject, entityId, entityName, shouldThrow = true) => {

    const field_id = TABLE_CONFIG[entityName];
    if (!field_id) {
        throw new Error('Invalid table name');
    }
    // tableName is now proven safe — it can ONLY be one of your 6 known strings
    let result = dbObject.prepare(`SELECT * FROM ${entityName} WHERE ${field_id} = ?`).get(entityId);
    if (shouldThrow && result === undefined) throw new Error(`No ${entityName} information with that specific Id`);
    return result;
};

const getAllEntity = (dbObject, entityName, shouldThrow = true) => {
    if(!TABLE_CONFIG[entityName]) throw new Error('Invalid table name');;
    let result = dbObject.prepare(
        `SELECT * FROM ${entityName}`
    ).all();
    if (result.length === 0) {
        throw new Error(`There are no ${entityName} in the database yet!`);
    }
    return result;
}
const isPlayerActiveRoster = (dbObject, playerId, eventId, shouldThrow = true) =>  {
    let result = dbObject.prepare(`
        SELECT * FROM rosters r
        WHERE r.playerId = ? AND r.eventId = ? AND r.withdrawn_at IS NULL
`).get(playerId, eventId);
    if (shouldThrow && result === undefined) throw new Error("Player is not actively registered for this event.");
};



export { isCaptain, isMemberOfTeam, isAlreadyRegistered, getAnEntityById, getAllEntity, isPlayerActiveRoster };