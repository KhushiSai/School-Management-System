import React, { ReactNode, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { LogOut, User, Bell, Settings, X, Check, AlertCircle, Info, Calendar, MessageSquare, Shield, Eye, Edit3, Save, School, Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to the dashboard',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Fee Payment Reminder',
      message: 'Library fee payment is due in 3 days',
      time: '1 day ago',
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Grade Updated',
      message: 'Your Mathematics grade has been updated',
      time: '2 days ago',
      read: true
    },
    {
      id: '4',
      type: 'info',
      title: 'New Assignment',
      message: 'Physics assignment has been posted',
      time: '3 days ago',
      read: true
    },
    {
      id: '5',
      type: 'warning',
      title: 'Attendance Alert',
      message: 'Your attendance is below 75%',
      time: '1 week ago',
      read: false
    }
  ]);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    emergencyContact: '',
    bio: ''
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    language: 'English',
    timezone: 'UTC-5',
    autoSave: true,
    twoFactorAuth: false
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="text-green-400" size={16} />;
      case 'warning': return <AlertCircle className="text-yellow-400" size={16} />;
      case 'error': return <X className="text-red-400" size={16} />;
      default: return <Info className="text-blue-400" size={16} />;
    }
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setShowEditProfile(false);
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-xl border-b border-slate-600/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <School className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    EduChain Portal
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">{title}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Enhanced Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <Bell size={20} className="group-hover:scale-110 transition-transform" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-6 border-b border-slate-600/50 bg-gradient-to-r from-slate-700/50 to-slate-800/50">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white">Notifications</h3>
                        <Button size="sm" variant="secondary" onClick={markAllAsRead} className="text-xs">
                          Mark all read
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-all duration-200 ${
                            !notification.read ? 'bg-slate-700/20 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-lg bg-slate-700/50">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="text-sm font-semibold text-white truncate">
                                  {notification.title}
                                </h4>
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-slate-600/50"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                              <p className="text-sm text-slate-300 mt-1 leading-relaxed">{notification.message}</p>
                              <p className="text-xs text-slate-400 mt-2 font-medium">{notification.time}</p>
                            </div>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Settings */}
              <button 
                onClick={() => setShowSettings(true)}
                className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group"
              >
                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Enhanced User Profile */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowUserProfile(true)}
                  className="flex items-center space-x-3 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user?.role === 'student' ? (user as any).studentId : 
                       user?.role === 'teacher' ? (user as any).teacherId : 
                       (user as any).adminId}
                    </p>
                  </div>
                </button>
                
                <button
                  onClick={logout}
                  className="p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                >
                  <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Enhanced User Profile Modal */}
      <Modal
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        title={`${user?.role?.charAt(0).toUpperCase()}${user?.role?.slice(1)} Profile`}
        size="lg"
      >
        <div className="space-y-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-slate-600/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            <div className="relative flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>
                <p className="text-blue-400 font-semibold">
                  {user?.role === 'student' ? `Student ID: ${(user as any).studentId}` :
                   user?.role === 'teacher' ? `Teacher ID: ${(user as any).teacherId}` :
                   `Admin ID: ${(user as any).adminId}`}
                </p>
                <p className="text-slate-300 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {user?.role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Calendar className="mr-2 text-blue-400" size={18} />
                  Academic Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Class:</span>
                    <span className="text-white font-semibold">{(user as any).class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Section:</span>
                    <span className="text-white font-semibold">{(user as any).section}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roll Number:</span>
                    <span className="text-white font-semibold">{(user as any).rollNumber}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <MessageSquare className="mr-2 text-green-400" size={18} />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parent:</span>
                    <span className="text-white font-semibold">{(user as any).parentContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DOB:</span>
                    <span className="text-white font-semibold">{(user as any).dateOfBirth}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-400">Address:</span>
                    <p className="text-white font-semibold mt-1">{(user as any).address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?.role === 'teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Calendar className="mr-2 text-blue-400" size={18} />
                  Teaching Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subject:</span>
                    <span className="text-white font-semibold">{(user as any).subject}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Classes:</span>
                    <p className="text-white font-semibold mt-1">{(user as any).classes?.join(', ')}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-white font-semibold">{(user as any).experience} years</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Shield className="mr-2 text-green-400" size={18} />
                  Qualification
                </h4>
                <p className="text-white font-semibold">{(user as any).qualification}</p>
              </div>
            </div>
          )}

          {user?.role === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Shield className="mr-2 text-blue-400" size={18} />
                  Administrative Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="text-white font-semibold">{(user as any).department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Role:</span>
                    <span className="text-white font-semibold">System Administrator</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Settings className="mr-2 text-green-400" size={18} />
                  Permissions
                </h4>
                <div className="space-y-2">
                  {(user as any).permissions?.map((permission: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check size={14} className="text-green-400" />
                      <span className="text-slate-300 text-sm">{permission.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowEditProfile(true)}
              className="flex-1"
            >
              <Edit3 size={16} className="mr-2" />
              Edit Profile
            </Button>
            <Button variant="secondary" onClick={() => setShowUserProfile(false)} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Enhanced Edit Profile Modal */}
      <Modal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        title="Edit Profile"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              placeholder="+1234567890"
            />
            <Input
              label="Emergency Contact"
              value={profileForm.emergencyContact}
              onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
              placeholder="Emergency contact number"
            />
          </div>
          <Input
            label="Address"
            value={profileForm.address}
            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            placeholder="Enter your address"
          />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
            <textarea
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="block w-full rounded-xl border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowEditProfile(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} className="flex-1">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Enhanced Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
            <h4 className="font-bold text-white mb-6 flex items-center">
              <Bell className="mr-2 text-blue-400" size={18} />
              Notification Preferences
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-600/30 rounded-lg">
                <div>
                  <span className="text-white font-medium">Email Notifications</span>
                  <p className="text-slate-400 text-sm">Receive updates via email</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    settings.emailNotifications ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-600/30 rounded-lg">
                <div>
                  <span className="text-white font-medium">Push Notifications</span>
                  <p className="text-slate-400 text-sm">Receive instant notifications</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, pushNotifications: !settings.pushNotifications })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    settings.pushNotifications ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
            <h4 className="font-bold text-white mb-6 flex items-center">
              <Eye className="mr-2 text-green-400" size={18} />
              Appearance
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-600/30 rounded-lg">
                <div>
                  <span className="text-white font-medium">Dark Mode</span>
                  <p className="text-slate-400 text-sm">Use dark theme</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    settings.darkMode ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="p-4 bg-slate-600/30 rounded-lg">
                <label className="block text-white font-medium mb-3">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="block w-full rounded-lg border-slate-600 bg-slate-600/50 text-white backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-slate-600/50">
            <h4 className="font-bold text-white mb-6 flex items-center">
              <Shield className="mr-2 text-red-400" size={18} />
              Security
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-600/30 rounded-lg">
                <div>
                  <span className="text-white font-medium">Two-Factor Authentication</span>
                  <p className="text-slate-400 text-sm">Add extra security to your account</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    settings.twoFactorAuth ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-600/30 rounded-lg">
                <div>
                  <span className="text-white font-medium">Auto-Save</span>
                  <p className="text-slate-400 text-sm">Automatically save your work</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    settings.autoSave ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowSettings(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} className="flex-1">
              <Save size={16} className="mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};