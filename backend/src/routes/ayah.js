import { Hono } from 'hono';
import { getDatabase } from '../db/connection.js';

const app = new Hono();

app.get('/:id/ayahs', (c) => {
  try {
    const surahId = c.req.param('id');
    const db = getDatabase();
    const ayahs = db.prepare(
      `SELECT DISTINCT v.*, t.text as translation
       FROM verses v
       JOIN translations t ON v.verse_key = t.verse_key
       WHERE v.surah_id = ? AND t.lang_code = 'en'
       ORDER BY v.ayah_number`
    ).all(surahId);
    return c.json(ayahs);
  } catch (err) {
    console.error('Error fetching ayahs:', err);
    return c.json({ error: 'Failed to fetch ayahs' }, 500);
  }
});

export default app;
