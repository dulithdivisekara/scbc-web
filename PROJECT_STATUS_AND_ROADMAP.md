# Sri Chandananda Buddhist College - Project Status & Roadmap

## 1. Executive Project Overview
Alumnus-contributed official static portal for Sri Chandananda Buddhist College, Kandy.
- **Founded:** 2006
- **Founder:** Most Ven. Dr. Godagama Mangala Thero
- **Principal:** Ven. Godagama Dhammakiththi Thero

## 2. Current Tech Stack & Architecture
- **Framework:** Astro 5.x
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Content Management:** Astro Content Collections (for circulars/announcements)
- **Hosting Target:** Cloudflare Pages

## 3. Institutional Design System
- **Palette:**
  - Background: Pure White / Off-white canvas
  - Typography: Deep Slate
  - Footer/Anchors: Navy/Slate (`#0B132B`)
  - Uniform Tri-band tokens: Teal (`#007A87`), Saffron Orange (`#F58220`), Deep Maroon (`#581838`)
- **Typography:**
  - Headings: Merriweather (editorial serif)
  - Body: Inter (sans-serif)
  - Sinhala Font: Noto Sans Sinhala (`font-sinhala`)

## 4. Completed Features Ledger
- Responsive header with transparent crest (`school-crest-official.png`) and bilingual title.
- Full-bleed collegiate hero with dark scrim overlay.
- Integrated metrics bar (3,500+ students, bilingual medium, 100% syllabus).
- Content Collections for announcements (`2026-admissions-open.md`, `annual-pirith-ceremony.md`).
- Executive leadership cards with non-clipped portrait framing (`object-top`).
- Themed collegiate house cards (Ramya, Suramya, Subha).
- Authoritative institutional footer with tri-band accent.
- Removed splash preloader to avoid synthetic wait screens.

## 5. Pending Implementation Backlog (Prioritized Roadmap)

### Task A (Interactive Tool)
- **Feature:** House Assignment Calculator on `student-life.astro` and `index.astro`.
- **Logic:** `admission_number % 3`
  - 1 = Ramya
  - 2 = Suramya
  - 0 = Subha

### Task B (Campus Geo-location)
- **Feature:** Responsive Google Maps embed on `contact.astro` for Asgiri Vihara Mawatha, Kandy.

### Task C (Human-Grade Code Audit)
- **Feature:** Audit CSS and component markup to remove synthetic boilerplate, AI comment residue, and redundant wrappers.

### Task D (SEO & Institutional Metadata)
- **Feature:** Open Graph image generator, JSON-LD Schema (`EducationalOrganization`), and canonical `.lk` URL bindings.

### Task E (Staging & Production Handover)
- **Feature:** Cloudflare Pages deployment check and Principal meeting prototype demo preparation.
