# Quran Web Application Backend

Backend API for Quran Web Application built with Hono and SQLite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. The Quran database is included at `src/db/quran.db`

3. Configure environment variables (optional):
```bash
cp .env.example .env
```

## Running Locally

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Surahs
- `GET /api/surahs` - Get all surahs
- `GET /api/surahs/:id` - Get specific surah

### Ayahs
- `GET /api/surah/:id/ayahs` - Get all ayahs for a surah

### Search
- `GET /api/search?q=query` - Search in translations

## Database Schema

### surahs
- `id` (INTEGER, 1-114, PK)
- `name_ar` (TEXT) - Arabic name
- `name_en` (TEXT) - English name
- `revelation_place` (TEXT) - Meccan/Medinan
- `verse_count` (INTEGER) - Number of verses

### verses
- `surah_id` (INTEGER, FK to surahs.id)
- `ayah_number` (INTEGER) - Verse number
- `verse_key` (TEXT) - e.g. "1:1"
- `text_uthmani` (TEXT) - Arabic Uthmani script

### translations
- `verse_key` (TEXT) - e.g. "1:1"
- `lang_code` (TEXT) - e.g. "en"
- `text` (TEXT) - Translation text

## Tech Stack

- Runtime: Node.js
- Framework: Hono
- Database: SQLite (better-sqlite3)
- Language: JavaScript (ES Modules)
