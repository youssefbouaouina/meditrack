import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from "lucide-react";
const InteractionAlert = ({ interactions }) => {
    if (interactions.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-[var(--warning)] bg-yellow-50/40 p-4 text-sm text-[var(--text-secondary)]", children: [_jsx(AlertTriangle, { className: "text-[var(--warning)]", size: 18 }), _jsxs("div", { children: [_jsxs("p", { className: "font-semibold text-[var(--text-primary)]", children: [interactions.length, " interaction", interactions.length > 1 ? "s" : "", " d\u00E9tect\u00E9e", interactions.length > 1 ? "s" : ""] }), _jsx("p", { children: "Consultez la section Interactions pour plus de d\u00E9tails." })] })] }));
};
export default InteractionAlert;
