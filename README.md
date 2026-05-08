# Quran Web Application

Fullstack web application for reading the Holy Quran with Arabic text and English translation.

## Project Structure

```
/quran-web-app
  /frontend     - Next.js frontend application
  /backend      - Hono + SQLite backend API
  /database     - Quran database files
```

## Tech Stack

### Frontend
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Fonts: Google Fonts (Amiri, Scheherazade)

### Backend
- Runtime: Node.js
- Framework: Hono
- Database: SQLite (better-sqlite3)
- Language: JavaScript (ES Modules)

## Data Source

Quran data from [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)

- 114 surahs
- 6,236 verses
- English translation included
- Additional translations available

## Features

- ✅ Browse all 114 surahs
- ✅ Read ayahs with Arabic text (Uthmani script)
- ✅ English translation for each ayah
- ✅ Search in translations
- ✅ Customize Arabic font (Amiri or Scheherazade)
- ✅ Adjustable font sizes
- ✅ Settings persist in localStorage
- ✅ Mobile-responsive design
- ✅ SSG for static generation

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

## Live Demo

The application is deployed and live at: https://quran-web-application-rust.vercel.app

You can browse and read the Quran directly without needing to set up the project locally.

## API Endpoints

### Health Check
`GET /api/health`

### Surahs
`GET /api/surahs` - Get all surahs
`GET /api/surahs/:id` - Get specific surah

### Ayahs
`GET /api/surah/:id/ayahs` - Get all ayahs for a surah

### Search
`GET /api/search?q=query` - Search in translations

## Deployment

### Backend Deployment
- Platform options: Render, Railway, Fly.io
- Requires Node.js runtime
- Environment variables: `PORT`

### Frontend Deployment
- Platform: Vercel (recommended)
- Environment variables: `NEXT_PUBLIC_API_URL`

## License

Quran text and translations have their own licenses and attribution requirements. See the [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset) repository for details.

## Credits

- Quran data: [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- Original data sources: See data source repository for attribution

## Development

This project follows the implementation plan outlined in `plan.md`.
