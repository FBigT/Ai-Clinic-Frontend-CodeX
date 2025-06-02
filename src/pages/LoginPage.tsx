import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Moon, Sun, AlertTriangle } from 'lucide-react';

interface LoginPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ darkMode, setDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="backdrop-blur-sm bg-white/80 dark:bg-black/30 border-2 border-white/20 dark:border-white/10 rounded-lg p-8 shadow-2xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-3xl">
          {/* Dark Mode Toggle */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-all duration-300 group border border-neo-gray-200 dark:border-white/10"
            >
              {darkMode ? 
                <Sun className="w-5 h-5 text-neo-gray-100 transition-transform duration-300 group-hover:rotate-180" /> : 
                <Moon className="w-5 h-5 text-neo-gray-800 transition-transform duration-300 group-hover:-rotate-90" />
              }
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light text-neo-gray-800 dark:text-neo-gray-100 mb-3 tracking-wide">Welcome Back</h2>
            <p className="text-lg text-neo-gray-600 dark:text-neo-gray-300 font-light">Sign in to your account</p>
          </div>

          {/* Demo Alert */}
          <div className="mb-8 p-4 bg-yellow-50/50 dark:bg-yellow-900/20 border-2 border-yellow-200/50 dark:border-yellow-600/30 rounded-sm transition-all duration-300 hover:translate-x-1">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 animate-pulse" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400 font-light">
                Demo Mode: Authentication is not implemented. Any credentials will work.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-light text-neo-gray-700 dark:text-neo-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neo-gray-500 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full rounded-sm border-2 border-neo-gray-300 dark:border-neo-gray-700 px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm text-neo-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:translate-x-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light text-neo-gray-700 dark:text-neo-gray-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neo-gray-500 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full rounded-sm border-2 border-neo-gray-300 dark:border-neo-gray-700 px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm text-neo-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:translate-x-1"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide rounded-sm hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group overflow-hidden relative"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                Sign In
              </span>
              <div className="absolute inset-0 bg-neo-gray-700 dark:bg-neo-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;