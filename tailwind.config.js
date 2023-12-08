/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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

