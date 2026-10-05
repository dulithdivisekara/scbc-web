# Sri Chandananda Buddhist College - Project Status & Roadmap

## 1. Executive Project Overview
Alumnus-contributed official web portal for Sri Chandananda Buddhist College, Kandy.
- **Founded:** 2006
- **Founder:** Most Ven. Dr. Godagama Mangala Thero
- **Principal:** Ven. Godagama Dhammakiththi Thero

## 2. Current Tech Stack & Architecture
- **Framework:** Astro 5.x (SSG)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Content Management:** Astro Content Collections & Decap CMS
- **Hosting Target:** Cloudflare Pages
- **Image Processing:** Sharp (WebP conversion)

## 3. Institutional Design System
- **Palette:**
  - Background: Pure White / Off-white canvas
  - Typography: Deep Slate
  - Footer/Anchors: Navy/Slate (`#0B132B`)
  - Uniform Tri-band tokens: Teal (`#007A87`), Saffron Orange (`#F58220`), Deep Maroon (`#581838`)
- **Typography:**
  - Headings: Merriweather (editorial serif)
  - Body: Inter (sans-serif)
  - Sinhala Font: Noto Sans Sinhala (`font-sinhala`), driven by `html[lang="si"]` CSS hierarchy.

## 4. Phase 1: Institutional Presence (Completed)
- **Bilingual Dynamic Architecture:** Fully decoupled hardcoded HTML strings into `src/content/pages/` JSON schemas. Client-side language toggling.
- **Editorial UI Refinement:** Replaced card-based tile layouts with professional editorial prose layouts for About and Student Life pages.
- **Contact Actions:** Converted static contact info into interactive quick-action buttons (Call, Email, Maps).
- **SEO & Metadata:** Minimal browser tab titles, accurate Open Graph tags, canonical URLs, and XML sitemap generation for `https://scbck.lk`.
- **Media Optimization:** Configured `sharp` to process and optimize gallery images to WebP. Added localized alt text schemas.
- **Repository Hygiene:** Cleaned up staled branches, updated `.gitignore`, and purged tracking artifacts.
- **Documentation:** Built comprehensive developer handbook and GitHub README.

## 5. Phase 2: Interactive Digital Campus (Upcoming Roadmap)

These features will transition the site from a static presence to an interactive portal. See `docs/developer-handbook/future-portal-spec.md` for full architectural specs.

### Task A (Multi-Role Auth)
- **Feature:** Implement authentication layer (NextAuth/Supabase) to handle student, teacher, and admin roles.
- **Architecture:** Shift Astro to `output: 'hybrid'` or `server` for protected `/portal/` routes.

### Task B (Interactive Timetables)
- **Feature:** Dynamic weekly schedules per student based on their database-assigned classes and subjects. React-powered live "Current Period" indicator.

### Task C (Past Paper Portal)
- **Feature:** Searchable digital library for past term test papers.
- **Architecture:** PDF hosting via Cloudflare R2 / S3, categorized by Grade and Subject.

### Task D (House Assignment Tool)
- **Feature:** Interactive component allowing students to enter their admission number and discover their house (Ramya, Suramya, Subha).
