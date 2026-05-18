import { jsx as _jsx } from "react/jsx-runtime";
const ScannerOverlay = () => {
    return (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: "relative h-64 w-64 rounded-lg border-2 border-[var(--accent)]", children: _jsx("div", { className: "absolute left-0 right-0 top-1/2 h-0.5 animate-pulse bg-[var(--accent)]" }) }) }));
};
export default ScannerOverlay;
