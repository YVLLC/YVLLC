/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        hover: "#005FCC",
        black: "#111111",
        gray: {
          DEFAULT: "#444444",
          muted: "#888888",
        },
        white: "#FFFFFF",
        sky: "#E6F0FF",
        border: "#CFE4FF",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#FACC15",
        focus: "#0056B3",
      },
    },
  },
  plugins: [],
};
