<div align="center">
  <img src="public/assets/branding/school-crest-official.png" alt="Sri Chandananda Buddhist College Crest" width="150" />
  <h1>Sri Chandananda Buddhist College - Web Platform</h1>
  
  [![Astro](https://img.shields.io/badge/Astro-5.0-orange?logo=astro)](https://astro.build)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Decap CMS](https://img.shields.io/badge/Decap_CMS-Enabled-FF0055?logo=netlify)](https://decapcms.org/)
  [![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020?logo=cloudflare)](https://pages.cloudflare.com/)
</div>

---

## 🏛 Executive Summary

The official web portal for **Sri Chandananda Buddhist College** (Asgiriya, Kandy, Sri Lanka). 
Designed to be an authoritative, highly performant, and bilingual digital representation of the institution. 
This project goes beyond a simple brochure site by integrating a dynamic content architecture that will soon evolve into a full digital campus portal.

## 🛠 Tech Stack Overview

- **Core Framework:** [Astro 5](https://astro.build/) - For unparalleled static performance and content-driven architecture.
- **Styling System:** [Tailwind CSS v4](https://tailwindcss.com/) - Utilizing institutional design tokens (Teal, Saffron Orange, Maroon).
- **Language:** TypeScript in strict mode for reliable tooling.
- **Content Management:** Astro Content Collections paired with [Decap CMS](https://decapcms.org/) for intuitive editorial workflows.
- **Image Optimization:** Integrated `sharp` for automated WebP conversion.
- **Icons:** [Lucide React](https://lucide.dev/).

## 📁 Project Structure

```text
scbc-web/
├── public/                 # Static assets, gallery images, and /admin Decap CMS entry point
├── src/
│   ├── components/         # Shared UI, layout wrappers, and dynamic widgets
│   ├── content/            # The database of the site (JSON page data, Markdown articles)
│   ├── i18n/               # UI translation dictionaries (EN/SI)
│   ├── layouts/            # Base document wrappers with SEO metadata
│   ├── pages/              # Astro routing (consuming content collections)
│   └── styles/             # Global CSS and institutional font configurations
├── docs/
│   └── developer-handbook/ # In-depth technical guides
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v22.12.0` or higher
- **Package Manager**: `npm`

### Installation

```bash
git clone https://github.com/dulithdivisekara/scbc-web.git
cd scbc-web
npm install
```

### Development Server

Run the development server in background mode (recommended for a seamless terminal experience):
```bash
npx astro dev --background
```

To manage the background server:
- **Status:** `npx astro dev status`
- **Logs:** `npx astro dev logs`
- **Stop:** `npx astro dev stop`

Navigate to `http://localhost:4321/` in your browser.

## 📝 Content Management

The site's content is completely decoupled from the layout files. Content is managed in two ways:
1. **Locally via Code:** Edit the JSON/Markdown files in `src/content/`.
2. **Via Decap CMS:** Navigate to `http://localhost:4321/admin` to access the editorial GUI interface.

For a comprehensive breakdown of the content architecture and editing instructions, please read the [Content Editing Guide](docs/developer-handbook/content-editing-guide.md).

## 📚 Documentation

Detailed documentation on project architecture and future roadmap items can be found in the `docs/developer-handbook/` directory:

- [System Architecture](docs/developer-handbook/architecture.md)
- [Content Editing Guide](docs/developer-handbook/content-editing-guide.md)
- [Future Portal Specification](docs/developer-handbook/future-portal-spec.md)

---

> *“Built with dedication by alumni to serve the next generation of students.”*
