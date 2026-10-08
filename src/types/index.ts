export type DocumentType = 'assignment' | 'lab_report' | 'final_lab_report' | 'lab_index';

export type BorderStyle = 'classic_double' | 'clean_box' | 'formal_accent' | 'minimal';
export type FontStyle = 'merriweather' | 'inter' | 'lora';
export type ColorTheme = 'official_diu' | 'monochrome' | 'deep_navy';

export interface StudentProfile {
  studentName: string;
  studentId: string;
  department: string;
  faculty: string;
  section: string;
  batch: string;
  semester: string;
  levelTerm?: string;
}

export interface CoverFormData {
  // University
  universityName: string;
  faculty: string;
  department: string;

  // Assignment / Lab details
  docType: DocumentType;
  assignmentNumber: string; // e.g. "01" or "Assignment 01"
  assignmentTitle: string; // e.g. "Data Structures Implementation"
  assignmentTopic: string; // e.g. "Binary Search Trees & AVL Trees"
  
  labReportNumber: string; // e.g. "01" or "Lab Report 01"
  experimentNumber: string; // e.g. "03"
  experimentName: string; // e.g. "Verification of Kirchhoff's Current & Voltage Law"
  labName: string; // e.g. "Electrical Circuits Laboratory"

  courseCode: string; // e.g. "CSE 221"
  courseTitle: string; // e.g. "Algorithms"
  semester: string; // e.g. "Fall 2026"
  academicYear: string; // e.g. "2026-2027"

  // Submitted To
  instructorName: string;
  instructorDesignation: string;
  instructorDepartment: string;

  // Submitted By
  studentName: string;
  studentId: string;
  section: string;
  batch: string;
  studentDepartment: string;
  levelTerm: string;
  groupNumber?: string; // Optional group number (e.g. "03" or "05")
  labGroup?: string;
  groupMembers?: string;

  // Dates
  submissionDate: string; // YYYY-MM-DD
  performanceDate: string; // YYYY-MM-DD (optional, earlier than submissionDate)
  dateFormat?: 'slash' | 'formal'; // 'slash' = DD/MM/YYYY, 'formal' = DD Month YYYY

  // Styling
  borderStyle: BorderStyle;
  fontStyle: FontStyle;
  showLogo: boolean;
  logoColor: boolean; // true = colored, false = grayscale
}

export interface ExperimentItem {
  id: string;
  sl: number;
  experimentNo: string;
  experimentName: string;
  performanceDate: string;
  submissionDate: string;
  pageNo: string;
  remarks?: string;
}

export interface LabIndexFormData {
  universityName: string;
  faculty: string;
  department: string;
  courseTitle: string;
  courseCode: string;
  labName: string;
  semester: string;
  academicYear: string;

  studentName: string;
  studentId: string;
  section: string;
  batch: string;
  levelTerm: string;
  groupNumber?: string; // Optional group number (e.g. "03")

  instructorName: string;
  instructorDesignation: string;

  includePerformanceDate?: boolean; // Whether to show performance date column on index cover page
  dateFormat?: 'slash' | 'formal';

  experiments: ExperimentItem[];

  borderStyle: BorderStyle;
  fontStyle: FontStyle;
  showLogo: boolean;
  logoColor: boolean;
}

export interface FormErrors {
  [key: string]: string;
}
