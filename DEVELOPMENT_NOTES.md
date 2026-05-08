# Quran Web Application - Development Notes (v1 to v2 Context)

This document provides comprehensive context about the Quran Web Application v1 development to assist with v2 development for the second-level skill test.

## Project Overview

### Purpose
- **v1 (Quran-Web-Application):** First-level skill test project for hiring assessment
- **v2 (Quran-Web-Application-v2):** Second-level skill test project building on v1 foundation

### What Was Built (v1)
A full-stack web application for reading the Holy Quran with:
- Arabic text (Uthmani script)
- English translation
- Browse all 114 surahs
- Search functionality in translations
- Customizable Arabic fonts and font sizes
- Mobile-responsive design
- Live deployment

### Live Deployment
- **Frontend:** https://quran-web-application-rust.vercel.app
- **Backend:** https://quran-backend.onrender.com
- **Repository:** https://github.com/MdFarhanHridoy/Quran-Web-Application

---

## Technical Stack

### Frontend
- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State Management:** React Context (SettingsContext)
- **Runtime:** React 19.2.4
- **Fonts:** Google Fonts (Amiri, Scheherazade)

### Backend
- **Runtime:** Node.js
- **Framework:** Hono 4.12.14 (lightweight web framework)
- **Database:** SQLite (better-sqlite3)
- **Language:** JavaScript (ES Modules)
- **Server:** @hono/node-server 1.19.14
- **Environment:** dotenv 17.4.2

