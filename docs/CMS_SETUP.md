# Content Manager (Decap CMS) setup

The site ships a Git-based editor at `/admin` (config: `public/admin/config.yml`).
Editors sign in with GitHub, edit announcements, leadership, articles, page text and
the student-life gallery, and every change is saved as a pull request into `develop`
(`publish_mode: editorial_workflow`).

## One-time setup (owner)
1. Create a GitHub OAuth App: GitHub > Settings > Developer settings > OAuth Apps.
   Homepage URL `https://scbck.lk`; callback URL `https://YOUR-PROXY/callback`.
2. Deploy an OAuth proxy (e.g. a Cloudflare Worker such as `sveltia-cms-auth`) with the
   OAuth app's Client ID and Secret as environment variables.
3. In `public/admin/config.yml`, uncomment `base_url` and set it to the proxy URL.
4. Give each editor write access to the repository (or a fork-based flow).
5. Visit `https://scbck.lk/admin`.

## Environment variables for the contact form
See `.env.example`: `PUBLIC_CONTACT_EMAIL` and `PUBLIC_FORM_ENDPOINT`.
Set them in the hosting provider's dashboard (e.g. Cloudflare Pages > Settings > Variables).

## Local editing (no OAuth)
Run `npx decap-server` alongside `npm run dev`, then add `local_backend: true` to
`config.yml` temporarily and open `http://localhost:4321/admin`.
