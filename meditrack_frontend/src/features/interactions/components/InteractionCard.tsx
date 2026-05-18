import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DrugInteraction } from "../../../shared/types";
import SeverityBadge from "./SeverityBadge";

interface InteractionCardProps {
  interaction: DrugInteraction;
}

const InteractionCard: React.FC<InteractionCardProps> = ({ interaction }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)]">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {interaction.substance_a} + {interaction.substance_b}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">Interaction médicamenteuse détectée</p>
        </div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={interaction.severity} />
          <ChevronDown size={16} className={expanded ? "rotate-180 transition-transform" : "transition-transform"} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{interaction.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractionCard;
