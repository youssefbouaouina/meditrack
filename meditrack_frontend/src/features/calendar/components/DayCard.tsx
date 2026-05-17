import React from "react";
import { AdherenceLog } from "../../../shared/types";
import DoseItem from "./DoseItem";
import { format, isSameDay } from "date-fns";

interface DayCardProps {
  date: Date;
  logs: AdherenceLog[];
  onMarkTaken: (id: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({ date, logs, onMarkTaken }) => {
  const isToday = isSameDay(date, new Date());

  return (
    <div
      className={`min-w-[240px] scroll-mx-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow)] ${
        isToday ? "ring-2 ring-[var(--accent)]" : ""
      }`}
    >
      <div className="mb-3">
        <p className="text-xs uppercase text-[var(--text-secondary)]">{format(date, "EEE")}</p>
        <p className="text-lg font-semibold">{format(date, "dd/MM")}</p>
      </div>
      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-xs text-[var(--text-secondary)]">Aucune prise planifiée.</p>
        ) : (
          logs.map((log) => <DoseItem key={log.id} log={log} onMarkTaken={onMarkTaken} />)
        )}
      </div>
    </div>
  );
};

export default DayCard;
