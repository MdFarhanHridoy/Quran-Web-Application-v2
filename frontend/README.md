# Quran Web Application - Frontend

Next.js 16 frontend for the Quran Web Application, built with React 19, TypeScript, and Tailwind CSS 4.

## Setup

```bash
npm install
```

Configure environment:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

## Running

```bash
npm run dev     # Development (http://localhost:3000)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Redirects to `/surah/1` |
| `/surah/:id` | `app/surah/[id]/page.tsx` | Surah reader with ayah list, header, audio, and navigation |
| `/search` | `app/search/page.tsx` | Paginated search results with keyword highlighting |

## Components

### Layout (`components/layout/`)
| Component | Description |
|---|---|
| `LayoutWrapper` | Main orchestrator — composes header, sidebars, panels, and content area |
| `Header` | Fixed top navbar (h-14) with search, settings, and menu buttons |
| `IconSidebar` | Narrow left icon rail (w-16, desktop only) with Home/Quran icon |
| `SurahSidebar` | Left panel (w-72) with filterable 114-surah list; drawer overlay on mobile |

### Surah (`components/surah/`)
| Component | Description |
|---|---|
| `SurahHeader` | Surah title card — name, ayah count, revelation place image, bismillah |
| `AyahCard` | Individual ayah — verse number, Arabic text, translation, audio play button |
| `SurahNavigation` | Bottom prev/next surah links with position indicator |

### Audio (`components/audio/`)
| Component | Description |
|---|---|
| `AudioPlayer` | Per-ayah play/pause button using global AudioContext |

### Settings (`components/settings/`)
| Component | Description |
|---|---|
| `SettingsPanel` | Right-side panel (w-80) — collapsible font settings with slide animation |

### Search (`components/search/`)
| Component | Description |
|---|---|
| `SearchPanel` | Modal overlay with search input, auto-focus, Escape to close |

## Context Providers

| Provider | File | Description |
|---|---|---|
| `SettingsProvider` | `context/SettingsContext.tsx` | Font face, font sizes — persisted to localStorage |
| `AudioProvider` | `context/AudioContext.tsx` | Global audio playback state — single ayah at a time |

## Settings

| Setting | Options | Range | Default |
|---|---|---|---|
| Arabic Font | KFGQPC, Amiri, Scheherazade New | - | KFGQPC |
| Arabic Font Size | - | 20-50px | 30px |
| Translation Font Size | - | 12-24px | 17px |

Settings are auto-saved to `localStorage` under key `quran-settings`.

## Utilities (`lib/`)

| File | Description |
|---|---|
| `api.ts` | API client functions and TypeScript interfaces (`Surah`, `Ayah`) |
| `types.ts` | `Settings` interface and default values |
| `utils.ts` | Font family mapping, absolute ayah number calculation, audio URL builder |

## Tech Stack

| Package | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