### Data Source
- Quran data from [nafiskabbo/quran-dataset](https://github.com/nafiskabbo/quran-dataset)
- 114 surahs
- 6,236 verses (ayahs)
- English translation included

---

## Project Structure

```
/quran-web-application
  /frontend              # Next.js frontend application
    /app                 # Next.js App Router pages
      /layout.tsx        # Root layout with fonts and providers
      /page.tsx          # Home page (surah list)
      /surah/[id]/page.tsx  # Surah detail page
      /search/page.tsx   # Search page
    /components          # React components
      Header.tsx         # Navigation header
      SettingsSidebar.tsx  # Settings panel (font selection)
      SettingsSidebarWrapper.tsx  # Settings wrapper with state
    /context             # React contexts
      SettingsContext.tsx  # Settings state management
    /lib                 # Utility functions
      api.ts            # API integration functions
      types.ts          # TypeScript type definitions
      utils.ts          # Helper functions
    /public             # Static assets
    package.json
    tsconfig.json
    tailwind.config.ts
    next.config.ts
  
  /backend              # Hono backend API
    /src
      /db
        connection.js   # SQLite database connection
        quran.db        # Quran database (committed to repo)
      /routes
        health.js       # Health check endpoint
        surah.js        # Surah endpoints
        ayah.js         # Ayah endpoints
        search.js       # Search endpoint
      server.js         # Main Hono server
    package.json
  
  /database             # Source database files (for reference)
  README.md             # Project documentation
  IMPLEMENTATION_STATUS.md  # Development progress tracking
  DEPLOYMENT.md         # Deployment guide
```

---

## Key Features Implemented in v1

### ✅ Core Features
1. **Browse Surahs**
   - List all 114 surahs with numbers and names
   - Click to view surah details
   - Display surah information (name, verses count, etc.)

2. **Read Ayahs**
   - Arabic text with proper font rendering
   - English translation for each ayah
   - Clear separation between ayahs
   - Scrollable list for long surahs

3. **Search Functionality**
   - Search in English translations
   - Minimum 3 characters required
   - Debounced input (300ms)
   - Highlight matching keywords in results
   - Pagination (50 results per page with "Load More")
   - Empty state when no results found

4. **Customization**
   - Choose between Arabic fonts (Amiri, Scheherazade)
   - Adjust Arabic font size (slider)
   - Adjust translation font size (slider)
   - Settings persist in localStorage
   - Settings panel accessible from homepage

5. **Responsive Design**
   - Mobile-first approach
   - Responsive font sizes for placeholder text
   - Touch-friendly interface
   - Works on all screen sizes

6. **Performance**
   - Static Site Generation (SSG) for better SEO
   - Optimized API calls
   - Efficient database queries
   - Fast page loads

---

## Architecture Decisions

### Why These Technologies?

**Next.js (Frontend):**
- React framework with built-in routing
- App Router for modern React patterns
- SSG for static generation and performance
- TypeScript support out of the box
- Large community and ecosystem

**Hono (Backend):**
- Lightweight and fast
- Native TypeScript support
- Simple API structure
- Built-in middleware support
- Easy to deploy

**SQLite (Database):**
- Zero configuration
- Portable (single file)
- Fast for read operations
- Perfect for Quran data (read-heavy)
- Can be committed to git

**better-sqlite3 (Node SQLite driver):**
- Synchronous API (simpler code)
- Better performance
- Native binding (not a wrapper)
- Active maintenance

### State Management Strategy

**Settings Context:**
- Created a React Context for global settings state
- Uses `useContext` and `useState` hooks
- Persists to `localStorage` on every change
- Loads from `localStorage` on mount
- Provides settings to all components

**API Integration:**
- Created centralized API functions in `lib/api.ts`
- All API calls go through this layer
- Error handling at the API layer
- Type-safe responses with TypeScript

### API Structure

**Endpoints:**
```
GET /api/health                    # Health check
GET /api/surahs                    # Get all surahs
GET /api/surahs/:id                # Get specific surah
GET /api/surah/:id/ayahs           # Get ayahs for surah
GET /api/search?q=query            # Search in translations
```

**Response Format:**
```typescript
// Surah
{
  id: number;
  name: string;
  englishName: string;
  ayahs_count: number;
  revelation_type: string;
}

// Ayah
{
  id: number;
  surah_id: number;
  ayah_number: number;
  arabic_text: string;
  translation: string;
}
```

### Database Schema

**Tables:**
```sql
CREATE TABLE surahs (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  ayahs_count INTEGER NOT NULL,
  revelation_type TEXT
);

CREATE TABLE ayahs (
  id INTEGER PRIMARY KEY,
  surah_id INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  FOREIGN KEY (surah_id) REFERENCES surahs(id)
);
```

---

## Development Process

### Phase 1: Project Setup
- Created monorepo structure with `/frontend` and `/backend`
- Initialized Next.js with TypeScript and Tailwind
- Set up Hono server with Express-style routes
- Configured SQLite database connection

### Phase 2: Database Integration
- Downloaded Quran dataset from GitHub
- Set up SQLite database with better-sqlite3
- Created connection module with error handling
- Verified database queries work correctly

### Phase 3: Backend API Development
- Implemented all API endpoints
- Added CORS support (allow all origins for development)
- Created health check endpoint
- Tested all endpoints manually

### Phase 4: Frontend Development
- Created API integration layer
- Implemented Settings context with localStorage
- Built all pages (home, surah detail, search)
- Created reusable components
- Added styling with Tailwind CSS

### Phase 5: Testing & Refinement
- Tested all features end-to-end
- Fixed font loading issues (used direct CSS link)
- Improved responsive design
- Added error handling
- Optimized performance

### Phase 6: Deployment
- Deployed backend to Render (free tier)
- Deployed frontend to Vercel (free tier)
- Configured environment variables
- Tested production deployment
- Documented deployment process

---

## Key Challenges & Solutions

### Challenge 1: Font Loading
**Problem:** Next.js `next/font/google` loader had issues loading Arabic fonts
**Solution:** Used direct Google Fonts CSS link in `layout.tsx` instead
**Impact:** Fonts still load correctly, just not optimized

### Challenge 2: localStorage Persistence
**Problem:** Settings need to persist across page reloads
**Solution:** Created SettingsContext that saves to localStorage on every change and loads on mount
**Code:** Used `useEffect` to save and load settings

### Challenge 3: Search Performance
**Problem:** Searching all 6,236 ayahs could be slow
**Solution:** 
- Implemented pagination (50 results per page)
- Added debouncing (300ms delay)
- Highlighted keywords in results for better UX

### Challenge 4: Responsive Design
**Problem:** Placeholder text too long for mobile screens
**Solution:** Used Tailwind responsive classes to adjust font size by screen width
**Code:** `text-xs sm:text-sm md:text-base lg:text-lg`

### Challenge 5: Database Portability
**Problem:** Need database to work in development and production
**Solution:** 
- Committed `quran.db` to git repository
- Used relative path for database file
- Database lives in `backend/src/db/` directory

---

## Known Issues & Limitations

### Technical Limitations
1. **Database Persistence (Production):**
   - Render's free tier uses ephemeral storage
   - Database resets on every deployment
   - Acceptable for hiring task, not for production

2. **Font Optimization:**
   - Not using Next.js font optimization
   - Fonts load via direct CSS link
   - Could be improved with `next/font/google`

3. **Error Handling:**
   - Basic error handling in place
   - Could add more specific error messages
   - No error boundary components

4. **Loading States:**
   - Minimal loading states
   - Could add skeletons or spinners
   - No optimistic UI updates

### Functional Limitations
1. **Single Translation:**
   - Only English translation available
   - Could add multiple language support
   - Would require database schema changes

2. **No Audio:**
   - No audio playback for recitations
   - Would require additional data and API

3. **No Bookmarks:**
   - Cannot bookmark favorite ayahs
   - Would require user authentication

4. **No Notes:**
   - Cannot add personal notes to ayahs
   - Would require database changes

---

## Deployment Information

### Backend (Render)
- **URL:** https://quran-backend.onrender.com
- **Platform:** Render (free tier)
- **Runtime:** Node.js
- **Environment:** `PORT=3001`
- **Build:** `npm install`
- **Start:** `npm start`
- **Root Directory:** `backend`

### Frontend (Vercel)
- **URL:** https://quran-web-application-rust.vercel.app
- **Platform:** Vercel (free tier)
- **Framework:** Next.js
- **Environment:** `NEXT_PUBLIC_API_URL=https://quran-backend.onrender.com`
- **Build:** `npm run build`
- **Root Directory:** `frontend`

### Deployment Process
1. Push code to GitHub
2. Connect repositories to Render/Vercel
3. Configure build settings
4. Set environment variables
5. Automatic deployment on push
6. No manual deployment steps needed

---

## Lessons Learned

### What Worked Well
1. **Monorepo Structure:**
   - Clear separation of concerns
   - Easy to work on frontend/backend independently
   - Simple to deploy separately

2. **TypeScript:**
   - Caught many errors at compile time
   - Better developer experience
   - Self-documenting code

3. **Tailwind CSS:**
   - Fast development
   - Consistent design system
   - Easy responsive design

4. **API Layer:**
   - Centralized API calls
   - Easy to test
   - Simple to modify

5. **Context API:**
   - Simple state management
   - No external dependencies
   - Perfect for settings state

### What Could Be Improved
1. **Testing:**
   - No unit tests written
   - No integration tests
   - Manual testing only

2. **Error Handling:**
   - Basic error handling
   - Could be more granular
   - No error logging

3. **Performance:**
   - Could add caching
   - Could optimize database queries
   - Could add image optimization

4. **Documentation:**
   - Some code comments missing
   - API documentation could be better
   - More inline documentation needed

---

## Git History Summary

### Commits (v1)
```
e8cac6e use responsive font sizes for placeholder text
8c45bfa add live deployment link to readme
4f9db2a added highlighting keywords in Ayahs search funtionality
eaa0800 added header
d28f9b3 docs: Add comprehensive deployment guide
72048cd Initial commit: Full-stack Quran web application
```

### Key Development Milestones
1. Initial project structure and setup
2. Backend API implementation
3. Frontend pages and components
4. Search functionality with highlighting
5. Header component added
6. Responsive improvements for mobile
7. Deployment documentation
8. Live deployment and testing

---

## Environment Variables

### Backend (`.env`)
```bash
PORT=3001
```

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://quran-backend.onrender.com
```

---

## Available Development Context in v2

### Copied from v1
- **`.kilo/plans/`** - Development plans with context
  - `1776499228590-quick-harbor.md` - Mobile responsive improvements
  - `1778253831732-tidy-rocket.md` - v2 project setup plan

- **`.kilo/package.json`** - Kilo dependencies
- **`.kilo/package-lock.json`** - Dependency versions
- **`.kilo/.gitignore`** - Git ignore rules

### Available in Global Kilo Storage
- **Session ID:** `ses_1f7cfe1ccffeUqqxR8EboNNsmR`
- **Project ID:** `72048cd7af8a9262ecdafef76d4765e1ff9b330e`
- **Database:** `C:\Users\Hridoy\.local\share\kilo\kilo.db`
- **Logs:** `C:\Users\Hridoy\.local\share\kilo\log\`

---

## Next Steps for v2 Development

### Immediate Tasks
1. **Review v2 Requirements:**
   - Understand the second-level skill test requirements
   - Identify new features to implement
   - Plan architecture changes if needed

2. **Set Up Development Environment:**
   - Open v2 project in VS Code
   - Install dependencies (`npm install` in both frontend and backend)
   - Configure environment variables
   - Start both servers

3. **Explore Existing Code:**
   - Review frontend structure
   - Review backend API
   - Understand database schema
   - Check component implementations

### Potential v2 Enhancements
1. **Advanced Features:**
   - Audio playback for recitations
   - Multiple translations/languages
   - Bookmarks and favorites
   - Personal notes on ayahs
   - Night mode theme

2. **Performance Improvements:**
   - Add caching (React Query, SWR)
   - Optimize database queries
   - Implement pagination for large surahs
   - Add lazy loading for images

3. **User Experience:**
   - Better loading states
   - Skeleton screens
   - Smooth animations
   - Keyboard shortcuts
   - Offline support (PWA)

4. **Testing:**
   - Unit tests (Jest, Vitest)
   - Integration tests
   - E2E tests (Playwright, Cypress)
   - Test coverage reporting

5. **Documentation:**
   - API documentation (OpenAPI/Swagger)
   - Component documentation (Storybook)
   - README improvements
   - Inline code comments

---

## Code Snippets & Patterns

### API Call Pattern
```typescript
// lib/api.ts
export async function getSurahs(): Promise<Surah[]> {
  const response = await fetch(`${API_URL}/api/surahs`);
  if (!response.ok) throw new Error('Failed to fetch surahs');
  return response.json();
}
```

### Context Pattern
```typescript
// context/SettingsContext.tsx
const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quran-settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('quran-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
```

### Backend Route Pattern
```typescript
// backend/src/routes/surah.js
import { Hono } from 'hono';
import { db } from '../db/connection.js';

const surahRouter = new Hono();

surahRouter.get('/', (c) => {
  const surahs = db.prepare('SELECT * FROM surahs ORDER BY id').all();
  return c.json(surahs);
});

surahRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const surah = db.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
  return c.json(surah);
});

export default surahRouter;
```

---

## Resources & References

### External Resources
- [Quran Dataset](https://github.com/nafiskabbo/quran-dataset) - Data source
- [Next.js Documentation](https://nextjs.org/docs) - Framework docs
- [Hono Documentation](https://hono.dev/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite driver

### Deployment Platforms
- [Render](https://render.com/) - Backend hosting
- [Vercel](https://vercel.com/) - Frontend hosting

### Fonts
- [Google Fonts - Amiri](https://fonts.google.com/specimen/Amiri)
- [Google Fonts - Scheherazade](https://fonts.google.com/specimen/Scheherazade+New)

---

## Contact & Support

### GitHub
- **Repository:** https://github.com/MdFarhanHridoy/Quran-Web-Application
- **Issues:** Check GitHub Issues tab for known issues

### Live Demo
- **Application:** https://quran-web-application-rust.vercel.app
- **Backend API:** https://quran-backend.onrender.com/api/health

---

**Document Version:** 1.0  
**Last Updated:** May 8, 2026  
**Purpose:** Development context transfer from v1 to v2 for second-level skill test
