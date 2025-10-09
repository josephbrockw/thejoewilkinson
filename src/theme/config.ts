// NextUI v2 theme configuration for Tailwind CSS
export const nextUIConfig = {
  themes: {
    dark: {
      colors: {
        // Core brand
        background: "#0E1116",
        foreground: "#F5F7FA",
        focus: "#3B82F6",

        // Brand palette
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE", 
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#1A1E25",
          foreground: "#F5F7FA",
        },

        // Components
        default: {
          DEFAULT: "#2A2F38",
          foreground: "#F5F7FA",
        },
        content1: "#1A1E25", // card bg
        content2: "#0E1116",
        content3: "#2A2F38",
        content4: "#3B82F6",

        // Feedback
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#E63946",
      },
    },
  },
};
