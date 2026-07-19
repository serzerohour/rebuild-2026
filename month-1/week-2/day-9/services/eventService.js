import { getDB } from "../db/dbConnect.js";
import { getAnEntityById } from "../utils/db_helper.js";

/*
const getEventRosterWithDetailsJson = async (eventId) => {

    const event = await getEventData(eventId);
    const rostersData = await loadData(DATA_PATH.rosters);
    const teamsData = await loadData(DATA_PATH.teams);
    const playersData = await loadData(DATA_PATH.players);
    const finalInfo = rostersData.filter(rE => rE.eventId === eventId).map(rE => {

        let player = playersData.find(
            pr => pr.playerId === rE.playerId
        );

        let team = teamsData.find(
            tm => tm.teamId === rE.teamId
        );
        return {
            playerId: player.playerId,
            playerName: player.playerName,
            teamId: team.teamId,
            teamName: team.teamName
        };

    });
    return {
        eventId: event.eventId,
        eventName: event.eventName,
        registeredPlayers: finalInfo
    };

}
    const getEventDataJson = async (eventId) => {
    const allEvents = await loadData(DATA_PATH.events);
    const eventData = allEvents.find(aE => aE.eventId === eventId);
    if (eventData === undefined) {
        throw new Error("No such event with that specified id");
    }
    return eventData;
}

    */
const getEventRosterWithDetails = (eventId) => {
    const db = getDB();
    let event = getEventWithId(eventId);
    let rostersDetail = db.prepare(`
        SELECT * FROM  rosters r
    INNER JOIN players p ON p.playerId = r.playerId
    INNER JOIN teams t ON t.teamId = r.teamId
    WHERE r.eventId = ? AND r.withdrawn_at IS NULL
        `).all(eventId);
    if(rostersDetail.length === 0) throw new Error("No roster found with that specific event id");   
    return {...event, rosters: rostersDetail };

};

const getEventWithId = (eventId) =>{
    const db = getDB();
    return getAnEntityById(db,eventId,"events");

};

export { getEventRosterWithDetails, getEventWithId };