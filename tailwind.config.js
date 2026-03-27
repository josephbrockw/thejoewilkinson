const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Forest green — used for headings and brand elements
        forest: "#064E3B",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#1C1917",
            focus: "#F59E0B",
            primary: {
              DEFAULT: "#F59E0B",
              foreground: "#FFFFFF",
              50: "#FFFBEB",
              100: "#FEF3C7",
              200: "#FDE68A",
              300: "#FCD34D",
              400: "#FBBF24",
              500: "#F59E0B",
              600: "#D97706",
              700: "#B45309",
              800: "#92400E",
              900: "#78350F",
            },
            secondary: {
              DEFAULT: "#6B7280",
              foreground: "#FFFFFF",
            },
            default: {
              DEFAULT: "#F3F4F6",
              foreground: "#1C1917",
            },
            content1: "#FFFFFF",
            content2: "#F9FAFB",
            content3: "#F3F4F6",
            divider: "#E5E7EB",
          },
        },
      },
    }),
  ],
};
