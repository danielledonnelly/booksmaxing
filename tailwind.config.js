/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a1a1a',
        'secondary': '#2d2d2d',
        'accent': '#4f46e5',
        'text-primary': '#ffffff',
        'text-secondary': '#cccccc',
        'medium-grey': '#666666',
      }
    },
  },
  plugins: [],
} 