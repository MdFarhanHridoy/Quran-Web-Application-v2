# Quran Web Application v2

Fullstack web application for reading the Holy Quran, cloning the UI of [QuranMazid](https://quranmazid.com/1) with dark theme, audio playback, and advanced reading features.

## Project Structure

```
/quran-web-app
  /frontend     - Next.js frontend application
  /backend      - Hono + SQLite backend API
  /database     - Quran database files
```

## Tech Stack

### Frontend
- Framework: Next.js 16.2.4 (App Router)
- Runtime: React 19.2.4
- Language: TypeScript 5
- Styling: Tailwind CSS 4
- Fonts: KFGQPC HAFS Uthmanic Script, Amiri, Scheherazade New
- State: React Context (Settings, Audio)

### Backend
- Runtime: Node.js
- Framework: Hono 4.12.14
- Database: SQLite (better-sqlite3)
- Language: JavaScript (ES Modules)

### Data Source
- Quran data: [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- Audio: [Al Quran Cloud API](https://alquran.cloud/) (Mishary Alafasy recitation)

## Features

### Reading Experience
- ✅ Browse all 114 surahs in scrollable sidebar
- ✅ Read ayahs with Arabic Uthmani text and English translation
- ✅ Surah header with name, ayah count, and revelation place (Makkah/Madinah)
- ✅ Bismillah banner (except Surah 9)
- ✅ Previous/Next surah navigation
- ✅ Per-ayah audio playback (play/pause)
- ✅ Smooth scroll to specific ayahs from search results

### Customization
- ✅ Choose Arabic font: KFGQPC HAFS Uthmanic Script, Amiri, or Scheherazade New
- ✅ Adjust Arabic font size (20-50px, default 30px)
- ✅ Adjust translation font size (12-24px, default 17px)
- ✅ Live preview of font settings
- ✅ Settings persist in localStorage across sessions

### Search
- ✅ Search English translations across all surahs
- ✅ Arabic text search support (via backend `lang=ar` param)
- ✅ Debounced search (300ms)
- ✅ Keyword highlighting in search results
- ✅ Click result to navigate to ayah in surah reader

### UI/UX
- ✅ Dark theme matching QuranMazid design
- ✅ Left icon sidebar (surahs, search, settings)
- ✅ Fixed surah sidebar with 114 surahs and filter
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Touch-friendly controls
- ✅ Proper RTL support for Arabic text

## Quick Start

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:3001`

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Surahs
```
GET /api/surahs                    # Get all surahs
GET /api/surahs/:id                # Get specific surah by ID
```

### Ayahs
```
GET /api/surah/:id/ayahs           # Get all ayahs for a surah
```

### Search
```
GET /api/search?q=query            # Search in translations
GET /api/search?q=query&lang=ar    # Search in Arabic text
GET /api/search?q=query&lang=en    # Search in English (default)
```

Query parameters:
- `q` (required): Search query
- `lang` (optional): `en` or `ar`, default is `en`
- `page` (optional): Page number for pagination, default is `1`
- `limit` (optional): Results per page, default is `50`

## Deployment

### Backend Deployment
- Platform: Render, Railway, or Fly.io
- Runtime: Node.js
- Environment variables: `PORT=3001`
- Build: `npm install`
- Start: `npm start`

### Frontend Deployment
- Platform: Vercel (recommended for Next.js)
- Environment variables: `NEXT_PUBLIC_API_URL` (point to backend URL)
- Build: `npm run build`
- Start: `npm start`

## Audio Source

Audio recitation provided by [Al Quran Cloud](https://alquran.cloud/):
- Reciter: Mishary Alafasy
- Format: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/{absolute_ayah_number}.mp3`
- Free to use, no API key required

## License

Quran text and translations have their own licenses and attribution requirements. See the [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset) repository for details.

## Credits

- Quran data: [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- Audio recitation: [Al Quran Cloud](https://alquran.cloud/)
- Inspiration: [QuranMazid](https://quranmazid.com/)

## Development

This project follows a phased implementation plan with atomic commits. See the implementation plan in `.kilo/plans/` for details.

### Build & Test
```bash
cd frontend
npm run build    # Production build
npm run lint      # ESLint check
```
