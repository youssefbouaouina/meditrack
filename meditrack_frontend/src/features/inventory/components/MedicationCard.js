import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { AlertTriangle, Edit3, Trash2 } from "lucide-react";
import StockBadge from "../../../shared/components/StockBadge";
const frequencyLabels = {
    once_daily: "1 fois/jour",
    twice_daily: "2 fois/jour",
    three_times_daily: "3 fois/jour",
    custom: "Personnalisé"
};
const MedicationCard = ({ medication, onEdit, onDelete, hasInteraction }) => {
    const handleDragEnd = (_, info) => {
        if (info.offset.x < -120) {
            onDelete(medication.id);
        }
    };
    return (_jsxs(motion.div, { drag: "x", dragConstraints: { left: 0, right: 0 }, onDragEnd: handleDragEnd, className: "rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)]", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: medication.medication.name }), _jsx("p", { className: "text-sm text-[var(--text-secondary)]", children: medication.dosage }), _jsxs("p", { className: "text-xs text-[var(--text-secondary)]", children: [frequencyLabels[medication.frequency], " \u2022 ", medication.schedule_times.join(" / ")] })] }), _jsxs("div", { className: "flex flex-col items-end gap-2", children: [_jsx(StockBadge, { stockCount: medication.stock_count, stockThreshold: medication.stock_threshold }), hasInteraction && (_jsxs("span", { className: "flex items-center gap-1 text-xs text-[var(--warning)]", children: [_jsx(AlertTriangle, { size: 14 }), " Interaction"] }))] })] }), _jsxs("div", { className: "mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]", children: [_jsxs("span", { children: ["Stock: ", medication.stock_count] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { type: "button", onClick: () => onEdit(medication), className: "inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1", children: [_jsx(Edit3, { size: 14 }), " Modifier"] }), _jsxs("button", { type: "button", onClick: () => onDelete(medication.id), className: "inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 text-[var(--danger)]", children: [_jsx(Trash2, { size: 14 }), " Supprimer"] })] })] })] }));
};
export default MedicationCard;
