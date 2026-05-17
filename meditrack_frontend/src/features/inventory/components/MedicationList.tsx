import React from "react";
import { UserMedication } from "../../../shared/types";
import MedicationCard from "./MedicationCard";

interface MedicationListProps {
  medications: UserMedication[];
  interactionIds: Set<number>;
  onEdit: (medication: UserMedication) => void;
  onDelete: (id: number) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ medications, interactionIds, onEdit, onDelete }) => {
  if (medications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-secondary)]">
        Aucun médicament enregistré pour le moment.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {medications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          onEdit={onEdit}
          onDelete={onDelete}
          hasInteraction={interactionIds.has(medication.id)}
        />
      ))}
    </div>
  );
};

export default MedicationList;
