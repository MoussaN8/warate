/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Active le mode sombre via la classe .dark
  content: [
    './src/**/*.{html,ts}', // Dit à Tailwind de scanner tout le dossier src
  ],
  theme: {
    extend: {
      colors: {
        first: '#1ecf8a',
      },
    },
  },
  plugins: [],
};
