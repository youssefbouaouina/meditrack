import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, Pill, QrCode, ShieldAlert } from "lucide-react";

const tabs = [
  { to: "/", label: "Inventaire", icon: Pill },
  { to: "/scanner", label: "Scanner", icon: QrCode },
  { to: "/calendar", label: "Calendrier", icon: Calendar },
  { to: "/interactions", label: "Interactions", icon: ShieldAlert },
];

const BottomTabBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--border)] bg-[var(--card-bg)] md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabBar;
