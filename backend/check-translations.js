import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'src', 'db', 'quran.db');

console.log('Checking translations for surah 1, ayah 1...');

try {
  const db = new Database(dbPath, { readonly: true });

  const translations = db.prepare(
    "SELECT * FROM translations WHERE verse_key = '1:1'"
  ).all();

  console.log('Translations for 1:1:');
  console.log(JSON.stringify(translations, null, 2));

  db.close();
} catch (err) {
  console.error('Error:', err);
}
