/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3B82F6',  // A soft blue for primary buttons and highlights
          secondary: '#EF4444', // A calm red for secondary buttons or warnings
          background: '#F9FAFB', // A very light gray for a clean, minimal background
          textPrimary: '#1F2937', // Dark gray for primary text, good contrast with the light background
          textSecondary: '#4B5563', // Medium gray for secondary text
          accent: '#10B981', // A fresh green for accents and success messages
        },
        dark: {
          primary: '#2563EB',  // A deeper blue, more fitting for dark mode
          secondary: '#F87171', // A softer red for dark mode
          background: '#111827', // Almost black for a deep, immersive background
          textPrimary: '#E5E7EB', // Very light gray for primary text to contrast against the dark background
          textSecondary: '#9CA3AF', // Soft gray for secondary text
          accent: '#22C55E', // A vibrant green to stand out in dark mode
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-dark-mode')(),
  ],
};
