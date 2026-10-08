import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

interface PreviewZoomControlsProps {
  scale: number;
  onScaleChange: (newScale: number) => void;
  onReset: () => void;
}

export const PreviewZoomControls: React.FC<PreviewZoomControlsProps> = ({
  scale,
  onScaleChange,
  onReset
}) => {
  const zoomIn = () => {
    onScaleChange(Math.min(1.5, Number((scale + 0.1).toFixed(2))));
  };

  const zoomOut = () => {
    onScaleChange(Math.max(0.4, Number((scale - 0.1).toFixed(2))));
  };

  return (
    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-slate-200 px-2 py-1 rounded-lg shadow-xs no-print text-xs">
      <button
        type="button"
        onClick={zoomOut}
        disabled={scale <= 0.4}
        className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-40 cursor-pointer"
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <span className="px-1.5 min-w-[42px] text-center font-mono font-semibold text-slate-700 select-none">
        {Math.round(scale * 100)}%
      </span>

      <button
        type="button"
        onClick={zoomIn}
        disabled={scale >= 1.5}
        className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-40 cursor-pointer"
        title="Zoom In"
        aria-label="Zoom In"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <div className="w-[1px] h-3.5 bg-slate-200 mx-0.5" />

      <button
        type="button"
        onClick={onReset}
        className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded cursor-pointer"
        title="Reset Zoom to Fit"
        aria-label="Reset Zoom to Fit"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
