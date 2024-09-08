/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '3': '3 3 0%',
        '3.5': '3.5 3.5 0%', 
        '5.5': '5.5 5.5 0%', 
      },
    },
  },
  plugins: [],
}