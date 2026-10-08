import React, { useState } from 'react';
import { FileText, Menu, X, PlusCircle, BookMarked, HelpCircle, Shield, Info } from 'lucide-react';
import { DocumentType } from '../types';

interface NavbarProps {
  currentTab: 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy';
  onNavigate: (tab: 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy', docType?: DocumentType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy', docType?: DocumentType) => {
    onNavigate(tab, docType);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-colors">
              <FileText className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight block leading-tight">
                DIU Cover Page
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold tracking-wider uppercase block">
                Academic Document Studio
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'home'
                  ? 'text-emerald-800 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('generator')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'generator'
                  ? 'text-emerald-800 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Create
            </button>
            <button
              onClick={() => handleNav('templates')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'templates'
                  ? 'text-emerald-800 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => handleNav('guidelines')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'guidelines'
                  ? 'text-emerald-800 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Guidelines
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'about'
                  ? 'text-emerald-800 bg-emerald-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Primary CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('generator')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Create Cover
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('generator')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            Create Document
          </button>
          <button
            onClick={() => handleNav('templates')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            Document Templates
          </button>
          <button
            onClick={() => handleNav('guidelines')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            DIU Guidelines & Dates
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            About & Disclaimer
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-slate-100 text-slate-800"
          >
            Privacy Policy
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('generator')}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
            >
              Create Cover Page Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
