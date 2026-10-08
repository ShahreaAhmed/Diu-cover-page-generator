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
  department: 'Department of Computer Science & Engineering (CSE)',
  docType: 'assignment',
  assignmentNumber: '02',
  assignmentTitle: 'Design and Analysis of Algorithms',
  assignmentTopic: 'Comparative Analysis of Dynamic Programming vs Greedy Method in Network Optimization',
  labReportNumber: '',
  experimentNumber: '',
  experimentName: '',
  labName: '',
  courseCode: 'CSE 221',
  courseTitle: 'Algorithms',
  semester: 'Fall 2026',
  academicYear: '2026-2027',
  instructorName: 'Dr. Md. Ismail Jabiullah',
  instructorDesignation: 'Professor',
  instructorDepartment: 'Department of Computer Science & Engineering (CSE)',
  studentName: 'Shahrear Ahmed',
  studentId: '221-15-4982',
  section: '60_B',
  batch: '60th',
  studentDepartment: 'Department of Computer Science & Engineering (CSE)',
  levelTerm: 'Level 2, Term 3',
  submissionDate: '2026-10-25',
  performanceDate: '',
  borderStyle: 'classic_double',
  fontStyle: 'merriweather',
  showLogo: true,
  logoColor: true
};

export const SAMPLE_LAB_REPORT: CoverFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science & Engineering (CSE)',
  docType: 'lab_report',
  assignmentNumber: '',
  assignmentTitle: '',
  assignmentTopic: '',
  labReportNumber: '04',
  experimentNumber: '04',
  experimentName: 'Implementation of Dijkstra\'s Shortest Path Algorithm in C++',
  labName: 'Algorithms Sessional Laboratory',
  courseCode: 'CSE 222',
  courseTitle: 'Algorithms Laboratory',
  semester: 'Fall 2026',
  academicYear: '2026-2027',
  instructorName: 'Syed Akhter Hossain',
  instructorDesignation: 'Senior Lecturer',
  instructorDepartment: 'Department of Computer Science & Engineering (CSE)',
  studentName: 'Shahrear Ahmed',
  studentId: '221-15-4982',
  section: '60_B',
  batch: '60th',
  studentDepartment: 'Department of Computer Science & Engineering (CSE)',
  levelTerm: 'Level 2, Term 3',
  labGroup: 'Group 03',
  groupMembers: '',
  submissionDate: '2026-10-28',
  performanceDate: '2026-10-21',
  borderStyle: 'classic_double',
  fontStyle: 'merriweather',
  showLogo: true,
  logoColor: true
};

export const SAMPLE_FINAL_LAB_REPORT: CoverFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science & Engineering (CSE)',
  docType: 'final_lab_report',
  assignmentNumber: '',
  assignmentTitle: '',
  assignmentTopic: '',
  labReportNumber: 'Final',
  experimentNumber: '',
  experimentName: '',
  labName: 'Database Management Systems Laboratory',
  courseCode: 'CSE 312',
  courseTitle: 'Database Management Systems Lab',
  semester: 'Fall 2026',
  academicYear: '2026-2027',
  instructorName: 'Fahmida Akhtar',
  instructorDesignation: 'Assistant Professor',
  instructorDepartment: 'Department of Computer Science & Engineering (CSE)',
  studentName: 'Shahrear Ahmed',
  studentId: '221-15-4982',
  section: '60_B',
  batch: '60th',
  studentDepartment: 'Department of Computer Science & Engineering (CSE)',
  levelTerm: 'Level 3, Term 1',
  submissionDate: '2026-11-15',
  performanceDate: '2026-11-08',
  borderStyle: 'classic_double',
  fontStyle: 'merriweather',
  showLogo: true,
  logoColor: true
};

export const SAMPLE_LAB_INDEX: LabIndexFormData = {
  universityName: 'Daffodil International University',
  faculty: 'Faculty of Science & Information Technology (FSIT)',
  department: 'Department of Computer Science & Engineering (CSE)',
  courseTitle: 'Data Communication and Computer Networks Lab',
  courseCode: 'CSE 324',
  labName: 'Networking & Telecommunications Lab',
  semester: 'Fall 2026',
  academicYear: '2026-2027',
  studentName: 'Shahrear Ahmed',
  studentId: '221-15-4982',
  section: '60_B',
  batch: '60th',
  levelTerm: 'Level 3, Term 2',
  instructorName: 'Md. Maruf Hassan',
  instructorDesignation: 'Assistant Professor',
  borderStyle: 'classic_double' as const,
  fontStyle: 'merriweather' as const,
  showLogo: true,
  logoColor: true,
  experiments: [
    {
      id: 'exp-1',
      sl: 1,
      experimentNo: 'Exp 01',
      experimentName: 'Study of different network cables, crimping tools and RJ-45 connector fabrication',
      performanceDate: '2026-09-10',
      submissionDate: '2026-09-17',
      pageNo: '01 - 06',
      remarks: 'Verified'
    },
    {
      id: 'exp-2',
      sl: 2,
      experimentNo: 'Exp 02',
      experimentName: 'Configuring Peer-to-Peer Local Area Network (LAN) using Cisco Packet Tracer',
      performanceDate: '2026-09-18',
      submissionDate: '2026-09-25',
      pageNo: '07 - 13',
      remarks: 'Verified'
    },
    {
      id: 'exp-3',
      sl: 3,
      experimentNo: 'Exp 03',
      experimentName: 'Implementation of Star and Bus Topology with IP Subnetting (IPv4)',
      performanceDate: '2026-09-26',
      submissionDate: '2026-10-03',
      pageNo: '14 - 21',
      remarks: 'Verified'
    },
    {
      id: 'exp-4',
      sl: 4,
      experimentNo: 'Exp 04',
      experimentName: 'Configuring DHCP and DNS Server on Cisco Packet Tracer simulation network',
      performanceDate: '2026-10-05',
      submissionDate: '2026-10-12',
      pageNo: '22 - 29',
      remarks: 'Verified'
    },
    {
      id: 'exp-5',
      sl: 5,
      experimentNo: 'Exp 05',
      experimentName: 'Static Routing Configuration between two separate Local Area Networks',
      performanceDate: '2026-10-14',
      submissionDate: '2026-10-21',
      pageNo: '30 - 37',
      remarks: 'Verified'
    },
    {
      id: 'exp-6',
      sl: 6,
      experimentNo: 'Exp 06',
      experimentName: 'Dynamic Routing Configuration using Routing Information Protocol (RIP v2)',
      performanceDate: '2026-10-23',
      submissionDate: '2026-10-30',
      pageNo: '38 - 45',
      remarks: 'Verified'
    },
    {
      id: 'exp-7',
      sl: 7,
      experimentNo: 'Exp 07',
      experimentName: 'Configuration of Virtual Local Area Network (VLAN) and Inter-VLAN Routing',
      performanceDate: '',
      submissionDate: '2026-11-06',
      pageNo: '46 - 52',
      remarks: 'Submitted'
    }
  ]
};
