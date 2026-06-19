import express from 'express';
import { loadData } from './services/fileService.js';
import { selectPlayerForRosterAsync } from './services/rosterService.js';

const app = express();
const PORT = 3000;

// Middleware: parse JSON bodies  from POST requests

app.use(express.json());

// Routes

// Health check - confirm server is alive
app.get('/api/health',(req, res) =>{
    res.json({
        status: 'ok',
        message: 'FindMatch API is running'
    });
});

// Get all rosters from JSON file

app.get('/api/rosters', async(req,res) => {
    try{
        const rosters = await loadData('./data/rosters.json');
        res.json(rosters);
    }
    catch(error){
        res.status(500).json({ error: error.message});

    }
})

// Select a player for a roster

app.post('/api/rosters/select',async (req, res) => {
    try{
        const { captainId, playerId, teamId, eventId} = req.body;

        // Validate required fields
        if( captainId === undefined || playerId === undefined || teamId === undefined || eventId === undefined){
            return res.status(400).json({error: 'captainId, playerId, teamId and eventId are required'});
        }
        await  selectPlayerForRosterAsync(captainId, playerId, teamId, eventId);
        res.status(201).json({ message: 'Player added successfully to roster'});
    }
    catch(error) {
        res.status(400).json({error: error.message});

    }
});

// Start server
app.listen(PORT, () =>{
    console.log(`FindMatch API running at http://localhost:${PORT}`);
} );
