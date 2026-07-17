import express from 'express';
import { loadData } from './services/fileService.js';
import { selectPlayerForRoster, getAllRosters } from './services/rosterService.js';
import { getTeamById, getTeamWithMembers, getAllTeams } from './services/teamService.js';
import { getEventRosterWithDetails } from './services/eventService.js';
import { seedAllData } from './db/seed.js';
import { startDB } from './db/dbConnect.js';


const app = express();
const PORT = 3000;

startDB();

// Middleware: parse JSON bodies  from POST requests

app.use(express.json());

// Routes

// Health check - confirm server is alive
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'FindMatch API is running'
    });
});

// Get all rosters from JSON file

app.get('/api/rosters',  (req, res) => {
    try {
        const rosters =  getAllRosters();
        res.json(rosters);
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})

// Get all teams with json request
/*
app.get('/api/teams', async (req, res) => {
    try {
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
});
*/
// Get all teams from db
app.get('/api/teams', (req, res) => {
    try {
        //const teams = await getAllTeamsWithJson();
        const teams = getAllTeams();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a specific team by Id
app.get('/api/teams/:teamId',  (req, res) => {
    try {
        const requestTeamId = parseInt(req.params.teamId);
        if (isNaN(requestTeamId)) {
            return res.status(400).json({ error: 'Team id is not a valid number' });
        }
        const teamData = getTeamById(requestTeamId);
        res.status(200).json(teamData);

    }
    catch (error) {
        if (error.message.includes("No such team")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }

    }
});

// Get all members of a specific team
app.get('/api/teams/:teamId/members', (req, res) => {
    // your code here
    try {
        const requestTeamId = parseInt(req.params.teamId);
        if (isNaN(requestTeamId)) {
            return res.status(400).json({ error: 'Team id is not a valid number' });
        }
        const teamMembersData = getTeamWithMembers(requestTeamId);
        res.status(200).json(teamMembersData);
    }
    catch (error) {
        if (error.message.includes("No such team")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }

    }

});

// Get rosters info of a specific event
app.get('/api/events/:eventId/roster',  (req, res) => {
    // your code here
    try {
        const requestedEventId = parseInt(req.params.eventId);

        if (isNaN(requestedEventId)) {
            return res.status(400).json({ error: 'event id is not a valid number' });
        }

        const eventAndRosterResult =  getEventRosterWithDetails(requestedEventId);
        res.status(200).json(eventAndRosterResult);
    }
    catch (error) {
        if (error.message.includes("No such event") || error.message.includes("No roster")) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }

    }

});


// Select(register) a player for a roster
app.post('/api/rosters/select',  (req, res) => {
    try {
        const { captainId, playerId, teamId, eventId } = req.body;

        // Validate required fields
        if (captainId === undefined || playerId === undefined || teamId === undefined || eventId === undefined) {
            return res.status(400).json({ error: 'captainId, playerId, teamId and eventId are required' });
        }
         let result = selectPlayerForRoster(captainId, playerId, teamId, eventId);
        res.status(201).json({ 
    message: 'Player added successfully to roster', 
    data: result 
});
    }
    catch (error) {
        res.status(400).json({ error: error.message });

    }
});

app.post('/api/database/insert/:securityKey', async (req, res) => {

    try {
        const secuityKey = parseInt(req.params.securityKey);
        if(secuityKey !== 321) return res.status(401).json({error: `Unauthorized access!`});
        await seedAllData();
        res.status(200).json({message: `All json files got insert to database.`});

    }
    catch (error) {
        console.log("Haaaaaaaaaa");
        res.status(400).json({ error: error.message });

    }

});



// Start server
app.listen(PORT, () => {
    console.log(`FindMatch API running at http://localhost:${PORT}`);
});
