import React from 'react';
import { FileText, FlaskConical, GraduationCap, FileSpreadsheet, ArrowRight, Check } from 'lucide-react';
import { DocumentType } from '../types';

interface TemplatesPageProps {
  onSelectDocType: (docType: DocumentType) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectDocType }) => {
  const templates = [
    {
      type: 'assignment' as DocumentType,
      title: 'Assignment Cover Page',
      category: 'Coursework & Term Papers',
      description: 'Used for semester assignments, individual papers, case studies, and term coursework across all DIU faculties.',
      features: [
        'Prominent Assignment No. badge',
        'Assignment Title & Topic fields',
        'Dual Instructor & Student columns',
        'Reflows cleanly when optional fields are empty'
      ]
    },
    {
      type: 'lab_report' as DocumentType,
      title: 'Lab Report Cover Page',
      category: 'Weekly Sessional Experiments',
      description: 'Used for weekly lab experiment reports in CSE, EEE, Civil, Textile, Pharmacy, and Engineering labs.',
      features: [
        'Experiment Number & Name display',
        'Strict Performance Date < Submission Date logic',
        'Optional Performance Date (no blank lines)',
        'Optional Lab Group & Member listings'
      ]
    },
    {
      type: 'final_lab_report' as DocumentType,
      title: 'Final Lab Report Cover Page',
      category: 'End-of-Semester Lab Submission',
      description: 'The formal, high-stakes cover page required at the end of the semester for overall lab portfolio evaluation.',
      features: [
        'Dignified FINAL LAB REPORT title banner',
        'Laboratory & Course meta blocks',
        'Formal evaluation submission sections',
        'Smart academic date verification'
      ]
    },
    {
      type: 'lab_index' as DocumentType,
      title: 'Lab Report Index Page',
      category: 'Experiment Table of Contents',
      description: 'The experiment table of contents attached in front of lab files. Auto-paginates across multiple A4 pages.',
      features: [
        'Dynamic experiment table builder',
        'Auto SL numbering & reordering',
        'Multi-page A4 splitting with continuation headers',
        'Student & Teacher signature blocks'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          DIU Academic Document Templates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Choose any template below to open the interactive generator with live A4 preview and instant export.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((tpl) => (
          <div
            key={tpl.type}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {tpl.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  A4 • 210 × 297 mm
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {tpl.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              {/* Miniature visual wireframe */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 select-none">
                <div className="w-16 h-2 bg-slate-300 rounded" />
                <div className="w-32 h-2.5 bg-slate-800 rounded font-bold" />
                <div className="w-24 h-1.5 bg-slate-400 rounded" />
                <div className="w-36 h-4 border border-slate-400 rounded my-1 flex items-center justify-center text-[9px] font-bold text-slate-600">
                  {tpl.type === 'assignment'
                    ? 'ASSIGNMENT'
                    : tpl.type === 'lab_report'
                    ? 'LAB REPORT'
                    : tpl.type === 'final_lab_report'
                    ? 'FINAL LAB REPORT'
                    : 'EXPERIMENTS INDEX'}
                </div>
                <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div className="h-6 bg-slate-200/80 rounded" />
                  <div className="h-6 bg-slate-200/80 rounded" />
                </div>
              </div>

              {/* Key Highlights */}
              <ul className="space-y-1.5 text-xs text-slate-600">
                {tpl.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectDocType(tpl.type)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 transition-colors shadow-xs cursor-pointer"
            >
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
