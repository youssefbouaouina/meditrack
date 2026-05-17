import React from "react";

const ScannerOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64 rounded-lg border-2 border-[var(--accent)]">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 animate-pulse bg-[var(--accent)]" />
      </div>
    </div>
  );
};

export default ScannerOverlay;
