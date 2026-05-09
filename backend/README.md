# Quran Web Application - Backend

Backend API for the Quran Web Application, built with Hono and SQLite (better-sqlite3).

## Setup

```bash
npm install
```

The Quran database is included at `src/db/quran.db`.

## Running

```bash
npm start       # Production (http://localhost:3001)
npm run dev     # Development with --watch
```

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{ "status": "ok", "message": "Backend is running", "timestamp": "..." }
```

### Surahs
```
GET /api/surahs        # All 114 surahs ordered by ID
GET /api/surahs/:id    # Single surah (1-114)
```
Response fields: `id`, `name_ar`, `name_en`, `name_meaning`, `revelation_place`, `verse_count`

### Ayahs
```
GET /api/surah/:id/ayahs    # All ayahs for a surah with English translation
```
Response fields: `surah_id`, `ayah_number`, `verse_key`, `text_uthmani`, `translation`

Joins `verses` with `translations` where `lang_code = 'en'`.

### Search
```
GET /api/search?q=query                 # Search English translations (default)
GET /api/search?q=query&lang=ar         # Search Arabic text (text_uthmani)
GET /api/search?q=query&page=2&limit=50 # Paginated
```
Response:
```json
{ "results": [...], "total": 100, "page": 1, "limit": 50, "hasMore": true }
```

| Param | Required | Default | Description |
|---|---|---|---|
| `q` | Yes | - | Search query |
| `lang` | No | `en` | `en` (translation) or `ar` (Arabic text) |
| `page` | No | `1` | Page number |
| `limit` | No | `50` | Results per page |

## Database Schema

### surahs
| Column | Type | Description |
|---|---|---|
| `id` | INTEGER PK | Surah number (1-114) |
| `name_ar` | TEXT | Arabic name |
| `name_en` | TEXT | English name |
| `name_meaning` | TEXT | Meaning of the name |
| `revelation_place` | TEXT | Meccan or Medinan |
| `verse_count` | INTEGER | Number of verses |

### verses
| Column | Type | Description |
|---|---|---|
| `surah_id` | INTEGER FK | References surahs.id |
| `ayah_number` | INTEGER | Verse number within surah |
| `verse_key` | TEXT | e.g. "1:1" |
| `text_uthmani` | TEXT | Arabic Uthmani script |

### translations
| Column | Type | Description |
|---|---|---|
| `verse_key` | TEXT | e.g. "1:1" |
| `lang_code` | TEXT | e.g. "en" |
| `text` | TEXT | Translation text |

## Project Structure

```
backend/
  src/
    server.js         # Hono app entry, CORS, route mounting
    db/
      connection.js   # SQLite singleton (better-sqlite3, readonly)
      quran.db        # SQLite database file
    routes/
      health.js       # GET /api/health
      surah.js        # GET /api/surahs, GET /api/surahs/:id
      ayah.js         # GET /api/surah/:id/ayahs
      search.js       # GET /api/search
  .env                # PORT=3001
  package.json        # type: module (ESM)
```

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Hono | 4.12.16 | Web framework |
| @hono/node-server | 1.19.14 | Node.js adapter |
| better-sqlite3 | 12.9.0 | SQLite driver |
| dotenv | 17.4.2 | Environment variables |
