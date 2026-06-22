import Database from "better-sqlite3";

const db = new Database('./db/findmatch.db');

console.log("📋 Tables in the database:");

const tables = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    AND name NOT LIKE 'sqlite_%'

`).all();
console.table(tables);

db.close();