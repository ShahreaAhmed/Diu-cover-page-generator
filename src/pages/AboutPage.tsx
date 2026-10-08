import React from 'react';
import { FileText, Shield, Heart, GraduationCap, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
          <FileText className="w-6 h-6 text-emerald-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About DIU Cover Page Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          An independent academic utility designed to help Daffodil International University students create structured academic cover pages in seconds.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Why We Created This Tool
          </h2>
          <p>
            Every semester at Daffodil International University (DIU), thousands of students across CSE, Software Engineering, EEE, Textile, BBA, and other departments submit assignments, weekly lab reports, final lab reports, and lab report indexes.
          </p>
          <p className="mt-2.5">
            Students often waste countless hours struggling with Microsoft Word templates where borders break, dates format inconsistently, tables clip over page boundaries, or accidental empty lines cause layout shifts. This utility solves that once and for all: providing strict, authentic DIU academic templates with live A4 preview, guaranteed vector alignment, and instant PDF/image export.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Core Design Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">Formal Academic Dignity</span>
              <p className="text-slate-600">No flashy web gimmicks on the actual document. Standard 210 × 297mm A4, balanced whitespace, and crisp typography.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">Strict Logical Validation</span>
              <p className="text-slate-600">Performance dates must precede submission dates. Invalid data is prevented before export.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">Absolute Client-Side Privacy</span>
              <p className="text-slate-600">No telemetry, no tracking, and no database. Everything runs inside your browser.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">Multi-Page Intelligence</span>
              <p className="text-slate-600">Lab indexes dynamically paginate across multiple A4 pages without row clipping.</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-slate-200 pt-6 bg-slate-50/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs text-slate-600">
              <h3 className="font-bold text-slate-900 text-sm">
                Independent Academic Utility Disclaimer
              </h3>
              <p>
                This application is an independent, non-commercial software project developed for the academic convenience of students of Daffodil International University (DIU), Bangladesh. It is <strong>not officially affiliated with, endorsed by, or operated by Daffodil International University</strong>.
              </p>
              <p>
                All trademarks, university names, and emblems referenced belong to their respective owners and are used strictly for academic identification and student utility purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
