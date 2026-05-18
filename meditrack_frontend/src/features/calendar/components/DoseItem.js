import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { format } from "date-fns";
const statusColors = {
    upcoming: "bg-blue-100 text-blue-700",
    taken: "bg-green-100 text-green-700",
    missed: "bg-red-100 text-red-700"
};
const DoseItem = ({ log, onMarkTaken }) => {
    const isClickable = log.status === "upcoming";
    return (_jsxs(motion.button, { type: "button", onClick: () => isClickable && onMarkTaken(log.id), whileTap: isClickable ? { scale: 0.98 } : undefined, className: `flex w-full flex-col gap-1 rounded-md border border-[var(--border)] p-3 text-left ${isClickable ? "hover:border-[var(--accent)]" : "cursor-default opacity-80"}`, children: [_jsx("span", { className: `inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${statusColors[log.status]}`, children: log.status === "upcoming" ? "À venir" : log.status === "taken" ? "Pris" : "Manqué" }), _jsx("span", { className: "text-sm font-semibold", children: log.user_medication.medication.name }), _jsxs("span", { className: "text-xs text-[var(--text-secondary)]", children: [format(new Date(log.scheduled_time), "HH:mm"), " \u2022 ", log.user_medication.dosage] })] }));
};
export default DoseItem;
