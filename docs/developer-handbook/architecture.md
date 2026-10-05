# System Architecture

## 1. The Astro Content Collection Engine

The Sri Chandananda Buddhist College web platform uses [Astro 5](https://astro.build/) to generate static HTML pages that are highly performant. A key architectural decision is the strict separation of **content** from **presentation**.

We achieve this via Astro's Content Collections (`src/content/`), which serves as the site's local database.

### Schema Definitions (`src/content.config.ts`)
All content is strictly typed using Zod schemas defined in `content.config.ts`. The current collections include:
- `pages`: JSON files that define the localized strings (English and Sinhala) for standalone pages (e.g., Admissions, Contact, Academics).
- `articles`: Long-form Markdown files detailing institutional knowledge (e.g., College History, Student Life).
- `gallery`: JSON/YAML definitions for image galleries, managing metadata like alt-text and captions.

### Page Consumption (`src/pages/*.astro`)
The `.astro` files inside `src/pages/` are completely generic templates. They do not contain hardcoded textual data. Instead, they fetch their respective collection item using `getEntry('pages', 'page-id')`.

## 2. Bilingual Architecture (English & Sinhala)

To support the school's bilingual nature, localization is baked into every layer of the app.

### Content Structure
Every data model in the content collections includes paired properties:
- `title` / `title_si`
- `description` / `description_si`

### UI Strings (`src/i18n/translations.ts`)
Static UI elements (like buttons, navigation links, and common labels) are managed in a central translation dictionary.

### Runtime Language Switching
Language switching happens purely client-side without requiring page reloads. A JavaScript toggle in the Header swaps the `lang` attribute on the `<html>` element. CSS attribute selectors (`html[lang="si"]`) then conditionally display the correct content block.

```html
<!-- Example Pattern -->
<span class="en-text">English Title</span>
<span class="si-text">සිංහල මාතෘකාව</span>
```

In `global.css`, `.en-text` and `.si-text` are displayed or hidden based on the document's `lang` attribute. Furthermore, setting `lang="si"` applies the `Noto Sans Sinhala` font stack globally, enforcing proper typographic hierarchy.

## 3. Image Optimization Pipeline

Images located in `public/assets/gallery/` are processed by Astro's built-in image services backed by `sharp`. When the `<Image />` component from `astro:assets` is used, the images are automatically converted to WebP formats and dynamically sized to prevent Cumulative Layout Shift (CLS) and save bandwidth.

## 4. Styling and Design Tokens

The site relies exclusively on Tailwind CSS v4. Design tokens are centrally managed in `src/styles/global.css`.

Institutional Palette:
- **Teal**: `#007A87`
- **Saffron Orange**: `#F58220`
- **Deep Maroon**: `#581838`

Components avoid arbitrary values. Standard spacing, typography (Merriweather / Inter), and shadow tokens are utilized to maintain a cohesive editorial layout.
