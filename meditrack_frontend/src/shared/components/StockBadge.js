import { jsx as _jsx } from "react/jsx-runtime";
const StockBadge = ({ stockCount, stockThreshold }) => {
    let label = "Stock OK";
    let color = "bg-[var(--success)]";
    if (stockCount <= 0) {
        label = "Rupture";
        color = "bg-[var(--danger)]";
    }
    else if (stockCount <= stockThreshold) {
        label = "Stock bas";
        color = "bg-[var(--warning)]";
    }
    return (_jsx("span", { className: `inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white ${color}`, children: label }));
};
export default StockBadge;
