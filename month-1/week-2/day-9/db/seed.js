import { getDB } from "./dbConnect.js";
import { loadData } from "../services/fileService.js";
import { DATA_PATH } from "../config.js";

export const seedAllData = async () => {

    const db = getDB();

    const players = await loadData(DATA_PATH.players);
    const teams = await loadData(DATA_PATH.teams);
    const games = await loadData(DATA_PATH.games);
    const events = await loadData(DATA_PATH.events);
    const memberships = await loadData(DATA_PATH.memberships);
    const rosters = await loadData(DATA_PATH.rosters);

    const insertPlayerStatement = db.prepare(`
        INSERT OR IGNORE INTO players (playerId, playerName, playerEmail, created_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `);

    for (const player of players) {
        insertPlayerStatement.run(player.playerId, player.playerName, player.playerEmail);
    }

    const insertTeamStatement = db.prepare(`
        INSERT OR IGNORE INTO teams (teamId, teamName, teamCaptainId, created_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `);
    for (const team of teams) {
        insertTeamStatement.run(team.teamId, team.teamName, team.teamCaptainId);
    }

    const insertGameStatement = db.prepare(`
        INSERT OR IGNORE INTO games (gameId, gameName, created_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        `);

    for(const game of games){
        insertGameStatement.run(game.gameId, game.gameName);
    }

    const insertEventStatement = db.prepare(`
        INSERT OR IGNORE INTO events (eventId, eventName, gameId, eventEligibleParticipants, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `);

    for (const event of events) {
        insertEventStatement.run(event.eventId, event.eventName, event.gameId, event.eventEligibleParticipants);        
    }    

    const insertMembershipStatement = db.prepare(`
        INSERT OR IGNORE INTO memberships (membershipId, playerId, teamId, joined_at, left_at )
        VALUES (?, ?, ?, ?, ?)
        `);
    for (const membership of memberships) {
        insertMembershipStatement.run(membership.membershipId, membership.playerId, membership.teamId, membership.joined_at, membership.left_at);        
    }    

    const insertRosterStatement = db.prepare(`
        INSERT OR IGNORE INTO rosters (rosterId, playerId, teamId, eventId, registered_at, withdrawn_at)
        VALUES (?, ?, ?, ?, ?, ?)
        `);
    for (const roster of rosters) {
        insertRosterStatement.run(roster.rosterId, roster.playerId, roster.teamId, roster.eventId, roster.registered_at, roster.withdrawn_at);
    }   
    

};
