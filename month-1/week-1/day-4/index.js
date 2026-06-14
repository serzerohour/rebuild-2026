// index.js

import { getPlayerTeams, getPlayerById } from './modules/players.js';
import { getTeamMembers, countMembersPerTeam } from './modules/teams.js';
import { getEventSummary } from './modules/events.js';
import { getEventRoster, getAvailablePlayersForEvent, selectPlayerForRoster } from './modules/rosters.js';

// === TESTS ===

console.log("=== Player Teams ===");
console.log(getPlayerTeams(2));

console.log("=== Team Members ===");
console.log(getTeamMembers(1));

console.log("=== Event Summary ===");
console.log(getEventSummary(1));

console.log("=== Event Roster ===");
console.log(getEventRoster(1, 1));

console.log("=== Available Players ===");
console.log(getAvailablePlayersForEvent(2, 1));

console.log("=== Members Per Team ===");
console.log(countMembersPerTeam());

console.log("=== Select Player For Roster ===");
selectPlayerForRoster(4, 5, 2, 1);
selectPlayerForRoster(4, 2, 2, 1);