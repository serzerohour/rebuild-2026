import { getPlayerByIdAsync, getPlayerTeamsAsync } from './playerService.js';
import { selectPlayerForRosterAsync } from './rosterService.js';

const runSystem = async () => {
    try {
        console.log("--- STARTING SYSTEM ---");

        // 1. Get a player
        const player = await getPlayerByIdAsync(2); 
        console.log("Success:", player.playerName);

        // 2. Get their teams
        const teams = await getPlayerTeamsAsync(2);
        console.log("Player is in:", teams.map(t => t.teamName));

        // 3. Try to select a player for a roster
        console.log("Attempting roster selection...");
        //await selectPlayerForRosterAsync(1, 2, 1, 1);
        await selectPlayerForRosterAsync(4, 5, 2, 1);

        console.log("Selection Complete!");

    } catch (error) {
        // This is the "Catch the explosion" part
        console.log("SYSTEM HALTED:", error.message);
    } finally {
        console.log("--- OPERATION FINISHED ---");
    }
};

runSystem();