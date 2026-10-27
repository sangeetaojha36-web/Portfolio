/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F2',
          subtle: '#F3EFE8',
          card: '#FFFFFF',
          border: '#E7DFD5',
        },
        ink: {
          DEFAULT: '#1C1917',
          muted: '#66615B',
          faint: '#9E978E',
        },
        studio: {
          bg: '#0F1115',
          card: '#161922',
          border: '#242A36',
          muted: '#94A3B8',
        },
        clay: '#C46D4E',
        sage: '#447055',
        cobalt: '#3E6B99',
        sand: '#E9E2D8',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 25px -4px rgba(28, 25, 23, 0.05), 0 2px 10px -2px rgba(28, 25, 23, 0.03)',
        'float': '0 20px 40px -15px rgba(28, 25, 23, 0.08), 0 0 1px 1px rgba(28, 25, 23, 0.04)',
      },
      animation: {
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
