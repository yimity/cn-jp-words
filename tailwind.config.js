/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      minWidth: {
        'lg': '32rem',
      }
    },
  },
  plugins: [],
}

