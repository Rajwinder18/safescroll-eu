/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: '#B7A6FF',
          purple: '#8B7CF6',
          electric: '#8B7CF6',
          mint: '#78E6C1',
          navy: '#111827',
          secondary: '#192334',
          soft: '#F8F9FC',
          muted: '#A1A1AA',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(17, 24, 39, 0.06)',
        glow: '0 0 0 1px rgba(99, 102, 241, 0.12), 0 12px 40px rgba(99, 102, 241, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(167,139,250,0.18), transparent 36%), radial-gradient(circle at 80% 0%, rgba(99,102,241,0.16), transparent 30%), linear-gradient(180deg, #F8F9FC 0%, #EEF2FF 48%, #F8F9FC 100%)',
        'dark-hero':
          'radial-gradient(circle at 15% 10%, rgba(167,139,250,0.18), transparent 34%), radial-gradient(circle at 85% 0%, rgba(99,102,241,0.2), transparent 28%), linear-gradient(180deg, #0B1220 0%, #111827 60%, #0B1220 100%)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.86)', opacity: '0.75' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
