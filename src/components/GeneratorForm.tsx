import React, { useRef } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  GraduationCap,
  Sparkles,
  RotateCcw,
  UserCheck,
  Building,
  Layers,
  Palette,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { CoverFormData, FormErrors } from '../types';
import {
  DIU_FACULTIES,
  ALL_DEPARTMENTS,
  INSTRUCTOR_DESIGNATIONS,
  SEMESTER_OPTIONS,
  LEVEL_TERM_OPTIONS,
  SAMPLE_ASSIGNMENT,
  SAMPLE_LAB_REPORT,
  SAMPLE_FINAL_LAB_REPORT
} from '../data/diuData';
import { SmallPreviewButton } from './SmallPreviewButton';
import {
  getMaxPerformanceDate,
  handleSubmissionDateChange,
  isPerformanceDateValid
} from '../utils/dateValidation';

interface GeneratorFormProps {
  data: CoverFormData;
  onChange: (data: CoverFormData) => void;
  errors: FormErrors;
  onNotify: (type: 'success' | 'info' | 'warning' | 'error', message: string, title?: string) => void;
  onOpenResetModal: () => void;
  onOpenProfileModal: () => void;
  onOpenExpandedPreview?: () => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  data,
  onChange,
  errors,
  onNotify,
  onOpenResetModal,
  onOpenProfileModal,
  onOpenExpandedPreview
}) => {
  const isAssignment = data.docType === 'assignment';
  const isLabReport = data.docType === 'lab_report';
  const isFinalLab = data.docType === 'final_lab_report';

  const maxPerformanceDate = getMaxPerformanceDate(data.submissionDate);

  // Handle Submission Date changes with strict DIU revalidation rule
  const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubDate = e.target.value;
    const { newPerformanceDate, wasCleared, message } = handleSubmissionDateChange(
      newSubDate,
      data.performanceDate
    );

    if (wasCleared && message) {
      onNotify('warning', message, 'Date Revalidated');
    }

    onChange({
      ...data,
      submissionDate: newSubDate,
      performanceDate: newPerformanceDate
    });
  };

  // Handle Performance Date changes with validation
  const handlePerformanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPerfDate = e.target.value;
    const validation = isPerformanceDateValid(newPerfDate, data.submissionDate);

    if (!validation.isValid && validation.reason) {
      onNotify('error', validation.reason, 'Invalid Performance Date');
      return;
    }

    onChange({
      ...data,
      performanceDate: newPerfDate
    });
  };

  // Quick preset loading
  const handleLoadSample = () => {
    if (isAssignment) {
      onChange({ ...SAMPLE_ASSIGNMENT });
    } else if (isLabReport) {
      onChange({ ...SAMPLE_LAB_REPORT });
    } else {
      onChange({ ...SAMPLE_FINAL_LAB_REPORT });
    }
    onNotify('success', 'Loaded official DIU sample course & student information.', 'Sample Data Loaded');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-7 no-print">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Fill DIU Sample Data
          </button>
          <button
            type="button"
            onClick={onOpenProfileModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600" />
            My Saved Profile
          </button>
          {onOpenExpandedPreview && (
            <SmallPreviewButton
              docType={data.docType}
              studentName={data.studentName}
              courseCode={data.courseCode}
              groupNumber={data.groupNumber || data.labGroup}
              onClick={onOpenExpandedPreview}
            />
          )}
        </div>

        <button
          type="button"
          onClick={onOpenResetModal}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Form
        </button>
      </div>

      {/* ================= 1. UNIVERSITY INFORMATION ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <Building className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            University & Faculty
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              University Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.universityName}
              onChange={(e) => onChange({ ...data, universityName: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.universityName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.universityName && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.universityName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Faculty
            </label>
            <select
              value={data.faculty}
              onChange={(e) => onChange({ ...data, faculty: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Faculty (Optional)</option>
              {DIU_FACULTIES.map((fac) => (
                <option key={fac.name} value={fac.name}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.department}
              onChange={(e) => onChange({ ...data, department: e.target.value, studentDepartment: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                errors.department ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            >
              <option value="">Select Department</option>
              {ALL_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.department}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= 2. COURSE & TOPIC INFORMATION ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            {isAssignment
              ? 'Assignment Details'
              : isFinalLab
              ? 'Final Lab Report Details'
              : 'Lab Report Details'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. CSE 221"
              value={data.courseCode}
              onChange={(e) => onChange({ ...data, courseCode: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.courseCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.courseCode && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.courseCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Algorithms"
              value={data.courseTitle}
              onChange={(e) => onChange({ ...data, courseTitle: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.courseTitle ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.courseTitle && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.courseTitle}
              </p>
            )}
          </div>

          {/* Document Specific Fields */}
          {isAssignment && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assignment No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01 or 02"
                  value={data.assignmentNumber}
                  onChange={(e) => onChange({ ...data, assignmentNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design and Analysis of Algorithms"
                  value={data.assignmentTitle}
                  onChange={(e) => onChange({ ...data, assignmentTitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assignment Topic / Problem Statement
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Comparative Analysis of Dynamic Programming vs Greedy Method..."
                  value={data.assignmentTopic}
                  onChange={(e) => onChange({ ...data, assignmentTopic: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          {isLabReport && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lab Report No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 04"
                  value={data.labReportNumber}
                  onChange={(e) => onChange({ ...data, labReportNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Experiment No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 04"
                  value={data.experimentNumber}
                  onChange={(e) => onChange({ ...data, experimentNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name of Experiment
                </label>
                <input
                  type="text"
                  placeholder="e.g. Verification of Kirchhoff's Laws / Dijkstra's Algorithm"
                  value={data.experimentName}
                  onChange={(e) => onChange({ ...data, experimentName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Laboratory Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electrical Circuits Laboratory / Software Sessional Lab"
                  value={data.labName}
                  onChange={(e) => onChange({ ...data, labName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          {isFinalLab && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Laboratory Name
              </label>
              <input
                type="text"
                placeholder="e.g. Database Management Systems Laboratory"
                value={data.labName}
                onChange={(e) => onChange({ ...data, labName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Semester
            </label>
            <select
              value={data.semester}
              onChange={(e) => onChange({ ...data, semester: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Semester (Optional)</option>
              {SEMESTER_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Academic Year
            </label>
            <input
              type="text"
              placeholder="e.g. 2026-2027"
              value={data.academicYear}
              onChange={(e) => onChange({ ...data, academicYear: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* ================= 3. SUBMITTED TO (INSTRUCTOR) ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Submitted To (Instructor)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instructor Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Md. Ismail Jabiullah"
              value={data.instructorName}
              onChange={(e) => onChange({ ...data, instructorName: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.instructorName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.instructorName && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.instructorName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designation
            </label>
            <select
              value={data.instructorDesignation}
              onChange={(e) => onChange({ ...data, instructorDesignation: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Designation (Optional)</option>
              {INSTRUCTOR_DESIGNATIONS.map((des) => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instructor Department
            </label>
            <select
              value={data.instructorDepartment}
              onChange={(e) => onChange({ ...data, instructorDepartment: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Department (Optional)</option>
              {ALL_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ================= 4. SUBMITTED BY (STUDENT) ================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <User className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Submitted By (Student)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Shahrear Ahmed"
              value={data.studentName}
              onChange={(e) => onChange({ ...data, studentName: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.studentName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.studentName && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.studentName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 221-15-4982"
              value={data.studentId}
              onChange={(e) => onChange({ ...data, studentId: e.target.value })}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.studentId ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.studentId && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.studentId}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Section
            </label>
            <input
              type="text"
              placeholder="e.g. 60_B"
              value={data.section}
              onChange={(e) => onChange({ ...data, section: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Batch
            </label>
            <input
              type="text"
              placeholder="e.g. 60th"
              value={data.batch}
              onChange={(e) => onChange({ ...data, batch: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Department
            </label>
            <select
              value={data.studentDepartment}
              onChange={(e) => onChange({ ...data, studentDepartment: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Department</option>
              {ALL_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Level-Term
            </label>
            <select
              value={data.levelTerm || ''}
              onChange={(e) => onChange({ ...data, levelTerm: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select Level-Term (Optional)</option>
              {LEVEL_TERM_OPTIONS.map((lt) => (
                <option key={lt} value={lt}>{lt}</option>
              ))}
            </select>
          </div>

          {/* Group Number optional field for all cover page types (displays top-right of cover page) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Group Number <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 03"
              value={data.groupNumber || data.labGroup || ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  groupNumber: e.target.value,
                  labGroup: e.target.value
                })
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appears at top-right of the cover page
            </p>
          </div>

          {isLabReport && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Group Members <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 221-15-4982, 221-15-4985..."
                value={data.groupMembers || ''}
                onChange={(e) => onChange({ ...data, groupMembers: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>
      </section>

      {/* ================= 5. CRITICAL DATE INFORMATION ================= */}
      <section className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Date Information
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 italic">
            {isAssignment ? 'Submission Date Required' : 'Strict DIU Sequence'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Submission Date (Must be selected first!) */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Submission Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={data.submissionDate}
              onChange={handleSubmissionChange}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                errors.submissionDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.submissionDate ? (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.submissionDate}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">
                When the document is submitted to the teacher
              </p>
            )}
          </div>

          {/* Performance Date (Only for Lab Report & Final Lab Report) */}
          {!isAssignment && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-800">
                  Performance Date <span className="text-xs font-normal text-slate-500">(Optional)</span>
                </label>
                {data.performanceDate && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, performanceDate: '' })}
                    className="text-[11px] text-slate-500 hover:text-rose-600 cursor-pointer"
                  >
                    Clear Date
                  </button>
                )}
              </div>

              {/* Disabled until Submission Date is chosen */}
              <input
                type="date"
                value={data.performanceDate}
                onChange={handlePerformanceChange}
                disabled={!data.submissionDate}
                max={maxPerformanceDate}
                className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 ${
                  !data.submissionDate
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white border-slate-300'
                }`}
              />

              {!data.submissionDate ? (
                <p className="text-[11px] text-amber-700 font-medium mt-1">
                  Select the submission date first.
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 mt-1">
                  Must be earlier than submission date (max: {maxPerformanceDate})
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= 6. DOCUMENT STYLING CONTROLS ================= */}
      <section className="space-y-4 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <Palette className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Document Styling & Border
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Border Style
            </label>
            <select
              value={data.borderStyle}
              onChange={(e) => onChange({ ...data, borderStyle: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="classic_double">Classic DIU Double Border</option>
              <option value="clean_box">Modern Clean Box Border</option>
              <option value="formal_accent">Top & Bottom Accent Border</option>
              <option value="minimal">Plain / Borderless Margin</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Typography Font
            </label>
            <select
              value={data.fontStyle}
              onChange={(e) => onChange({ ...data, fontStyle: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="merriweather">Academic Serif (Merriweather)</option>
              <option value="lora">Classic Editorial (Lora)</option>
              <option value="inter">Clean Modern (Inter Sans)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={data.showLogo}
                onChange={(e) => onChange({ ...data, showLogo: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              Show DIU Logo
            </label>

            {data.showLogo && (
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.logoColor}
                  onChange={(e) => onChange({ ...data, logoColor: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                Color Logo
              </label>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
