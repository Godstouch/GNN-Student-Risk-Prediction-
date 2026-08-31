// Single source of truth for risk-tier labels and ordering.
// Any component that needs to display or sort by risk tier should import
// from here rather than hardcoding the strings 'high' / 'medium' / 'low'.

export const RISK_TIERS = {
  high: { key: 'high', label: 'High Risk', order: 0 },
  medium: { key: 'medium', label: 'Medium Risk', order: 1 },
  low: { key: 'low', label: 'Low Risk', order: 2 },
};

export function getTierInfo(tier) {
  return RISK_TIERS[tier?.toLowerCase()] ?? RISK_TIERS.low;
}

export function sortByRisk(students) {
  return [...students].sort(
    (a, b) => getTierInfo(a.riskTier).order - getTierInfo(b.riskTier).order
  );
}
