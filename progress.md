
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
- Topics: Promise, async, await, try/catch/finally, throw new Error, Promise.all
- Built:
  - playerService.js (async player lookup)
  - rosterService.js (async roster selection with validation)
  - findEntityNameByIdAsync helper
- Tests: 7/7 passing
- Key bugs fixed:
  - delay not returning Promise
  - wrong field lookup in helper
  - console.log instead of throw for errors
  - validation order (validate before fetch)
- Biggest insight: async functions must throw errors, not just log them

#### Day 6 — File Persistence
- Topics: fs/promises, readFile, writeFile, JSON.parse, JSON.stringify, ENOENT error handling
- Built:
  - fileService.js (loadData, saveData)
  - rosterService.js (file-based roster selection)
  - JSON data files for all entities
- Tests:
  - First run: player added successfully
  - Second run: duplicate correctly rejected
- Key insight: Data now survives program restart - this is real persistence

Day 7 & 8 Day 8 deliverables:

✅ 4 new endpoints (/api/teams, /api/teams/:teamId, /api/teams/:teamId/members, /api/events/:eventId/roster)
✅ 1 endpoint refactored to service layer (/api/teams and /api/rosters)
✅ 2 new service files (teamService.js, eventService.js) — wait, you had teamService — so 1 new (eventService.js)
✅ URL parameter parsing with req.params
✅ Input validation with isNaN guard clauses
✅ Proper HTTP status codes (200, 400, 404, 500)
✅ Multi-file data joins (.filter().map().find() patterns)
✅ Nested response shapes (event metadata + nested player array)
✅ Distinguishing "not found" (404) vs "empty result" (200 with [])
✅ Created a utils/helper.js on your own initiative
✅ Debugged a server-hang bug (forgot res.json)
✅ Debugged a missing await async bug
✅ Pushed back when my feedback didn't fit your context
