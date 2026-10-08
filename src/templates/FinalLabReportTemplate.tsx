import React from 'react';
import { CoverFormData } from '../types';
import { DiuLogo } from '../assets/DiuLogo';
import { formatAcademicDate } from '../utils/dateValidation';

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

  const formattedSubmissionDate = formatAcademicDate(data.submissionDate);
  const formattedPerformanceDate = formatAcademicDate(data.performanceDate);

  return (
    <div
      id={id}
      className={`a4-document-export a4-page-box bg-white text-slate-900 relative p-[18mm] flex flex-col justify-between overflow-hidden shadow-sm select-none ${fontClass} ${className}`}
      style={{
        boxSizing: 'border-box',
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Outer Border Decorator - Extra dignified for Final Lab Report */}
      {data.borderStyle === 'classic_double' && (
        <div className="absolute inset-[8mm] pointer-events-none border-[3.5px] border-slate-900 p-[3.5mm]">
          <div className="w-full h-full border border-slate-700" />
        </div>
      )}
      {data.borderStyle === 'clean_box' && (
        <div className="absolute inset-[8mm] pointer-events-none border-[2px] border-slate-900" />
      )}
      {data.borderStyle === 'formal_accent' && (
        <div className="absolute inset-[8mm] pointer-events-none border-t-[5px] border-b-[5px] border-slate-900" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center pt-2">
          {data.showLogo && (
            <div className="mb-4">
              <DiuLogo
                size="lg"
                monochrome={!data.logoColor}
                variant="full"
              />
            </div>
          )}

          <h1 className="text-[20px] font-bold tracking-wider uppercase text-slate-900 leading-tight">
            {data.universityName || 'Daffodil International University'}
          </h1>

          {data.faculty && (
            <h2 className="text-[14px] font-semibold text-slate-700 mt-1">
              {data.faculty}
            </h2>
          )}

          {data.department && (
            <h3 className="text-[13px] font-medium text-slate-700 mt-0.5">
              {data.department}
            </h3>
          )}

          <div className="w-52 h-[1.5px] bg-slate-900 mx-auto mt-4 mb-2" />
        </div>

        {/* ================= FINAL LAB REPORT TITLE BANNER ================= */}
        <div className="flex flex-col items-center text-center my-auto py-2">
          <div className="border-t-2 border-b-2 border-slate-900 py-3 px-8 mb-4 bg-slate-50/80 w-full max-w-[155mm]">
            <span className="text-[20px] font-extrabold uppercase tracking-[0.25em] text-slate-900 block font-cinzel">
              FINAL LAB REPORT
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase text-slate-600 block mt-1">
              Semester Comprehensive Laboratory Evaluation
            </span>
          </div>

          {/* Laboratory Name */}
          {data.labName && (
            <div className="max-w-[165mm] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
                Laboratory
              </span>
              <p className="text-[16px] font-bold text-slate-900">
                {data.labName}
              </p>
            </div>
          )}

          {/* Course Details Block */}
          <div className="mt-2 py-3 px-6 border-t border-b border-slate-300 max-w-[165mm] w-full text-center bg-slate-50/40">
            <p className="text-[14px] text-slate-900 font-bold">
              Course Title: <span className="font-semibold text-slate-800">{data.courseTitle || '—'}</span>
            </p>
            <p className="text-[13px] text-slate-900 font-semibold mt-1">
              Course Code: <span className="font-normal text-slate-800">{data.courseCode || '—'}</span>
              {data.semester && (
                <>
                  <span className="mx-2 text-slate-400">|</span>
                  <span>Semester: <span className="font-normal text-slate-800">{data.semester}</span></span>
                </>
              )}
              {data.academicYear && (
                <>
                  <span className="mx-2 text-slate-400">|</span>
                  <span>Academic Year: <span className="font-normal text-slate-800">{data.academicYear}</span></span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* ================= SUBMITTED TO & SUBMITTED BY ================= */}
        <div className="grid grid-cols-2 gap-6 w-full mb-3">
          {/* Submitted To */}
          <div className="border border-slate-300 bg-slate-50/50 p-4 rounded-none flex flex-col justify-start">
            <div className="border-b border-slate-300 pb-1.5 mb-2.5">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-900">
                Submitted To
              </h4>
            </div>
            <div className="text-[12.5px] leading-relaxed text-slate-800 space-y-1">
              <p className="font-bold text-[13.5px] text-slate-900">
                {data.instructorName || '—'}
              </p>
              {data.instructorDesignation && (
                <p className="text-slate-700 font-medium">
                  {data.instructorDesignation}
                </p>
              )}
              {data.instructorDepartment && (
                <p className="text-slate-600">
                  {data.instructorDepartment}
                </p>
              )}
              <p className="text-slate-600 font-medium">
                {data.universityName || 'Daffodil International University'}
              </p>
            </div>
          </div>

          {/* Submitted By */}
          <div className="border border-slate-300 bg-slate-50/50 p-4 rounded-none flex flex-col justify-start">
            <div className="border-b border-slate-300 pb-1.5 mb-2.5">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-900">
                Submitted By
              </h4>
            </div>
            <div className="text-[12px] leading-relaxed text-slate-800 space-y-1">
              <p className="font-bold text-[13.5px] text-slate-900">
                {data.studentName || '—'}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Student ID:</span> {data.studentId || '—'}
              </p>
              {(data.section || data.batch) && (
                <p>
                  {data.section && (
                    <>
                      <span className="font-semibold text-slate-900">Section:</span> {data.section}
                    </>
                  )}
                  {data.section && data.batch && <span className="mx-2 text-slate-400">|</span>}
                  {data.batch && (
                    <>
                      <span className="font-semibold text-slate-900">Batch:</span> {data.batch}
                    </>
                  )}
                </p>
              )}
              {data.studentDepartment && (
                <p>
                  <span className="font-semibold text-slate-900">Dept:</span> {data.studentDepartment}
                </p>
              )}
              {data.levelTerm && (
                <p>
                  <span className="font-semibold text-slate-900">Level-Term:</span> {data.levelTerm}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= CONDITIONAL DATE SECTION ================= */}
        <div className="text-center pt-2.5 pb-1 border-t border-slate-200">
          {formattedPerformanceDate ? (
            <div className="flex items-center justify-center gap-8 text-[13px]">
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-600 mr-1.5">
                  Date of Performance:
                </span>
                <span className="font-semibold text-slate-900">
                  {formattedPerformanceDate}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-600 mr-1.5">
                  Date of Submission:
                </span>
                <span className="font-semibold text-slate-900">
                  {formattedSubmissionDate || '—'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-[13px] text-slate-900">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-600 mr-1.5">
                Date of Submission:
              </span>
              <span className="font-semibold text-slate-900">
                {formattedSubmissionDate || '—'}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
