import { Hono } from 'hono';
import { getDatabase } from '../db/connection.js';

const app = new Hono();

app.get('/', (c) => {
  try {
    const db = getDatabase();
    const surahs = db.prepare('SELECT id, name_ar, name_en, revelation_place, verse_count FROM surahs ORDER BY id').all();
    return c.json(surahs);
  } catch (err) {
    console.error('Error fetching surahs:', err);
    return c.json({ error: 'Failed to fetch surahs' }, 500);
  }
});

app.get('/:id', (c) => {
  try {
    const id = c.req.param('id');
    const db = getDatabase();
    const surah = db.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
    if (!surah) {
      return c.json({ error: 'Surah not found' }, 404);
    }
    return c.json(surah);
  } catch (err) {
    console.error('Error fetching surah:', err);
    return c.json({ error: 'Failed to fetch surah' }, 500);
  }
});

export default app;
