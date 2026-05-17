import React, { useMemo, useState } from "react";
import PageTransition from "../../../shared/components/PageTransition";
import MedicationList from "../components/MedicationList";
import MedicationStats from "../components/MedicationStats";
import AddMedicationModal from "../components/AddMedicationModal";
import EditMedicationModal from "../components/EditMedicationModal";
import InteractionAlert from "../components/InteractionAlert";
import { useDeleteMedication, useUserMedications } from "../hooks/useMedications";
import { useMedicationStats } from "../hooks/useMedicationStats";
import { useCheckInteractions } from "../../interactions/hooks/useCheckInteractions";
import { UserMedication } from "../../../shared/types";

const InventoryPage: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editing, setEditing] = useState<UserMedication | null>(null);
  const { data: medications = [], isLoading } = useUserMedications();
  const { data: stats } = useMedicationStats();
  const deleteMutation = useDeleteMedication();

  const activeIds = medications.filter((med) => med.is_active).map((med) => med.id);
  const { data: interactions = [] } = useCheckInteractions(activeIds);

  const interactionIds = useMemo(() => {
    const ids = new Set<number>();
    interactions.forEach((interaction) => {
      medications.forEach((med) => {
        if (
          med.medication.active_substance &&
          [interaction.substance_a, interaction.substance_b].includes(med.medication.active_substance)
        ) {
          ids.add(med.id);
        }
      });
    });
    return ids;
  }, [interactions, medications]);

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Inventaire</h1>
            <p className="text-sm text-[var(--text-secondary)]">Suivez vos traitements en cours.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-white"
          >
            Ajouter un médicament
          </button>
        </div>

        {stats && <MedicationStats stats={stats} />}
        <InteractionAlert interactions={interactions} />

        {isLoading ? (
          <p className="text-sm text-[var(--text-secondary)]">Chargement des traitements...</p>
        ) : (
          <MedicationList
            medications={medications}
            interactionIds={interactionIds}
            onEdit={(medication) => setEditing(medication)}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AddMedicationModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditMedicationModal medication={editing} onClose={() => setEditing(null)} />
    </PageTransition>
  );
};

export default InventoryPage;
