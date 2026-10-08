import React from 'react';
import {
  FileText,
  FlaskConical,
  GraduationCap,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  Printer,
  ShieldCheck,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { DocumentType } from '../types';

interface HomeProps {
  onSelectDocType: (docType: DocumentType) => void;
  onNavigate: (tab: 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy', docType?: DocumentType) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectDocType, onNavigate }) => {
  const documentCards: Array<{
    type: DocumentType;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    actionText: string;
  }> = [
    {
      type: 'assignment',
      title: 'Assignment Cover',
      subtitle: 'Standard Coursework & Term Papers',
      description: 'Create a professional assignment cover page complete with faculty, department, topic, course code, and instructor details.',
      icon: FileText,
      badge: 'Most Popular',
      actionText: 'Create Assignment Cover'
    },
    {
      type: 'lab_report',
      title: 'Lab Report Cover',
      subtitle: 'Individual Experiments & Sessional Work',
      description: 'Generate standard DIU lab report covers with experiment numbers, lab group info, and strictly validated performance dates.',
      icon: FlaskConical,
      badge: 'Academic Sessional',
      actionText: 'Create Lab Report Cover'
    },
    {
      type: 'final_lab_report',
      title: 'Final Lab Report',
      subtitle: 'End-of-Semester Lab Submission',
      description: 'Create a dignified and formal Final Lab Report cover page tailored for final evaluations and semester lab submissions.',
      icon: GraduationCap,
      badge: 'End Semester',
      actionText: 'Create Final Lab Report'
    },
    {
      type: 'lab_index',
      title: 'Lab Report Index',
      subtitle: 'Experiment Table & Pagination',
      description: 'Build a structured table of experiments with automatic row numbering, multi-page A4 splitting, and signature blocks.',
      icon: FileSpreadsheet,
      badge: 'Multi-Page A4',
      actionText: 'Create Lab Index'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50),theme(colors.slate.50))]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            DIU Academic Utility • Updated for 2026/2027
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
            Create Your DIU Cover Page in Seconds
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Generate professional assignment covers, lab report covers, final lab report covers and lab report indexes with live A4 preview and high-quality PDF/image export.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('generator', 'assignment')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Create Cover Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>View Templates</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> True 210mm × 297mm A4
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vector Print-Ready PDF
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 300 DPI PNG Image
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Client-Side Privacy
            </span>
          </div>
        </div>
      </section>

      {/* ================= 4 MAIN DOCUMENT CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Select Your Document Type
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Choose from the four standard Daffodil International University academic templates, each crafted to match faculty expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.type}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 group-hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5 mb-2.5">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectDocType(card.type)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-emerald-700 group-hover:text-white transition-all cursor-pointer"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= VALUE PROPOSITION & FEATURES ================= */}
      <section className="bg-slate-900 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Built for Engineering, CS & Business Students
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why DIU Students Love This Utility
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Live A4 Preview</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Updates in real-time as you type. What you see is exactly what will be printed on standard A4 paper.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">PDF & 300 DPI Images</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export true vector-crisp PDF or 2480 × 3508 px high-resolution PNG & JPG files without website watermarks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Smart Date Logic</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevents invalid dates. Performance Date must be earlier than Submission Date. Auto-reflows if empty.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Zero Server Uploads</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                100% client-side. No signups, no logins, no backend database. Your student ID and grades remain on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-600">
            Generate your document in three frictionless steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Fill Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your student name, ID, course info, and instructor name, or load sample DIU data with one click.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Check A4 Preview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect the real-time A4 rendering on the right panel. Check margins, typography, and conditional dates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Download or Print</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click Download PDF, high-res PNG, or print straight to your browser dialog with zero page clipping.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
