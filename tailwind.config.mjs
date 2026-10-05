/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        school: {
          white: '#FFFFFF',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          textPrimary: '#0F172A',
          textMuted: '#475569',
          teal: '#007A87',
          orange: '#F58220',
          maroon: '#581838',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Merriweather', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        sinhalaSerif: ['Noto Serif Sinhala', 'serif'],
        sinhalaSans: ['Noto Sans Sinhala', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
