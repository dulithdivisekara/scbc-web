# Sri Chandananda Buddhist College Web Platform Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the Sri Chandananda Buddhist College web platform (`scbc-web`) with cinematic GSAP scroll storytelling, interactive Timetable Explorer, Academic Vault for past papers, enhanced House System, and refined bilingual collegiate design.

**Architecture:** Astro 5 Static Site Generation (SSG) with React 19 interactive client islands for dynamic state (timetables, search/filtering, house calculator) and a lightweight GSAP bridge for declarative, accessible kinetic scroll interactions.

**Tech Stack:** Astro 5.0, Tailwind CSS v4, GSAP 3.12+ / ScrollTrigger, React 19, Lucide React, TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-10-scbc-web-elevation-design.md`

## Global Constraints
- Target branch: `feature/campus-redesign-and-interactive-tools`
- Primary colors: Deep Maroon (`#581838`), Saffron Orange (`#F58220`), Institutional Teal (`#007A87`), Surface (`#FCFCFC`)
- Diacritic safety: All Sinhala body elements must retain `line-height: 1.7` with `Noto Sans Sinhala` / `Noto Serif Sinhala`
- Accessibility: Respect `prefers-reduced-motion: reduce` across all GSAP timelines
- Mobile layout: Strict `overflow-x-hidden` on all pages and zero horizontal overflow
- Build integrity: `npm run build` must generate static pages cleanly with zero TypeScript or Vite errors

## Review Focus
1. **Timezone & Bell Schedule Edge Cases:** Current period indicator must calculate based on Sri Lanka Standard Time (GMT+5:30) regardless of the client's local timezone.
2. **Weekend & After-Hours Schedule Display:** When outside school hours (7:50 AM - 1:30 PM) or on weekends, show clear status ("School Day Concluded" or "Weekend - Next Session Monday") rather than undefined or an incorrect active period.
3. **Empty Filter States in Academic Vault:** Searching for combinations with zero results must display a friendly Sinhala/English empty state with a "Clear all filters" CTA.
4. **House Calculator Negative / Non-Integer Input:** Input validation must reject negative numbers, 0, decimals, and non-numeric characters before performing modulo-3 calculation.
5. **Print Stylesheet Isolation:** In print preview (`Ctrl/Cmd+P`), navigation headers, interactive filter buttons, and mobile drawers must be hidden, producing a high-contrast ink-efficient document with the official crest.

---

### Task 1: GSAP & Kinetic Motion Infrastructure

**Files:**
- Create: `src/scripts/gsap-init.ts`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `initGsapAnimations(): void` in `src/scripts/gsap-init.ts`

- [ ] **Step 1: Create `src/scripts/gsap-init.ts` with lifecycle bridge and ScrollTrigger registration**
  - Implement `initGsapAnimations()` registering `ScrollTrigger`.
  - Add `prefers-reduced-motion` check to bypass animations when requested.
  - Add cleanup function to kill existing ScrollTriggers before re-initializing on Astro page loads.
  - Implement selector bindings for `.gsap-hero-title`, `.gsap-hero-badge`, `.gsap-parallax-bg`, `.gsap-counter`, and `.gsap-reveal-batch`.

- [ ] **Step 2: Connect GSAP bridge in `src/layouts/BaseLayout.astro`**
  - Import or initialize `initGsapAnimations` on `DOMContentLoaded` and `astro:page-load`.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: Clean build with GSAP bundled.

- [ ] **Step 4: Commit**
  - `git add src/scripts/gsap-init.ts src/layouts/BaseLayout.astro`
  - `git commit -m "feat(motion): add GSAP and ScrollTrigger lifecycle bridge"`

---

### Task 2: Interactive Timetable Explorer & Bell Schedule System

**Files:**
- Create: `src/data/timetables.ts`
- Create: `src/components/timetable/TimetableExplorer.tsx`
- Create: `src/pages/timetables.astro`

