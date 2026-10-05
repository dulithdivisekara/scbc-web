# Contributing to Sri Chandananda Buddhist College Web Platform

Welcome, and thank you for considering contributing to the official SCBC web portal! Whether you are a student, an alumnus, or a community developer, your help is appreciated.

## Contribution Workflow

1. **Fork the Repository:** Create your own fork on GitHub.
2. **Branching Guidelines:** 
   - Use descriptive branch names: `feature/short-description` or `fix/issue-description`.
   - Always base your branch off `develop`.
3. **Local Development:**
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the local development server.
4. **Bilingual Content Conventions:**
   - All new features and content must support both English and Sinhala.
   - Content strings must be abstracted into `src/content/` (for large sections) or `src/i18n/translations.ts` (for UI strings).
   - Do not hardcode strings inside `.astro` files.
5. **Build Verification:**
   - Before committing, always run `npm run build` to verify that there are no static generation errors.
6. **Pull Requests:**
   - Open your PR against the `develop` branch.
   - Provide a clear description of the problem solved or the feature added.

## Tech Stack
- Astro 5.x
- Tailwind CSS v4
- TypeScript

Thank you for helping us build the digital future of SCBC!
