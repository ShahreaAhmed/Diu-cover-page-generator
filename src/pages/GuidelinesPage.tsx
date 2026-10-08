import React from 'react';
import {
  BookOpen,
  Calendar,
  Printer,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Download
} from 'lucide-react';

export const GuidelinesPage: React.FC = () => {
  const faqs = [
    {
      q: 'Why is Performance Date disabled until I select Submission Date?',
      a: 'In academic sessional courses, a lab experiment is always performed before it can be submitted. To guarantee data validity and prevent invalid submissions, the system requires your Submission Date first. It then dynamically calculates the allowable dates for Performance Date.'
    },
    {
      q: 'Can Performance Date be the same day as Submission Date?',
      a: 'No. Under DIU laboratory regulations, a lab report is prepared and written up after the lab session is concluded. Therefore, Performance Date must strictly be at least one day earlier than the Submission Date (Performance Date < Submission Date).'
    },
    {
      q: 'What happens if I leave Performance Date empty?',
      a: 'Performance Date is completely optional! If you leave it empty, the generated cover page will simply display "Date of Submission". It will never leave an ugly blank line or "Performance Date: ______". The document reflows automatically.'
    },
    {
      q: 'What paper size and weight should I use when printing?',
      a: 'Standard international A4 paper (210mm × 297mm). For final lab reports and semester assignments, 80 GSM or 100 GSM bright white bond paper is recommended for the best crisp presentation.'
    },
    {
      q: 'Are my student ID and coursework stored on your servers?',
      a: 'No! All processing, validation, live preview, PDF rendering, and image generation occur 100% locally in your web browser. Nothing is ever sent to or stored on any remote server.'
    },
    {
      q: 'Why should I prefer PNG over JPG for downloading images?',
      a: 'Academic cover pages contain sharp vector text and fine borders. PNG uses lossless compression, keeping every letter crystal clear at 300 DPI. JPG uses lossy compression which can introduce slight blurriness around text.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          DIU Academic Formatting Guidelines
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Standards, rules, and best practices for creating assignment and lab report covers at Daffodil International University.
        </p>
      </div>

      {/* Critical Date Logic Explanation */}
      <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-white">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Critical Performance Date vs Submission Date Rules
            </h2>
            <p className="text-xs text-amber-900 font-medium">
              Mandatory sequence for Lab Report and Final Lab Report covers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed pt-2">
          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Submission Date Selected First
            </h3>
            <p>
              The Performance Date picker remains disabled until you choose your Submission Date. This ensures that the valid calendar range can be established in advance.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Strict Earlier Date Requirement
            </h3>
            <p>
              Performance Date must strictly be earlier than Submission Date (<span className="font-mono font-bold">Perf Date &lt; Sub Date</span>). It cannot be the same day or a later date.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Automatic Date Revalidation
            </h3>
            <p>
              If you change your Submission Date to a date equal to or earlier than your existing Performance Date, the system will automatically clear the Performance Date and notify you.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4. Clean Conditional Display
            </h3>
            <p>
              If Performance Date is omitted, it will NOT display empty placeholders or blank underlines. Only the Submission Date is rendered, maintaining a balanced academic layout.
            </p>
          </div>
        </div>
      </section>

      {/* Document Types Summary */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Document Conventions by Type
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              Assignment Cover Page
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 leading-relaxed">
              <li>Includes full University, Faculty, and Department hierarchy.</li>
              <li>Assignment Number & Title displayed in clean academic typography.</li>
              <li>Separate columns for Instructor (Submitted To) and Student (Submitted By).</li>
              <li>Only renders optional fields (like Level-Term or Topic) when provided.</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              Lab Report & Final Lab Report
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 leading-relaxed">
              <li>Experiment Number and descriptive Experiment Name.</li>
              <li>Course Code, Course Title, and Laboratory Facility.</li>
              <li>Final Lab Report includes a dignified comprehensive semester header.</li>
              <li>Supports optional lab group designations and team members.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Printing & Paper Recommendations */}
      <section className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Printing & Export Best Practices
            </h2>
            <p className="text-xs text-slate-500">
              Ensuring 100% alignment and sharp contrast
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <p className="font-bold text-slate-900">Paper Size & Margin</p>
            <p>Always select <strong>A4</strong> in your print dialog. Set margins to <strong>None / Default</strong>; the template includes built-in 18-20mm margins.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <p className="font-bold text-slate-900">Scale Setting</p>
            <p>Set Scale to <strong>100% (Actual Size)</strong> in the print dialog. Avoid "Fit to printable area" which might shrink borders slightly.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <p className="font-bold text-slate-900">Background Graphics</p>
            <p>Ensure <strong>"Background graphics"</strong> is checked if you want colored badges and subtle borders to print in high fidelity.</p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
