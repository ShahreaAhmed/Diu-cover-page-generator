import React from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  RotateCcw,
  UserCheck,
  Building,
  GraduationCap,
  Calendar,
  Layers,
  FileSpreadsheet,
  Maximize2
} from 'lucide-react';
import { LabIndexFormData, ExperimentItem } from '../types';
import {
  ALL_DEPARTMENTS,
  INSTRUCTOR_DESIGNATIONS,
  SEMESTER_OPTIONS,
  LEVEL_TERM_OPTIONS,
  SAMPLE_LAB_INDEX
} from '../data/diuData';
import { SmallPreviewButton } from './SmallPreviewButton';
import {
  getMaxPerformanceDate,
  handleSubmissionDateChange,
  isPerformanceDateValid
} from '../utils/dateValidation';
import { paginateExperiments } from '../templates/LabIndexTemplate';

interface LabIndexFormProps {
  data: LabIndexFormData;
  onChange: (data: LabIndexFormData) => void;
  onNotify: (type: 'success' | 'info' | 'warning' | 'error', message: string, title?: string) => void;
  onOpenResetModal: () => void;
  onOpenProfileModal: () => void;
  onOpenExpandedPreview?: () => void;
}

export const LabIndexForm: React.FC<LabIndexFormProps> = ({
  data,
  onChange,
  onNotify,
  onOpenResetModal,
  onOpenProfileModal,
  onOpenExpandedPreview
}) => {
  const pages = paginateExperiments(data.experiments);
  const totalPages = pages.length;

  const handleAddExperiment = () => {
    const nextSl = data.experiments.length + 1;
    const newExp: ExperimentItem = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sl: nextSl,
      experimentNo: `Exp ${nextSl < 10 ? `0${nextSl}` : nextSl}`,
      experimentName: '',
      performanceDate: '',
      submissionDate: '',
      pageNo: '',
      remarks: ''
    };
    onChange({
      ...data,
      experiments: [...data.experiments, newExp]
    });
    onNotify('info', `Added Experiment #${nextSl} to index.`, 'Row Added');
  };

  const handleRemoveExperiment = (id: string) => {
    if (data.experiments.length <= 1) {
      onNotify('warning', 'The index must contain at least one experiment.', 'Cannot Remove');
      return;
    }
    const filtered = data.experiments.filter((exp) => exp.id !== id);
    // Renumber SL
    const renumbered = filtered.map((exp, idx) => ({
      ...exp,
      sl: idx + 1
    }));
    onChange({
      ...data,
      experiments: renumbered
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const items = [...data.experiments];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    // Renumber
    const renumbered = items.map((exp, idx) => ({ ...exp, sl: idx + 1 }));
    onChange({ ...data, experiments: renumbered });
  };

  const handleMoveDown = (index: number) => {
    if (index === data.experiments.length - 1) return;
    const items = [...data.experiments];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    // Renumber
    const renumbered = items.map((exp, idx) => ({ ...exp, sl: idx + 1 }));
    onChange({ ...data, experiments: renumbered });
  };

  const handleExperimentFieldChange = (
    id: string,
    field: keyof ExperimentItem,
    value: string
  ) => {
    const updated = data.experiments.map((exp) => {
      if (exp.id !== id) return exp;

      if (field === 'submissionDate') {
        const { newPerformanceDate, wasCleared } = handleSubmissionDateChange(
          value,
          exp.performanceDate
        );
        if (wasCleared) {
          onNotify(
            'warning',
            `Row ${exp.sl}: Performance Date cleared because it must be earlier than Submission Date.`
          );
        }
        return {
          ...exp,
          submissionDate: value,
          performanceDate: newPerformanceDate
        };
      }

      if (field === 'performanceDate') {
        const val = isPerformanceDateValid(value, exp.submissionDate);
        if (!val.isValid && val.reason) {
          onNotify('error', `Row ${exp.sl}: ${val.reason}`);
          return exp;
        }
        return { ...exp, performanceDate: value };
      }

      return { ...exp, [field]: value };
    });

    onChange({ ...data, experiments: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-7 no-print">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onChange({ ...SAMPLE_LAB_INDEX });
              onNotify('success', 'Loaded complete DIU Computer Networks Lab Index sample.', 'Sample Data Loaded');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Fill Sample DIU Experiments (7 Rows)
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
              docType="lab_index"
              studentName={data.studentName}
              courseCode={data.courseCode}
              groupNumber={data.groupNumber}
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
          Reset Index
        </button>
      </div>

      {/* Meta Information Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <Building className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Course & Laboratory Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Code *
            </label>
            <input
              type="text"
              value={data.courseCode}
              onChange={(e) => onChange({ ...data, courseCode: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              value={data.courseTitle}
              onChange={(e) => onChange({ ...data, courseTitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Laboratory Name
            </label>
            <input
              type="text"
              value={data.labName}
              onChange={(e) => onChange({ ...data, labName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Department
            </label>
            <select
              value={data.department}
              onChange={(e) => onChange({ ...data, department: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {ALL_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Semester
            </label>
            <select
              value={data.semester}
              onChange={(e) => onChange({ ...data, semester: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {SEMESTER_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Student Meta */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Student & Teacher Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Name *
            </label>
            <input
              type="text"
              value={data.studentName}
              onChange={(e) => onChange({ ...data, studentName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student ID *
            </label>
            <input
              type="text"
              value={data.studentId}
              onChange={(e) => onChange({ ...data, studentId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Section & Batch
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Sec: 60_B"
                value={data.section}
                onChange={(e) => onChange({ ...data, section: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Batch: 60th"
                value={data.batch}
                onChange={(e) => onChange({ ...data, batch: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Group Number <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 03"
              value={data.groupNumber || ''}
              onChange={(e) => onChange({ ...data, groupNumber: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appears at top-right of the index cover page
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teacher / Instructor Name <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.instructorName}
              onChange={(e) => onChange({ ...data, instructorName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* ================= EXPERIMENTS TABLE BUILDER ================= */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Experiments Table ({data.experiments.length} Items)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              {totalPages} A4 {totalPages === 1 ? 'Page' : 'Pages'}
            </span>
            <button
              type="button"
              onClick={handleAddExperiment}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Experiment
            </button>
          </div>
        </div>

        {/* Optional Performance Date Toggle on Index Cover Page */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="flex items-start sm:items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(data.includePerformanceDate)}
              onChange={(e) =>
                onChange({
                  ...data,
                  includePerformanceDate: e.target.checked
                })
              }
              className="w-4 h-4 mt-0.5 sm:mt-0 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
            />
            <div>
              <span className="text-xs font-bold text-slate-800">
                Include Performance Date Column
              </span>
              <p className="text-[11px] text-slate-500">
                Optional: Unchecked by default (hides performance date on index cover page).
              </p>
            </div>
          </label>
          <span
            className={`self-start sm:self-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              data.includePerformanceDate
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {data.includePerformanceDate ? 'Perf. & Sub. Dates' : 'Single Date Column'}
          </span>
        </div>

        {/* Dynamic Rows */}
        <div className="space-y-3.5">
          {data.experiments.map((exp, index) => {
            const maxPerfDate = getMaxPerformanceDate(exp.submissionDate);

            return (
              <div
                key={exp.id}
                className="p-3.5 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors space-y-3"
              >
                {/* Row Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                      {exp.sl}
                    </span>
                    <input
                      type="text"
                      value={exp.experimentNo}
                      onChange={(e) => handleExperimentFieldChange(exp.id, 'experimentNo', e.target.value)}
                      placeholder={`Exp ${exp.sl}`}
                      className="w-24 px-2 py-1 text-xs font-semibold bg-white border border-slate-300 rounded outline-none"
                    />
                  </div>

                  {/* Ordering & Delete Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-slate-200 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === data.experiments.length - 1}
                      className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-slate-200 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperiment(exp.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 cursor-pointer ml-1"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Experiment Name */}
                <div>
                  <input
                    type="text"
                    value={exp.experimentName}
                    onChange={(e) => handleExperimentFieldChange(exp.id, 'experimentName', e.target.value)}
                    placeholder="Name of the Experiment (e.g. Implementation of Dijkstra's Shortest Path...)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>

                {/* Dates & Page No */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Submission Date *
                    </label>
                    <input
                      type="date"
                      value={exp.submissionDate}
                      onChange={(e) => handleExperimentFieldChange(exp.id, 'submissionDate', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Performance Date <span className="text-[10px] text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={exp.performanceDate}
                      onChange={(e) => handleExperimentFieldChange(exp.id, 'performanceDate', e.target.value)}
                      disabled={!exp.submissionDate}
                      max={maxPerfDate}
                      className={`w-full px-2 py-1 text-xs border rounded outline-none ${
                        !exp.submissionDate
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-white border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Page No.
                    </label>
                    <input
                      type="text"
                      value={exp.pageNo}
                      onChange={(e) => handleExperimentFieldChange(exp.id, 'pageNo', e.target.value)}
                      placeholder="e.g. 01 - 06"
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Remarks / Signature
                    </label>
                    <input
                      type="text"
                      value={exp.remarks || ''}
                      onChange={(e) => handleExperimentFieldChange(exp.id, 'remarks', e.target.value)}
                      placeholder="Verified / OK"
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom add button */}
        <button
          type="button"
          onClick={handleAddExperiment}
          className="w-full py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-dashed border-emerald-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Another Experiment Row
        </button>
      </section>
    </div>
  );
};
