# Design Specification: Sri Chandananda Buddhist College Web Platform Elevation

- **Date:** 2026-10-10
- **Project:** Sri Chandananda Buddhist College Web Platform (`scbc-web`)
- **Author:** Antigravity AI & Dulith Divisekara
- **Status:** Approved / In Implementation
- **Branch:** `feature/campus-redesign-and-interactive-tools`

---

## 1. Executive Summary & Goals

Sri Chandananda Buddhist College (ශ්‍රී චන්දානන්ද බෞද්ධ විද්‍යාලය), situated in Asgiriya, Kandy, Sri Lanka, was established in 2006 by Most Ven. Dr. Godagama Mangala Thero in tribute to Most Ven. Palipana Sri Chandananda Mahanayake Thera. The institution blends traditional Theravada Buddhist ethics and monastic discipline with modern bilingual scientific education across Grades 1 through 13.

This specification outlines the architectural modernization, GSAP motion choreography, and functional expansion of the official college web presence. The goal is to deliver an Ivy-League / King's College tier digital campus that honors Buddhist cultural roots, provides high-utility interactive tools (Timetables, Academic Vault, House Portal), maintains instant load times (<1.0s), and prepares a pristine PR for Dulith's GitHub repository.

---

## 2. Technical Stack & Architecture

- **Core Framework:** Astro 5.0 (Static Site Generation / SSG with Cloudflare Pages compatibility)
- **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/vite` 4.3.3)
- **Kinetic Motion:** GSAP 3.12+ and GSAP ScrollTrigger plugin (integrated via safe client islands and Astro lifecycle hooks)
- **Interactive Islands:** React 19 (`@astrojs/react` 7.0.0) for reactive client components
- **Content Management:** Astro Content Collections (Markdown + JSON) with type-safe Zod validation
- **Typography:** Dual-script system:
  - English: `Playfair Display` (Headings) + `Inter` (Body & Tables)
  - Sinhala: `Noto Serif Sinhala` (Headings) + `Noto Sans Sinhala` (Body, line-height 1.7)
- **Bilingual i18n Engine:** Seamless zero-reload English & Sinhala switching persisted via `localStorage`

---

## 3. Information Architecture & Sitemap

```
├── /                          (Home: Hero, Metrics Counter, Milestone Timeline, House Calculator, Circulars)
├── /about                     (Heritage, Asgiriya Roots, Founder's Vision, Leadership, Campus Facilities)
├── /academics                 (Curricular Pathways, O/L & A/L Streams, Bilingual Instruction)
│   └── /academics/resources   (Academic Vault: Searchable past papers, syllabi, and model questions)
├── /timetables                (Interactive Timetable Explorer: Grade/Stream selector, Live Period indicator, Print A4)
├── /student-life              (Traditions, House System, Kandyan Ves Dance, Scouting, Athletics)
├── /admissions                (Entry guidelines, Grade 1/6/AL procedures, PDF application downloads)
└── /contact                   (Asgiriya location map, office directories, contact inquiry form)
```

---

## 4. Visual Identity & Design Tokens

### Tri-Color Heraldic Brand Identity
- **Deep Maroon (`#581838`):** Dominant brand tone symbolizing collegiate authority, monastic discipline, and heritage.
- **Saffron Orange (`#F58220`):** Solar vitality, robes of the Maha Sangha, athletic energy, and active states.
- **Institutional Teal (`#007A87`):** Academic wisdom, intellectual clarity, and Ramya house identity.
- **Background Surface (`#FCFCFC`):** Warm editorial off-white to eliminate glare.
- **Text Ink (`#1C1917`):** Deep charcoal ink ensuring WCAG AAA contrast ratios.

---

## 5. Kinetic Motion & GSAP Choreography

### 5.1 GSAP Lifecycle Bridge (`src/scripts/gsap-init.ts`)
- Registers `ScrollTrigger` safely on both initial page load and Astro view swaps (`astro:page-load`).
- Kills existing triggers before re-binding to prevent memory leaks during client navigation.
- Automatically disables motion when `prefers-reduced-motion: reduce` is detected.

### 5.2 Hero Section Choreography
- **Crest Reveal:** School crest fades and scales gently (`scale: 0.96 -> 1.0`, `opacity: 0 -> 1`, `duration: 0.9s`).
- **Serif Headline Stagger:** Headline splits into smooth upward stagger (`y: 28 -> 0`, `stagger: 0.1s`).
- **Backdrop Parallax Scrub:** Asgiriya campus photography moves subtly at `yPercent: 15` on vertical scroll.

### 5.3 Campus Milestones Timeline
- A vertical dual-tone line (Teal to Maroon) progressively draws down via `ScrollTrigger.scrub`.
- Milestone cards (2006 Founding, 2012 Secondary expansion, 2020 Girls' Section opening, Present Smart Classrooms) illuminate and slide in as the scroll scrubber passes each node.

### 5.4 Live Counter Reel
- Statistics (`2006` Founding Year, `3` Esteemed Houses, `13` Grade Levels, `100%` Buddhist Ethos) smoothly count up when scrolled into view.

---

## 6. Interactive Systems Specification

### 6.1 Interactive Timetable Explorer (`/timetables`)
- **Bell Schedule (GMT+5:30):**
  - 07:50 - 08:10: Buddha Vandana & Assembly
  - 08:10 - 08:50: Period 1
  - 08:50 - 09:30: Period 2
  - 09:30 - 10:10: Period 3
  - 10:10 - 10:50: Period 4
  - 10:50 - 11:10: Morning Interval
  - 11:10 - 11:45: Period 5
  - 11:45 - 12:20: Period 6
  - 12:20 - 12:55: Period 7
  - 12:55 - 13:30: Period 8
- **Features:**
  - Dual selector: Grade (1 to 13) and Stream (Primary, Middle, O/L, A/L Science/Commerce/Arts/Tech).
  - Live clock indicator: Highlights the active class period in real-time.
  - Desk-ready Print formatting (`@media print`): Single-page clean high-contrast A4 printout.

### 6.2 Academic Vault (`/academics/resources`)
- **Faceted Filters:** Grade, Subject, Medium (English/Sinhala), and Term Evaluation.
- **Client Search:** Real-time fuzzy filtering of document titles and codes.
- **Resource Cards:** Subject icon, term badge, year, file size, and direct PDF download/preview link.

### 6.3 Collegiate House Portal (`/student-life`)
- **Calculation Formula:** `admissionNumber % 3`:
  - `Remainder 1`: **Ramya House** (Teal / Blue, Lotus motif, "Wisdom & Honor")
  - `Remainder 2`: **Suramya House** (Saffron / Orange, Torch motif, "Courage & Insight")
  - `Remainder 0`: **Subha House** (Deep Maroon / Ruby, Lion motif, "Valour & Victory")
- **House Profiles:** Lore, athletic championships, house motto, and track records.

---

## 7. Quality, Performance & Accessibility Floor

- **Lighthouse Performance Score:** Target 95+ on Mobile and 98+ on Desktop.
- **Diacritic Clipping Prevention:** Custom Sinhala CSS cascade with `line-height: 1.7` ensuring zero glyph clipping.
- **Print Hygiene:** Built-in institutional print stylesheet hiding web chrome and generating formal letterheaded records.
- **Responsive Layout:** Strict `overflow-x-hidden` enforcement across all viewports (320px to 4K).
