import { CoverFormData, LabIndexFormData } from '../types';

export const DIU_FACULTIES = [
  {
    name: 'Faculty of Science & Information Technology (FSIT)',
    departments: [
      'Department of Computer Science & Engineering (CSE)',
      'Department of Software Engineering (SWE)',
      'Department of Information Technology & Management (ITM)',
      'Department of Computing & Information System (CIS)',
      'Department of General Educational Development (GED)'
    ]
  },
  {
    name: 'Faculty of Engineering (FE)',
    departments: [
      'Department of Electrical & Electronic Engineering (EEE)',
      'Department of Civil Engineering (CE)',
      'Department of Textile Engineering (TE)',
      'Department of Architecture (Arch)',
      'Department of Environmental Science & Disaster Management (ESDM)'
    ]
  },
  {
    name: 'Faculty of Business & Entrepreneurship (FBE)',
    departments: [
      'Department of Business Administration (BBA)',
      'Department of Real Estate',
      'Department of Tourism & Hospitality Management',
      'Department of Innovation & Entrepreneurship'
    ]
  },
  {
    name: 'Faculty of Humanities & Social Science (FHSS)',
    departments: [
      'Department of English',
      'Department of Law',
      'Department of Journalism, Media and Communication (JMC)',
      'Department of Development Studies'
    ]
  },
  {
    name: 'Faculty of Health & Life Sciences (FHLS)',
    departments: [
      'Department of Pharmacy',
      'Department of Public Health',
      'Department of Nutrition and Food Engineering (NFE)',
      'Department of Agricultural Science'
    ]
  }
];

export const ALL_DEPARTMENTS = DIU_FACULTIES.flatMap(f => f.departments);

export const INSTRUCTOR_DESIGNATIONS = [
  'Professor & Head',
  'Professor',
  'Associate Professor & Head',
  'Associate Professor',
  'Assistant Professor & Head',
  'Assistant Professor',
  'Senior Lecturer',
  'Lecturer',
  'Adjunct Faculty',
  'Teaching Assistant (TA)',
  'Lab Facilitator'
];

export const SEMESTER_OPTIONS = [
  'Spring 2026',
  'Summer 2026',
  'Fall 2026',
  'Spring 2027',
  'Summer 2027',
  'Fall 2027'
];

export const LEVEL_TERM_OPTIONS = [
  'Level 1, Term 1',
  'Level 1, Term 2',
  'Level 1, Term 3',
  'Level 2, Term 1',
  'Level 2, Term 2',
  'Level 2, Term 3',
  'Level 3, Term 1',
  'Level 3, Term 2',
  'Level 3, Term 3',
  'Level 4, Term 1',
  'Level 4, Term 2',
  'Level 4, Term 3'
];

export const SAMPLE_ASSIGNMENT: CoverFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science and Engineering',
  docType: 'assignment',
  assignmentNumber: '',
  assignmentTitle: '',
  assignmentTopic: 'Cause and Effect Paragraph Assignment',
  labReportNumber: '',
  experimentNumber: '',
  experimentName: '',
  labName: '',
  courseCode: 'CSE124',
  courseTitle: 'Data Structure',
  semester: 'Fall 2026 (3rd)',
  academicYear: '2026-2027',
  instructorName: 'Md Jakaria Zobair',
  instructorDesignation: 'Lecturer (Senior Scale)',
  instructorDepartment: 'Department of Computer Science and Engineering',
  studentName: 'Shahrea Ahmed',
  studentId: '261-15-391',
  section: '71_A',
  batch: '71st',
  groupNumber: '03',
  studentDepartment: 'Department of Computer Science and Engineering',
  levelTerm: '',
  submissionDate: '2026-10-08',
  performanceDate: '',
  borderStyle: 'clean_box',
  fontStyle: 'inter',
  showLogo: true,
  logoColor: true,
  dateFormat: 'slash'
};

export const SAMPLE_LAB_REPORT: CoverFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science and Engineering',
  docType: 'lab_report',
  assignmentNumber: '',
  assignmentTitle: '',
  assignmentTopic: '',
  labReportNumber: '',
  experimentNumber: '04',
  experimentName: 'Basic operation on link list using function',
  labName: 'Data Structure Lab',
  courseCode: 'CSE124',
  courseTitle: 'Data Structure Lab',
  semester: 'Fall 2026 (3rd)',
  academicYear: '2026-2027',
  instructorName: 'Md Jakaria Zobair',
  instructorDesignation: 'Lecturer (Senior Scale)',
  instructorDepartment: 'Department of Computer Science and Engineering',
  studentName: 'Shahrea Ahmed',
  studentId: '261-15-391',
  section: '71_A',
  batch: '71st',
  groupNumber: '03',
  studentDepartment: 'Department of Computer Science and Engineering',
  levelTerm: '',
  labGroup: 'Group 03',
  groupMembers: '',
  submissionDate: '2026-10-08',
  performanceDate: '',
  borderStyle: 'clean_box',
  fontStyle: 'inter',
  showLogo: true,
  logoColor: true,
  dateFormat: 'slash'
};

export const SAMPLE_FINAL_LAB_REPORT: CoverFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science and Engineering',
  docType: 'final_lab_report',
  assignmentNumber: '',
  assignmentTitle: '',
  assignmentTopic: '',
  labReportNumber: '',
  experimentNumber: '',
  experimentName: '',
  labName: 'Data Structure Lab',
  courseCode: 'CSE124',
  courseTitle: 'Data Structure Lab',
  semester: 'Fall 2026 (3rd)',
  academicYear: '2026-2027',
  instructorName: 'Md Jakaria Zobair',
  instructorDesignation: 'Lecturer (Senior Scale)',
  instructorDepartment: 'Department of Computer Science and Engineering',
  studentName: 'Shahrea Ahmed',
  studentId: '261-15-391',
  section: '71_A',
  batch: '71st',
  groupNumber: '03',
  studentDepartment: 'Department of Computer Science and Engineering',
  levelTerm: '',
  submissionDate: '2026-10-08',
  performanceDate: '',
  borderStyle: 'clean_box',
  fontStyle: 'inter',
  showLogo: true,
  logoColor: true,
  dateFormat: 'slash'
};

export const SAMPLE_LAB_INDEX: LabIndexFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science and Engineering',
  courseTitle: 'Data Structure Lab',
  courseCode: 'CSE124',
  labName: 'Data Structure Lab',
  semester: 'Fall 2026 (3rd)',
  academicYear: '2026-2027',
  studentName: 'Shahrea Ahmed',
  studentId: '261-15-391',
  section: '71_A',
  batch: '71st',
  levelTerm: '',
  groupNumber: '03',
  instructorName: 'Md Jakaria Zobair',
  instructorDesignation: 'Lecturer (Senior Scale)',
  includePerformanceDate: false,
  dateFormat: 'slash',
  borderStyle: 'clean_box',
  fontStyle: 'inter',
  showLogo: true,
  logoColor: true,
  experiments: [
    {
      id: 'exp-1',
      sl: 1,
      experimentNo: '1',
      experimentName: 'sdafaf',
      performanceDate: '',
      submissionDate: '2026-10-09',
      pageNo: '3-7',
      remarks: ''
    },
    {
      id: 'exp-2',
      sl: 2,
      experimentNo: '2',
      experimentName: 'lsdfkgjld',
      performanceDate: '',
      submissionDate: '2026-10-08',
      pageNo: '3-5',
      remarks: ''
    }
  ]
};
