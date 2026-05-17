import React from "react";

interface StockBadgeProps {
  stockCount: number;
  stockThreshold: number;
}

const StockBadge: React.FC<StockBadgeProps> = ({ stockCount, stockThreshold }) => {
  let label = "Stock OK";
  let color = "bg-[var(--success)]";

  if (stockCount <= 0) {
    label = "Rupture";
    color = "bg-[var(--danger)]";
  } else if (stockCount <= stockThreshold) {
    label = "Stock bas";
    color = "bg-[var(--warning)]";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white ${color}`}>
      {label}
    </span>
  );
};

export default StockBadge;
