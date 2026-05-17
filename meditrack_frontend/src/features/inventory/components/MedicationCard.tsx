import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Edit3, Trash2 } from "lucide-react";
import { UserMedication } from "../../../shared/types";
import StockBadge from "../../../shared/components/StockBadge";

interface MedicationCardProps {
  medication: UserMedication;
  onEdit: (medication: UserMedication) => void;
  onDelete: (id: number) => void;
  hasInteraction: boolean;
}

const frequencyLabels: Record<UserMedication["frequency"], string> = {
  once_daily: "1 fois/jour",
  twice_daily: "2 fois/jour",
  three_times_daily: "3 fois/jour",
  custom: "Personnalisé"
};

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onEdit, onDelete, hasInteraction }) => {
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -120) {
      onDelete(medication.id);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{medication.medication.name}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{medication.dosage}</p>
          <p className="text-xs text-[var(--text-secondary)]">
            {frequencyLabels[medication.frequency]} • {medication.schedule_times.join(" / ")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StockBadge stockCount={medication.stock_count} stockThreshold={medication.stock_threshold} />
          {hasInteraction && (
            <span className="flex items-center gap-1 text-xs text-[var(--warning)]">
              <AlertTriangle size={14} /> Interaction
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <span>Stock: {medication.stock_count}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(medication)}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1"
          >
            <Edit3 size={14} /> Modifier
          </button>
          <button
            type="button"
            onClick={() => onDelete(medication.id)}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 text-[var(--danger)]"
          >
            <Trash2 size={14} /> Supprimer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicationCard;
