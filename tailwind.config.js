/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F2A43",
        navylight: "#1B3D5C",
        chalk: "#F5F1E8",
        orange: "#FF6B35",
        mustard: "#E8A94C",
        ink: "#1C1B19",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
