// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'music-primary': '#1DB954',
        'music-dark': '#191414',
      },
    },
  },
  plugins: [],
}