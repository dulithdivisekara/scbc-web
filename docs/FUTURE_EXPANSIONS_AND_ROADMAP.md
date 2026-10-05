# Comprehensive Future Expansion Specification

This document outlines the architectural blueprints for the upcoming phases of the Sri Chandananda Buddhist College digital campus portal.

## Phase 2: Interactive Class Timetable System

- **Objective:** Enable students, parents, and teachers to view and print real-time grade/section schedules.
- **Data Architecture:** Astro Content Collection (`src/content/timetables/*.json`) schema:
  - `grade`: String (e.g., `"10-A"`, `"12-Science"`)
  - `medium`: `"Sinhala"` | `"English"`
  - `term`: Number
  - `effectiveDate`: Date
  - `schedule`: Object mapping days (`Monday`–`Friday`) to array of `{ period: number, time: string, subject: string, subject_si: string, teacher: string, teacher_si: string }`.
- **UI/UX Spec:**
  - Route: `/timetables`
  - Dual dropdown selection: `Grade` -> `Section`.
  - Zero-latency client-side reactive rendering table.
  - "Print Schedule" action utilizing the existing `@media print` layout for student desk pinning.

## Phase 3: Academic Vault (Past Papers, Model Papers & Revision Notes)

- **Objective:** Provide a digital syllabus and exam prep repository without inflating the Git repository size.
- **Storage Strategy:** Offload large PDF assets to a Cloudflare R2 bucket (`cdn.scbck.lk/resources/`).
- **Metadata Collection (`src/content/resources/*.md`):**
  - Schema: `title`, `title_si`, `grade` (1–13), `subject`, `subject_si`, `medium`, `year`, `term`, `type` (`"Past Paper" | "Marking Scheme" | "Short Notes"`), `downloadUrl`, `fileSize`.
- **UI/UX Spec:**
  - Route: `/academics/resources`
  - Instant client-side search and facet filters (by Grade, Subject, and Medium).
  - Download count tracking and mobile-friendly preview.

## Phase 4: Role-Based Portals & Campus Authentication

- **Objective:** Separate workspaces for Teachers, Students, and Alumni without managing fragile custom password databases.
- **Authentication Stack:** Cloudflare Access (Zero Trust) or Supabase Auth.
- **Role Breakdown:**
  1. **Administration & Teachers (`/portal/staff`):**
     - Single Sign-On (SSO) with official Google Workspace accounts (`@scbck.lk`).
     - Features: Student attendance logging, circular drafting, and Decap CMS publishing.
  2. **Students & Parents (`/portal/student`):**
     - Sign-in via Student Admission / Index Number.
     - Features: House points standing, term report access, assigned homework notes.
  3. **Alumni Network (`/alumni`):**
     - Membership registration portal (OBA / Alumnae Association).
     - Verification flow linking historical index numbers, house affiliation, and graduation years.

## Phase 5: Live Decap CMS Activation (Post-Approval Handover)

- Detailed walkthrough for completing the Decap CMS connection once the school domain is live:
  1. Register GitHub OAuth App under the school GitHub organization.
  2. Deploy the serverless auth proxy worker (via Cloudflare Workers).
  3. Update `base_url` in `public/admin/config.yml`.
  4. Train administrative office clerks on creating announcements via `/admin`.
