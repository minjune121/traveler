/** @type {import('tailwindcss').Config} */
// 토큰 출처: DESIGN.md (TripFlow Tokyo Healing)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Bright Lilac) 스케일 — 500: primary-container, 600: primary
        brand: {
          50: '#FBF5FF',
          100: '#F5E5FF',
          200: '#EBCCFF',
          300: '#E2B3FF',
          400: '#DA99FF',
          500: '#D580FF', // primary-container
          600: '#B34FE6', // primary
          700: '#9A35CC', // hover / pressed
          800: '#7D2AA6',
          900: '#622382',
          950: '#3B0A52', // on-primary-container
        },
        // Secondary (Bright Yellow) 스케일
        accent: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A', // secondary-container
          300: '#FDE047',
          400: '#FACC15', // secondary
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E', // on-secondary-container
          900: '#713F12', // on-secondary
        },
        // Material 시맨틱 토큰
        surface: {
          DEFAULT: '#F8F9FF',
          dim: '#CBDBF5',
          bright: '#F8F9FF',
          'container-lowest': '#FFFFFF',
          'container-low': '#EFF4FF',
          container: '#E3ECFF',
          'container-high': '#D8E5FF',
          'container-highest': '#CBDBF5',
        },
        'on-surface': {
          DEFAULT: '#0F1B2D',
          variant: '#434752',
        },
        outline: {
          DEFAULT: '#747783',
          variant: '#C4C6D3',
        },
        primary: {
          DEFAULT: '#B34FE6',
          container: '#D580FF',
        },
        'on-primary': { DEFAULT: '#FFFFFF', container: '#3B0A52' },
        secondary: {
          DEFAULT: '#FACC15',
          container: '#FEF08A',
        },
        'on-secondary': { DEFAULT: '#713F12', container: '#854D0E' },
        tertiary: {
          DEFAULT: '#06B6D4',
          container: '#CFFAFE',
        },
        'on-tertiary': { DEFAULT: '#FFFFFF', container: '#164E63' },
        // 택시 플래시카드 전용 딥 다크 서피스
        taxi: {
          DEFAULT: '#1E293B',
          deep: '#0F172A',
        },
        // 상태 색상
        status: {
          progress: '#F59E0B',
          done: '#10B981',
          sos: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        display: '2.25rem',
        h1: '1.75rem',
        h2: '1.375rem',
        h3: '1.125rem',
        'body-lg': '1rem',
        'body-md': '0.875rem',
        'body-sm': '0.75rem',
        caption: '0.6875rem',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(179, 79, 230, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        elevated: '0 10px 25px -3px rgba(179, 79, 230, 0.15)',
      },
    },
  },
  plugins: [],
}
