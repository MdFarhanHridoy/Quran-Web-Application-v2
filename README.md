# Quran Web Application v2

Fullstack web application for reading the Holy Quran, cloning the UI of [QuranMazid](https://quranmazid.com/1) with dark theme, audio playback, and advanced reading features.

## Project Structure

```
/quran-web-app
  /frontend     - Next.js 16 frontend application (React 19 + TypeScript)
  /backend      - Hono + SQLite backend API
  /database     - Quran database source files
  /docs         - Documentation (deployment, task, implementation status)
```

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.4 | Framework (App Router) |
| React | 19.2.4 | UI runtime |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Google Fonts | - | Amiri, Scheherazade New |
| KFGQPC Font | - | Custom @font-face (Uthmanic Script) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | - | Runtime |
| Hono | 4.12.16 | Web framework |
| better-sqlite3 | 12.9.0 | Database driver (readonly) |
| dotenv | 17.4.2 | Environment variables |

### Data Source
- Quran data: [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- Audio: [Al Quran Cloud API](https://alquran.cloud/) (Mishary Alafasy recitation)

## Features

### Reading Experience
- Browse all 114 surahs in a scrollable sidebar with inline filter
- Read ayahs with Arabic Uthmani text and English (Saheeh International) translation
- Surah header with name, ayah count, and revelation place (Makkah/Madinah) with image
- Bismillah banner shown for all surahs except Surah 1 (Al-Fatihah) and Surah 9 (At-Tawbah)
- Previous/Next surah navigation at the bottom of each surah
- Per-ayah audio playback (play/pause) using Mishary Alafasy recitation
- Smooth scroll to specific ayahs via URL param (`?ayah=N`) with 3-second highlight

### Search
- Search English translations across all surahs
- Arabic text search support (via backend `lang=ar` param)
- Debounced search input with modal overlay
- Keyword highlighting in search results
- Paginated results (50 per page) with navigation
- Click result to navigate directly to the ayah in the surah reader

### Customization
- Choose Arabic font: KFGQPC HAFS Uthmanic Script (default), Amiri, or Scheherazade New
- Adjust Arabic font size (20-50px, default 30px)
- Adjust translation font size (12-24px, default 17px)
- Collapsible Font Settings panel with slide animation and accent color toggle
- Settings persist in localStorage across sessions

### UI/UX
- Dark theme matching QuranMazid design with green (#408039) accent
- Left icon sidebar rail (desktop)
- Fixed surah sidebar with filterable 114-surah list
- Mobile-responsive: drawer overlays for sidebar, settings, and search
- Proper RTL support for Arabic text (`dir="rtl"`)
- Custom scrollbar with green-tinted thumb

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Surahs
```
GET /api/surahs          # All 114 surahs
GET /api/surahs/:id      # Single surah by ID (1-114)
```

### Ayahs
```
GET /api/surah/:id/ayahs  # All ayahs for a surah (with English translation)
```

### Search
```
GET /api/search?q=query            # Search English translations (default)
GET /api/search?q=query&lang=ar    # Search Arabic text
GET /api/search?q=query&page=2     # Paginated results (default 50/page)
```

Query parameters:
- `q` (required): Search query
- `lang` (optional): `en` (default) or `ar`
- `page` (optional): Page number (default 1)
- `limit` (optional): Results per page (default 50)

## Component Architecture

```
layout.tsx (RootLayout)
  └── SettingsProvider
        └── AudioProvider
              └── LayoutWrapper
                    ├── Header (fixed top navbar)
                    ├── IconSidebar (left icon rail, desktop)
                    ├── SurahSidebar (left surah list panel)
                    ├── SettingsPanel (right font settings)
                    ├── SearchPanel (modal search overlay)
                    └── Main Content
                          ├── page.tsx → redirects to /surah/1
                          ├── surah/[id]/page.tsx
                          │     ├── SurahHeader
                          │     ├── AyahCard[] (with AudioPlayer)
                          │     └── SurahNavigation
                          └── search/page.tsx (paginated results)
```

## Audio Source

Audio recitation from [Al Quran Cloud](https://alquran.cloud/):
- Reciter: Mishary Rashid Alafasy
- Format: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/{absolute_ayah_number}.mp3`
- Free to use, no API key required

## Build & Test

```bash
cd frontend
npm run build    # Production build
npm run lint     # ESLint check
```

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions (Render + Vercel).

## Credits

- Quran data: [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- Audio recitation: [Al Quran Cloud](https://alquran.cloud/)
- Inspiration: [QuranMazid](https://quranmazid.com/)
