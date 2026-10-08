import { StudentProfile } from '../types';

const STORAGE_KEY = 'diu_saved_student_profile_v1';
const PREFERENCES_KEY = 'diu_app_preferences_v1';

export function getSavedStudentProfile(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudentProfile;
  } catch (err) {
    console.error('Failed to read saved profile from localStorage', err);
    return null;
  }
}

export function saveStudentProfile(profile: Partial<StudentProfile>): boolean {
  try {
    const existing = getSavedStudentProfile() || {
      studentName: '',
      studentId: '',
      department: '',
      faculty: '',
      section: '',
      batch: '',
      semester: '',
      levelTerm: ''
    };

    const updated: StudentProfile = {
      ...existing,
      ...profile
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
    return false;
  }
}

export function clearSavedStudentProfile(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to remove profile from localStorage', err);
    return false;
  }
}
