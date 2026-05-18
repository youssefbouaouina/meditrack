import React from "react";
import { InteractionSeverity } from "../../../shared/types";

interface SeverityBadgeProps {
  severity: InteractionSeverity;
}

const styles: Record<InteractionSeverity, string> = {
  low: "bg-yellow-100 text-yellow-800 border-yellow-200",
  moderate: "bg-orange-100 text-orange-800 border-orange-200",
  high: "bg-red-100 text-red-800 border-red-200"
};

const labels: Record<InteractionSeverity, string> = {
  low: "Faible",
  moderate: "Modérée",
  high: "Élevée"
};

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => (
  <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${styles[severity]}`}>
    {labels[severity]}
  </span>
);

export default SeverityBadge;
