
## Goal
Become a senior full-stack JavaScript developer.
Build FindMatch V3: a real-time esports event platform.

## Commitment
30 hours per week. No switching. No quitting.

---

## Month 1 — JavaScript Core

### Week 1

#### Day 1 — Restart after 3 month break
- Topics: variables, const/let, types, functions, arrow functions, template literals
- Built: hello world restart, basic exercises
- Biggest insight: environment still works, brain still works

#### Day 2 — Business Logic & Objects
- Topics: objects, nested objects, methods, some(), find(), validation logic
- Built: FindMatch roster selection system with 5 functions
- Functions: isPlayerMemberOfTeam, isCaptainOfTeam, isPlayerAlreadyInEventRoster, selectPlayerForRoster, registerPlayerIndividually
- Tests: 8/8 passing
- Biggest insight: debugging your own logic for 3 hours without AI help is how real learning happens

#### Day 3 — Array Methods
- Topics: filter, find, map, reduce, Set, chaining, helper composition
- Built: FindMatch data helper functions
- Functions: getPlayerTeams, getTeamMembers, getEventRoster, getAvailablePlayersForEvent, getTeamsInEvent, getEventSummary, countMembersPerTeam
- Biggest insight: filter=many, find=one, some=boolean check, reduce=build final value

#### Day 4 — Modules & Architecture
- Topics: ES modules, import/export, relative paths, separation of concerns
- Built: modular FindMatch backend structure
- Structure: data/mockData.js + modules/players.js + modules/teams.js + modules/events.js + modules/rosters.js + index.js
- Biggest insight: real backends separate logic by domain, not by putting everything in one file
- All tests passing

#### Day 5 — Async JavaScript
- Topics: Promise, async, await, try/catch/finally, throw new Error
- Built: async player service and async roster selection flow
- Tested:
  - failure case: blocked already registered player
  - success case: confirmed valid player
- Biggest insight: async functions return Promises, and forgetting await causes [object Promise]