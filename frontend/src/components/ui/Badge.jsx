import { getTierInfo } from '../../utils/riskTier';

// Reusable risk badge. Uses the .risk-badge class + data-tier attribute
// defined in styles/index.css, so styling stays centralized there —
// this component only decides WHAT to render, not how it looks.
export default function Badge({ tier }) {
  const { key, label } = getTierInfo(tier);

  return (
    <span className="risk-badge" data-tier={key}>
      {label}
    </span>
  );
}
