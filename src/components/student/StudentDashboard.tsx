import React, { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../Card';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Select } from '../Select';
import { useAuth } from '../../context/AuthContext';
import { mockGrades, mockAttendance, mockFeeTransactions, mockAssignments } from '../../utils/mockData';
import { schoolBlockchain } from '../../utils/blockchain';
import { Student, FeeTransaction } from '../../types';
import { BookOpen, Calendar, DollarSign, FileText, TrendingUp, CheckCircle, Clock, AlertCircle, CreditCard, Download, Upload, Eye } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showGradeDetailModal, setShowGradeDetailModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [assignmentSubmission, setAssignmentSubmission] = useState({
    file: null as File | null,
    comments: ''
  });

  const student = user as Student;

  const studentGrades = mockGrades.filter(grade => grade.studentId === student.id);
  const studentAttendance = mockAttendance.filter(attendance => attendance.studentId === student.id);
  const studentFees = mockFeeTransactions.filter(fee => fee.studentId === student.id);
  const studentAssignments = mockAssignments;

  const attendancePercentage = studentAttendance.length > 0 
    ? (studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) * 100 
    : 0;

  const averageGrade = studentGrades.length > 0 
    ? studentGrades.reduce((sum, grade) => sum + (grade.marks / grade.totalMarks) * 100, 0) / studentGrades.length 
    : 0;

  const totalFees = studentFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = studentFees.filter(fee => fee.status === 'completed').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = studentFees.filter(fee => fee.status === 'pending');

  const handlePayment = () => {
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardholderName) {
      alert('Please fill in all payment details');
      return;
    }

    // Process payment and update blockchain
    pendingFees.forEach(fee => {
      const updatedFee: FeeTransaction = {
        ...fee,
        status: 'completed',
        blockchainHash: schoolBlockchain.addTransaction(fee)
      };
      
      // Update the fee status in mock data
      const feeIndex = mockFeeTransactions.findIndex(f => f.id === fee.id);
      if (feeIndex !== -1) {
        mockFeeTransactions[feeIndex] = updatedFee;
      }
    });

    alert('Payment successful! Transaction recorded on blockchain.');
    setShowPaymentModal(false);
    setPaymentForm({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
  };

  const handleAssignmentSubmission = () => {
    if (!assignmentSubmission.file) {
      alert('Please select a file to submit');
      return;
    }

    alert(`Assignment "${selectedAssignment?.title}" submitted successfully!`);
    setShowAssignmentModal(false);
    setAssignmentSubmission({ file: null, comments: '' });
    setSelectedAssignment(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAssignmentSubmission({ ...assignmentSubmission, file });
    }
  };

  const downloadGradeReport = () => {
    const reportData = studentGrades.map(grade => 
      `${grade.subject}: ${grade.marks}/${grade.totalMarks} (${((grade.marks / grade.totalMarks) * 100).toFixed(1)}%)`
    ).join('\n');
    
    const blob = new Blob([`Grade Report for ${student.name}\n\n${reportData}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.name}_grade_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAttendanceReport = () => {
    const reportData = studentAttendance.map(record => 
      `${record.date} - ${record.subject}: ${record.status}`
    ).join('\n');
    
    const blob = new Blob([`Attendance Report for ${student.name}\n\n${reportData}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.name}_attendance_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'grades', label: 'Grades', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'assignments', label: 'Assignments', icon: FileText }
  ];

  return (
    <Layout title={`Student Portal - ${student.name}`}>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {student.name}!</h1>
          <p className="text-slate-400">Class: {student.class} | Roll No: {student.rollNumber}</p>
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
                  <p className="text-blue-100 text-sm">Average Grade</p>
                  <p className="text-2xl font-bold text-white">{averageGrade.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Attendance</p>
                  <p className="text-2xl font-bold text-white">{attendancePercentage.toFixed(1)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600 to-orange-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Fees Paid</p>
                  <p className="text-2xl font-bold text-white">${paidFees}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-200" />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Assignments</p>
                  <p className="text-2xl font-bold text-white">{studentAssignments.length}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-200" />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Academic Performance</h2>
              <Button onClick={downloadGradeReport}>
                <Download size={16} className="mr-2" />
                Download Report
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {studentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{grade.subject}</h4>
                      <p className="text-sm text-slate-400">{grade.examType} • {grade.date}</p>
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
                          setShowGradeDetailModal(true);
                        }}
                      >
                        <Eye size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Attendance Record</h2>
              <Button onClick={downloadAttendanceReport}>
                <Download size={16} className="mr-2" />
                Download Report
              </Button>
            </div>
            <Card>
              <div className="space-y-4">
                {studentAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{record.subject}</h4>
                      <p className="text-sm text-slate-400">{record.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'present' ? 'bg-green-600 text-white' :
                      record.status === 'late' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-6">
            <Card title="Fee Payment Status">
              <div className="space-y-4">
                {studentFees.map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{fee.description}</h4>
                      <p className="text-sm text-slate-400">{fee.date}</p>
                      {fee.blockchainHash && (
                        <p className="text-xs text-blue-400 mt-1">
                          Blockchain: {fee.blockchainHash}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">${fee.amount}</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        fee.status === 'completed' ? 'bg-green-600 text-white' :
                        fee.status === 'pending' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {pendingFees.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-white font-medium">Total Pending: ${pendingFees.reduce((sum, fee) => sum + fee.amount, 0)}</p>
                      <p className="text-sm text-slate-400">{pendingFees.length} pending transaction(s)</p>
                    </div>
                  </div>
                  <Button 
                    variant="success" 
                    className="w-full"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Pay Pending Fees
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'assignments' && (
          <Card title="Assignments">
            <div className="space-y-4">
              {studentAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{assignment.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{assignment.subject}</p>
                      <p className="text-sm text-slate-300 mt-2">{assignment.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center space-x-1 text-sm text-slate-400">
                        <Clock size={14} />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="text-sm text-slate-300 mt-1">
                        {assignment.totalMarks} marks
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowGradeDetailModal(true);
                      }}
                    >
                      <Eye size={14} className="mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowAssignmentModal(true);
                      }}
                    >
                      <Upload size={14} className="mr-1" />
                      Submit Assignment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Payment Modal */}
        <Modal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          title="Pay Pending Fees"
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Payment Summary</h4>
              {pendingFees.map((fee) => (
                <div key={fee.id} className="flex justify-between text-sm">
                  <span className="text-slate-300">{fee.description}</span>
                  <span className="text-white">${fee.amount}</span>
                </div>
              ))}
              <div className="border-t border-slate-600 mt-2 pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-green-400">${pendingFees.reduce((sum, fee) => sum + fee.amount, 0)}</span>
                </div>
              </div>
            </div>

            <Input
              label="Cardholder Name"
              value={paymentForm.cardholderName}
              onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
              placeholder="Enter cardholder name"
            />

            <Input
              label="Card Number"
              value={paymentForm.cardNumber}
              onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={paymentForm.expiryDate}
                onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                placeholder="MM/YY"
                maxLength={5}
              />
              <Input
                label="CVV"
                value={paymentForm.cvv}
                onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                placeholder="123"
                maxLength={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowPaymentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex-1">
                <CreditCard size={16} className="mr-2" />
                Pay Now
              </Button>
            </div>
          </div>
        </Modal>

        {/* Assignment Submission Modal */}
        <Modal
          isOpen={showAssignmentModal}
          onClose={() => setShowAssignmentModal(false)}
          title={`Submit Assignment: ${selectedAssignment?.title}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Assignment Details</h4>
              <p className="text-sm text-slate-300">{selectedAssignment?.description}</p>
              <div className="mt-2 text-sm text-slate-400">
                <p>Subject: {selectedAssignment?.subject}</p>
                <p>Due Date: {selectedAssignment?.dueDate}</p>
                <p>Total Marks: {selectedAssignment?.totalMarks}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Assignment File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                accept=".pdf,.doc,.docx,.txt"
              />
              {assignmentSubmission.file && (
                <p className="text-sm text-green-400 mt-1">
                  Selected: {assignmentSubmission.file.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={assignmentSubmission.comments}
                onChange={(e) => setAssignmentSubmission({ ...assignmentSubmission, comments: e.target.value })}
                className="block w-full rounded-md border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Add any comments about your submission..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowAssignmentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAssignmentSubmission} className="flex-1">
                <Upload size={16} className="mr-2" />
                Submit Assignment
              </Button>
            </div>
          </div>
        </Modal>

        {/* Grade Detail Modal */}
        <Modal
          isOpen={showGradeDetailModal}
          onClose={() => setShowGradeDetailModal(false)}
          title={selectedGrade ? `Grade Details: ${selectedGrade.subject}` : selectedAssignment ? `Assignment: ${selectedAssignment.title}` : ''}
          size="md"
        >
          {selectedGrade && (
            <div className="space-y-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Subject</p>
                    <p className="text-white font-medium">{selectedGrade.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Exam Type</p>
                    <p className="text-white font-medium">{selectedGrade.examType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Date</p>
                    <p className="text-white font-medium">{selectedGrade.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Score</p>
                    <p className="text-white font-medium">{selectedGrade.marks}/{selectedGrade.totalMarks}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-400">Percentage</p>
                  <p className="text-2xl font-bold text-green-400">
                    {((selectedGrade.marks / selectedGrade.totalMarks) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
          {selectedAssignment && !selectedGrade && (
            <div className="space-y-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Subject</p>
                    <p className="text-white font-medium">{selectedAssignment.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Description</p>
                    <p className="text-white">{selectedAssignment.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Due Date</p>
                      <p className="text-white font-medium">{selectedAssignment.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Marks</p>
                      <p className="text-white font-medium">{selectedAssignment.totalMarks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};