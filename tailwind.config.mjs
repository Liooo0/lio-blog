/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Songti SC"', '"STSong"', '"Noto Serif CJK SC"', '"SimSun"', 'serif'],
        mono: ['ui-monospace', '"SF Mono"', '"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          50: '#f8f6f1',
          100: '#efece4',
          200: '#e3ded2',
          300: '#cec7b6',
          400: '#a99f8a',
          500: '#8a816c',
          600: '#6b6355',
          700: '#514b41',
          800: '#33312c',
          900: '#262420',
          950: '#1a1a18',
        },
        accent: {
          50: '#fbf0f0',
          100: '#f7dede',
          200: '#efbfbf',
          300: '#e39696',
          400: '#d96f70',
          500: '#d04f51',
          600: '#c8393b',
          700: '#a72d2f',
          800: '#862427',
          900: '#6a1d1f',
          950: '#471011',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
