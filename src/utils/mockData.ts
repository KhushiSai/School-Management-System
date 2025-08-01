import { Student, Teacher, Admin, Grade, Attendance, FeeTransaction, Assignment } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    email: 'john.doe@student.school.com',
    name: 'John Doe',
    role: 'student',
    studentId: 'STU001',
    class: '10th Grade',
    section: 'A',
    rollNumber: '001',
    parentContact: '+1234567890',
    dateOfBirth: '2006-05-15',
    address: '123 Main St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    email: 'jane.smith@student.school.com',
    name: 'Jane Smith',
    role: 'student',
    studentId: 'STU002',
    class: '10th Grade',
    section: 'A',
    rollNumber: '002',
    parentContact: '+1234567891',
    dateOfBirth: '2006-08-22',
    address: '456 Oak Ave, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    email: 'mike.johnson@student.school.com',
    name: 'Mike Johnson',
    role: 'student',
    studentId: 'STU003',
    class: '11th Grade',
    section: 'B',
    rollNumber: '003',
    parentContact: '+1234567892',
    dateOfBirth: '2005-12-10',
    address: '789 Pine St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '4',
    email: 'sarah.wilson@student.school.com',
    name: 'Sarah Wilson',
    role: 'student',
    studentId: 'STU004',
    class: '11th Grade',
    section: 'A',
    rollNumber: '004',
    parentContact: '+1234567893',
    dateOfBirth: '2005-09-18',
    address: '321 Elm St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '5',
    email: 'david.brown@student.school.com',
    name: 'David Brown',
    role: 'student',
    studentId: 'STU005',
    class: '9th Grade',
    section: 'C',
    rollNumber: '005',
    parentContact: '+1234567894',
    dateOfBirth: '2007-03-25',
    address: '654 Maple Ave, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '6',
    email: 'emily.davis@student.school.com',
    name: 'Emily Davis',
    role: 'student',
    studentId: 'STU006',
    class: '12th Grade',
    section: 'A',
    rollNumber: '006',
    parentContact: '+1234567895',
    dateOfBirth: '2004-11-08',
    address: '987 Cedar St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '7',
    email: 'alex.martinez@student.school.com',
    name: 'Alex Martinez',
    role: 'student',
    studentId: 'STU007',
    class: '10th Grade',
    section: 'B',
    rollNumber: '007',
    parentContact: '+1234567896',
    dateOfBirth: '2006-07-14',
    address: '147 Birch Ln, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '8',
    email: 'lisa.garcia@student.school.com',
    name: 'Lisa Garcia',
    role: 'student',
    studentId: 'STU008',
    class: '11th Grade',
    section: 'C',
    rollNumber: '008',
    parentContact: '+1234567897',
    dateOfBirth: '2005-04-30',
    address: '258 Spruce St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '9',
    email: 'prof.johnson@teacher.school.com',
    name: 'Prof. Robert Johnson',
    role: 'teacher',
    teacherId: 'TEA001',
    subject: 'Mathematics',
    classes: ['10th Grade', '11th Grade'],
    qualification: 'M.Sc Mathematics, B.Ed',
    experience: 8,
    avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '10',
    email: 'prof.williams@teacher.school.com',
    name: 'Prof. Maria Williams',
    role: 'teacher',
    teacherId: 'TEA002',
    subject: 'Physics',
    classes: ['9th Grade', '10th Grade', '11th Grade'],
    qualification: 'M.Sc Physics, Ph.D',
    experience: 12,
    avatar: 'https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '11',
    email: 'prof.anderson@teacher.school.com',
    name: 'Prof. James Anderson',
    role: 'teacher',
    teacherId: 'TEA003',
    subject: 'Chemistry',
    classes: ['10th Grade', '11th Grade', '12th Grade'],
    qualification: 'M.Sc Chemistry, B.Ed',
    experience: 10,
    avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '12',
    email: 'prof.taylor@teacher.school.com',
    name: 'Prof. Jennifer Taylor',
    role: 'teacher',
    teacherId: 'TEA004',
    subject: 'English Literature',
    classes: ['9th Grade', '10th Grade', '11th Grade', '12th Grade'],
    qualification: 'M.A English Literature, B.Ed',
    experience: 15,
    avatar: 'https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '13',
    email: 'prof.clark@teacher.school.com',
    name: 'Prof. Michael Clark',
    role: 'teacher',
    teacherId: 'TEA005',
    subject: 'Biology',
    classes: ['9th Grade', '10th Grade', '11th Grade'],
    qualification: 'M.Sc Biology, Ph.D Genetics',
    experience: 9,
    avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '14',
    email: 'prof.lewis@teacher.school.com',
    name: 'Prof. Susan Lewis',
    role: 'teacher',
    teacherId: 'TEA006',
    subject: 'History',
    classes: ['9th Grade', '10th Grade', '11th Grade', '12th Grade'],
    qualification: 'M.A History, B.Ed',
    experience: 11,
    avatar: 'https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: '15',
    email: 'admin@school.com',
    name: 'Dr. Patricia Anderson',
    role: 'admin',
    adminId: 'ADM001',
    department: 'Academic Affairs',
    permissions: ['manage_students', 'manage_teachers', 'manage_fees', 'view_reports', 'system_settings'],
    avatar: 'https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '16',
    email: 'finance.admin@school.com',
    name: 'Mr. Thomas Wilson',
    role: 'admin',
    adminId: 'ADM002',
    department: 'Finance & Accounts',
    permissions: ['manage_fees', 'view_reports', 'financial_records'],
    avatar: 'https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Mathematics',
    marks: 85,
    totalMarks: 100,
    examType: 'Mid-term',
    date: '2024-01-15',
    teacherId: '9'
  },
  {
    id: '2',
    studentId: '1',
    subject: 'Physics',
    marks: 92,
    totalMarks: 100,
    examType: 'Mid-term',
    date: '2024-01-16',
    teacherId: '10'
  },
  {
    id: '3',
    studentId: '2',
    subject: 'Mathematics',
    marks: 78,
    totalMarks: 100,
    examType: 'Mid-term',
    date: '2024-01-15',
    teacherId: '9'
  },
  {
    id: '4',
    studentId: '2',
    subject: 'Chemistry',
    marks: 88,
    totalMarks: 100,
    examType: 'Quiz',
    date: '2024-01-18',
    teacherId: '11'
  },
  {
    id: '5',
    studentId: '3',
    subject: 'English Literature',
    marks: 94,
    totalMarks: 100,
    examType: 'Assignment',
    date: '2024-01-20',
    teacherId: '12'
  },
  {
    id: '6',
    studentId: '4',
    subject: 'Biology',
    marks: 87,
    totalMarks: 100,
    examType: 'Mid-term',
    date: '2024-01-22',
    teacherId: '13'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-01-15',
    status: 'present',
    subject: 'Mathematics',
    teacherId: '9'
  },
  {
    id: '2',
    studentId: '1',
    date: '2024-01-16',
    status: 'present',
    subject: 'Physics',
    teacherId: '10'
  },
  {
    id: '3',
    studentId: '1',
    date: '2024-01-17',
    status: 'late',
    subject: 'Chemistry',
    teacherId: '11'
  },
  {
    id: '4',
    studentId: '2',
    date: '2024-01-15',
    status: 'present',
    subject: 'Mathematics',
    teacherId: '9'
  },
  {
    id: '5',
    studentId: '2',
    date: '2024-01-16',
    status: 'absent',
    subject: 'Physics',
    teacherId: '10'
  },
  {
    id: '6',
    studentId: '3',
    date: '2024-01-18',
    status: 'present',
    subject: 'English Literature',
    teacherId: '12'
  }
];

