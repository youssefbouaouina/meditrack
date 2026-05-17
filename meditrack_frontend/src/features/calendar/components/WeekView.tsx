import React, { useEffect, useMemo, useRef } from "react";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { AdherenceLog } from "../../../shared/types";
import DayCard from "./DayCard";

interface WeekViewProps {
  referenceDate: Date;
  logsByDate: Record<string, AdherenceLog[]>;
  onMarkTaken: (id: number) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ referenceDate, logsByDate, onMarkTaken }) => {
  const todayRef = useRef<HTMLDivElement | null>(null);
  const weekDays = useMemo(() => {
    const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
    const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [referenceDate]);

  useEffect(() => {
    todayRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [referenceDate]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
      {weekDays.map((day) => {
        const key = day.toISOString().slice(0, 10);
        const logs = logsByDate[key] ?? [];
        const isToday = key === new Date().toISOString().slice(0, 10);

        return (
          <div key={key} ref={isToday ? todayRef : null} style={{ scrollSnapAlign: "start" }}>
            <DayCard date={day} logs={logs} onMarkTaken={onMarkTaken} />
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
