# Quran Web Application Frontend

Frontend for Quran Web Application built with Next.js and Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Update `NEXT_PUBLIC_API_URL` to point to your backend server.

## Running Locally

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The app will start on `http://localhost:3000`

## Features

- View all 114 surahs
- Read ayahs with Arabic text and English translation
- Search in translations
- Customize Arabic font and font sizes
- Settings persist in localStorage

## Pages

### Home (`/`)
List of all 114 surahs with search functionality.

### Surah Detail (`/surah/:id`)
View all ayahs for a specific surah.

### Search (`/search`)
Search in Quran translations.

## Settings

The settings panel allows you to:
- Choose Arabic font (Amiri or Scheherazade)
- Adjust Arabic font size (16-40px)
- Adjust translation font size (12-24px)

Settings are automatically saved to localStorage.

## Tech Stack

- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Fonts: Google Fonts (Amiri, Scheherazade)
