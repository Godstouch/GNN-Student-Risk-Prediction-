// EarlyFlag — JS-side color reference
//
// CSS variables (variables.css) are the source of truth for anything styled
// with CSS/Tailwind classes. This file exists only for the cases where JS
// needs a raw color value directly — e.g. passing a fill color into a
// charting library (react-force-graph, recharts) that can't read CSS custom
// properties. Keep these values in sync with variables.css by hand, or read
// them at runtime with getComputedStyle if you want a single source of truth
// enforced automatically (see helper below).

export const colors = {
  brand: "#1E3A5F",
  brandDark: "#14293F",
  brandLight: "#E8EEF4",

  accent: "#2563EB",
  accentDark: "#1D4ED8",
  accentLight: "#DBEAFE",

  risk: {
    high: "#DC2626",
    highBg: "#FEE2E2",
    highBorder: "#FCA5A5",
    medium: "#D97706",
    mediumBg: "#FEF3C7",
    mediumBorder: "#FCD34D",
    low: "#059669",
    lowBg: "#D1FAE5",
    lowBorder: "#6EE7B7",
  },

  background: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",

  text: {
    primary: "#1E293B",
    secondary: "#64748B",
    muted: "#94A3B8",
  },

  status: {
    online: "#059669",
    offline: "#94A3B8",
    syncing: "#D97706",
    error: "#DC2626",
  },
};

// Maps a risk score (0-1) or tier label to its color set.
// Use this everywhere risk color is decided — never inline the mapping
// in a component, so "High = red" is defined in exactly one place.
export function getRiskTierColors(tier) {
  const key = tier?.toLowerCase();
  if (key === "high")
    return {
      fg: colors.risk.high,
      bg: colors.risk.highBg,
      border: colors.risk.highBorder,
    };
  if (key === "medium")
    return {
      fg: colors.risk.medium,
      bg: colors.risk.mediumBg,
      border: colors.risk.mediumBorder,
    };
  if (key === "low")
    return {
      fg: colors.risk.low,
      bg: colors.risk.lowBg,
      border: colors.risk.lowBorder,
    };
  return {
    fg: colors.text.muted,
    bg: colors.background,
    border: colors.border,
  };
}

// Optional: read a CSS variable at runtime instead of duplicating the value
// above. Useful if you want variables.css to be the ONLY source of truth.
export function cssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
