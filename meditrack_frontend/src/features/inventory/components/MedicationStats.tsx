import React from "react";
import { MedicationStats as MedicationStatsType } from "../../../shared/types";

interface MedicationStatsProps {
  stats: MedicationStatsType;
}

const MedicationStats: React.FC<MedicationStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">Total</p>
        <p className="text-2xl font-semibold">{stats.total_medications}</p>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">Actifs</p>
        <p className="text-2xl font-semibold">{stats.active_medications}</p>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">Stocks bas</p>
        <p className="text-2xl font-semibold">{stats.low_stock_count}</p>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">Critiques</p>
        <p className="text-2xl font-semibold text-[var(--danger)]">{stats.critical_stock_count}</p>
      </div>
    </div>
  );
};

export default MedicationStats;
