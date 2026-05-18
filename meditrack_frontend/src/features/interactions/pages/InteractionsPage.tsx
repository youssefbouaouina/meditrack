import React from "react";
import PageTransition from "../../../shared/components/PageTransition";
import { useUserMedications } from "../../inventory/hooks/useMedications";
import { useCheckInteractions } from "../hooks/useCheckInteractions";
import InteractionCard from "../components/InteractionCard";

const InteractionsPage: React.FC = () => {
  const { data: medications = [], isLoading: isLoadingMeds, isError: medsError } = useUserMedications();
  const activeIds = medications.filter((medication) => medication.is_active).map((medication) => medication.id);

  const {
    data: interactions = [],
    isLoading: isLoadingInteractions,
    isError: interactionsError
  } = useCheckInteractions(activeIds);

  return (
    <PageTransition>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-2xl font-semibold">Interactions</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Vérification des interactions entre vos traitements actifs.
          </p>
        </div>

        {isLoadingMeds || isLoadingInteractions ? (
          <p className="text-sm text-[var(--text-secondary)]">Analyse des interactions en cours...</p>
        ) : medsError || interactionsError ? (
          <p className="text-sm text-[var(--danger)]">Impossible de vérifier les interactions pour le moment.</p>
        ) : activeIds.length < 2 ? (
          <p className="rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-sm text-[var(--text-secondary)]">
            Ajoutez au moins deux traitements actifs pour analyser les interactions.
          </p>
        ) : interactions.length === 0 ? (
          <p className="rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-sm text-[var(--text-secondary)]">
            Aucune interaction détectée.
          </p>
        ) : (
          <div className="space-y-3">
            {interactions.map((interaction) => (
              <InteractionCard key={interaction.id} interaction={interaction} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default InteractionsPage;
