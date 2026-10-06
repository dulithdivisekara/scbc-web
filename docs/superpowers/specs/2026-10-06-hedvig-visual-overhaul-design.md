# Design Specification: Hedvig Template Visual Overhaul

## Overview
This document specifies the architectural and visual changes required to adapt the minimalist, editorial aesthetic of the Framer "Hedvig" template natively into the existing `scbc-web` Astro project. The goal is to elevate the platform's presentation to a premium institutional standard without sacrificing the decoupled content architecture (Decap CMS/JSON/Markdown), bilingual capabilities (English/Sinhala), or static site performance.

## 1. Core Visual Identity

### 1.1 Typography System
The Hedvig aesthetic relies on extreme typographic contrast between elegant, oversized serif headings and clean, highly legible sans-serif body text.

*   **English Headings:** Implement a premium serif font (e.g., `Playfair Display`, `Cormorant Garamond`, or `Instrument Serif`) for all `h1`, `h2`, `h3`, and `.font-serif` classes. Weights should be bold (700) or extra-bold (800) for high impact.
*   **English Body:** Implement a clean geometric sans-serif (e.g., `Inter` or `Manrope`) for body text, navigation, and small utility text.
*   **Sinhala Equivalents:** The existing `Noto Serif Sinhala` and `Noto Sans Sinhala` setup in `global.css` is perfectly suited for this and will be retained. We will ensure the scaling, line heights (`leading-relaxed`), and tracking (`tracking-tight` for headings, normal for body) match the new English rhythm.
*   **Implementation Details:** Update Google Fonts `<link>` in `BaseLayout.astro` and Tailwind theme configurations in `global.css` or `astro.config.mjs` (if Tailwind v3 is used, or directly in `global.css` if Tailwind v4).

### 1.2 Color Palette Refinement
Move away from stark whites and generic grays to a more sophisticated, muted palette.

*   **Base Backgrounds:** `bg-stone-50` (`#fafaf9`) or `bg-[#fcfcfc]` for primary page backgrounds to reduce eye strain and feel more like premium paper.
*   **Alternating Sections:** Use subtle warm grays (e.g., `bg-stone-100` or `bg-slate-50`) instead of hard borders to delineate sections.
*   **Text Contrast:** Use near-black charcoal (`text-stone-900` or `#1c1917`) for primary text to ensure extreme readability, avoiding lighter grays for main paragraphs.
*   **Accent Colors:** Desaturate the school's primary colors (Maroon, Teal, Orange) slightly so they act as elegant accents (e.g., thin underlines, button hover states, small badges) rather than large, overwhelming blocks of color.

## 2. Layout & Component Architecture

### 2.1 The End of "Card" Containers
The current site relies heavily on floating white cards with drop shadows (`bg-white shadow-sm rounded-xl border`). Hedvig uses expansive whitespace, full-bleed backgrounds, and subtle dividing lines.

*   **Action:** Strip `bg-white`, `shadow-sm`, and heavy `border` classes from components on the Home, Academics, Admissions, and Contact pages.
*   **Replacement:** Allow content to sit directly on the section backgrounds. Use thin, elegant bottom borders (`border-b border-stone-200`) or generous vertical padding (`py-16` or `py-24`) to separate content blocks.

### 2.2 Hero Sections & Imagery
Hedvig treats photography as a structural element, often using large, edge-to-edge images with rounded corners and overlaid text.

*   **Homepage Hero:** Refactor to a full-height or large expansive section with a high-quality background image (or split screen image/text), overlaid with massive, high-contrast serif typography.
*   **Subpage Headers:** Instead of small centered text blocks, use large left-aligned or center-aligned editorial headers with a subtle background image or just expansive whitespace and a thin dividing line below.
*   **Image Styling:** All standalone images should have slight border radiuses (e.g., `rounded-2xl` or `rounded-3xl`) to match the soft, premium feel.

### 2.3 Grid Systems
Implement "bento-box" style grids and asymmetrical layouts.

*   **Features/Cards (Academics/Student Life):** Instead of equal-sized uniform cards, use CSS Grid to create varied layouts (e.g., one large feature block spanning two columns next to two smaller ones).
*   **Alternating Layouts:** Use side-by-side text and image blocks that alternate left/right as the user scrolls down the page.

## 3. Micro-Interactions & Motion

Hedvig feels premium because of subtle, deliberate motion, avoiding aggressive layout shifts.

*   **Scroll Reveals (Fade-Up):** Enhance the existing `IntersectionObserver` in `BaseLayout.astro` (or introduce a lightweight library if needed, but native is preferred). Elements should enter the viewport with a soft fade and upward slide (`opacity-0 translate-y-6 transition-all duration-1000 ease-out`).
*   **Hover States:** Remove heavy background color shifts on hover. Instead, use scale effects (`hover:scale-[1.01]`), opacity shifts (`hover:opacity-80`), or elegant underline reveals for links and buttons.

## 4. Preservation of Core Features

*   **Bilingual System:** The `data-en`/`data-si` injection script and LocalStorage logic in `Header.astro` must remain untouched. The new components must be wired to use these attributes exactly as they do now.
*   **Decoupled Content:** The UI updates must consume the existing `src/content/` JSON and Markdown files. We will not hardcode content back into the `.astro` templates.
*   **Print Styles:** Ensure the `@media print` rules in `global.css` remain effective, hiding the new decorative elements and preserving the clean, ink-efficient A4 layout for physical documents.
*   **Form & CMS Integrations:** Ensure the `PUBLIC_FORM_ENDPOINT` logic in `contact.astro` and the Decap CMS `admin` configuration remain functional.
