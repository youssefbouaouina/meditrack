import React, { useMemo, useState } from "react";
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from "date-fns";
import PageTransition from "../../../shared/components/PageTransition";
import WeekView from "../components/WeekView";
import { useAdherenceLogs } from "../hooks/useAdherenceLogs";
import { useMarkTaken } from "../hooks/useLogDose";

const CalendarPage: React.FC = () => {
  const [referenceDate, setReferenceDate] = useState<Date>(new Date());

  const start = useMemo(() => startOfWeek(referenceDate, { weekStartsOn: 1 }), [referenceDate]);
  const end = useMemo(() => endOfWeek(referenceDate, { weekStartsOn: 1 }), [referenceDate]);

  const startKey = format(start, "yyyy-MM-dd");
  const endKey = format(end, "yyyy-MM-dd");

  const { data, isLoading, isError } = useAdherenceLogs(start, end);
  const markTaken = useMarkTaken(startKey, endKey);

  const handlePrevWeek = () => setReferenceDate((current) => subWeeks(current, 1));
  const handleNextWeek = () => setReferenceDate((current) => addWeeks(current, 1));

  return (
    <PageTransition>
      <div className="space-y-6 pb-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Calendrier</h1>
            <p className="text-sm text-[var(--text-secondary)]">Suivi hebdomadaire de vos prises.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevWeek}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              Semaine précédente
            </button>
            <button
              type="button"
              onClick={handleNextWeek}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              Semaine suivante
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-[var(--text-secondary)]">Chargement des doses planifiées...</p>
        ) : isError ? (
          <p className="text-sm text-[var(--danger)]">Impossible de charger le calendrier pour cette semaine.</p>
        ) : (
          <WeekView
            referenceDate={referenceDate}
            logsByDate={data?.grouped ?? {}}
            onMarkTaken={(id) => {
              if (!markTaken.isPending) {
                markTaken.mutate(id);
              }
            }}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default CalendarPage;