**Interfaces:**
- Produces: `timetableData` in `src/data/timetables.ts`
- Produces: `<TimetableExplorer client:load />` in `src/components/timetable/TimetableExplorer.tsx`

- [ ] **Step 1: Define timetable data structure and schedules in `src/data/timetables.ts`**
  - Structure: Grades 1 through 13.
  - Streams: Primary, Middle School (Grades 6–9), O/L (Grades 10–11), and A/L (Physical Science, Bio Science, Commerce, Arts, Technology).
  - Bell periods (Periods 1–8, Morning Vandana, Interval).
  - Include both English and Sinhala subject names.

- [ ] **Step 2: Build `src/components/timetable/TimetableExplorer.tsx`**
  - Grade selector tabs (Primary, Junior Secondary, O/L, A/L).
  - Division / Section selector (e.g. 10-A, 10-B, 12-Bio, 12-Maths, 12-Commerce).
  - Day selector (Monday to Friday) with full weekly grid view toggle.
  - Live period detector function calculating Sri Lanka Time (`Asia/Colombo`).
  - Print button triggering browser print dialog with desk-ready CSS styles.

- [ ] **Step 3: Create Astro page `src/pages/timetables.astro`**
  - Include Header, Footer, Hero banner ("College Timetable & Daily Schedule"), and embed `<TimetableExplorer client:load />`.
  - Add print stylesheet rules for clean A4 printing.

- [ ] **Step 4: Verify build and routing**
  - Run: `npm run build`
  - Expected: `/timetables/index.html` generated in `dist`.

- [ ] **Step 5: Commit**
  - `git add src/data/timetables.ts src/components/timetable/TimetableExplorer.tsx src/pages/timetables.astro`
  - `git commit -m "feat(academics): add interactive timetable explorer and bell schedule"`

---

### Task 3: Academic Vault & Past Paper Repository

**Files:**
- Create: `src/data/academicVault.ts`
- Create: `src/components/academics/AcademicVaultExplorer.tsx`
- Create: `src/pages/academics/resources.astro`
- Modify: `src/pages/academics/index.astro`

**Interfaces:**
- Produces: `vaultResources` in `src/data/academicVault.ts`
- Produces: `<AcademicVaultExplorer client:load />` in `src/components/academics/AcademicVaultExplorer.tsx`

- [ ] **Step 1: Create resource catalog in `src/data/academicVault.ts`**
  - Schema: `id`, `title`, `title_si`, `grade`, `subject`, `subject_si`, `medium` (`en` | `si`), `term`, `year`, `fileSize`, `type` (`Past Paper` | `Model Paper` | `Syllabus` | `Revision Notes`), `downloadUrl`.
  - Populate with realistic curricula entries for O/L and A/L Science, Mathematics, Buddhism, Sinhala, English, and ICT.

- [ ] **Step 2: Create `src/components/academics/AcademicVaultExplorer.tsx`**
  - Search input with instant client filtering.
  - Facet filters: Grade (All, 6-9, 10-11 O/L, 12-13 A/L), Subject dropdown, Medium toggle, Term filter.
  - Empty state with reset filters button.
  - Document cards with subject iconography, download button, and direct preview.

- [ ] **Step 3: Create `src/pages/academics/resources.astro` and link from `/academics`**
  - Header, breadcrumb, and Vault Explorer island.
  - Add resource spotlight banner in `src/pages/academics/index.astro`.

- [ ] **Step 4: Verify build**
  - Run: `npm run build`
  - Expected: `/academics/resources/index.html` generated in `dist`.

- [ ] **Step 5: Commit**
  - `git add src/data/academicVault.ts src/components/academics/AcademicVaultExplorer.tsx src/pages/academics/resources.astro src/pages/academics/index.astro`
  - `git commit -m "feat(academics): add academic vault and past paper digital library"`

---

### Task 4: Enhanced Collegiate House Portal & Heritage Calculator

**Files:**
- Modify: `src/components/common/HouseCalculator.astro`
- Modify: `src/pages/student-life.astro`

