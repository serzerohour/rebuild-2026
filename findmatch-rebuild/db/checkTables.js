import { getDB, startDB } from "./dbConnect.js";

startDB();
const db = getDB();

let result = db.prepare(`
    SELECT COUNT(*) AS count FROM players
    `);
    
    console.table(result.get());


    result = db.prepare(`
    SELECT COUNT(*) AS count FROM teams
    `);
    
    console.table(result.get());

    result = db.prepare(`
    SELECT COUNT(*) AS count FROM games
    `);
    
    console.table(result.get());

    result = db.prepare(`
    SELECT COUNT(*) AS count FROM events
    `);
    
    console.table(result.get());

    result = db.prepare(`
    SELECT COUNT(*) AS count FROM memberships
    `);
    
    console.table(result.get());

    result = db.prepare(`
    SELECT COUNT(*) AS count FROM rosters
    `);
    
    console.table(result.get());





    