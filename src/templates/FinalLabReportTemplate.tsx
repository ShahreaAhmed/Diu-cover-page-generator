import React from 'react';
import { CoverFormData } from '../types';
import { DiuLogo, DiuWatermark } from '../assets/DiuLogo';
import { formatCoverDate } from '../utils/dateValidation';

interface TemplateProps {
  data: CoverFormData;
  className?: string;
  id?: string;
}

export const FinalLabReportTemplate: React.FC<TemplateProps> = ({ data, className = '', id }) => {
  const fontClass =
    data.fontStyle === 'merriweather'
      ? 'font-academic-serif'
      : data.fontStyle === 'lora'
      ? 'font-academic-editorial'
      : 'font-academic-sans';

  const dateFormat = data.dateFormat || 'slash';
  const formattedSubmissionDate = formatCoverDate(data.submissionDate, dateFormat);
  const formattedPerformanceDate = formatCoverDate(data.performanceDate, dateFormat);

  const groupNo = data.groupNumber || data.labGroup;

  return (
    <div
      id={id}
      className={`a4-document-export a4-page-box bg-white text-slate-900 relative p-[14mm] flex flex-col justify-between overflow-hidden shadow-sm select-none ${fontClass} ${className}`}
      style={{
        boxSizing: 'border-box',
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Outer Single Clean Solid Border (Matches Sample Cover Image 3) */}
      <div className="absolute inset-[8mm] pointer-events-none border-[2px] border-black" />

      {/* Background Central DIU Shield Watermark */}
      <DiuWatermark />

      {/* Optional Group Number (Top Right inside border) */}
      {groupNo && (
        <div className="absolute top-[12mm] right-[12mm] z-20">
          <div className="px-3 py-1 border-[1.5px] border-slate-900 bg-white font-bold text-xs uppercase tracking-wider text-slate-900 shadow-2xs">
            Group: {groupNo}
          </div>
        </div>
      )}

      {/* Main Document Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-[4mm] py-[2mm]">
        {/* ================= TOP LOGO & HEADER ================= */}
        <div className="flex flex-col items-center pt-2">
          {data.showLogo && (
            <div className="mb-4">
              <DiuLogo size="md" monochrome={!data.logoColor} />
            </div>
          )}

          {/* Title: FINAL LAB REPORT with solid underline */}
          <div className="text-center mt-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              FINAL LAB REPORT
            </h1>
          </div>
        </div>

        {/* ================= COURSE DETAILS (LEFT ALIGNED) ================= */}
        <div className="space-y-2 text-sm sm:text-[15px] leading-relaxed max-w-[170mm] pl-2 my-auto">
          {data.courseCode && (
            <p>
              <strong className="font-bold text-slate-900">Course Code: </strong>
              <span className="font-semibold text-slate-800">{data.courseCode}</span>
            </p>
          )}

          {data.courseTitle && (
            <p>
              <strong className="font-bold text-slate-900">Course Title: </strong>
              <span className="font-medium text-slate-800">{data.courseTitle}</span>
            </p>
          )}
        </div>

        {/* ================= SUBMITTED TO SECTION ================= */}
        <div className="flex flex-col items-center text-center my-auto">
          {/* Section Pill Badge */}
          <div className="inline-block px-8 py-1 bg-[#e8edf5] border border-[#cbd5e1] rounded-md shadow-2xs mb-2">
            <span className="text-sm font-bold text-slate-900 tracking-wide">
              Submitted To
            </span>
          </div>

          {/* Instructor Details */}
          <div className="text-sm sm:text-[14.5px] leading-snug space-y-0.5 text-slate-800">
            <p className="font-bold text-slate-900">
              Name: {data.instructorName || '—'}
            </p>
            {data.instructorDesignation && (
              <p>
                <strong className="font-bold text-slate-900">Designation: </strong>
                {data.instructorDesignation}
              </p>
            )}
            <p>{data.instructorDepartment || data.department || 'Department of Computer Science and Engineering'}</p>
            <p className="font-medium text-slate-900">
              {data.universityName || 'Daffodil International University'}
            </p>
          </div>
        </div>

        {/* ================= SUBMITTED BY SECTION ================= */}
        <div className="flex flex-col items-center text-center my-auto">
          {/* Section Pill Badge */}
          <div className="inline-block px-8 py-1 bg-[#e8edf5] border border-[#cbd5e1] rounded-md shadow-2xs mb-2">
            <span className="text-sm font-bold text-slate-900 tracking-wide">
              Submitted By
            </span>
          </div>

          {/* Student Details */}
          <div className="text-sm sm:text-[14.5px] leading-snug space-y-0.5 text-slate-800">
            <p className="font-bold text-slate-900">
              Name: {data.studentName || '—'}
            </p>
            <p>
              <strong className="font-bold text-slate-900">ID: </strong>
              {data.studentId || '—'}
            </p>
            {data.section && (
              <p>
                <strong className="font-bold text-slate-900">Section: </strong>
                {data.section}
              </p>
            )}
            {data.semester && (
              <p>
                <strong className="font-bold text-slate-900">Semester: </strong>
                {data.semester}
              </p>
            )}
            <p>{data.studentDepartment || data.department || 'Department of Computer Science and Engineering'}</p>
            <p className="font-medium text-slate-900">
              {data.universityName || 'Daffodil International University'}
            </p>
          </div>
        </div>

        {/* ================= DATE SECTION (ROUNDED PILL AT BOTTOM) ================= */}
        <div className="flex justify-center pb-2 pt-2">
          <div className="px-8 py-1.5 border-[2px] border-[#1e3a8a] rounded-full text-center bg-white shadow-2xs">
            {formattedPerformanceDate ? (
              <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-[#1e3a8a]">
                <span>Date of Performance: {formattedPerformanceDate}</span>
                <span className="text-slate-400">|</span>
                <span>Date of Submission: {formattedSubmissionDate || '—'}</span>
              </div>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-[#1e3a8a]">
                Date of Submission: {formattedSubmissionDate || '—'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
