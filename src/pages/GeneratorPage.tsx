import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  FlaskConical,
  GraduationCap,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  Settings,
  Maximize2
} from 'lucide-react';
import { CoverFormData, LabIndexFormData, DocumentType, FormErrors, StudentProfile } from '../types';
import {
  SAMPLE_ASSIGNMENT,
  SAMPLE_LAB_REPORT,
  SAMPLE_FINAL_LAB_REPORT,
  SAMPLE_LAB_INDEX
} from '../data/diuData';
import { GeneratorForm } from '../components/GeneratorForm';
import { LabIndexForm } from '../components/LabIndexForm';
import { AssignmentTemplate } from '../templates/AssignmentTemplate';
import { LabReportTemplate } from '../templates/LabReportTemplate';
import { FinalLabReportTemplate } from '../templates/FinalLabReportTemplate';
import { LabIndexTemplate, paginateExperiments } from '../templates/LabIndexTemplate';
import { ExportToolbar } from '../components/ExportToolbar';
import { PreviewZoomControls } from '../components/PreviewZoomControls';
import { ResetConfirmModal } from '../components/ResetConfirmModal';
import { StudentProfileModal } from '../components/StudentProfileModal';
import { ExpandedPreviewModal } from '../components/ExpandedPreviewModal';
import { SmallPreviewButton } from '../components/SmallPreviewButton';
import { exportToPDF } from '../utils/pdfExport';
import { exportToImage, exportMultiplePagesToImages } from '../utils/imageExport';
import { printDocument } from '../utils/printDocument';
import { generateFilename } from '../utils/filename';
import { getSavedStudentProfile } from '../utils/storage';

