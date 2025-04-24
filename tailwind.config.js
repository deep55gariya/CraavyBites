/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["border-primary", "hover:bg-primary/80", "text-primary"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ffc727",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        dark: "#111111",
      },
    },
  },
  plugins: [],
};
