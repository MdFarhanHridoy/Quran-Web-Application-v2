import { Hono } from 'hono';
import { getDatabase } from '../db/connection.js';

const app = new Hono();

app.get('/', (c) => {
  try {
    const query = c.req.query('q');
    if (!query) {
      return c.json({ error: 'Query parameter "q" is required' }, 400);
    }

    const lang = c.req.query('lang') || 'en';
    const page = parseInt(c.req.query('page')) || 1;
    const limit = parseInt(c.req.query('limit')) || 50;
    const offset = (page - 1) * limit;

    const db = getDatabase();

    let countStmt, resultsStmt;
    const searchPattern = `%${query}%`;

    if (lang === 'ar') {
      countStmt = db.prepare(
        `SELECT COUNT(DISTINCT v.verse_key) as total
         FROM verses v
         JOIN surahs s ON v.surah_id = s.id
         WHERE v.text_uthmani LIKE ?`
      );

      resultsStmt = db.prepare(
        `SELECT v.*, t.text as translation, s.name_en as surah_name
         FROM verses v
         LEFT JOIN translations t ON v.verse_key = t.verse_key AND t.lang_code = 'en'
         JOIN surahs s ON v.surah_id = s.id
         WHERE v.text_uthmani LIKE ?
         ORDER BY v.surah_id, v.ayah_number
         LIMIT ? OFFSET ?`
      );
    } else {
      countStmt = db.prepare(
        `SELECT COUNT(DISTINCT v.verse_key) as total
         FROM verses v
         JOIN translations t ON v.verse_key = t.verse_key
         JOIN surahs s ON v.surah_id = s.id
         WHERE t.lang_code = 'en' AND t.text LIKE ?`
      );

      resultsStmt = db.prepare(
        `SELECT DISTINCT v.*, t.text as translation, s.name_en as surah_name
         FROM verses v
         JOIN translations t ON v.verse_key = t.verse_key
         JOIN surahs s ON v.surah_id = s.id
         WHERE t.lang_code = 'en' AND t.text LIKE ?
         ORDER BY v.surah_id, v.ayah_number
         LIMIT ? OFFSET ?`
      );
    }

    const { total } = countStmt.get(searchPattern);
    const results = resultsStmt.all(searchPattern, limit, offset);
    const hasMore = offset + results.length < total;

    return c.json({
      results,
      total,
      page,
      limit,
      hasMore
    });
  } catch (err) {
    console.error('Error searching ayahs:', err);
    return c.json({ error: 'Failed to search ayahs' }, 500);
  }
});

export default app;
