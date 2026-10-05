# Future Digital Campus Portal Specification

While Phase 1 of the web platform focuses on establishing a highly performant, bilingual institutional presence, Phase 2 and Phase 3 will transform the site into an interactive digital campus. 

This document outlines the architectural specifications and roadmap for these upcoming features.

## 1. Multi-Role Authentication System (Auth)

To serve dynamic, personalized data, the platform requires an authentication layer.

### Architecture Proposal
- **Provider:** NextAuth (Auth.js) or Supabase Auth.
- **Roles:**
  - `student`: Access to personal timetables, grades, and past papers.
  - `teacher`: Access to upload assignments, view class rosters.
  - `admin`: Full portal access, content moderation.
- **Implementation Path:** Transition from purely static Astro (SSG) to a hybrid SSR (Server-Side Rendering) model using Astro server adapters (e.g., Cloudflare adapter) for protected routes (e.g., `/portal/*`).

## 2. Interactive Student Timetables

A dynamic dashboard showing a student's daily schedule.

### Requirements
- **Data Source:** A relational database (PostgreSQL via Supabase or Turso) mapping students to classes and subjects.
- **Features:**
  - Weekly grid view.
  - Live indicator of the "Current Period" based on server time.
  - Teacher allocation per subject.
- **UI Components:** Build with React (island architecture) inside Astro to handle client-side state and time-based updates.

## 3. Past Paper & Academic Resource Portal

A searchable, categorized repository of past exam papers and term test papers.

### Requirements
- **Storage:** R2 (Cloudflare) or AWS S3 for secure, low-latency PDF hosting.
- **Database Schema:**
  - `Document_ID`
  - `Grade` (e.g., Grade 10)
  - `Subject` (e.g., Mathematics)
  - `Term/Year` (e.g., 2023 Term 2)
  - `URL` (Pointer to object storage)
- **Features:**
  - Filtering by Grade, Subject, and Year.
  - Instant PDF preview modal.
  - Bilingual interface (English/Sinhala).

## 4. House Assignment & Interactive Tools
Expand on the existing algorithmic assignments (e.g., Modulo 3 house assignment for Ramya, Suramya, Subha) to include interactive dashboards where students can enter their Admission Number and securely view their house allocations, term test marks, and extracurricular activity schedules.

---
**Note:** As these features require backend databases and server-side logic, the Astro configuration will need to be updated to `output: 'server'` or `output: 'hybrid'` prior to implementation.
