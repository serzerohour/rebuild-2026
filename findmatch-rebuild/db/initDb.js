import Database from "better-sqlite3";
import { readFile } from 'fs/promises';

const filePath = './db/schema.sql';
const initializeDatabase = async () => {
    const db = new Database('./db/findmatch.db');   // ← moved inside
    try {
        console.log(`Loading data from ${filePath}...`);
        const rawData = await readFile(filePath, 'utf-8');
        db.exec(rawData);
        console.log("✅ Schema executed successfully. Tables created.");
    }
    catch (error) {
        // If file doesn't exist or is corrupted
        if (error.code === 'ENOENT') {
            console.log(`File not found: ${filePath}.`);
            return [];

        }
        throw new Error(`Failed to load ${filePath}: ${error.message}`);

    }
    finally {
        db.close();    // Always close, even if error
        console.log("Database connection closed.");
    }

};

initializeDatabase().then(() => {
    console.log("🎉 Database initialization completed successfully!");
})
    .catch((err) => {
        console.error("💥 Database initialization failed:", err.message);
    });

