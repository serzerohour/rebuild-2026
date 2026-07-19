import { selectPlayerForRosterAsync } from './services/rosterService.js';
import { loadData } from './services/fileService.js';

const testPersistence = async () => {
    try {
        console.log("--- STARTING PERSISTENCE TEST ---");

        // Look at the file BEFORE we do anything
        const currentRosters = await loadData('./data/rosters.json');
        console.log(`Current roster count in file: ${currentRosters.length}`);

        // Try to add a player
        // Use: Captain 4, Player 5, Team 2, Event 1
        await selectPlayerForRosterAsync(4, 5, 2, 1);

    } catch (error) {
        console.log("EXPECTED BLOCK:", error.message);
    } finally {
        console.log("--- TEST FINISHED ---");
    }
};

testPersistence();