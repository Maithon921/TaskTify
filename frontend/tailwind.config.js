/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb", // almost white, very light
        card: "#ffffffcc", // frosted glass white
        primary: "#f97316", // vibrant orange (Tailwind orange-500)
        primaryHover: "#fb923c", // lighter orange for hover (orange-400)
        secondary: "#64748b", // neutral slate for contrast (slate-500)
        accent: "#fed7aa", // soft peach for subtle highlights (orange-200)
        text: {
          primary: "#1e293b", // slate-800
          secondary: "#475569", // slate-600
        },
        danger: "#ef4444", // red-500 for errors
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
