// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Canonical production domain. Override with SITE_URL for previews,
// e.g. SITE_URL=https://scbc-web.pages.dev npm run build
const site = process.env.SITE_URL || 'https://scbck.lk';

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});
