import { jsx as _jsx } from "react/jsx-runtime";
import MedicationCard from "./MedicationCard";
const MedicationList = ({ medications, interactionIds, onEdit, onDelete }) => {
    if (medications.length === 0) {
        return (_jsx("div", { className: "rounded-lg border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-secondary)]", children: "Aucun m\u00E9dicament enregistr\u00E9 pour le moment." }));
    }
    return (_jsx("div", { className: "grid gap-4", children: medications.map((medication) => (_jsx(MedicationCard, { medication: medication, onEdit: onEdit, onDelete: onDelete, hasInteraction: interactionIds.has(medication.id) }, medication.id))) }));
};
export default MedicationList;
