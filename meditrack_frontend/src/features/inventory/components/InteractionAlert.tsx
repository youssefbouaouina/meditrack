import React from "react";
import { AlertTriangle } from "lucide-react";
import { DrugInteraction } from "../../../shared/types";

interface InteractionAlertProps {
  interactions: DrugInteraction[];
}

const InteractionAlert: React.FC<InteractionAlertProps> = ({ interactions }) => {
  if (interactions.length === 0) {
    return null;
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--warning)] bg-yellow-50/40 p-4 text-sm text-[var(--text-secondary)]">
      <AlertTriangle className="text-[var(--warning)]" size={18} />
      <div>
        <p className="font-semibold text-[var(--text-primary)]">
          {interactions.length} interaction{interactions.length > 1 ? "s" : ""} détectée{interactions.length > 1 ? "s" : ""}
        </p>
        <p>Consultez la section Interactions pour plus de détails.</p>
      </div>
    </div>
  );
};

export default InteractionAlert;
