/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        scorpius: {
          bg: '#0A0E1A',
          card: 'rgba(15, 23, 42, 0.65)',
          gold: '#FFB800',
          'gold-glow': '#FFE57F',
          teal: '#00E5CC',
          'teal-glow': '#80FFF3',
          dark: '#050811',
          border: 'rgba(255, 184, 0, 0.25)',
          'teal-border': 'rgba(0, 229, 204, 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(255, 184, 0, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 229, 204, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
