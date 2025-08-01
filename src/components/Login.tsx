import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Card } from './Card';
import { ArrowRight, School, User, Lock, AlertCircle, Sparkles, Shield, BookOpen } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const demoAccounts = [
    { email: 'john.doe@student.school.com', password: 'student123', role: 'Student', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { email: 'prof.johnson@teacher.school.com', password: 'teacher123', role: 'Teacher', icon: User, color: 'from-green-500 to-green-600' },
    { email: 'admin@school.com', password: 'admin123', role: 'Admin', icon: Shield, color: 'from-purple-500 to-purple-600' }
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setShowDemo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <School className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
            EduChain Portal
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            Secure Blockchain-Powered Education Management
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2 text-slate-400">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm">AI Powered</span>
            </div>
          </div>
        </div>

        <Card className="mt-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-base font-bold text-white mb-3">
                Email Address
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 pr-4 py-4 block w-full rounded-xl border-2 border-slate-600 bg-slate-800/80 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl text-base font-medium"
                  placeholder="Enter your email address"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">
                Use your institutional email address
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-bold text-white mb-3">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-4 py-4 block w-full rounded-xl border-2 border-slate-600 bg-slate-800/80 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl text-base font-medium"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">
                Your secure account password
              </p>
            </div>

            {error && (
              <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/30 backdrop-blur-sm">
                <AlertCircle size={20} />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-4 text-lg font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  Sign in to Portal
                  <ArrowRight className="ml-3 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-600/50">
            <Button
              onClick={() => setShowDemo(!showDemo)}
              variant="secondary"
              className="w-full py-3"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Try Demo Accounts
            </Button>

            {showDemo && (
              <div className="mt-6 space-y-3">
                <p className="text-sm text-slate-400 text-center font-medium">Choose a demo account to explore:</p>
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={account.email}
                      onClick={() => handleDemoLogin(account.email)}
                      className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${account.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {account.role} Portal
                          </div>
                          <div className="text-xs text-slate-400 font-mono">{account.email}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            © 2024 EduChain Portal. Powered by Blockchain Technology.
          </p>
        </div>
      </div>
    </div>
  );
};