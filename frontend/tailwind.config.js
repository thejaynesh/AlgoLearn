/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burnt-rose': {
          50: "#f7edee",
          100: "#efdcdc",
          200: "#dfb9ba",
          300: "#d09597",
          400: "#c07275",
          500: "#b04f52",
          600: "#8d3f42",
          700: "#6a2f31",
          800: "#462021",
          900: "#231010",
          950: "#190b0c"
        },
        'icy-blue': {
          50: "#e9f5fc",
          100: "#d2eaf9",
          200: "#a5d5f3",
          300: "#78c0ed",
          400: "#4babe7",
          500: "#1f96e0",
          600: "#1878b4",
          700: "#125a87",
          800: "#0c3c5a",
          900: "#061e2d",
          950: "#04151f"
        },
        'smart-blue': {
          50: "#eef2f7",
          100: "#dce4ef",
          200: "#b9c9df",
          300: "#96afcf",
          400: "#7394bf",
          500: "#5079af",
          600: "#40618c",
          700: "#304969",
          800: "#203046",
          900: "#101823",
          950: "#0b1118"
        },
        'pacific-cyan': {
          50: "#eef6f7",
          100: "#dcecef",
          200: "#b9d9df",
          300: "#96c6cf",
          400: "#73b3bf",
          500: "#50a1af",
          600: "#40808c",
          700: "#306069",
          800: "#204046",
          900: "#102023",
          950: "#0b1618"
        },
        'ink-black': {
          50: "#eff2f5",
          100: "#e0e5eb",
          200: "#c1cbd7",
          300: "#a2b1c3",
          400: "#8397af",
          500: "#637d9c",
          600: "#50647c",
          700: "#3c4b5d",
          800: "#28323e",
          900: "#14191f",
          950: "#0e1116"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-blue': '0 0 10px rgba(31, 150, 224, 0.5), 0 0 20px rgba(31, 150, 224, 0.3)',
        'neon-rose': '0 0 10px rgba(176, 79, 82, 0.5), 0 0 20px rgba(176, 79, 82, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
