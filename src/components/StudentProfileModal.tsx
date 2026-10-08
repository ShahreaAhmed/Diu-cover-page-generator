import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, Trash2, Save, X } from 'lucide-react';
import { StudentProfile } from '../types';
import { getSavedStudentProfile, saveStudentProfile, clearSavedStudentProfile } from '../utils/storage';
import { ALL_DEPARTMENTS, SEMESTER_OPTIONS, LEVEL_TERM_OPTIONS } from '../data/diuData';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile: (profile: StudentProfile) => void;
  onNotify: (type: 'success' | 'info' | 'warning' | 'error', message: string, title?: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onApplyProfile,
  onNotify
}) => {
  const [profile, setProfile] = useState<StudentProfile>({
    studentName: '',
    studentId: '',
    department: 'Department of Computer Science & Engineering (CSE)',
    faculty: 'Faculty of Science & Information Technology (FSIT)',
    section: '',
    batch: '',
    semester: 'Fall 2026',
    levelTerm: 'Level 2, Term 3'
  });

  const [hasSavedData, setHasSavedData] = useState<boolean>(false);
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedStudentProfile();
      if (saved) {
        setProfile(saved);
        setHasSavedData(true);
      } else {
        setHasSavedData(false);
      }
      setConfirmClear(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!profile.studentName.trim() && !profile.studentId.trim()) {
      onNotify('warning', 'Please provide at least your Student Name or ID before saving.', 'Empty Profile');
      return;
    }
    const success = saveStudentProfile(profile);
    if (success) {
      setHasSavedData(true);
      onNotify('success', 'Your student details were saved on this device (LocalStorage).', 'Profile Saved');
      onApplyProfile(profile);
      onClose();
    } else {
      onNotify('error', 'Unable to save to browser storage.', 'Error');
    }
  };

  const handleApply = () => {
    onApplyProfile(profile);
    onNotify('success', 'Applied your saved profile to the active document form.', 'Profile Applied');
    onClose();
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearSavedStudentProfile();
    setHasSavedData(false);
    setProfile({
      studentName: '',
      studentId: '',
      department: 'Department of Computer Science & Engineering (CSE)',
      faculty: 'Faculty of Science & Information Technology (FSIT)',
      section: '',
      batch: '',
      semester: 'Fall 2026',
      levelTerm: 'Level 2, Term 3'
    });
    setConfirmClear(false);
    onNotify('info', 'Your saved student information was cleared from this device.', 'Profile Removed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs no-print">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="profile-modal-title" className="text-base font-bold">
                Save My Academic Information
              </h3>
              <p className="text-xs text-slate-300">
                Auto-fill all your cover pages with 1 click
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.studentName}
                onChange={(e) => setProfile({ ...profile, studentName: e.target.value })}
                placeholder="e.g. Shahrear Ahmed"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                value={profile.studentId}
                onChange={(e) => setProfile({ ...profile, studentId: e.target.value })}
                placeholder="e.g. 221-15-4982"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Section
              </label>
              <input
                type="text"
                value={profile.section}
                onChange={(e) => setProfile({ ...profile, section: e.target.value })}
                placeholder="e.g. 60_B"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Batch
              </label>
              <input
                type="text"
                value={profile.batch}
                onChange={(e) => setProfile({ ...profile, batch: e.target.value })}
                placeholder="e.g. 60th"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={profile.semester}
                onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                {SEMESTER_OPTIONS.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Department
              </label>
              <select
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                {ALL_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Level-Term
              </label>
              <select
                value={profile.levelTerm || ''}
                onChange={(e) => setProfile({ ...profile, levelTerm: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="">None / Not Applicable</option>
                {LEVEL_TERM_OPTIONS.map((lt) => (
                  <option key={lt} value={lt}>{lt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>100% Client-Side Privacy:</strong> Your information is stored securely in your browser's LocalStorage and is never transmitted to any external server.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {hasSavedData ? (
            confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-700 font-semibold">Confirm clear?</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md cursor-pointer"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Saved Profile
              </button>
            )
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5 ml-auto">
            {hasSavedData && (
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Apply to Form
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save on This Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
