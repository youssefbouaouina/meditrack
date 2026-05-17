import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-sm font-medium"
      aria-label="Basculer le thème"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === "dark" ? "Clair" : "Sombre"}</span>
    </button>
  );
};

export default ThemeToggle;
