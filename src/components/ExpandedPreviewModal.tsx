import React, { useState, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  FileDown,
  ImageDown,
  Printer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CoverFormData, LabIndexFormData, DocumentType } from '../types';
import { AssignmentTemplate } from '../templates/AssignmentTemplate';
import { LabReportTemplate } from '../templates/LabReportTemplate';
import { FinalLabReportTemplate } from '../templates/FinalLabReportTemplate';
import { LabIndexTemplate, paginateExperiments } from '../templates/LabIndexTemplate';
import { ExportToolbar } from './ExportToolbar';

interface ExpandedPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: DocumentType;
  coverData: CoverFormData;
  labIndexData: LabIndexFormData;
  onExportPDF: () => Promise<void>;
  onExportImage: (format: 'png' | 'jpg') => Promise<void>;
  onPrint: () => void;
}

export const ExpandedPreviewModal: React.FC<ExpandedPreviewModalProps> = ({
  isOpen,
  onClose,
  docType,
  coverData,
  labIndexData,
  onExportPDF,
  onExportImage,
  onPrint
}) => {
  const [modalScale, setModalScale] = useState<number>(0.95);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        setModalScale((prev) => Math.min(1.6, Number((prev + 0.1).toFixed(2))));
      } else if (e.key === '-' || e.key === '_') {
        setModalScale((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))));
      } else if (e.key === '0') {
        setModalScale(0.9);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Auto adjust initial scale based on window height
      const height = window.innerHeight;
      if (height < 700) {
        setModalScale(0.65);
      } else if (height < 900) {
        setModalScale(0.85);
      } else {
        setModalScale(0.95);
      }
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalPages =
    docType === 'lab_index'
      ? paginateExperiments(labIndexData.experiments).length
      : 1;

  const docTitle =
    docType === 'assignment'
      ? 'Assignment Cover Page'
      : docType === 'lab_report'
      ? 'Lab Report Cover Page'
      : docType === 'final_lab_report'
      ? 'Final Lab Report Cover'
      : 'Lab Report Index';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded Document Preview"
    >
      {/* ================= MODAL TOP TOOLBAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-slate-900 border-b border-slate-800 text-white shrink-0 shadow-md">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            A4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {docTitle}
              </h2>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Expanded View
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {docType === 'lab_index'
                ? `${labIndexData.studentName || 'Student'} • ${totalPages} A4 ${totalPages === 1 ? 'Page' : 'Pages'}`
                : `${coverData.studentName || 'Student'} • ${coverData.courseCode || 'Course'}`}
            </p>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setModalScale((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
            disabled={modalScale <= 0.4}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded disabled:opacity-40 cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="px-2 min-w-[46px] text-center font-mono font-bold text-emerald-400 select-none">
            {Math.round(modalScale * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setModalScale((prev) => Math.min(1.6, Number((prev + 0.1).toFixed(2))))}
            disabled={modalScale >= 1.6}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded disabled:opacity-40 cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={() => setModalScale(0.9)}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded cursor-pointer"
            title="Reset Zoom to 90%"
            aria-label="Reset Zoom to 90%"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Export Toolbar & Close Button */}
        <div className="flex items-center gap-2">
          <ExportToolbar
            onExportPDF={onExportPDF}
            onExportImage={onExportImage}
            onPrint={onPrint}
            totalPages={totalPages}
            isMultiPage={docType === 'lab_index' && totalPages > 1}
          />

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer ml-1"
            title="Close Preview (Esc)"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= MODAL SCROLLABLE VIEWPORT ================= */}
      <div className="flex-1 overflow-auto p-6 sm:p-10 flex flex-col items-center bg-slate-900/60">
        <div
          style={{
            transform: `scale(${modalScale})`,
            transformOrigin: 'top center',
            marginBottom: `${Math.max(0, (modalScale - 1) * 305)}mm`
          }}
          className="transition-transform duration-100 ease-out shadow-2xl rounded-none"
        >
          {docType === 'assignment' && (
            <AssignmentTemplate data={coverData} />
          )}

          {docType === 'lab_report' && (
            <LabReportTemplate data={coverData} />
          )}

          {docType === 'final_lab_report' && (
            <FinalLabReportTemplate data={coverData} />
          )}

          {docType === 'lab_index' && (
            <LabIndexTemplate data={labIndexData} />
          )}
        </div>
      </div>
    </div>
  );
};
