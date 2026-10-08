import React from 'react';
import { ShieldCheck, Lock, HardDrive, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Your information is processed in your browser and is not uploaded to our server.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <Lock className="w-5 h-5 text-emerald-800 shrink-0" />
          <p className="text-xs font-semibold text-emerald-900">
            <strong>Client-Side Processing Guarantee:</strong> This application has no database backend. When you type your Student ID, Course Title, or grades, every byte stays in your local browser memory.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            1. Zero Server Storage
          </h2>
          <p>
            We do not maintain user accounts, passwords, or personal academic profiles on any remote servers. The application is completely serverless from the user data standpoint.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            2. LocalStorage ("Save My Information")
          </h2>
          <p>
            If you explicitly choose to use the "Save My Information on This Device" feature, your details (such as Student Name, Student ID, Department, Section, and Batch) are stored solely in your web browser's standard <code>localStorage</code>.
          </p>
          <p className="mt-2">
            You can clear this stored data at any moment by clicking "Clear Saved Profile" inside the application or clearing your browser's site data.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            3. Document Generation & Export
          </h2>
          <p>
            All PDF rendering (via jsPDF) and high-resolution image rendering (via HTML5 Canvas) are performed completely locally by your device's browser engine. No document contents are transmitted over the internet during export.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            4. Third-Party Tracking & Cookies
          </h2>
          <p>
            We do not use advertising trackers, third-party analytics pixels, or commercial tracking cookies. Your academic document creation is private and distraction-free.
          </p>
        </div>
      </div>
    </div>
  );
};
