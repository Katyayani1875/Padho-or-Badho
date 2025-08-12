/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light theme
        primary: '#4F46E5', // Indigo 600
        secondary: '#10B981', // Emerald 500
        background: '#F9FAFB', // Gray 50
        'on-background': '#1F2937', // Gray 800
        surface: '#FFFFFF',
        'on-surface': '#111827', // Gray 900

        // Dark theme
        'dark-primary': '#818CF8', // Indigo 400
        'dark-secondary': '#34D399', // Emerald 400
        'dark-background': '#111827', // Gray 900
        'dark-on-background': '#F9FAFB', // Gray 50
        'dark-surface': '#1F2937', // Gray 800
        'dark-on-surface': '#E5E7EB', // Gray 200
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // Add a dyslexia-friendly font option later
      },
    },
  },
  plugins: [],
}