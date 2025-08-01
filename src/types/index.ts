export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  studentId: string;
  class: string;
  section: string;
  rollNumber: string;
  parentContact: string;
  dateOfBirth: string;
  address: string;
}

export interface Teacher extends User {
  teacherId: string;
  subject: string;
  classes: string[];
  qualification: string;
  experience: number;
}

export interface Admin extends User {
  adminId: string;
  department: string;
  permissions: string[];
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  totalMarks: number;
  examType: string;
  date: string;
  teacherId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  teacherId: string;
}

export interface FeeTransaction {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'library' | 'transport' | 'exam';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  blockchainHash: string;
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  teacherId: string;
  class: string;
  totalMarks: number;
  attachments?: string[];
}

export interface Block {
  index: number;
  timestamp: number;
  data: FeeTransaction;
  previousHash: string;
  hash: string;
  nonce: number;
}