// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Canonical production domain or Cloudflare Pages preview URL.
// Default to the live Cloudflare Pages preview domain so social scrapers (WhatsApp, FB, Twitter)
// can resolve and render the OG preview card immediately without DNS errors.
const site = process.env.SITE_URL || 
             process.env.CF_PAGES_URL || 
             'https://feature-campus-redesign-and.scbc-web.pages.dev';

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});
