import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow)]">
      <div className="mb-4 h-4 w-2/3 rounded bg-[var(--bg-secondary)]" />
      <div className="mb-2 h-3 w-full rounded bg-[var(--bg-secondary)]" />
      <div className="h-3 w-5/6 rounded bg-[var(--bg-secondary)]" />
    </div>
  );
};

export default SkeletonCard;
