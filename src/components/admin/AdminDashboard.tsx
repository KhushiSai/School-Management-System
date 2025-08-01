import React, { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../Card';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';
import { useAuth } from '../../context/AuthContext';
import { mockStudents, mockTeachers, mockFeeTransactions, mockAdmins } from '../../utils/mockData';
import { schoolBlockchain } from '../../utils/blockchain';
import { Admin, Student, Teacher } from '../../types';
import { Users, GraduationCap, DollarSign, Shield, BarChart3, Plus, Edit3, Trash2, Eye, Download, Save, UserPlus } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showTeacherDetailModal, setShowTeacherDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    studentId: '',
    class: '',
    section: '',
    rollNumber: '',
    parentContact: '',
    dateOfBirth: '',
    address: ''
  });

  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    teacherId: '',
    subject: '',
    classes: [] as string[],
    qualification: '',
    experience: ''
  });

  const admin = user as Admin;

  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalFeeCollected = mockFeeTransactions
    .filter(fee => fee.status === 'completed')
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = mockFeeTransactions
    .filter(fee => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const blockchainData = schoolBlockchain.getChain();
  const isBlockchainValid = schoolBlockchain.isChainValid();

  const handleAddStudent = () => {
    if (!studentForm.name || !studentForm.email || !studentForm.studentId) {
      alert('Please fill in all required fields');
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      email: studentForm.email,
      name: studentForm.name,
      role: 'student',
      studentId: studentForm.studentId,
      class: studentForm.class,
      section: studentForm.section,
      rollNumber: studentForm.rollNumber,
      parentContact: studentForm.parentContact,
      dateOfBirth: studentForm.dateOfBirth,
      address: studentForm.address,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    mockStudents.push(newStudent);
    alert('Student added successfully!');
    setShowAddStudentModal(false);
    setStudentForm({ name: '', email: '', studentId: '', class: '', section: '', rollNumber: '', parentContact: '', dateOfBirth: '', address: '' });
  };

  const handleAddTeacher = () => {
    if (!teacherForm.name || !teacherForm.email || !teacherForm.teacherId || !teacherForm.subject) {
      alert('Please fill in all required fields');
      return;
    }

    const newTeacher: Teacher = {
      id: Date.now().toString(),
      email: teacherForm.email,
      name: teacherForm.name,
      role: 'teacher',
      teacherId: teacherForm.teacherId,
      subject: teacherForm.subject,
      classes: teacherForm.classes,
      qualification: teacherForm.qualification,
      experience: parseInt(teacherForm.experience) || 0,
      avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };

    mockTeachers.push(newTeacher);
    alert('Teacher added successfully!');
    setShowAddTeacherModal(false);
    setTeacherForm({ name: '', email: '', teacherId: '', subject: '', classes: [], qualification: '', experience: '' });
  };

  const handleEditStudent = () => {
    if (!selectedStudent) return;

    const studentIndex = mockStudents.findIndex(s => s.id === selectedStudent.id);
    if (studentIndex !== -1) {
      mockStudents[studentIndex] = {
        ...selectedStudent,
        name: studentForm.name,
        email: studentForm.email,
        studentId: studentForm.studentId,
        class: studentForm.class,
        section: studentForm.section,
        rollNumber: studentForm.rollNumber,
        parentContact: studentForm.parentContact,
        dateOfBirth: studentForm.dateOfBirth,
        address: studentForm.address
      };
    }

    alert('Student updated successfully!');
    setShowEditStudentModal(false);
    setSelectedStudent(null);
  };

  const handleEditTeacher = () => {
    if (!selectedTeacher) return;

    const teacherIndex = mockTeachers.findIndex(t => t.id === selectedTeacher.id);
    if (teacherIndex !== -1) {
      mockTeachers[teacherIndex] = {
        ...selectedTeacher,
        name: teacherForm.name,
        email: teacherForm.email,
        teacherId: teacherForm.teacherId,
        subject: teacherForm.subject,
        classes: teacherForm.classes,
        qualification: teacherForm.qualification,
        experience: parseInt(teacherForm.experience) || 0
      };
    }

    alert('Teacher updated successfully!');
    setShowEditTeacherModal(false);
    setSelectedTeacher(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const index = mockStudents.findIndex(s => s.id === studentId);
      if (index !== -1) {
        mockStudents.splice(index, 1);
        alert('Student deleted successfully!');
      }
    }
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      const index = mockTeachers.findIndex(t => t.id === teacherId);
      if (index !== -1) {
        mockTeachers.splice(index, 1);
        alert('Teacher deleted successfully!');
      }
    }
  };

  const downloadSystemReport = () => {
    const report = `
School Management System Report
Generated on: ${new Date().toLocaleDateString()}

OVERVIEW:
- Total Students: ${totalStudents}
- Total Teachers: ${totalTeachers}
- Total Fees Collected: $${totalFeeCollected}
- Pending Fees: $${pendingFees}
- Blockchain Status: ${isBlockchainValid ? 'Valid' : 'Invalid'}
- Total Blocks: ${blockchainData.length}

STUDENTS:
${mockStudents.map(s => `- ${s.name} (${s.studentId}) - ${s.class}`).join('\n')}

TEACHERS:
${mockTeachers.map(t => `- ${t.name} (${t.teacherId}) - ${t.subject}`).join('\n')}

RECENT TRANSACTIONS:
${mockFeeTransactions.slice(0, 5).map(t => `- ${t.description}: $${t.amount} (${t.status})`).join('\n')}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'school_system_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'blockchain', label: 'Blockchain', icon: Shield }
  ];

  return (
    <Layout title={`Admin Portal - ${admin.name}`}>
      <div className="px-4 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {admin.name}!</h1>
              <p className="text-slate-400">Department: {admin.department}</p>
            </div>
            <Button onClick={downloadSystemReport}>
              <Download size={16} className="mr-2" />
              Download System Report
            </Button>
          </div>
        </div>

        <div className="border-b border-slate-700 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-white">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Teachers</p>
                  <p className="text-2xl font-bold text-white">{totalTeachers}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-green-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600 to-orange-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Fees Collected</p>
                  <p className="text-2xl font-bold text-white">${totalFeeCollected}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Blockchain Status</p>
                  <p className="text-2xl font-bold text-white">{isBlockchainValid ? 'Valid' : 'Invalid'}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-200" />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Student Management</h2>
              <Button onClick={() => setShowAddStudentModal(true)}>
                <Plus size={16} className="mr-2" />
                Add Student
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {mockStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-white">{student.name}</h4>
                        <p className="text-sm text-slate-400">
                          {student.studentId} • {student.class} • Roll: {student.rollNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowStudentDetailModal(true);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedStudent(student);
                          setStudentForm({
                            name: student.name,
                            email: student.email,
                            studentId: student.studentId,
                            class: student.class,
                            section: student.section,
                            rollNumber: student.rollNumber,
                            parentContact: student.parentContact,
                            dateOfBirth: student.dateOfBirth,
                            address: student.address
                          });
                          setShowEditStudentModal(true);
                        }}
                      >
                        <Edit3 size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Teacher Management</h2>
              <Button onClick={() => setShowAddTeacherModal(true)}>
                <Plus size={16} className="mr-2" />
                Add Teacher
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {mockTeachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-white">{teacher.name}</h4>
                        <p className="text-sm text-slate-400">
                          {teacher.teacherId} • {teacher.subject} • {teacher.experience}y exp
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setShowTeacherDetailModal(true);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setTeacherForm({
                            name: teacher.name,
                            email: teacher.email,
                            teacherId: teacher.teacherId,
                            subject: teacher.subject,
                            classes: teacher.classes,
                            qualification: teacher.qualification,
                            experience: teacher.experience.toString()
                          });
                          setShowEditTeacherModal(true);
                        }}
                      >
                        <Edit3 size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Fee Collection Summary">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Collected</span>
                    <span className="text-green-400 font-semibold">${totalFeeCollected}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Pending</span>
                    <span className="text-yellow-400 font-semibold">${pendingFees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Expected</span>
                    <span className="text-white font-semibold">${totalFeeCollected + pendingFees}</span>
                  </div>
                </div>
              </Card>

              <Card title="Recent Transactions">
                <div className="space-y-3">
                  {mockFeeTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white">{transaction.description}</p>
                        <p className="text-xs text-slate-400">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">${transaction.amount}</p>
                        <p className={`text-xs ${
                          transaction.status === 'completed' ? 'text-green-400' :
                          transaction.status === 'pending' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card title="All Fee Transactions">
              <div className="space-y-4">
                {mockFeeTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{transaction.description}</h4>
                      <p className="text-sm text-slate-400">{transaction.date}</p>
                      {transaction.blockchainHash && (
                        <p className="text-xs text-blue-400 mt-1">
                          Hash: {transaction.blockchainHash}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">${transaction.amount}</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.status === 'completed' ? 'bg-green-600 text-white' :
                        transaction.status === 'pending' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            <Card title="Blockchain Status">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{blockchainData.length}</div>
                  <div className="text-sm text-slate-400">Total Blocks</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isBlockchainValid ? 'text-green-400' : 'text-red-400'}`}>
                    {isBlockchainValid ? 'Valid' : 'Invalid'}
                  </div>
                  <div className="text-sm text-slate-400">Chain Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">256</div>
                  <div className="text-sm text-slate-400">Hash Length</div>
                </div>
              </div>
            </Card>

            <Card title="Blockchain Transactions">
              <div className="space-y-4">
                {blockchainData.slice(1).map((block) => (
                  <div key={block.index} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">Block #{block.index}</h4>
                        <p className="text-sm text-slate-400 mt-1">
                          Transaction: {block.data.description}
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Amount: ${block.data.amount}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          Timestamp: {new Date(block.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xs text-blue-400">
                          Hash: {block.hash.substring(0, 8)}...
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Prev: {block.previousHash.substring(0, 8)}...
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Nonce: {block.nonce}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Add Student Modal */}
        <Modal
          isOpen={showAddStudentModal}
          onClose={() => setShowAddStudentModal(false)}
          title="Add New Student"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                placeholder="Enter student name"
              />
              <Input
                label="Email"
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                placeholder="student@school.com"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Student ID"
                value={studentForm.studentId}
                onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })}
                placeholder="STU001"
              />
              <Input
                label="Class"
                value={studentForm.class}
                onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                placeholder="10th Grade"
              />
              <Input
                label="Section"
                value={studentForm.section}
                onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                placeholder="A"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Roll Number"
                value={studentForm.rollNumber}
                onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                placeholder="001"
              />
              <Input
                label="Parent Contact"
                value={studentForm.parentContact}
                onChange={(e) => setStudentForm({ ...studentForm, parentContact: e.target.value })}
                placeholder="+1234567890"
              />
            </div>

            <Input
              label="Date of Birth"
              type="date"
              value={studentForm.dateOfBirth}
              onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
            />

            <Input
              label="Address"
              value={studentForm.address}
              onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
              placeholder="Enter full address"
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAddStudentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddStudent} className="flex-1">
                <UserPlus size={16} className="mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add Teacher Modal */}
        <Modal
          isOpen={showAddTeacherModal}
          onClose={() => setShowAddTeacherModal(false)}
          title="Add New Teacher"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={teacherForm.name}
                onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                placeholder="Enter teacher name"
              />
              <Input
                label="Email"
                type="email"
                value={teacherForm.email}
                onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                placeholder="teacher@school.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Teacher ID"
                value={teacherForm.teacherId}
                onChange={(e) => setTeacherForm({ ...teacherForm, teacherId: e.target.value })}
                placeholder="TEA001"
              />
              <Input
                label="Subject"
                value={teacherForm.subject}
                onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                placeholder="Mathematics"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Qualification"
                value={teacherForm.qualification}
                onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                placeholder="M.Sc Mathematics"
              />
              <Input
                label="Experience (Years)"
                type="number"
                value={teacherForm.experience}
                onChange={(e) => setTeacherForm({ ...teacherForm, experience: e.target.value })}
                placeholder="5"
              />
            </div>

            <Input
              label="Classes (comma separated)"
              value={teacherForm.classes.join(', ')}
              onChange={(e) => setTeacherForm({ ...teacherForm, classes: e.target.value.split(', ').filter(c => c.trim()) })}
              placeholder="10th Grade, 11th Grade"
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAddTeacherModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddTeacher} className="flex-1">
                <UserPlus size={16} className="mr-2" />
                Add Teacher
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Student Modal */}
        <Modal
          isOpen={showEditStudentModal}
          onClose={() => setShowEditStudentModal(false)}
          title="Edit Student"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Student ID"
                value={studentForm.studentId}
                onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })}
              />
              <Input
                label="Class"
                value={studentForm.class}
                onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
              />
              <Input
                label="Section"
                value={studentForm.section}
                onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Roll Number"
                value={studentForm.rollNumber}
                onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
              />
              <Input
                label="Parent Contact"
                value={studentForm.parentContact}
                onChange={(e) => setStudentForm({ ...studentForm, parentContact: e.target.value })}
              />
            </div>

            <Input
              label="Date of Birth"
              type="date"
              value={studentForm.dateOfBirth}
              onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
            />

            <Input
              label="Address"
              value={studentForm.address}
              onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowEditStudentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEditStudent} className="flex-1">
                <Save size={16} className="mr-2" />
                Update Student
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Teacher Modal */}
        <Modal
          isOpen={showEditTeacherModal}
          onClose={() => setShowEditTeacherModal(false)}
          title="Edit Teacher"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={teacherForm.name}
                onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={teacherForm.email}
                onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Teacher ID"
                value={teacherForm.teacherId}
                onChange={(e) => setTeacherForm({ ...teacherForm, teacherId: e.target.value })}
              />
              <Input
                label="Subject"
                value={teacherForm.subject}
                onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Qualification"
                value={teacherForm.qualification}
                onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
              />
              <Input
                label="Experience (Years)"
                type="number"
                value={teacherForm.experience}
                onChange={(e) => setTeacherForm({ ...teacherForm, experience: e.target.value })}
              />
            </div>

            <Input
              label="Classes (comma separated)"
              value={teacherForm.classes.join(', ')}
              onChange={(e) => setTeacherForm({ ...teacherForm, classes: e.target.value.split(', ').filter(c => c.trim()) })}
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowEditTeacherModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEditTeacher} className="flex-1">
                <Save size={16} className="mr-2" />
                Update Teacher
              </Button>
            </div>
          </div>
        </Modal>

        {/* Student Detail Modal */}
        <Modal
          isOpen={showStudentDetailModal}
          onClose={() => setShowStudentDetailModal(false)}
          title={`Student Details: ${selectedStudent?.name}`}
          size="lg"
        >
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedStudent.name}</h3>
                  <p className="text-slate-400">Student ID: {selectedStudent.studentId}</p>
                  <p className="text-slate-400">Email: {selectedStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Academic Information</h4>
                  <p className="text-sm text-slate-300">Class: {selectedStudent.class}</p>
                  <p className="text-sm text-slate-300">Section: {selectedStudent.section}</p>
                  <p className="text-sm text-slate-300">Roll Number: {selectedStudent.rollNumber}</p>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Personal Information</h4>
                  <p className="text-sm text-slate-300">Date of Birth: {selectedStudent.dateOfBirth}</p>
                  <p className="text-sm text-slate-300">Parent Contact: {selectedStudent.parentContact}</p>
                </div>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Address</h4>
                <p className="text-sm text-slate-300">{selectedStudent.address}</p>
              </div>
            </div>
          )}
        </Modal>

        {/* Teacher Detail Modal */}
        <Modal
          isOpen={showTeacherDetailModal}
          onClose={() => setShowTeacherDetailModal(false)}
          title={`Teacher Details: ${selectedTeacher?.name}`}
          size="lg"
        >
          {selectedTeacher && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg">
                <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedTeacher.name}</h3>
                  <p className="text-slate-400">Teacher ID: {selectedTeacher.teacherId}</p>
                  <p className="text-slate-400">Email: {selectedTeacher.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Teaching Information</h4>
                  <p className="text-sm text-slate-300">Subject: {selectedTeacher.subject}</p>
                  <p className="text-sm text-slate-300">Classes: {selectedTeacher.classes.join(', ')}</p>
                  <p className="text-sm text-slate-300">Experience: {selectedTeacher.experience} years</p>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Qualification</h4>
                  <p className="text-sm text-slate-300">{selectedTeacher.qualification}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};