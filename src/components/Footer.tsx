import React from 'react';
import { FileText, Shield, Heart } from 'lucide-react';
import { DocumentType } from '../types';

interface FooterProps {
  onNavigate: (tab: 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy', docType?: DocumentType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                DIU Cover Page
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              An independent academic utility for Daffodil International University students. Generate flawless assignment covers, lab reports, final lab reports, and lab report index pages with live A4 preview and print-perfect export.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <Shield className="w-4 h-4" />
              <span>100% Client-Side Privacy: No data uploaded to servers</span>
            </div>
          </div>

          {/* Quick Generators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Document Generators
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('generator', 'assignment')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Assignment Cover Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator', 'lab_report')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Lab Report Cover Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator', 'final_lab_report')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Final Lab Report Cover
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator', 'lab_index')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Lab Report Index Page
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('templates')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Templates Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guidelines')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  DIU Formatting Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About & Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} DIU Cover Page Generator. Independent academic tool for DIU students.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            Not officially affiliated with Daffodil International University. Created for academic convenience.
          </p>
        </div>
      </div>
    </footer>
  );
};
