import React, { useState } from 'react';
import { Eye, Maximize2, Sparkles, FileText } from 'lucide-react';
import { DocumentType } from '../types';

interface SmallPreviewButtonProps {
  docType: DocumentType;
  studentName?: string;
  courseCode?: string;
  groupNumber?: string;
  onClick: () => void;
  className?: string;
}

export const SmallPreviewButton: React.FC<SmallPreviewButtonProps> = ({
  docType,
  studentName,
  courseCode,
  groupNumber,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const titleText =
    docType === 'assignment'
      ? 'ASSIGNMENT'
      : docType === 'lab_report'
      ? 'LAB REPORT'
      : docType === 'final_lab_report'
      ? 'FINAL LAB REPORT'
      : 'LAB REPORT INDEX';

  const label =
    docType === 'assignment'
      ? 'Assignment'
      : docType === 'lab_report'
      ? 'Lab Report'
      : docType === 'final_lab_report'
      ? 'Final Lab'
      : 'Lab Index';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group inline-flex items-center gap-2.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 via-white to-teal-50 hover:from-emerald-100 hover:via-emerald-50 hover:to-teal-100 border border-emerald-300 hover:border-emerald-500 rounded-xl text-xs font-semibold text-emerald-950 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer select-none active:scale-[0.98]"
        title="Shows small preview • Click to expand to large view"
        aria-label="Small preview - Click to expand to large view"
      >
        {/* Miniature Realistic Document Icon Thumbnail */}
        <div className="relative w-4.5 h-6 bg-white border border-slate-800 rounded-[2px] shadow-xs flex flex-col items-center justify-between p-0.5 group-hover:scale-105 group-hover:border-emerald-800 transition-all duration-200">
          <div className="w-2 h-0.5 bg-emerald-700 rounded-full" />
          <div className="space-y-0.5 w-full px-0.5">
            <div className="w-full h-[1px] bg-slate-400" />
            <div className="w-3/4 h-[1px] bg-slate-300" />
            <div className="w-1/2 h-[1px] bg-slate-300" />
          </div>
          <div className="w-2.5 h-[1.5px] bg-blue-700 rounded-full" />
        </div>

        <div className="flex items-center gap-1.5 text-left">
          <span className="font-bold text-slate-900 group-hover:text-emerald-900">Small Preview</span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-1.5 py-0.5 rounded-md">
            {label}
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 group-hover:text-emerald-900 pl-1.5 border-l border-emerald-200">
          <span>Expand</span>
          <Maximize2 className="w-3 h-3 group-hover:scale-115 transition-transform duration-200" />
        </div>
      </button>

      {/* Mini Hover Preview Interactive Card */}
      {isHovered && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 z-40 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-3 w-56 border border-slate-700/80 flex flex-col items-center space-y-2">
            {/* Header info */}
            <div className="w-full flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Live Preview
              </span>
              <span className="text-slate-400 font-normal">A4 Format</span>
            </div>

            {/* Micro Realistic A4 Miniature Sheet Representation */}
            <div className="w-36 h-48 bg-white text-slate-900 rounded-[3px] border border-slate-400 p-2 shadow-md flex flex-col justify-between relative overflow-hidden select-none">
              {/* Solid Outer Border */}
              <div className="absolute inset-1 border border-black pointer-events-none" />

              {/* Optional Group Number Badge top-right */}
              {groupNumber && (
                <div className="absolute top-1.5 right-1.5 z-10 px-1 py-0.2 bg-white border border-slate-900 text-[6px] font-bold">
                  Gr: {groupNumber}
                </div>
              )}

              {/* Top Insignia & Title */}
              <div className="flex flex-col items-center pt-1">
                <div className="w-3.5 h-3.5 rounded-full border border-emerald-800 flex items-center justify-center text-[5px] font-bold text-emerald-800 mb-0.5">
                  DIU
                </div>
                <div className="text-[7px] font-bold uppercase tracking-tight text-center border-b border-black pb-0.5 px-1 max-w-[85%] truncate">
                  {titleText}
                </div>
              </div>

              {/* Middle Academic Metadata Lines */}
              <div className="space-y-1 px-1 my-auto">
                <div className="text-[6.5px] font-medium leading-tight truncate text-slate-700">
                  <span className="font-bold text-slate-900">Course:</span> {courseCode || 'CSE***'}
                </div>
                <div className="text-[6.5px] font-medium leading-tight truncate text-slate-700">
                  <span className="font-bold text-slate-900">Name:</span> {studentName || 'Student Name'}
                </div>
                <div className="space-y-0.5 pt-0.5">
                  <div className="w-full h-[1px] bg-slate-200" />
                  <div className="w-4/5 h-[1px] bg-slate-200" />
                  <div className="w-3/5 h-[1px] bg-slate-200" />
                </div>
              </div>

              {/* Bottom Subtle Signature / Date placeholder */}
              <div className="flex justify-between items-center text-[5.5px] text-slate-400 px-1 pb-0.5">
                <span>DIU Academic</span>
                <span>A4 Ready</span>
              </div>
            </div>

            {/* Click to expand prompt */}
            <div className="w-full pt-1.5 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              <span>Click to expand to full size</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
