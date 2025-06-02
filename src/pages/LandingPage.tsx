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
  <div className="group backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-sm p-8 transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
    <div className="w-16 h-16 bg-neo-gray-100 dark:bg-neo-gray-800 rounded-sm flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
      <Icon className="w-8 h-8 text-neo-gray-800 dark:text-neo-gray-100" />
    </div>
    <h3 className="text-3xl font-light mb-4 text-neo-gray-800 dark:text-neo-gray-100">{title}</h3>
    <p className="text-lg text-neo-gray-600 dark:text-neo-gray-300 font-light leading-relaxed">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/10 dark:border-white/5 z-50">
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <Link to="/" className="text-3xl font-light tracking-wider text-neo-gray-800 dark:text-neo-gray-100 transition-all duration-300 hover:tracking-widest">
            MED<span className="font-normal">AI</span>
          </Link>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-all duration-300 group"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-neo-gray-100 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon className="w-6 h-6 text-neo-gray-800 transition-transform duration-300 group-hover:-rotate-90" />
              )}
            </button>
            <Link
              to="/login"
              className="relative px-8 py-3 bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 text-lg font-light tracking-wide rounded-sm overflow-hidden group"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                Try Demo
              </span>
              <div className="absolute inset-0 bg-neo-gray-700 dark:bg-neo-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 pt-48 pb-32">
        <div className="max-w-5xl relative">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <h1 className="relative text-7xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-8 leading-tight transition-all duration-500 hover:tracking-normal">
            Transform Medical Documentation with Edge AI
          </h1>
          <p className="relative text-2xl font-light text-neo-gray-600 dark:text-neo-gray-300 mb-12 max-w-3xl leading-relaxed">
            Secure, on-premise AI for automated medical documentation.
            HIPAA-compliant, FDA-ready, and designed for modern healthcare.
          </p>
          <div className="relative flex gap-8">
            <Link
              to="/login"
              className="group inline-flex items-center px-10 py-4 text-xl font-light tracking-wide text-white dark:text-neo-gray-800 bg-neo-gray-800 dark:bg-neo-gray-100 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            >
              Try the Demo
              <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
            <a
              href="#features"
              className="group inline-flex items-center px-10 py-4 text-xl font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 border-2 border-neo-gray-300 dark:border-neo-gray-700 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
            >
              Learn More
              <div className="ml-3 w-6 h-6 transition-transform duration-500 group-hover:translate-y-2">↓</div>
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-8 py-32">
        <div className="mb-24 group">
          <h2 className="text-5xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-6 transition-all duration-500 group-hover:tracking-normal">
            Built for Secure, On-Site Medical Use
          </h2>
          <div className="w-24 h-1 bg-neo-gray-800 dark:bg-neo-gray-100 transition-all duration-500 group-hover:w-40"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
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
      <div className="py-32 border-t border-neo-gray-200 dark:border-neo-gray-800">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl">
            <div className="group mb-24">
              <h2 className="text-5xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-6 transition-all duration-500 group-hover:tracking-normal">
                Cutting-Edge Technology
              </h2>
              <div className="w-24 h-1 bg-neo-gray-800 dark:bg-neo-gray-100 transition-all duration-500 group-hover:w-40"></div>
            </div>
            <div className="grid gap-8">
              {[
                ['Local Processing', 'All data processing happens on your local device, ensuring maximum privacy and speed.'],
                ['Real-time Transcription', 'Optimized speech recognition for medical terminology with noise cancellation.'],
                ['Structured Documentation', 'Generate complete SOAP notes directly from speech in seconds.'],
              ].map(([title, text], i) => (
                <div
                  key={i}
                  className="group backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 p-8 rounded-sm transition-all duration-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-3xl font-light text-neo-gray-800 dark:text-neo-gray-100 mb-4 transition-all duration-500 group-hover:translate-x-2">{title}</h3>
                  <p className="text-lg text-neo-gray-600 dark:text-neo-gray-300 font-light leading-relaxed transition-all duration-500 group-hover:translate-x-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-neo-gray-200 dark:border-neo-gray-800">
        <div className="container mx-auto px-8 text-center text-lg text-neo-gray-600 dark:text-neo-gray-400 font-light">
          © 2025 MedAI Notes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;