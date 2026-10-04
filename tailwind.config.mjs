/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #722F37)',
        accent: 'var(--color-accent, #D4AF37)',
        surface: 'var(--color-surface, #F8F5F2)',
        'text-primary': 'var(--color-text-primary, #2C3E50)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Merriweather', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
