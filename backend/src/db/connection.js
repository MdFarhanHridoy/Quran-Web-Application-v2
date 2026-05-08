import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'quran.db');

console.log('Database path:', dbPath);

let dbInstance = null;

export function getDatabase() {
  if (!dbInstance) {
    try {
      dbInstance = new Database(dbPath, { readonly: true });
      console.log('Connected to Quran database');
    } catch (err) {
      console.error('Error opening database:', err.message);
      throw err;
    }
  }
  return dbInstance;
}

export function closeDatabase() {
  if (dbInstance) {
    try {
      dbInstance.close();
      console.log('Database connection closed');
      dbInstance = null;
    } catch (err) {
      console.error('Error closing database:', err.message);
    }
  }
}

export default getDatabase();
