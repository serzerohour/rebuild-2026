import Database from "better-sqlite3";

let db = null;

const startDB = () => {
    db = new Database('./db/findmatch.db');

    // Force foreign keys ON immediately after opening
    db.pragma('foreign_keys = ON');

}
const closeDB = () => {
    if (db) {
        db.close();

    }
    else {
        throw new Error("Can't close a database when it's not open!");

    }
}
const getDB = () => {
    if (db) return db;
    throw new Error("Database has not been initialized yet!");
}
export { startDB, closeDB, getDB };