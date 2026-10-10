# SDD ledger — plan: docs/superpowers/plans/2026-10-10-scbc-web-elevation.md

## Pre-flight scan
- Task 1 (GSAP motion infrastructure): produces `initGsapAnimations()`. Consumed by BaseLayout and Home page (Task 5).
- Task 2 (Timetables): produces `timetableData` in `src/data/timetables.ts`, `TimetableExplorer.tsx`, and `/timetables.astro`. Consumed by Header/Nav (Task 6) and Home (Task 5).
- Task 3 (Academic Vault): produces `vaultResources` in `src/data/academicVault.ts`, `AcademicVaultExplorer.tsx`, and `/academics/resources.astro`. Consumed by Header/Nav (Task 6) and Home (Task 5).
- Task 4 (House Portal & Calculator): enhances HouseCalculator and student-life. Consumed by Home (Task 5).
- Task 5 (Home page): integrates GSAP hero, metrics reel, milestone timeline, timetable/vault quick links.
- Task 6 (Translations & Nav): wires i18n keys and header/footer links across all new routes.
- Task 7 (System Verification): full production build verification of all 8 static pages.
Pre-flight: clean interface alignment confirmed.

Task 1: complete (commits 1ce3917..29009cd, tests: npm run build → 6 page(s) built in 977ms clean)
Task 2: complete (commits 29009cd..cab536c, tests: npm run build → 7 page(s) built in 1.12s clean, /timetables generated)
Task 3: complete (commits cab536c..03d5b9d, tests: npm run build → 8 page(s) built in 1.29s clean, /academics/resources generated)
Task 4: complete (commits 03d5b9d..cfd5bbb, tests: npm run build → 8 page(s) built in 1.20s clean, Three Houses & upgraded calculator)
Task 5: complete (commits cfd5bbb..8de1394, tests: npm run build → 8 page(s) built in 1.21s clean, GSAP hero, counters, milestones)
Task 6: complete (commits 8de1394..b0dc6ff, tests: npm run build → 8 page(s) built in 1.18s clean, nav/footer & i18n enriched)