export const mockFeeTransactions: FeeTransaction[] = [
  {
    id: '1',
    studentId: '1',
    amount: 5000,
    type: 'tuition',
    status: 'completed',
    date: '2024-01-01',
    blockchainHash: 'abc123def456',
    description: 'Tuition Fee - Quarter 1'
  },
  {
    id: '2',
    studentId: '1',
    amount: 500,
    type: 'library',
    status: 'pending',
    date: '2024-01-15',
    blockchainHash: '',
    description: 'Library Fee - Annual'
  },
  {
    id: '3',
    studentId: '2',
    amount: 5000,
    type: 'tuition',
    status: 'completed',
    date: '2024-01-01',
    blockchainHash: 'def456ghi789',
    description: 'Tuition Fee - Quarter 1'
  },
  {
    id: '4',
    studentId: '2',
    amount: 300,
    type: 'transport',
    status: 'pending',
    date: '2024-01-20',
    blockchainHash: '',
    description: 'Transport Fee - Monthly'
  },
  {
    id: '5',
    studentId: '3',
    amount: 5500,
    type: 'tuition',
    status: 'completed',
    date: '2024-01-01',
    blockchainHash: 'ghi789jkl012',
    description: 'Tuition Fee - Quarter 1'
  },
  {
    id: '6',
    studentId: '4',
    amount: 200,
    type: 'exam',
    status: 'pending',
    date: '2024-01-25',
    blockchainHash: '',
    description: 'Exam Fee - Mid-term'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebra Problem Set',
    description: 'Complete problems 1-20 from Chapter 5. Show all working steps and provide detailed explanations for each solution.',
    subject: 'Mathematics',
    dueDate: '2024-01-25',
    teacherId: '9',
    class: '10th Grade',
    totalMarks: 50
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    description: 'Submit lab report on motion and forces experiment. Include hypothesis, methodology, observations, and conclusions.',
    subject: 'Physics',
    dueDate: '2024-01-28',
    teacherId: '10',
    class: '10th Grade',
    totalMarks: 100
  },
  {
    id: '3',
    title: 'Chemical Bonding Essay',
    description: 'Write a 1500-word essay on types of chemical bonding with real-world examples and applications.',
    subject: 'Chemistry',
    dueDate: '2024-02-01',
    teacherId: '11',
    class: '11th Grade',
    totalMarks: 75
  },
  {
    id: '4',
    title: 'Shakespeare Analysis',
    description: 'Analyze the themes and character development in Hamlet. Focus on the protagonist\'s psychological journey.',
    subject: 'English Literature',
    dueDate: '2024-02-05',
    teacherId: '12',
    class: '12th Grade',
    totalMarks: 80
  },
  {
    id: '5',
    title: 'Cell Structure Diagram',
    description: 'Create detailed labeled diagrams of plant and animal cells. Include organelles and their functions.',
    subject: 'Biology',
    dueDate: '2024-02-08',
    teacherId: '13',
    class: '9th Grade',
    totalMarks: 60
  }
];