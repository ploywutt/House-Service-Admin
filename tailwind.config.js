/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: "Prompt",
      },
      colors: {
        gray: {
          100: "#EFEFF2",
          200: "#E6E7EB",
          300: "#CCD0D7",
          400: "#B3B8C4",
          500: "#9AA1B0",
          600: "#80899C",
          700: "#646C80",
          800: "#4B5160",
          900: "#323640",
          950: "#232630",
        },
        blue: {
          100: "#E7EEFF",
          200: "#D2DFFC",
          300: "#A6BFFA",
          400: "#799FF7",
          500: "#4C7FF4",
          600: "#336DF2",
          700: "#1852D6",
          800: "#0E3FB0",
          900: "#022B87",
          950: "#001C59",
        },
        purple: {
          100: "#ECE6FF",
          900: "#4512B4",
        },
        green: {
          100: "#DFF9F6",
          900: "#00596C",
        },
        yellow: {
          100: "#FFF3D4",
          900: "#6E5000",
        },
        utility: {
          red: "#C82438",
          bg: "#F3F4F6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