interface GeneratorPageProps {
  initialDocType?: DocumentType;
  onNotify: (type: 'success' | 'info' | 'warning' | 'error', message: string, title?: string) => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  initialDocType = 'assignment',
  onNotify
}) => {
  const [docType, setDocType] = useState<DocumentType>(initialDocType);

  // Synchronize when initialDocType changes from outside navigation
  useEffect(() => {
    if (initialDocType) {
      setDocType(initialDocType);
    }
  }, [initialDocType]);

  // Form states
  const [coverData, setCoverData] = useState<CoverFormData>(() => {
    // Check if user has saved profile
    const saved = getSavedStudentProfile();
    const base = { ...SAMPLE_ASSIGNMENT, docType: initialDocType };
    if (saved) {
      return {
        ...base,
        studentName: saved.studentName || base.studentName,
        studentId: saved.studentId || base.studentId,
        studentDepartment: saved.department || base.studentDepartment,
        section: saved.section || base.section,
        batch: saved.batch || base.batch,
        semester: saved.semester || base.semester,
        levelTerm: saved.levelTerm || base.levelTerm
      };
    }
    return base;
  });

  const [labIndexData, setLabIndexData] = useState<LabIndexFormData>(() => {
    const saved = getSavedStudentProfile();
    const base = { ...SAMPLE_LAB_INDEX };
    if (saved) {
      return {
        ...base,
        studentName: saved.studentName || base.studentName,
        studentId: saved.studentId || base.studentId,
        department: saved.department || base.department,
        section: saved.section || base.section,
        batch: saved.batch || base.batch,
        semester: saved.semester || base.semester,
        levelTerm: saved.levelTerm || base.levelTerm
      };
    }
    return base;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [scale, setScale] = useState<number>(0.75); // Comfortable preview scale
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExpandedPreviewOpen, setIsExpandedPreviewOpen] = useState(false);

  // References for live preview rendering & export
  const documentExportRef = useRef<HTMLDivElement>(null);

  // Auto adjust scale based on window width
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.42); // Mobile fit
      } else if (width < 1024) {
        setScale(0.58); // Tablet fit
      } else if (width < 1440) {
        setScale(0.72); // Standard laptop
      } else {
        setScale(0.85); // High-res monitor
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Update docType in state when switching document type
  const handleDocTypeSwitch = (type: DocumentType) => {
    setDocType(type);
    setCoverData((prev) => ({
      ...prev,
      docType: type,
      // If switching to Lab Report and fields are empty, load reasonable defaults
      labReportNumber: type === 'lab_report' && !prev.labReportNumber ? '01' : prev.labReportNumber,
      experimentNumber: type === 'lab_report' && !prev.experimentNumber ? '01' : prev.experimentNumber,
      labName:
        (type === 'lab_report' || type === 'final_lab_report') && !prev.labName
          ? 'Algorithms Sessional Laboratory'
          : prev.labName
    }));
    setErrors({});
  };

  // Form Validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (docType === 'lab_index') {
      if (!labIndexData.studentName.trim()) newErrors.studentName = 'Student Name is required';
      if (!labIndexData.studentId.trim()) newErrors.studentId = 'Student ID is required';
      if (!labIndexData.courseCode.trim()) newErrors.courseCode = 'Course Code is required';
      if (!labIndexData.courseTitle.trim()) newErrors.courseTitle = 'Course Title is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    if (!coverData.universityName.trim()) newErrors.universityName = 'University Name is required';
    if (!coverData.department.trim()) newErrors.department = 'Department is required';
    if (!coverData.courseCode.trim()) newErrors.courseCode = 'Course Code is required';
    if (!coverData.courseTitle.trim()) newErrors.courseTitle = 'Course Title is required';
    if (!coverData.instructorName.trim()) newErrors.instructorName = 'Instructor Name is required';
    if (!coverData.studentName.trim()) newErrors.studentName = 'Student Name is required';
    if (!coverData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!coverData.submissionDate.trim()) newErrors.submissionDate = 'Please select a submission date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Export handlers
  const handleExportPDF = async () => {
    if (!validateForm()) {
      onNotify('error', 'Please complete the highlighted required fields before exporting.', 'Required Fields Missing');
      return;
    }

    try {
      if (docType === 'lab_index') {
        const pages = paginateExperiments(labIndexData.experiments);
        const elements: HTMLElement[] = [];
        for (let i = 0; i < pages.length; i++) {
          const el = document.getElementById(`lab-index-page-${i}`);
          if (el) elements.push(el);
        }
        if (elements.length === 0) throw new Error('Could not find index pages in DOM');

        const filename = generateFilename('lab_index', labIndexData.studentName, 'pdf');
        await exportToPDF(elements, { filename });
      } else {
        const el = document.getElementById('single-cover-page-export');
        if (!el) throw new Error('Document preview element not found');

        const filename = generateFilename(docType, coverData.studentName, 'pdf');
        await exportToPDF(el, { filename });
      }

      onNotify('success', 'PDF downloaded successfully in true A4 print format.', 'Download Complete');
    } catch (err) {
      console.error('PDF generation error', err);
      onNotify('error', 'Unable to generate the PDF file. Please try again.', 'Export Failed');
    }
  };

  const handleExportImage = async (format: 'png' | 'jpg') => {
    if (!validateForm()) {
      onNotify('error', 'Please complete the highlighted required fields before exporting.', 'Required Fields Missing');
      return;
    }

    try {
      if (docType === 'lab_index') {
        const pages = paginateExperiments(labIndexData.experiments);
        const elements: HTMLElement[] = [];
        for (let i = 0; i < pages.length; i++) {
          const el = document.getElementById(`lab-index-page-${i}`);
          if (el) elements.push(el);
        }
        if (elements.length === 0) throw new Error('Index page elements not found');

        const baseFilename = generateFilename('lab_index', labIndexData.studentName, format).replace(`.${format}`, '');

        if (elements.length === 1) {
          await exportToImage(elements[0], {
            filename: `${baseFilename}_Page_1.${format}`,
            format
          });
        } else {
          await exportMultiplePagesToImages(elements, baseFilename, format);
        }
      } else {
        const el = document.getElementById('single-cover-page-export');
        if (!el) throw new Error('Document element not found');

        const filename = generateFilename(docType, coverData.studentName, format);
        await exportToImage(el, { filename, format });
      }

      onNotify('success', `${format.toUpperCase()} image downloaded at crystal clear 300 DPI.`, 'Image Saved');
    } catch (err) {
      console.error('Image export error', err);
      onNotify('error', 'Unable to generate the image file. Please try again.', 'Export Failed');
    }
  };

  const handlePrint = () => {
    if (!validateForm()) {
      onNotify('warning', 'Please fill required fields for the best print result.', 'Print Warning');
    }
    printDocument();
  };

  // Reset form handler
  const handleResetConfirm = () => {
    if (docType === 'lab_index') {
      setLabIndexData({
        ...SAMPLE_LAB_INDEX,
        courseCode: '',
        courseTitle: '',
        labName: '',
        experiments: [
          {
            id: `exp-${Date.now()}`,
            sl: 1,
            experimentNo: 'Exp 01',
            experimentName: '',
            performanceDate: '',
            submissionDate: '',
            pageNo: '',
            remarks: ''
          }
        ]
      });
    } else {
      setCoverData({
        universityName: 'Daffodil International University',
        faculty: '',
        department: '',
        docType,
        assignmentNumber: '',
        assignmentTitle: '',
        assignmentTopic: '',
        labReportNumber: '',
        experimentNumber: '',
        experimentName: '',
        labName: '',
        courseCode: '',
        courseTitle: '',
        semester: '',
        academicYear: '',
        instructorName: '',
        instructorDesignation: '',
        instructorDepartment: '',
        studentName: '',
        studentId: '',
        section: '',
        batch: '',
        studentDepartment: '',
        levelTerm: '',
        labGroup: '',
        groupMembers: '',
        submissionDate: '',
        performanceDate: '',
        borderStyle: 'classic_double',
        fontStyle: 'merriweather',
        showLogo: true,
        logoColor: true
      });
    }
    setErrors({});
    onNotify('info', 'Form inputs have been cleared.', 'Form Reset');
  };

  // Apply profile from localStorage
  const handleApplyProfile = (profile: StudentProfile) => {
    if (docType === 'lab_index') {
      setLabIndexData((prev) => ({
        ...prev,
        studentName: profile.studentName || prev.studentName,
        studentId: profile.studentId || prev.studentId,
        department: profile.department || prev.department,
        section: profile.section || prev.section,
        batch: profile.batch || prev.batch,
        semester: profile.semester || prev.semester,
        levelTerm: profile.levelTerm || prev.levelTerm
      }));
    } else {
      setCoverData((prev) => ({
        ...prev,
        studentName: profile.studentName || prev.studentName,
        studentId: profile.studentId || prev.studentId,
        studentDepartment: profile.department || prev.studentDepartment,
        department: profile.department || prev.department,
        faculty: profile.faculty || prev.faculty,
        section: profile.section || prev.section,
        batch: profile.batch || prev.batch,
        semester: profile.semester || prev.semester,
        levelTerm: profile.levelTerm || prev.levelTerm
      }));
    }
  };

  const indexPagesCount =
    docType === 'lab_index'
      ? paginateExperiments(labIndexData.experiments).length
      : 1;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ================= TOP DOCUMENT SELECTOR TABS ================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 sm:p-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => handleDocTypeSwitch('assignment')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              docType === 'assignment'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Assignment Cover</span>
          </button>

          <button
            type="button"
            onClick={() => handleDocTypeSwitch('lab_report')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              docType === 'lab_report'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Lab Report Cover</span>
          </button>

          <button
            type="button"
            onClick={() => handleDocTypeSwitch('final_lab_report')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              docType === 'final_lab_report'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Final Lab Report</span>
          </button>

          <button
            type="button"
            onClick={() => handleDocTypeSwitch('lab_index')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              docType === 'lab_index'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Lab Report Index</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Button that shows small preview and expands to larger view when clicked */}
          <SmallPreviewButton
            docType={docType}
            studentName={docType === 'lab_index' ? labIndexData.studentName : coverData.studentName}
            courseCode={docType === 'lab_index' ? labIndexData.courseCode : coverData.courseCode}
            groupNumber={docType === 'lab_index' ? labIndexData.groupNumber : (coverData.groupNumber || coverData.labGroup)}
            onClick={() => setIsExpandedPreviewOpen(true)}
          />

          <div className="hidden sm:flex items-center gap-2 px-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live A4 Preview</span>
          </div>
        </div>
      </div>

      {/* ================= TWO-PANEL WORKSPACE (FORM LEFT, PREVIEW RIGHT) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT PANEL: FORM ================= */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1 no-print">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {docType === 'assignment' && 'Assignment Information'}
              {docType === 'lab_report' && 'Lab Report Information'}
              {docType === 'final_lab_report' && 'Final Lab Report Information'}
              {docType === 'lab_index' && 'Lab Report Index Table'}
            </h1>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Form 1 of 1
            </span>
          </div>

          {/* Form component */}
          {docType === 'lab_index' ? (
            <LabIndexForm
              data={labIndexData}
              onChange={setLabIndexData}
              onNotify={onNotify}
              onOpenResetModal={() => setIsResetModalOpen(true)}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
              onOpenExpandedPreview={() => setIsExpandedPreviewOpen(true)}
            />
          ) : (
            <GeneratorForm
              data={coverData}
              onChange={setCoverData}
              errors={errors}
              onNotify={onNotify}
              onOpenResetModal={() => setIsResetModalOpen(true)}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
              onOpenExpandedPreview={() => setIsExpandedPreviewOpen(true)}
            />
          )}
        </div>

        {/* ================= RIGHT PANEL: LIVE A4 PREVIEW ================= */}
        <div className="lg:col-span-6 xl:col-span-7 sticky top-20 space-y-4">
          {/* Preview Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 no-print">
            <ExportToolbar
              onExportPDF={handleExportPDF}
              onExportImage={handleExportImage}
              onPrint={handlePrint}
              totalPages={indexPagesCount}
              isMultiPage={docType === 'lab_index' && indexPagesCount > 1}
            />

            <div className="self-end sm:self-auto">
              <PreviewZoomControls
                scale={scale}
                onScaleChange={setScale}
                onReset={() => {
                  const width = window.innerWidth;
                  setScale(width < 640 ? 0.42 : width < 1024 ? 0.58 : 0.75);
                }}
                onExpand={() => setIsExpandedPreviewOpen(true)}
              />
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="bg-slate-200/90 rounded-2xl border border-slate-300/80 p-3 sm:p-5 shadow-inner overflow-auto max-h-[calc(100vh-140px)] flex flex-col items-center relative group">
            {/* Quick Expand Canvas Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-slate-300/80 text-xs text-slate-600 no-print">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live A4 Preview (Academic Scale)
              </span>
              <button
                type="button"
                onClick={() => setIsExpandedPreviewOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-white/90 hover:bg-white px-2.5 py-1 rounded-lg border border-slate-300 transition-colors shadow-2xs cursor-pointer"
                title="Expand preview to full screen view"
              >
                <Maximize2 className="w-3 h-3 text-emerald-600" />
                <span>Expand to Full Size</span>
              </button>
            </div>

            {/* Scaled Preview Wrapper */}
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                marginBottom: `${(scale - 1) * 310}mm` // Offsets whitespace collapse when scaled down
              }}
              className="transition-transform duration-100 ease-out cursor-pointer"
              onClick={() => setIsExpandedPreviewOpen(true)}
              title="Click preview to expand to full size view"
            >
              {/* Actual A4 Documents (Export Targets) */}
              <div ref={documentExportRef} className="print-only-container">
                {docType === 'assignment' && (
                  <AssignmentTemplate
                    id="single-cover-page-export"
                    data={coverData}
                  />
                )}

                {docType === 'lab_report' && (
                  <LabReportTemplate
                    id="single-cover-page-export"
                    data={coverData}
                  />
                )}

                {docType === 'final_lab_report' && (
                  <FinalLabReportTemplate
                    id="single-cover-page-export"
                    data={coverData}
                  />
                )}

                {docType === 'lab_index' && (
                  <LabIndexTemplate data={labIndexData} />
                )}
              </div>
            </div>

            {/* Subtle Hover Expand Pill Indicator */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none no-print opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-slate-900/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 border border-slate-700">
                <Maximize2 className="w-3 h-3 text-emerald-400" />
                <span>Click document to expand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Small Preview / Expand Button for Mobile Devices */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden no-print shadow-xl rounded-xl">
        <SmallPreviewButton
          docType={docType}
          studentName={docType === 'lab_index' ? labIndexData.studentName : coverData.studentName}
          courseCode={docType === 'lab_index' ? labIndexData.courseCode : coverData.courseCode}
          groupNumber={docType === 'lab_index' ? labIndexData.groupNumber : (coverData.groupNumber || coverData.labGroup)}
          onClick={() => setIsExpandedPreviewOpen(true)}
        />
      </div>

      {/* Confirmation & Profile Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />

      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onApplyProfile={handleApplyProfile}
        onNotify={onNotify}
      />

      {/* Large Expanded Document Preview Modal */}
      <ExpandedPreviewModal
        isOpen={isExpandedPreviewOpen}
        onClose={() => setIsExpandedPreviewOpen(false)}
        docType={docType}
        coverData={coverData}
        labIndexData={labIndexData}
        onExportPDF={handleExportPDF}
        onExportImage={handleExportImage}
        onPrint={handlePrint}
      />
    </div>
  );
};
