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
  <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-lg p-6 transition-all duration-300 hover:translate-x-1 hover:-translate-y-1">
    <div className="w-14 h-14 bg-neo-gray-100 dark:bg-neo-gray-800 rounded-sm flex items-center justify-center mb-4">
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
          <Link to="/" className="text-2xl font-light tracking-wider text-neo-gray-800 dark:text-neo-gray-100">
            MED<span className="font-normal">AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="text-neo-gray-100" /> : <Moon className="text-neo-gray-800" />}
            </button>
            <Link
              to="/login"
              className="px-6 py-2 bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide rounded-sm hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-36 pb-20">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-6 leading-tight">
            Transform Medical Documentation with Edge AI
          </h1>
          <p className="text-xl font-light text-neo-gray-600 dark:text-neo-gray-300 mb-10 max-w-2xl">
            Secure, on-premise AI for automated medical documentation.
            HIPAA-compliant, FDA-ready, and designed for modern healthcare.
          </p>
          <div className="flex gap-6">
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-3 text-lg font-light tracking-wide text-white dark:text-neo-gray-800 bg-neo-gray-800 dark:bg-neo-gray-100 rounded-sm hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              Try the Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-3 text-lg font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 border border-neo-gray-300 dark:border-neo-gray-700 rounded-sm hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-4xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-4">
            Built for Secure, On-Site Medical Use
          </h2>
          <div className="w-20 h-1 bg-neo-gray-800 dark:bg-neo-gray-100"></div>
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
            <h2 className="text-4xl font-light tracking-tight text-neo-gray-800 dark:text-neo-gray-100 mb-4">
              Cutting-Edge Technology
            </h2>
            <div className="w-20 h-1 bg-neo-gray-800 dark:bg-neo-gray-100 mb-8"></div>
            <div className="grid gap-6">
              {[
                ['Local Processing', 'All data processing happens on your local device, ensuring maximum privacy and speed.'],
                ['Real-time Transcription', 'Optimized speech recognition for medical terminology with noise cancellation.'],
                ['Structured Documentation', 'Generate complete SOAP notes directly from speech in seconds.'],
              ].map(([title, text], i) => (
                <div
                  key={i}
                  className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 p-6 rounded-sm transition-all duration-300 hover:translate-x-1 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-light text-neo-gray-800 dark:text-neo-gray-100 mb-2">{title}</h3>
                  <p className="text-neo-gray-600 dark:text-neo-gray-300 font-light">{text}</p>
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