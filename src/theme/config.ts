// NextUI v2 theme configuration for Tailwind CSS
export const nextUIConfig = {
  themes: {
    light: {
      colors: {
        // Core brand
        background: "#FFFFFF",
        foreground: "#1C1917",
        focus: "#F59E0B",

        // Brand palette — amber/gold for interactive elements & accents
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

        // Components
        default: {
          DEFAULT: "#F3F4F6",
          foreground: "#1C1917",
        },
        content1: "#FFFFFF",   // card bg
        content2: "#F9FAFB",   // section bg
        content3: "#F3F4F6",   // hover states
        divider: "#E5E7EB",
      },
    },
  },
};
