/**
 * DIU Cover Page Generator
 * Daffodil International University Academic Cover & Lab Index Studio
 */
import React, { useState, useCallback } from 'react';
import { DocumentType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Home } from './pages/Home';
import { GeneratorPage } from './pages/GeneratorPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';

export type ActiveTab = 'home' | 'generator' | 'templates' | 'guidelines' | 'about' | 'privacy';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [activeDocType, setActiveDocType] = useState<DocumentType>('assignment');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast notification dispatcher
  const notify = useCallback(
    (type: 'success' | 'info' | 'warning' | 'error', message: string, title?: string) => {
      const newToast: ToastMessage = {
        id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type,
        message,
        title
      };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleNavigate = (tab: ActiveTab, docType?: DocumentType) => {
    if (docType) {
      setActiveDocType(docType);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocType = (docType: DocumentType) => {
    setActiveDocType(docType);
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Global Navigation Header */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            onSelectDocType={handleSelectDocType}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'generator' && (
          <GeneratorPage
            initialDocType={activeDocType}
            onNotify={notify}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesPage onSelectDocType={handleSelectDocType} />
        )}

        {currentTab === 'guidelines' && <GuidelinesPage />}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'privacy' && <PrivacyPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