**Interfaces:**
- Consumes: Modulo-3 calculation formula (`admission % 3`)

- [ ] **Step 1: Upgrade `src/components/common/HouseCalculator.astro`**
  - Add animated house badges (Ramya - Lotus/Teal, Suramya - Torch/Saffron, Subha - Lion/Maroon).
  - Add GSAP spring entrance for result display.
  - Validate against negative and decimal inputs.

- [ ] **Step 2: Enhance `src/pages/student-life.astro`**
  - Add detailed section for the Three Houses with color schemes, mottos, athletic championship history, and house captains' pledge.
  - Highlight Kandyan Ves Dance troupe, Geta Bera drumming, and Cadetting / Scouting regiments.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: Clean build with updated student-life page.

- [ ] **Step 4: Commit**
  - `git add src/components/common/HouseCalculator.astro src/pages/student-life.astro`
  - `git commit -m "feat(student-life): elevate house system, athletics lore and calculator"`

---

### Task 5: Elevate Home Page with Cinematic GSAP Hero & Milestone Scroll Timeline

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update Hero Section with GSAP Kinetic Elements**
  - Apply `.gsap-hero-title`, `.gsap-hero-badge`, `.gsap-parallax-bg` classes.
  - Enhance visual hierarchy with crest watermark and refined typography.

- [ ] **Step 2: Add Live Metrics Counter Reel**
  - Add 4 key statistics: 2006 (Founded), 3 (Collegiate Houses), 13 (Grades 1–13), 100% (Buddhist Value-Grounded).
  - Wire to GSAP scroll-triggered counter animation.

- [ ] **Step 3: Add Campus Milestones Progress Timeline**
  - Create vertical scroll-drawn timeline showing key historic milestones (2006 Founding, 2012 Secondary Expansion, 2020 Girls' Section Opening, 2024+ Modern STEM Classrooms).

- [ ] **Step 4: Integrate Quick Access Bar to Timetables & Academic Vault**
  - Prominent cards connecting students directly to Daily Timetables and Past Papers Vault.

- [ ] **Step 5: Verify build**
  - Run: `npm run build`
  - Expected: Clean build.

- [ ] **Step 6: Commit**
  - `git add src/pages/index.astro`
  - `git commit -m "feat(home): add cinematic GSAP hero, milestone timeline, and metrics reel"`

---

### Task 6: Global Bilingual Translation Expansion & Navigation Integration

**Files:**
- Modify: `src/i18n/translations.ts`
- Modify: `src/components/common/Header.astro`
- Modify: `src/components/common/Footer.astro`

- [ ] **Step 1: Add new translation keys in `src/i18n/translations.ts`**
  - Add English and Sinhala strings for Timetables, Academic Vault, Live Bell Status, Milestone titles, and House mottos.

- [ ] **Step 2: Update Header and Footer navigation**
  - Add "Timetables" and "Resources" to desktop navigation and mobile drawer.
  - Ensure language switcher toggles all new text elements seamlessly.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: Clean build.

- [ ] **Step 4: Commit**
  - `git add src/i18n/translations.ts src/components/common/Header.astro src/components/common/Footer.astro`
  - `git commit -m "feat(i18n): expand bilingual dictionaries and update global navigation"`

---

### Task 7: Full System Verification, Build Test & Final Review

**Files:**
- All touched files

- [ ] **Step 1: Run comprehensive build verification**
  - Run: `npm run build`
  - Verify all 8 static routes generate without errors:
    - `/`
    - `/about`
    - `/academics`
    - `/academics/resources`
    - `/timetables`
    - `/student-life`
    - `/admissions`
    - `/contact`

- [ ] **Step 2: Inspect responsive layout and print styles**
  - Confirm zero horizontal scroll issues.
  - Confirm print styling on `/timetables` and `/admissions`.

- [ ] **Step 3: Final Git branch status check**
  - Verify branch `feature/campus-redesign-and-interactive-tools` is clean and ready for push or PR.
