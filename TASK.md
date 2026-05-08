# 📖 Technical Assessment: Quran Web Application

## 🎯 Task Overview
Clone the UI of [QuranMazid](https://quranmazid.com/1) and implement the features detailed below. Carefully study the reference site for layout, typography, and interaction patterns before starting.

---

## 🛠️ Technical Requirements

### Tech Stack
| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| **Language**    | Must use TypeScript                             |
| **Backend**     | Node.js / Hono-Bun                              |
| **Frontend**    | Next.js with Static Site Generation (SSG)       |
| **Styling**     | Tailwind CSS                                    |
| **Database**    | Any Quran JSON/SQLite database sourced from GitHub |
| **Audio Source**| Any free Quran recitation API                   |

### Key UI Elements to Clone
| Element              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Assets**           | Collect all required assets (fonts, images, icons, etc.) from the reference site. |
| **Icon Sidebar**     | Left-side icon sidebar navigation.                                          |
| **Surah Sidebar**    | Scrollable list of all 114 surahs with Arabic name, English name, and surah number. |
| **Ayah Display**     | Each verse shown with Arabic text (right-aligned) and English translation below. Verse number displayed. |
| **Audio Playback**   | Play/pause button per ayah or full surah playback. Use any free Quran audio API. |
| **Font Settings Panel** | Sidebar or modal with: Arabic font selector (min 2 fonts), Arabic font size slider, Translation font size slider. |
| **Search**           | Search bar to find ayahs by translation text across all surahs.              |
| **Dark Theme**       | Dark color scheme matching the reference design.                            |
| **Responsive Design**| Must also clone and adapt the mobile UI layout.                             |

---

## ✅ Required Features

1. **Left Icon Sidebar**
   - Clone the left icon sidebar exactly as seen on the reference site.

2. **Surah Sidebar**
   - Display all 114 surahs with surah number, Arabic name, and English name/translation.
   - Clicking a surah navigates to its Ayah page.
   - Surah list should be visible as a fixed sidebar on desktop and as a collapsible drawer/menu on mobile.

3. **Ayah Page (Surah Reader)**
   - Show all verses of the selected surah.
   - Each ayah displays: verse number, Arabic text (right-aligned, proper Quranic font), and English translation (Saheeh International or similar).
   - Surah header with surah name, number of ayahs, and revelation place (Makkah/Madinah).

4. **Audio Playback**
   - Play/pause button for each individual ayah to hear its recitation.
   - Use any freely available Quran audio API or CDN.

5. **Search Functionality**
   - Allow users to search ayahs by Arabic or English translation text.
   - Results should navigate to or highlight the matching ayah(s).

6. **Font Settings Panel**
   - Accessible via a settings icon/button in the header or sidebar.
   - **Arabic Font Selection:** Minimum 2 Arabic font options (e.g., KFGQ, Amiri, Scheherazade).
   - **Arabic Font Size:** Adjustable slider/stepper.
   - **Translation Font Size:** Adjustable slider/stepper.
   - All settings must persist across sessions using `localStorage`.

7. **UI & Responsiveness**
   - Dark theme UI matching the QuranMazid reference design.
   - Fully responsive: must work seamlessly on mobile, tablet, and desktop.
   - Clean, professional typography with proper Arabic text rendering and `dir="rtl"` support where applicable.

---

## 📤 Submission Instructions
Reply in the **same email thread**. Do not send a separate email. Submit the following:

1. **Public GitHub Repository Link** (Front + Backend) → Must be public and accessible.
2. **Live Demo Link** → Deployed on Vercel or Netlify (verify in incognito mode before submitting).
3. **Screen Recording** → Showing all features working (maximum 5 minutes).
4. **Code Quality Evaluation** → TypeScript usage, component structure, state management, and commit history will be evaluated.

> ⚠️ **Note:** Collect all required assets (fonts, images, icons, etc.) directly from the reference site before development. Ensure proper licensing/attribution where applicable.