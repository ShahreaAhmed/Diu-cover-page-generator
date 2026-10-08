import React from 'react';
import { LabIndexFormData, ExperimentItem } from '../types';
import { DiuLogo, DiuWatermark } from '../assets/DiuLogo';
import { formatCoverDate } from '../utils/dateValidation';

interface LabIndexTemplateProps {
  data: LabIndexFormData;
  className?: string;
}

// Maximum experiments per page to ensure strict A4 fitting without clipping
const FIRST_PAGE_MAX_ROWS = 14;
const SUBSEQUENT_PAGE_MAX_ROWS = 18;

export function paginateExperiments(experiments: ExperimentItem[]): ExperimentItem[][] {
  if (experiments.length === 0) {
    return [[]];
  }

  const pages: ExperimentItem[][] = [];
  let remaining = [...experiments];

  const firstPage = remaining.slice(0, FIRST_PAGE_MAX_ROWS);
  pages.push(firstPage);
  remaining = remaining.slice(FIRST_PAGE_MAX_ROWS);

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
  id
}) => {
  const isFirstPage = pageIndex === 0;

  const fontClass =
    data.fontStyle === 'merriweather'
      ? 'font-academic-serif'
      : data.fontStyle === 'lora'
      ? 'font-academic-editorial'
      : 'font-academic-sans';

  const groupNo = data.groupNumber;
  const showPerfDate = Boolean(data.includePerformanceDate);
  const dateFormat = data.dateFormat || 'slash';

  return (
    <div
      id={id}
      className={`a4-document-export a4-page-box bg-white text-slate-900 relative p-[14mm] flex flex-col justify-between overflow-hidden shadow-sm select-none ${fontClass}`}
      style={{
        boxSizing: 'border-box',
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Outer Single Clean Solid Border (Matches Sample Cover Image 4) */}
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

      {/* Content Area */}
      <div className="relative z-10 flex flex-col justify-start h-full w-full px-[2mm] py-[2mm]">
        {/* Top Header */}
        <div>
          {isFirstPage ? (
            <div className="flex flex-col items-center pt-2 pb-3">
              {data.showLogo && (
                <div className="mb-4">
                  <DiuLogo size="md" monochrome={!data.logoColor} />
                </div>
              )}

              {/* Title: LAB REPORT INDEX with solid underline */}
              <div className="text-center mt-1 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
                  LAB REPORT INDEX
                </h1>
              </div>

              {/* Top Meta Details: Course Title, Course Code, Student Name, Student ID, Section */}
              <div className="w-full grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:text-[14px] text-slate-900 mb-3 px-1 leading-snug">
                <div className="space-y-1.5">
                  <div>
                    <span className="font-bold text-slate-900">Course Title: </span>
                    <span className="text-slate-800">{data.courseTitle || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Course Code: </span>
                    <span className="text-slate-800">{data.courseCode || '—'}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div>
                    <span className="font-bold text-slate-900">Student Name: </span>
                    <span className="font-semibold text-slate-900">{data.studentName || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Student ID: </span>
                    <span className="font-semibold text-slate-900">{data.studentId || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Section: </span>
                    <span className="text-slate-800">{data.section || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Continuation Header for subsequent pages */
            <div className="border-b-2 border-slate-900 pb-2 mb-4 flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-900">
                LAB REPORT INDEX (Continuation) — {data.courseCode}
              </span>
              <span className="font-semibold text-slate-700">
                ID: {data.studentId || '—'}
              </span>
            </div>
          )}

          {/* ================= EXPERIMENTS TABLE (Matches Image 4 Exactly) ================= */}
          <div className="w-full overflow-hidden border border-black bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
              <thead>
                <tr className="bg-white text-slate-900 font-bold border-b border-black text-center text-xs sm:text-[13px]">
                  <th className="py-2.5 px-2 border-r border-black w-[70px]">Exp. No</th>
                  {showPerfDate ? (
                    <>
                      <th className="py-2.5 px-2 border-r border-black w-[100px]">Perf. Date</th>
                      <th className="py-2.5 px-2 border-r border-black w-[100px]">Sub. Date</th>
                    </>
                  ) : (
                    <th className="py-2.5 px-2 border-r border-black w-[110px]">Date</th>
                  )}
                  <th className="py-2.5 px-3 border-r border-black text-left">Name of Experiment</th>
                  <th className="py-2.5 px-2 border-r border-black w-[80px]">Page No</th>
                  <th className="py-2.5 px-2 w-[90px]">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {pageExperiments.map((exp) => {
                  const perfDate = formatCoverDate(exp.performanceDate, dateFormat);
                  const subDate = formatCoverDate(exp.submissionDate, dateFormat);

                  return (
                    <tr key={exp.id} className="border-b border-black text-slate-900">
                      <td className="py-2.5 px-2 text-center border-r border-black font-semibold">
                        {exp.experimentNo ? exp.experimentNo.replace(/exp\.?\s*/i, '') : exp.sl}
                      </td>

                      {showPerfDate ? (
                        <>
                          <td className="py-2.5 px-1.5 text-center border-r border-black text-[12px]">
                            {perfDate || '—'}
                          </td>
                          <td className="py-2.5 px-1.5 text-center border-r border-black text-[12px] font-medium">
                            {subDate || '—'}
                          </td>
                        </>
                      ) : (
                        <td className="py-2.5 px-1.5 text-center border-r border-black text-[12.5px] font-medium">
                          {subDate || perfDate || '—'}
                        </td>
                      )}

                      <td className="py-2.5 px-3 border-r border-black font-medium leading-snug">
                        {exp.experimentName || '—'}
                      </td>
                      <td className="py-2.5 px-1.5 text-center border-r border-black font-medium text-[12px]">
                        {exp.pageNo || ''}
                      </td>
                      <td className="py-2.5 px-1.5 text-center text-[12px] text-slate-800">
                        {exp.remarks || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note: NO footer branding or page numbers at the bottom as explicitly requested by user */}
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
