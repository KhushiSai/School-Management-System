import React, { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../Card';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { useAuth } from '../../context/AuthContext';
import { mockStudents, mockGrades, mockAttendance, mockAssignments } from '../../utils/mockData';
import { Teacher, Grade, Attendance, Assignment } from '../../types';
import { Users, BookOpen, Calendar, FileText, Plus, Edit3, Check, X, Eye, Download, Save } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showEditGradeModal, setShowEditGradeModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showStudentProfileModal, setShowStudentProfileModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: '',
    marks: '',
    totalMarks: '',
    examType: '',
    date: ''
  });

  const [attendanceForm, setAttendanceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    attendanceData: {} as Record<string, string>
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    class: '',
    totalMarks: ''
  });

  const teacher = user as Teacher;

  const myStudents = mockStudents.filter(student => teacher.classes.includes(student.class));
  const myGrades = mockGrades.filter(grade => grade.teacherId === teacher.id);
  const myAttendance = mockAttendance.filter(attendance => attendance.teacherId === teacher.id);
  const myAssignments = mockAssignments.filter(assignment => assignment.teacherId === teacher.id);

  const handleAddGrade = () => {
    if (!gradeForm.studentId || !gradeForm.subject || !gradeForm.marks || !gradeForm.totalMarks) {
      alert('Please fill in all required fields');
      return;
    }

    const newGrade: Grade = {
      id: Date.now().toString(),
      studentId: gradeForm.studentId,
      subject: gradeForm.subject,
      marks: parseInt(gradeForm.marks),
      totalMarks: parseInt(gradeForm.totalMarks),
      examType: gradeForm.examType,
      date: gradeForm.date || new Date().toISOString().split('T')[0],
      teacherId: teacher.id
    };

    mockGrades.push(newGrade);
    alert('Grade added successfully!');
    setShowAddGradeModal(false);
    setGradeForm({ studentId: '', subject: '', marks: '', totalMarks: '', examType: '', date: '' });
  };

  const handleEditGrade = () => {
    if (!gradeForm.marks || !gradeForm.totalMarks) {
      alert('Please fill in all required fields');
      return;
    }

    const gradeIndex = mockGrades.findIndex(g => g.id === selectedGrade.id);
    if (gradeIndex !== -1) {
      mockGrades[gradeIndex] = {
        ...selectedGrade,
        marks: parseInt(gradeForm.marks),
        totalMarks: parseInt(gradeForm.totalMarks),
        examType: gradeForm.examType,
        date: gradeForm.date
      };
    }

    alert('Grade updated successfully!');
    setShowEditGradeModal(false);
    setSelectedGrade(null);
  };

  const handleMarkAttendance = () => {
    if (!attendanceForm.subject) {
      alert('Please select a subject');
      return;
    }

    const attendanceRecords: Attendance[] = Object.entries(attendanceForm.attendanceData).map(([studentId, status]) => ({
      id: `${Date.now()}-${studentId}`,
      studentId,
      date: attendanceForm.date,
      status: status as 'present' | 'absent' | 'late',
      subject: attendanceForm.subject,
      teacherId: teacher.id
    }));

    mockAttendance.push(...attendanceRecords);
    alert(`Attendance marked for ${attendanceRecords.length} students!`);
    setShowAttendanceModal(false);
    setAttendanceForm({ date: new Date().toISOString().split('T')[0], subject: '', attendanceData: {} });
  };

  const handleCreateAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.description || !assignmentForm.subject || !assignmentForm.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: assignmentForm.title,
      description: assignmentForm.description,
      subject: assignmentForm.subject,
      dueDate: assignmentForm.dueDate,
      teacherId: teacher.id,
      class: assignmentForm.class,
      totalMarks: parseInt(assignmentForm.totalMarks) || 100
    };

    mockAssignments.push(newAssignment);
    alert('Assignment created successfully!');
    setShowAssignmentModal(false);
    setAssignmentForm({ title: '', description: '', subject: '', dueDate: '', class: '', totalMarks: '' });
  };

  const downloadClassReport = () => {
    const reportData = myStudents.map(student => {
      const studentGrades = myGrades.filter(g => g.studentId === student.id);
      const avgGrade = studentGrades.length > 0 
        ? studentGrades.reduce((sum, g) => sum + (g.marks / g.totalMarks) * 100, 0) / studentGrades.length 
        : 0;
      
      return `${student.name} (${student.rollNumber}): ${avgGrade.toFixed(1)}% average`;
    }).join('\n');

    const blob = new Blob([`Class Report - ${teacher.subject}\n\n${reportData}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${teacher.subject}_class_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'grades', label: 'Grades', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText }
  ];

  return (
    <Layout title={`Teacher Portal - ${teacher.name}`}>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {teacher.name}!</h1>
          <p className="text-slate-400">Subject: {teacher.subject} | Classes: {teacher.classes.join(', ')}</p>
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Students</p>
                    <p className="text-2xl font-bold text-white">{myStudents.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-600 to-green-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Classes</p>
                    <p className="text-2xl font-bold text-white">{teacher.classes.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-600 to-orange-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Assignments</p>
                    <p className="text-2xl font-bold text-white">{myAssignments.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 to-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Experience</p>
                    <p className="text-2xl font-bold text-white">{teacher.experience}y</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-purple-200" />
                </div>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={downloadClassReport}>
                <Download size={16} className="mr-2" />
                Download Class Report
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <Card title="My Students">
            <div className="space-y-4">
              {myStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-white">{student.name}</h4>
                      <p className="text-sm text-slate-400">Roll No: {student.rollNumber} • {student.class}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowStudentProfileModal(true);
                      }}
                    >
                      <Eye size={14} className="mr-1" />
                      View Profile
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setGradeForm({ ...gradeForm, studentId: student.id });
                        setShowAddGradeModal(true);
                      }}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Grade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Grade Management</h2>
              <Button onClick={() => setShowAddGradeModal(true)}>
                <Plus size={16} className="mr-2" />
                Add Grade
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {myGrades.map((grade) => {
                  const student = myStudents.find(s => s.id === grade.studentId);
                  return (
                    <div key={grade.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{student?.name}</h4>
                        <p className="text-sm text-slate-400">{grade.subject} • {grade.examType}</p>
                        <p className="text-xs text-slate-500">{grade.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{grade.marks}/{grade.totalMarks}</div>
                          <div className="text-sm text-slate-400">
                            {((grade.marks / grade.totalMarks) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => {
                            setSelectedGrade(grade);
                            setGradeForm({
                              studentId: grade.studentId,
                              subject: grade.subject,
                              marks: grade.marks.toString(),
                              totalMarks: grade.totalMarks.toString(),
                              examType: grade.examType,
                              date: grade.date
                            });
                            setShowEditGradeModal(true);
                          }}
                        >
                          <Edit3 size={14} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Attendance Management</h2>
              <Button onClick={() => setShowAttendanceModal(true)}>
                <Plus size={16} className="mr-2" />
                Mark Attendance
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {myAttendance.map((record) => {
                  const student = myStudents.find(s => s.id === record.studentId);
                  return (
                    <div key={record.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{student?.name}</h4>
                        <p className="text-sm text-slate-400">{record.subject} • {record.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === 'present' ? 'bg-green-600 text-white' :
                          record.status === 'late' ? 'bg-yellow-600 text-white' :
                          'bg-red-600 text-white'
                        }`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Assignment Management</h2>
              <Button onClick={() => setShowAssignmentModal(true)}>
                <Plus size={16} className="mr-2" />
                Create Assignment
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {myAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{assignment.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{assignment.subject} • {assignment.class}</p>
                        <p className="text-sm text-slate-300 mt-2">{assignment.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-slate-400">Due: {assignment.dueDate}</div>
                        <div className="text-sm text-slate-300 mt-1">{assignment.totalMarks} marks</div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setAssignmentForm({
                            title: assignment.title,
                            description: assignment.description,
                            subject: assignment.subject,
                            dueDate: assignment.dueDate,
                            class: assignment.class,
                            totalMarks: assignment.totalMarks.toString()
                          });
                          setShowAssignmentModal(true);
                        }}
                      >
                        <Edit3 size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <Eye size={14} className="mr-1" />
                        View Submissions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Add Grade Modal */}
        <Modal
          isOpen={showAddGradeModal}
          onClose={() => setShowAddGradeModal(false)}
          title="Add New Grade"
          size="md"
        >
          <div className="space-y-4">
            <Select
              label="Student"
              value={gradeForm.studentId}
              onChange={(e) => setGradeForm({ ...gradeForm, studentId: e.target.value })}
              options={[
                { value: '', label: 'Select a student' },
                ...myStudents.map(student => ({ value: student.id, label: `${student.name} (${student.rollNumber})` }))
              ]}
            />

            <Input
              label="Subject"
              value={gradeForm.subject}
              onChange={(e) => setGradeForm({ ...gradeForm, subject: e.target.value })}
              placeholder="Enter subject"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Marks Obtained"
                type="number"
                value={gradeForm.marks}
                onChange={(e) => setGradeForm({ ...gradeForm, marks: e.target.value })}
                placeholder="0"
              />
              <Input
                label="Total Marks"
                type="number"
                value={gradeForm.totalMarks}
                onChange={(e) => setGradeForm({ ...gradeForm, totalMarks: e.target.value })}
                placeholder="100"
              />
            </div>

            <Select
              label="Exam Type"
              value={gradeForm.examType}
              onChange={(e) => setGradeForm({ ...gradeForm, examType: e.target.value })}
              options={[
                { value: '', label: 'Select exam type' },
                { value: 'Quiz', label: 'Quiz' },
                { value: 'Mid-term', label: 'Mid-term' },
                { value: 'Final', label: 'Final' },
                { value: 'Assignment', label: 'Assignment' }
              ]}
            />

            <Input
              label="Date"
              type="date"
              value={gradeForm.date}
              onChange={(e) => setGradeForm({ ...gradeForm, date: e.target.value })}
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAddGradeModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddGrade} className="flex-1">
                <Save size={16} className="mr-2" />
                Add Grade
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Grade Modal */}
        <Modal
          isOpen={showEditGradeModal}
          onClose={() => setShowEditGradeModal(false)}
          title="Edit Grade"
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-sm text-slate-400">Student: {myStudents.find(s => s.id === selectedGrade?.studentId)?.name}</p>
              <p className="text-sm text-slate-400">Subject: {selectedGrade?.subject}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Marks Obtained"
                type="number"
                value={gradeForm.marks}
                onChange={(e) => setGradeForm({ ...gradeForm, marks: e.target.value })}
              />
              <Input
                label="Total Marks"
                type="number"
                value={gradeForm.totalMarks}
                onChange={(e) => setGradeForm({ ...gradeForm, totalMarks: e.target.value })}
              />
            </div>

            <Select
              label="Exam Type"
              value={gradeForm.examType}
              onChange={(e) => setGradeForm({ ...gradeForm, examType: e.target.value })}
              options={[
                { value: 'Quiz', label: 'Quiz' },
                { value: 'Mid-term', label: 'Mid-term' },
                { value: 'Final', label: 'Final' },
                { value: 'Assignment', label: 'Assignment' }
              ]}
            />

            <Input
              label="Date"
              type="date"
              value={gradeForm.date}
              onChange={(e) => setGradeForm({ ...gradeForm, date: e.target.value })}
            />

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowEditGradeModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEditGrade} className="flex-1">
                <Save size={16} className="mr-2" />
                Update Grade
              </Button>
            </div>
          </div>
        </Modal>

        {/* Mark Attendance Modal */}
        <Modal
          isOpen={showAttendanceModal}
          onClose={() => setShowAttendanceModal(false)}
          title="Mark Attendance"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                value={attendanceForm.date}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
              />
              <Input
                label="Subject"
                value={attendanceForm.subject}
                onChange={(e) => setAttendanceForm({ ...attendanceForm, subject: e.target.value })}
                placeholder="Enter subject"
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-white">Students</h4>
              {myStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-white font-medium">{student.name}</p>
                      <p className="text-sm text-slate-400">Roll: {student.rollNumber}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {['present', 'late', 'absent'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setAttendanceForm({
                          ...attendanceForm,
                          attendanceData: { ...attendanceForm.attendanceData, [student.id]: status }
                        })}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          attendanceForm.attendanceData[student.id] === status
                            ? status === 'present' ? 'bg-green-600 text-white' :
                              status === 'late' ? 'bg-yellow-600 text-white' :
                              'bg-red-600 text-white'
                            : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAttendanceModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleMarkAttendance} className="flex-1">
                <Save size={16} className="mr-2" />
                Mark Attendance
              </Button>
            </div>
          </div>
        </Modal>

        {/* Create Assignment Modal */}
        <Modal
          isOpen={showAssignmentModal}
          onClose={() => setShowAssignmentModal(false)}
          title={selectedAssignment ? "Edit Assignment" : "Create New Assignment"}
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Assignment Title"
              value={assignmentForm.title}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
              placeholder="Enter assignment title"
            />

            <Textarea
              label="Description"
              value={assignmentForm.description}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
              placeholder="Enter assignment description"
              rows={3}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Subject"
                value={assignmentForm.subject}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, subject: e.target.value })}
                placeholder="Enter subject"
              />
              <Select
                label="Class"
                value={assignmentForm.class}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, class: e.target.value })}
                options={[
                  { value: '', label: 'Select class' },
                  ...teacher.classes.map(cls => ({ value: cls, label: cls }))
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Due Date"
                type="date"
                value={assignmentForm.dueDate}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
              />
              <Input
                label="Total Marks"
                type="number"
                value={assignmentForm.totalMarks}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, totalMarks: e.target.value })}
                placeholder="100"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAssignmentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateAssignment} className="flex-1">
                <Save size={16} className="mr-2" />
                {selectedAssignment ? "Update Assignment" : "Create Assignment"}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Student Profile Modal */}
        <Modal
          isOpen={showStudentProfileModal}
          onClose={() => setShowStudentProfileModal(false)}
          title={`Student Profile: ${selectedStudent?.name}`}
          size="lg"
        >
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedStudent.name}</h3>
                  <p className="text-slate-400">Student ID: {selectedStudent.studentId}</p>
                  <p className="text-slate-400">Class: {selectedStudent.class} | Roll: {selectedStudent.rollNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Contact Information</h4>
                  <p className="text-sm text-slate-300">Email: {selectedStudent.email}</p>
                  <p className="text-sm text-slate-300">Parent Contact: {selectedStudent.parentContact}</p>
                  <p className="text-sm text-slate-300">Address: {selectedStudent.address}</p>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Academic Info</h4>
                  <p className="text-sm text-slate-300">Date of Birth: {selectedStudent.dateOfBirth}</p>
                  <p className="text-sm text-slate-300">Section: {selectedStudent.section}</p>
                </div>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Recent Grades</h4>
                <div className="space-y-2">
                  {myGrades.filter(g => g.studentId === selectedStudent.id).slice(0, 3).map((grade) => (
                    <div key={grade.id} className="flex justify-between text-sm">
                      <span className="text-slate-300">{grade.subject} ({grade.examType})</span>
                      <span className="text-white">{grade.marks}/{grade.totalMarks}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};