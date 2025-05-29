import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Brain, ArrowRight, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark rounded-xl p-6 shadow-lg border border-white/10">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-sm bg-white/30 dark:bg-black/30 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">MedAI</Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Medical Documentation with Edge AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Secure, on-premise AI for automated medical documentation. 
            HIPAA-compliant, FDA-ready, and designed for modern healthcare.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/login" 
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try the Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a 
              href="#features" 
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Abstract Hero Image */}
      <div className="relative h-64 mb-16">
        <img 
          src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Abstract Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50 dark:to-gray-900"></div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our platform leverages the latest advancements in edge computing and artificial intelligence
                to provide secure, efficient, and accurate medical documentation.
              </p>
              <img 
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Abstract Technology"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div className="backdrop-blur-sm bg-white/50 dark:bg-black/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Local Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All data processing happens on your local device, ensuring maximum privacy and security.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/50 dark:bg-black/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Transcription
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced speech recognition optimized for medical terminology and ambient noise reduction.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/50 dark:bg-black/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Structured Documentation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automatically generate structured SOAP notes from transcribed conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 dark:bg-black/10 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 MedAI Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;