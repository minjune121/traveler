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
          50: '#FEFDE8',
          100: '#FFFAC2',
          200: '#FFF38A', // secondary-container
          300: '#FFEB5C',
          400: '#FFE135', // secondary
          500: '#F5CF0A',
          600: '#D4AE00',
          700: '#A88A00',
          800: '#7A6300', // on-secondary-container
          900: '#5C4A00', // on-secondary
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
          DEFAULT: '#FFE135',
          container: '#FFF38A',
        },
        'on-secondary': { DEFAULT: '#5C4A00', container: '#7A6300' },
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
