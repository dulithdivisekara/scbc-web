# Sri Chandananda Buddhist College - Web Portal

Official web portal for Sri Chandananda Buddhist College (Asgiriya, Kandy, Sri Lanka). Built with [Astro](https://astro.build/), [Tailwind CSS v4](https://tailwindcss.com/), and [React](https://react.dev/).

---

## 📋 Prerequisites

Before running the project locally, ensure you have:

- **Node.js**: `v22.12.0` or higher (recommended: LTS)
- **Package Manager**: `npm` (bundled with Node.js) or `pnpm` / `yarn`

Verify your Node version:
```bash
node -v
```

---

## 🚀 Getting Started (Run on Localhost)

Follow these steps to run the website locally on your machine:

### 1. Clone & Navigate to Project

```bash
git clone https://github.com/dulithdivisekara/scbc-web.git
cd scbc-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Local Development Server

You can run the development server in standard interactive mode or in background mode.

#### Option A: Standard Interactive Mode (Recommended for everyday development)

```bash
npm run dev
```

Once running, open your browser and navigate to:
```
http://localhost:4321/
```
*(or `http://127.0.0.1:4321/`)*

#### Option B: Background Mode (Using Astro CLI)

To keep the development server running in the background without tying up a terminal window:

```bash
npx astro dev --background
```

To manage the background server:
- **Check status:** `npx astro dev status`
- **View server logs:** `npx astro dev logs`
- **Stop server:** `npx astro dev stop`

---

## 🧞 Available Scripts

Run from the root of the project:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Astro development server at `http://localhost:4321` with HMR |
| `npm run build` | Builds the static production site into the `./dist/` directory |
| `npm run preview` | Serves the production build locally for testing prior to deployment |
| `npm run astro -- --help` | Displays help and documentation for the Astro CLI |

---

## 📁 Project Structure

```text
scbc-web/
├── public/
│   ├── assets/
│   │   ├── activities/     # Student life, sports, and cultural imagery
│   │   ├── branding/       # College crest and official seals
│   │   ├── campus/         # Main buildings, facilities, and campus photos
│   │   └── leadership/     # Founder and Principal portraits
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── common/         # Header, Footer, and shared UI components
│   ├── content/
│   │   └── announcements/  # Content collections for notices & circulars
│   ├── layouts/
│   │   └── BaseLayout.astro # Base layout with meta tags, navigation & footer
│   ├── pages/
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro     # About the College & Leadership
│   │   ├── academics.astro # Academic wings, curricula, and facilities
│   │   ├── admissions.astro # Admissions process and requirements
│   │   ├── contact.astro   # Contact details, map, and inquiry form
│   │   └── student-life.astro # Sports, Buddhist society, and clubs
│   ├── styles/
│   │   └── global.css      # Tailwind v4 configuration, theme variables & typography
│   └── content.config.ts   # Astro 5 content collections definition
├── package.json
└── astro.config.mjs
```

---

## 📝 Managing Content & Announcements

New circulars and announcements can be added as Markdown files under `src/content/announcements/`:

```markdown
---
title: "Title of Announcement"
pubDate: 2026-10-05
summary: "Brief synopsis displayed on the homepage."
category: "General" # or Academic, Cultural, Sports
urgent: false
---

Full announcement content goes here...
```

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Merriweather (serif) & Inter (sans-serif)
