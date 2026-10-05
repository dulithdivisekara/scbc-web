# Content Editing Guide

This guide explains how to manage content on the Sri Chandananda Buddhist College web portal. There are two ways to manage content: using the built-in Content Management System (Decap CMS) or modifying the source files manually.

## 1. Using Decap CMS (Recommended for Non-Technical Users)

The platform has Decap CMS integrated, providing a friendly Graphical User Interface (GUI) to edit pages, articles, and announcements.

1. Navigate to `/admin` on the website (e.g., `http://localhost:4321/admin` locally or `https://scbck.lk/admin` in production).
2. Authenticate (using Git Gateway or local backend in development).
3. Select the collection you want to edit (e.g., "Pages", "Articles").
4. Fill out the fields in the UI. For every field, there is typically a corresponding Sinhala field (e.g., `Title` and `Title (Sinhala)`).
5. Click **Publish**. This will automatically commit the changes to the Git repository and trigger a new deployment.

## 2. Manual Source Editing (For Developers)

All content lives in the `src/content/` directory.

### Editing Page Text (`src/content/pages/`)
Each main page has a corresponding `.json` file in this directory. For example, the Academics page content is in `src/content/pages/academics.json`.

**Example Schema:**
```json
{
  "title": "Academics",
  "title_si": "අධ්‍යාපන",
  "meta_description": "Academic excellence at Sri Chandananda Buddhist College.",
  "meta_description_si": "ශ්‍රී චන්දානන්ද බෞද්ධ විද්‍යාලයේ අධ්‍යාපනික විශිෂ්ටත්වය.",
  "sections": [
    {
      "heading": "Primary Section",
      "heading_si": "ප්‍රාථමික අංශය",
      "content": "Description of the primary section.",
      "content_si": "ප්‍රාථමික අංශයේ විස්තරය."
    }
  ]
}
```

### Editing Long-Form Articles (`src/content/articles/`)
Rich editorial content like the College History or Student Life articles are stored as Markdown files. 

**Example Schema:**
```markdown
---
id: "about-college"
title: "The Heritage and Evolution of Sri Chandananda Buddhist College"
title_si: "ශ්‍රී චන්දානන්ද බෞද්ධ විද්‍යාලයේ උරුමය සහ පරිණාමය"
lead: "A legacy of Buddhist education..."
lead_si: "බෞද්ධ අධ්‍යාපනයේ උරුමය..."
---

Content body is not used directly in this implementation, instead, we utilize structured sections defined within the frontmatter or via component layout mapping.
```

### Updating the Image Gallery (`src/content/gallery/` & `public/assets/gallery/`)
1. Add new optimized `.webp` or high-quality `.jpg/.png` files into `public/assets/gallery/`.
2. Open `src/content/pages/student-life.json` (or the respective gallery JSON file) and add an entry:
   ```json
   {
     "src": "/assets/gallery/image1.webp",
     "alt": "Sports meet 2024",
     "alt_si": "2024 ක්‍රීඩා උත්සවය"
   }
   ```

### Important Rule: Do not hardcode Text in `.astro` Files
Never place English or Sinhala strings directly inside `src/pages/*.astro` or `src/components/*.astro` files. Always extract them into `src/content/pages/*.json` or the translation dictionary `src/i18n/translations.ts`.
