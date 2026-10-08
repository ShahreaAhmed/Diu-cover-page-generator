import React from 'react';
import { CoverFormData } from '../types';
import { DiuLogo } from '../assets/DiuLogo';
import { formatAcademicDate } from '../utils/dateValidation';

interface TemplateProps {
  data: CoverFormData;
  className?: string;
  id?: string;
}

export const AssignmentTemplate: React.FC<TemplateProps> = ({ data, className = '', id }) => {
  const fontClass =
    data.fontStyle === 'merriweather'
      ? 'font-academic-serif'
      : data.fontStyle === 'lora'
      ? 'font-academic-editorial'
      : 'font-academic-sans';

  const formattedSubmissionDate = formatAcademicDate(data.submissionDate);

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
      {/* Outer Border Decorator */}
      {data.borderStyle === 'classic_double' && (
        <div className="absolute inset-[8mm] pointer-events-none border-[3px] border-slate-800 p-[3mm]">
          <div className="w-full h-full border border-slate-700" />
        </div>
      )}
      {data.borderStyle === 'clean_box' && (
        <div className="absolute inset-[8mm] pointer-events-none border-[1.5px] border-slate-800" />
      )}
      {data.borderStyle === 'formal_accent' && (
        <div className="absolute inset-[8mm] pointer-events-none border-t-[4px] border-b-[4px] border-slate-800" />
      )}

      {/* Content wrapper with z-index above absolute borders */}
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

          <h1 className="text-[20px] font-bold tracking-wide uppercase text-slate-900 leading-tight">
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

          <div className="w-48 h-[1.5px] bg-slate-800 mx-auto mt-4 mb-2" />
        </div>

        {/* ================= ASSIGNMENT TITLE & DETAILS ================= */}
        <div className="flex flex-col items-center text-center my-auto py-2">
          {/* Assignment Tag */}
          <div className="inline-block border-2 border-slate-900 px-6 py-1.5 mb-3 bg-slate-50">
            <span className="text-[15px] font-bold uppercase tracking-widest text-slate-900">
              {data.assignmentNumber ? `ASSIGNMENT NO: ${data.assignmentNumber}` : 'ASSIGNMENT'}
            </span>
          </div>

          {/* Title & Topic */}
          {data.assignmentTitle && (
            <div className="max-w-[160mm] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
                Assignment Title
              </span>
              <p className="text-[17px] font-bold text-slate-900 leading-snug">
                {data.assignmentTitle}
              </p>
            </div>
          )}

          {data.assignmentTopic && (
            <div className="max-w-[160mm] mt-1 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
                Topic
              </span>
              <p className="text-[14px] font-medium italic text-slate-800 leading-relaxed">
                "{data.assignmentTopic}"
              </p>
            </div>
          )}

          {/* Course Details Block */}
          <div className="mt-3 py-2 px-6 border-t border-b border-slate-300 max-w-[165mm] w-full text-center">
            <p className="text-[14px] text-slate-900 font-semibold">
              Course Title: <span className="font-normal text-slate-800">{data.courseTitle || '—'}</span>
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
        <div className="grid grid-cols-2 gap-6 w-full mb-4">
          {/* Submitted To Box */}
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

          {/* Submitted By Box */}
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

        {/* ================= DATE SECTION ================= */}
        <div className="text-center pt-2 pb-1 border-t border-slate-200">
          <p className="text-[13px] text-slate-900">
            <span className="font-bold uppercase tracking-wider text-[11px] text-slate-600 mr-1.5">
              Date of Submission:
            </span>
            <span className="font-semibold text-slate-900">
              {formattedSubmissionDate || '—'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
