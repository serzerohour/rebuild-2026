import { loadData, saveData } from "./fileService.js";
import { DATA_PATH } from "./config.js";

const getEventRosterWithDetails = async (eventId) => {

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


const getEventData = async (eventId) => {
    const allEvents = await loadData(DATA_PATH.events);
    const eventData = allEvents.find(aE => aE.eventId === eventId);
    if (eventData === undefined) {
        throw new Error("No such event with that specified id");
    }
    return eventData;

}


export { getEventRosterWithDetails };