import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useRef } from "react";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import DayCard from "./DayCard";
const WeekView = ({ referenceDate, logsByDate, onMarkTaken }) => {
    const todayRef = useRef(null);
    const weekDays = useMemo(() => {
        const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
        const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [referenceDate]);
    useEffect(() => {
        todayRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }, [referenceDate]);
    return (_jsx("div", { className: "flex gap-4 overflow-x-auto pb-4", style: { scrollSnapType: "x mandatory" }, children: weekDays.map((day) => {
            const key = day.toISOString().slice(0, 10);
            const logs = logsByDate[key] ?? [];
            const isToday = key === new Date().toISOString().slice(0, 10);
            return (_jsx("div", { ref: isToday ? todayRef : null, style: { scrollSnapAlign: "start" }, children: _jsx(DayCard, { date: day, logs: logs, onMarkTaken: onMarkTaken }) }, key));
        }) }));
};
export default WeekView;
