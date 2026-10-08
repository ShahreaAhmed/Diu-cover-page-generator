import React from 'react';
import { LabIndexFormData, ExperimentItem } from '../types';
import { DiuLogo } from '../assets/DiuLogo';
import { formatAcademicDate } from '../utils/dateValidation';

interface LabIndexTemplateProps {
  data: LabIndexFormData;
  className?: string;
}

// Maximum experiments per page to ensure strict A4 fitting without clipping
const FIRST_PAGE_MAX_ROWS = 8;
const SUBSEQUENT_PAGE_MAX_ROWS = 12;

export function paginateExperiments(experiments: ExperimentItem[]): ExperimentItem[][] {
  if (experiments.length === 0) {
    return [[]];
  }

  const pages: ExperimentItem[][] = [];
  let remaining = [...experiments];

  // First page slice
  const firstPage = remaining.slice(0, FIRST_PAGE_MAX_ROWS);
  pages.push(firstPage);
  remaining = remaining.slice(FIRST_PAGE_MAX_ROWS);

  // Subsequent pages
  while (remaining.length > 0) {
    const page = remaining.slice(0, SUBSEQUENT_PAGE_MAX_ROWS);
    pages.push(page);
    remaining = remaining.slice(SUBSEQUENT_PAGE_MAX_ROWS);
  }

  return pages;
}

interface SingleIndexPageProps {
  data: LabIndexFormData;
  pageExperiments: ExperimentItem[];
  pageIndex: number;
  totalPages: number;
  isLastPage: boolean;
  id?: string;
}

