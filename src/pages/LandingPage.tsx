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
  <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark rounded-2xl p-6 shadow-xl border border-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400/30">
    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-white/30 dark:bg-black/30 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            MedAI
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
            </button>
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-36 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Transform Medical Documentation with Edge AI
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Secure, on-premise AI for automated medical documentation.
          HIPAA-compliant, FDA-ready, and designed for modern healthcare.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Try the Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 mb-20">
        <img
          src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Abstract Tech"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50 dark:to-gray-900"></div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Secure, On-Site Medical Use
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            MedAI combines edge processing with medical-grade intelligence to give you fast, private, and accurate documentation.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
      <div className="bg-blue-50 dark:bg-gray-800/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Cutting-Edge Technology
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Leveraging the power of real-time transcription, local processing, and structured generation to streamline every patient encounter.
              </p>
              <img
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Technology"
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              {[
                ['Local Processing', 'All data processing happens on your local device, ensuring maximum privacy and speed.'],
                ['Real-time Transcription', 'Optimized speech recognition for medical terminology with noise cancellation.'],
                ['Structured Documentation', 'Generate complete SOAP notes directly from speech in seconds.'],
              ].map(([title, text], i) => (
                <div
                  key={i}
                  className="transition hover:shadow-lg backdrop-blur-md bg-white/60 dark:bg-black/30 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 dark:bg-black/10 backdrop-blur-md py-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 MedAI Notes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
