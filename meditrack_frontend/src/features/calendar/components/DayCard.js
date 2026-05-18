import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DoseItem from "./DoseItem";
import { format, isSameDay } from "date-fns";
const DayCard = ({ date, logs, onMarkTaken }) => {
    const isToday = isSameDay(date, new Date());
    return (_jsxs("div", { className: `min-w-[240px] scroll-mx-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)] ${isToday ? "ring-2 ring-[var(--accent)]" : ""}`, children: [_jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "text-xs uppercase text-[var(--text-secondary)]", children: format(date, "EEE") }), _jsx("p", { className: "text-lg font-semibold", children: format(date, "dd/MM") })] }), _jsx("div", { className: "space-y-2", children: logs.length === 0 ? (_jsx("p", { className: "text-xs text-[var(--text-secondary)]", children: "Aucune prise planifi\u00E9e." })) : (logs.map((log) => _jsx(DoseItem, { log: log, onMarkTaken: onMarkTaken }, log.id))) })] }));
};
export default DayCard;
