import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SkeletonCard = () => {
    return (_jsxs("div", { className: "animate-pulse rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]", children: [_jsx("div", { className: "mb-4 h-4 w-2/3 rounded bg-[var(--bg-secondary)]" }), _jsx("div", { className: "mb-2 h-3 w-full rounded bg-[var(--bg-secondary)]" }), _jsx("div", { className: "h-3 w-5/6 rounded bg-[var(--bg-secondary)]" })] }));
};
export default SkeletonCard;
