import { getPlayerByIdAsync, getPlayerTeamsAsync } from './playerService.js';
import { selectPlayerForRosterAsync, isPlayerAvailableAsync } from './rosterService.js';

const runSystem = async () => {
    console.log("=== DAY 5 FINAL TESTS ===\n");

    // TEST 1: Get a player that exists
    console.log("TEST 1: Get player 2");
    try {
        const player = await getPlayerByIdAsync(2);
        console.log("✓ PASS:", player.playerName);
    } catch (error) {
        console.log("✗ FAIL:", error.message);
    }

    console.log("");

    // TEST 2: Get a player that does NOT exist
    console.log("TEST 2: Get player 999 (should fail)");
    try {
        const player = await getPlayerByIdAsync(999);
        console.log("✗ FAIL: Should have thrown error");
    } catch (error) {
        console.log("✓ PASS:", error.message);
    }

    console.log("");

    // TEST 3: Get player teams
    console.log("TEST 3: Get teams for player 2");
    try {
        const teams = await getPlayerTeamsAsync(2);
        console.log("✓ PASS:", teams.map(t => t.teamName));
    } catch (error) {
        console.log("✗ FAIL:", error.message);
    }

    console.log("");

    // TEST 4: Select player for roster (should SUCCEED)
    // Captain 4 selects player 5 for team 2 in event 1
    console.log("TEST 4: Valid roster selection");
    try {
        await selectPlayerForRosterAsync(4, 5, 2, 1);
        console.log("✓ PASS: Player added to roster");
    } catch (error) {
        console.log("✗ FAIL:", error.message);
    }

    console.log("");

    // TEST 5: Select same player again (should FAIL - already registered)
    console.log("TEST 5: Duplicate roster selection (should fail)");
    try {
        await selectPlayerForRosterAsync(4, 5, 2, 1);
        console.log("✗ FAIL: Should have thrown error");
    } catch (error) {
        console.log("✓ PASS:", error.message);
    }

    console.log("");

    // TEST 6: Non-captain tries to select (should FAIL)
    console.log("TEST 6: Non-captain selection (should fail)");
    try {
        await selectPlayerForRosterAsync(2, 4, 2, 1); // player 2 is not captain of team 2
        console.log("✗ FAIL: Should have thrown error");
    } catch (error) {
        console.log("✓ PASS:", error.message);
    }

    console.log("");

    // TEST 7: Select player not in team (should FAIL)
    console.log("TEST 7: Player not in team (should fail)");
    try {
        await selectPlayerForRosterAsync(4, 1, 2, 1); // player 1 is not in team 2
        console.log("✗ FAIL: Should have thrown error");
    } catch (error) {
        console.log("✓ PASS:", error.message);
    }

    console.log("");

    console.log("=== ALL TESTS COMPLETE ===");
};

runSystem();