// services/fileService.js
import { readFile, writeFile } from 'fs/promises';
import { json } from 'stream/consumers';

const loadData = async (filePath) => {
    try {
        console.log(`Loading data from ${filePath}...`);
        const rawData = await readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        return jsonData;
    }
    catch (error) {
        // If file doesn't exist or is corrupted
        if (error.code === 'ENOENT') {
            console.log(`File not found: ${filePath}. Returning empty array.`);
            return [];

        }
        throw new Error(`Failed to load ${filePath}: ${error.message}`);

    }
};

const saveData = async (filePath, data) => {
    try {
        console.log(`Saving data to ${filePath}...`);
        const jsonString = JSON.stringify(data, null, 2);
        await writeFile(filePath, jsonString, 'utf-8');
        console.log(`Data saved successfully to ${filePath}`);

    }
    catch (error) {
        throw new Error(`Failed to save ${filePath}: ${error.message}`);

    }
}

export { loadData, saveData };
