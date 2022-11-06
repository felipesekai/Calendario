/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx",
    "./index.html"],
  theme: {
    extend: {
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      }
    },
  },
  plugins: [],
}
