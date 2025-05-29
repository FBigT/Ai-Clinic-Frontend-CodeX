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
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-lg p-8 shadow-lg transition-all duration-300">
        
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="text-neo-gray-100" /> : <Moon className="text-neo-gray-800" />}
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-neo-gray-800 dark:text-neo-gray-100">Welcome Back</h2>
          <p className="text-neo-gray-600 dark:text-neo-gray-300 mt-2">Sign in to your account</p>
        </div>

        {/* Demo Alert */}
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600 rounded-sm">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Demo Mode: Authentication is not implemented. Any credentials will work.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-light text-neo-gray-700 dark:text-neo-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neo-gray-500 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full rounded-sm border border-neo-gray-300 dark:border-neo-gray-700 px-4 py-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm text-neo-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-light text-neo-gray-700 dark:text-neo-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neo-gray-500 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full rounded-sm border border-neo-gray-300 dark:border-neo-gray-700 px-4 py-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm text-neo-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide rounded-sm hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
