import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (_jsxs("button", { type: "button", onClick: toggleTheme, className: "flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-sm font-medium", "aria-label": "Basculer le th\u00E8me", children: [theme === "dark" ? _jsx(Sun, { size: 16 }) : _jsx(Moon, { size: 16 }), _jsx("span", { children: theme === "dark" ? "Clair" : "Sombre" })] }));
};
export default ThemeToggle;
