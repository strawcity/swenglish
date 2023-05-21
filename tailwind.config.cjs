/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'english': ['Lora', 'serif'],
        'swedish': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
