import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import surahRoutes from './routes/surah.js';
import ayahRoutes from './routes/ayah.js';
import searchRoutes from './routes/search.js';
import healthRoutes from './routes/health.js';
import 'dotenv/config';

const app = new Hono();

app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('/api/surahs', surahRoutes);
app.route('/api/surah', ayahRoutes);
app.route('/api/search', searchRoutes);
app.route('/api/health', healthRoutes);

const port = process.env.PORT || 3001;

console.log(`Starting server on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
