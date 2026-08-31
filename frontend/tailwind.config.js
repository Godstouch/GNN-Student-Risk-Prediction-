/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          dark: "var(--color-brand-dark)",
          light: "var(--color-brand-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-dark)",
          light: "var(--color-accent-light)",
        },
        risk: {
          high: "var(--color-risk-high)",
          "high-bg": "var(--color-risk-high-bg)",
          "high-border": "var(--color-risk-high-border)",
          medium: "var(--color-risk-medium)",
          "medium-bg": "var(--color-risk-medium-bg)",
          "medium-border": "var(--color-risk-medium-border)",
          low: "var(--color-risk-low)",
          "low-bg": "var(--color-risk-low-bg)",
          "low-border": "var(--color-risk-low-border)",
        },
        surface: "var(--color-surface)",
        background: "var(--color-background)",
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        status: {
          online: "var(--color-status-online)",
          offline: "var(--color-status-offline)",
          syncing: "var(--color-status-syncing)",
          error: "var(--color-status-error)",
        },
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};
