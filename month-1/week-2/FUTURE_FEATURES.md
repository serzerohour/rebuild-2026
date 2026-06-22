# Future Features — Captured Ideas

## Captaincy System Evolution

### Problem
A team needs continuity even when the captain is removed/banned. Multi-game teams may need different captains per game.

### Proposed Solution (NOT IMPLEMENTED YET)

1. **Add `founderId` to teams table**
   - Permanent role, set at team creation, immutable
   - Acts as fallback if captain is removed
   - `founderId INTEGER NOT NULL REFERENCES players(playerId) ON DELETE SET NULL`

2. **Allow captainless teams**
   - `teamCaptainId INTEGER REFERENCES players(playerId) ON DELETE SET NULL`
   - Team can operate without a captain for limited time
   - When captainless, only founder can assign new captain

3. **Multi-game captaincy (Phase 2)**
   - New table: `team_game_captains (teamId, gameId, captainId)`
   - Allows Jessica to captain Alpha-MW3 while Ali captains Alpha-CS
   - Original `teamCaptainId` becomes "default captain" or is removed

### When to implement
- After basic CRUD is solid (Week 3-4)
- After we have proper migration tooling
- After founder role auth is needed by a real feature

Soft delete pattern + partial unique index for memberships — applied. Same approach should be used for any "relationship" table where history matters.

