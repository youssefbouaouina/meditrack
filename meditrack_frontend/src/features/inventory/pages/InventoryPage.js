import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import PageTransition from "../../../shared/components/PageTransition";
import MedicationList from "../components/MedicationList";
import MedicationStats from "../components/MedicationStats";
import AddMedicationModal from "../components/AddMedicationModal";
import EditMedicationModal from "../components/EditMedicationModal";
import InteractionAlert from "../components/InteractionAlert";
import { useDeleteMedication, useUserMedications } from "../hooks/useMedications";
import { useMedicationStats } from "../hooks/useMedicationStats";
import { useCheckInteractions } from "../../interactions/hooks/useCheckInteractions";
const InventoryPage = () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const { data: medications = [], isLoading } = useUserMedications();
    const { data: stats } = useMedicationStats();
    const deleteMutation = useDeleteMedication();
    const activeIds = medications.filter((med) => med.is_active).map((med) => med.id);
    const { data: interactions = [] } = useCheckInteractions(activeIds);
    const interactionIds = useMemo(() => {
        const ids = new Set();
        interactions.forEach((interaction) => {
            medications.forEach((med) => {
                if (med.medication.active_substance &&
                    [interaction.substance_a, interaction.substance_b].includes(med.medication.active_substance)) {
                    ids.add(med.id);
                }
            });
        });
        return ids;
    }, [interactions, medications]);
    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };
    return (_jsxs(PageTransition, { children: [_jsxs("div", { className: "space-y-6 pb-20", children: [_jsxs("div", { className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Inventaire" }), _jsx("p", { className: "text-sm text-[var(--text-secondary)]", children: "Suivez vos traitements en cours." })] }), _jsx("button", { type: "button", onClick: () => setIsAddOpen(true), className: "rounded-md bg-[var(--accent)] px-4 py-2 text-white", children: "Ajouter un m\u00E9dicament" })] }), stats && _jsx(MedicationStats, { stats: stats }), _jsx(InteractionAlert, { interactions: interactions }), isLoading ? (_jsx("p", { className: "text-sm text-[var(--text-secondary)]", children: "Chargement des traitements..." })) : (_jsx(MedicationList, { medications: medications, interactionIds: interactionIds, onEdit: (medication) => setEditing(medication), onDelete: handleDelete }))] }), _jsx(AddMedicationModal, { isOpen: isAddOpen, onClose: () => setIsAddOpen(false) }), _jsx(EditMedicationModal, { medication: editing, onClose: () => setEditing(null) })] }));
};
export default InventoryPage;
