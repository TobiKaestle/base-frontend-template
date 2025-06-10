// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        bottom: '0px 10px 10px -5px rgba(0, 0, 0, 0.25)',
        right: '10px 0px 10px -5px rgba(0, 0, 0, 0.15)',
      },
      zIndex: {
        100: '100',
        200: '200',
      },
    },
  },
};
