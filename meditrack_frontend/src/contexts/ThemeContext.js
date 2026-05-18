import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored ?? (prefersDark ? "dark" : "light");
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
    }, []);
    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
    };
    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};
