/** @type {import('tailwindcss').Config} */

// Brand palette sampled from the official MoveMantra logo:
//   navy  #154A7E (the "M" and figure)   teal #0F9598 (the right stroke)
//   gold  #FAB114 (the sun / swoosh)     wordmark navy #124272
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF4FA',
          100: '#D7E4F1',
          200: '#AFC8E3',
          300: '#7EA5CE',
          400: '#4A7DB2',
          500: '#2A6199',
          600: '#154A7E',
          700: '#124272',
          800: '#0F345B',
          900: '#0C2846',
          950: '#081A30',
        },
        teal: {
          50: '#ECFAF9',
          100: '#CFF2F0',
          200: '#A2E4E1',
          300: '#66CFCB',
          400: '#2DB5B3',
          500: '#0F9598',
          600: '#0D7C80',
          700: '#0F6468',
          800: '#115155',
          900: '#124347',
        },
        gold: {
          50: '#FFF8E6',
          100: '#FEEDC0',
          200: '#FDDB85',
          300: '#FCC74A',
          400: '#FAB114',
          500: '#F39C1F',
          600: '#D97A0B',
          700: '#B45909',
        },
        mist: {
          50: '#F7FAFC',
          100: '#EFF5F9',
          200: '#E2ECF3',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1DA851',
          ink: '#0B3D22',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-sm': ['2.375rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        display: ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        content: '76rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12,40,70,0.04), 0 8px 24px -8px rgba(12,40,70,0.10)',
        lift: '0 2px 4px rgba(12,40,70,0.05), 0 22px 44px -16px rgba(12,40,70,0.22)',
        glow: '0 10px 30px -10px rgba(15,149,152,0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.55)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite',
      },
    },
  },
  plugins: [],
};
