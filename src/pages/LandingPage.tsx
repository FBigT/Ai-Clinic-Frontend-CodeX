import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Brain, ArrowRight, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="group backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-sm p-6 transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
    <div className="w-14 h-14 bg-neo-gray-100 dark:bg-neo-gray-800 rounded-sm flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-[10deg]">
      <Icon className="w-6 h-6 text-neo-gray-800 dark:text-neo-gray-100" />
    </div>
    <h3 className="text-2xl font-light mb-2 text-neo-gray-800 dark:text-neo-gray-100">{title}</h3>
    <p className="text-neo-gray-600 dark:text-neo-gray-300 font-light">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/10 dark:border-white/5 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-light tracking-wider text-neo-gray-800 dark:text-neo-gray-100 transition-all duration-300 hover:tracking-widest">
            MED<span className="font-normal">AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-all duration-300 group"
            >
              {darkMode ? (
                <Sun className="text-neo-gray-100 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon className="text-neo-gray-800 transition-transform duration-300 group-hover:-rotate-90" />
              )}
            </button>
            <Link
              to="/login"
              className="relative px-6 py-2 bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide rounded-sm overflow-hidden group"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                Try Demo
              </span>
              <div className="absolute inset-0 bg-neo-gray-700 dark:bg-neo-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-36 pb-20">
        <div className="max-w-4xl relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <h1 className="relative text-6xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-6 leading-tight transition-all duration-500 hover:tracking-normal">
            Transform Medical Documentation with Edge AI
          </h1>
          <p className="relative text-xl font-light text-neo-gray-600 dark:text-neo-gray-300 mb-10 max-w-2xl">
            Secure, on-premise AI for automated medical documentation.
            HIPAA-compliant, FDA-ready, and designed for modern healthcare.
          </p>
          <div className="relative flex gap-6">
            <Link
              to="/login"
              className="group inline-flex items-center px-8 py-3 text-lg font-light tracking-wide text-white dark:text-neo-gray-800 bg-neo-gray-800 dark:bg-neo-gray-100 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            >
              Try the Demo
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="group inline-flex items-center px-8 py-3 text-lg font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 border border-neo-gray-300 dark:border-neo-gray-700 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            >
              Learn More
              <div className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-y-1">↓</div>
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-6 py-20">
        <div className="mb-16 group">
          <h2 className="text-4xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-4 transition-all duration-500 group-hover:tracking-normal">
            Built for Secure, On-Site Medical Use
          </h2>
          <div className="w-20 h-1 bg-neo-gray-800 dark:bg-neo-gray-100 transition-all duration-500 group-hover:w-32"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title="Edge AI Processing"
            description="All ML runs locally on secure IoT devices. No patient data ever leaves your premises."
          />
          <FeatureCard
            icon={Shield}
            title="HIPAA-Grade Security"
            description="End-to-end encryption with WebRTC. Full compliance with healthcare privacy standards."
          />
          <FeatureCard
            icon={Cpu}
            title="Medical-Grade Models"
            description="Fine-tuned on ICD-10 codes and medical best practices. FDA-ready implementation."
          />
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 border-t border-neo-gray-200 dark:border-neo-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="group mb-16">
              <h2 className="text-4xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-4 transition-all duration-500 group-hover:tracking-normal">
                Cutting-Edge Technology
              </h2>
              <div className="w-20 h-1 bg-neo-gray-800 dark:bg-neo-gray-100 transition-all duration-500 group-hover:w-32"></div>
            </div>
            <div className="grid gap-6">
              {[
                ['Local Processing', 'All data processing happens on your local device, ensuring maximum privacy and speed.'],
                ['Real-time Transcription', 'Optimized speech recognition for medical terminology with noise cancellation.'],
                ['Structured Documentation', 'Generate complete SOAP notes directly from speech in seconds.'],
              ].map(([title, text], i) => (
                <div
                  key={i}
                  className="group backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 p-6 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-xl font-light text-neo-gray-800 dark:text-neo-gray-100 mb-2 transition-all duration-500 group-hover:translate-x-1">{title}</h3>
                  <p className="text-neo-gray-600 dark:text-neo-gray-300 font-light transition-all duration-500 group-hover:translate-x-1">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-neo-gray-200 dark:border-neo-gray-800">
        <div className="container mx-auto px-6 text-center text-sm text-neo-gray-600 dark:text-neo-gray-400 font-light">
          © 2025 MedAI Notes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;