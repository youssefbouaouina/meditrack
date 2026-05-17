import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }`;

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="hidden border-b border-[var(--border)] bg-[var(--card-bg)] md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo%20meditrack.png" alt="MediTrack" className="h-8 w-8" />
          <span className="text-lg font-semibold">MediTrack</span>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Inventaire
          </NavLink>
          <NavLink to="/scanner" className={linkClass}>
            Scanner
          </NavLink>
          <NavLink to="/calendar" className={linkClass}>
            Calendrier
          </NavLink>
          <NavLink to="/interactions" className={linkClass}>
            Interactions
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-sm text-[var(--text-secondary)]">{user?.username}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
