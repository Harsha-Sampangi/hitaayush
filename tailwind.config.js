/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102A43',
          50: '#E6EBF0',
          100: '#C4D0DC',
          200: '#8FA4B8',
          300: '#5A7894',
          400: '#2F4F6E',
          500: '#102A43',
          600: '#0D2236',
          700: '#0A1A2A',
          800: '#07121D',
          900: '#040A11',
        },
        healthcare: {
          DEFAULT: '#2878D0',
          50: '#E8F1FB',
          100: '#C5DCF5',
          200: '#8FBAEA',
          300: '#5A98DF',
          400: '#2878D0',
          500: '#2060A6',
          600: '#18487D',
          700: '#103053',
          800: '#08182A',
        },
        teal: {
          DEFAULT: '#36B8A5',
          50: '#E8F8F5',
          100: '#C6EDE7',
          200: '#8EDDD0',
          300: '#56CDB9',
          400: '#36B8A5',
          500: '#2B9384',
          600: '#206E63',
          700: '#164A42',
          800: '#0B2521',
        },
        surface: '#FFFFFF',
        background: '#F5F7FA',
        'text-primary': '#172B4D',
        'text-secondary': '#62748A',
        success: '#2EAD78',
        warning: '#E8A23A',
        error: '#D9534F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
