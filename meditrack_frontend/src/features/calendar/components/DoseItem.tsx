import React from "react";
import { motion } from "framer-motion";
import { AdherenceLog } from "../../../shared/types";
import { format } from "date-fns";

interface DoseItemProps {
  log: AdherenceLog;
  onMarkTaken: (id: number) => void;
}

const statusColors: Record<AdherenceLog["status"], string> = {
  upcoming: "bg-blue-100 text-blue-700",
  taken: "bg-green-100 text-green-700",
  missed: "bg-red-100 text-red-700"
};

const DoseItem: React.FC<DoseItemProps> = ({ log, onMarkTaken }) => {
  const isClickable = log.status === "upcoming";

  return (
    <motion.button
      type="button"
      onClick={() => isClickable && onMarkTaken(log.id)}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      className={`flex w-full flex-col gap-1 rounded-md border border-[var(--border)] p-3 text-left ${
        isClickable ? "hover:border-[var(--accent)]" : "cursor-default opacity-80"
      }`}
    >
      <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${statusColors[log.status]}`}>
        {log.status === "upcoming" ? "À venir" : log.status === "taken" ? "Pris" : "Manqué"}
      </span>
      <span className="text-sm font-semibold">{log.user_medication.medication.name}</span>
      <span className="text-xs text-[var(--text-secondary)]">
        {format(new Date(log.scheduled_time), "HH:mm")} • {log.user_medication.dosage}
      </span>
    </motion.button>
  );
};

export default DoseItem;