export const SingleLabIndexPage: React.FC<SingleIndexPageProps> = ({
  data,
  pageExperiments,
  pageIndex,
  totalPages,
  isLastPage,
  id
}) => {
  const isFirstPage = pageIndex === 0;

  const fontClass =
    data.fontStyle === 'merriweather'
      ? 'font-academic-serif'
      : data.fontStyle === 'lora'
      ? 'font-academic-editorial'
      : 'font-academic-sans';

  return (
    <div
      id={id}
      className={`a4-document-export a4-page-box bg-white text-slate-900 relative p-[15mm] flex flex-col justify-between overflow-hidden shadow-sm select-none ${fontClass}`}
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
        <div className="absolute inset-[8mm] pointer-events-none border-[2.5px] border-slate-800 p-[2.5mm]">
          <div className="w-full h-full border border-slate-700" />
        </div>
      )}
      {data.borderStyle === 'clean_box' && (
        <div className="absolute inset-[8mm] pointer-events-none border-[1.5px] border-slate-800" />
      )}
      {data.borderStyle === 'formal_accent' && (
        <div className="absolute inset-[8mm] pointer-events-none border-t-[4px] border-b-[4px] border-slate-800" />
      )}

      {/* Content Area */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {/* Top Header */}
        <div>
          {isFirstPage ? (
            <div className="flex flex-col items-center text-center pb-2">
              {data.showLogo && (
                <div className="mb-2">
                  <DiuLogo
                    size="md"
                    monochrome={!data.logoColor}
                    variant="full"
                  />
                </div>
              )}

              <h1 className="text-[18px] font-bold tracking-wide uppercase text-slate-900">
                {data.universityName || 'Daffodil International University'}
              </h1>

              {data.department && (
                <h2 className="text-[13px] font-semibold text-slate-700">
                  {data.department}
                </h2>
              )}

              {/* Title Header */}
              <div className="w-full max-w-[170mm] border-t border-b-2 border-slate-900 py-1.5 my-2.5 bg-slate-50 text-center">
                <span className="text-[15px] font-extrabold uppercase tracking-widest text-slate-900">
                  LAB REPORT INDEX / TABLE OF EXPERIMENTS
                </span>
              </div>

              {/* Course & Student Meta Box */}
              <div className="w-full border border-slate-300 text-[11.5px] p-2.5 bg-slate-50/50 mb-3 grid grid-cols-2 gap-x-4 gap-y-1 text-left">
                <div>
                  <span className="font-bold text-slate-900">Course Title: </span>
                  <span className="text-slate-800">{data.courseTitle || '—'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Student Name: </span>
                  <span className="text-slate-800 font-semibold">{data.studentName || '—'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Course Code: </span>
                  <span className="text-slate-800">{data.courseCode || '—'}</span>
                  {data.semester && <span className="ml-2 text-slate-600">({data.semester})</span>}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Student ID: </span>
                  <span className="text-slate-800 font-semibold">{data.studentId || '—'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Laboratory: </span>
                  <span className="text-slate-800">{data.labName || '—'}</span>
                </div>
                <div>
                  {(data.section || data.batch) && (
                    <span>
                      {data.section && <><span className="font-bold text-slate-900">Sec: </span>{data.section} </>}
                      {data.batch && <><span className="font-bold text-slate-900">Batch: </span>{data.batch} </>}
                      {data.levelTerm && <><span className="font-bold text-slate-900">({data.levelTerm})</span></>}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Continuation Header for Page 2+ */
            <div className="border-b border-slate-400 pb-2 mb-3 flex justify-between items-center text-[12px]">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-900">
                  Lab Report Index (Continuation)
                </span>
                <span className="text-slate-600 ml-2">
                  | {data.courseCode} - {data.courseTitle}
                </span>
              </div>
              <div className="font-semibold text-slate-700">
                Student ID: {data.studentId || '—'}
              </div>
            </div>
          )}

          {/* ================= EXPERIMENTS TABLE ================= */}
          <div className="w-full overflow-hidden border border-slate-900">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-900 text-[10.5px]">
                  <th className="py-2 px-1.5 border-r border-slate-400 text-center w-[30px]">SL</th>
                  <th className="py-2 px-2 border-r border-slate-400 text-center w-[65px]">Exp. No</th>
                  <th className="py-2 px-2.5 border-r border-slate-400">Name of the Experiment</th>
                  <th className="py-2 px-1.5 border-r border-slate-400 text-center w-[78px]">Performance Date</th>
                  <th className="py-2 px-1.5 border-r border-slate-400 text-center w-[78px]">Submission Date</th>
                  <th className="py-2 px-1 border-r border-slate-400 text-center w-[48px]">Page No</th>
                  <th className="py-2 px-1.5 text-center w-[60px]">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {pageExperiments.map((exp) => {
                  const perfDate = formatAcademicDate(exp.performanceDate);
                  const subDate = formatAcademicDate(exp.submissionDate);

                  return (
                    <tr key={exp.id} className="text-slate-900">
                      <td className="py-2 px-1.5 text-center border-r border-slate-300 font-semibold">
                        {exp.sl}
                      </td>
                      <td className="py-2 px-1.5 text-center border-r border-slate-300 font-medium">
                        {exp.experimentNo || `Exp ${exp.sl}`}
                      </td>
                      <td className="py-2 px-2.5 border-r border-slate-300 font-medium leading-snug">
                        {exp.experimentName || '—'}
                      </td>
                      <td className="py-2 px-1 text-center border-r border-slate-300 text-[10px] leading-tight">
                        {perfDate || '—'}
                      </td>
                      <td className="py-2 px-1 text-center border-r border-slate-300 text-[10px] leading-tight font-medium">
                        {subDate || '—'}
                      </td>
                      <td className="py-2 px-1 text-center border-r border-slate-300 font-medium text-[10px]">
                        {exp.pageNo || '—'}
                      </td>
                      <td className="py-2 px-1 text-center text-[10px] text-slate-700">
                        {exp.remarks || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= BOTTOM SIGNATURE SECTION ================= */}
        <div>
          {isLastPage ? (
            <div className="pt-6 pb-2 grid grid-cols-2 gap-12 w-full text-center">
              <div>
                <div className="w-44 border-b border-slate-900 mx-auto mb-1.5" />
                <p className="text-[11.5px] font-bold text-slate-900 uppercase tracking-wide">
                  Signature of the Student
                </p>
                <p className="text-[10px] text-slate-600">Date: ____________________</p>
              </div>

              <div>
                <div className="w-48 border-b border-slate-900 mx-auto mb-1.5" />
                <p className="text-[11.5px] font-bold text-slate-900 uppercase tracking-wide">
                  Signature of the Teacher
                </p>
                <p className="text-[10px] text-slate-600">
                  {data.instructorName ? data.instructorName : 'Course Instructor with Date'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-right text-[10.5px] text-slate-500 italic pb-2">
              Continued on next page...
            </div>
          )}

          {/* Footer page indicator */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[10px] text-slate-500">
            <span>Daffodil International University • Lab Report Index</span>
            <span className="font-semibold text-slate-700">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LabIndexTemplate: React.FC<LabIndexTemplateProps> = ({ data, className = '' }) => {
  const pages = paginateExperiments(data.experiments);
  const totalPages = pages.length;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {pages.map((pageExp, idx) => (
        <SingleLabIndexPage
          key={`index-page-${idx}`}
          id={`lab-index-page-${idx}`}
          data={data}
          pageExperiments={pageExp}
          pageIndex={idx}
          totalPages={totalPages}
          isLastPage={idx === totalPages - 1}
        />
      ))}
    </div>
  );
};
