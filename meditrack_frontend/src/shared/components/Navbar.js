import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";
const linkClass = ({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`;
const Navbar = () => {
    const { user, logout } = useAuth();
    return (_jsx("header", { className: "hidden border-b border-[var(--border)] bg-[var(--card-bg)] md:block", children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: "/logo%20meditrack.png", alt: "MediTrack", className: "h-8 w-8" }), _jsx("span", { className: "text-lg font-semibold", children: "MediTrack" })] }), _jsxs("nav", { className: "flex items-center gap-2", children: [_jsx(NavLink, { to: "/", className: linkClass, end: true, children: "Inventaire" }), _jsx(NavLink, { to: "/scanner", className: linkClass, children: "Scanner" }), _jsx(NavLink, { to: "/calendar", className: linkClass, children: "Calendrier" }), _jsx(NavLink, { to: "/interactions", className: linkClass, children: "Interactions" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(ThemeToggle, {}), _jsx("span", { className: "text-sm text-[var(--text-secondary)]", children: user?.username }), _jsx("button", { type: "button", onClick: logout, className: "rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium", children: "D\u00E9connexion" })] })] }) }));
};
export default Navbar;
