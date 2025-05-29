import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Brain, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transcribe & Structure Medical Visits Instantly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure, on-premise AI for automated medical documentation. 
            HIPAA-compliant, FDA-ready, and designed for healthcare professionals.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try the Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
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

      {/* Trust Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our platform is designed to meet the highest standards of medical documentation 
              while maintaining complete patient privacy and data security.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Learn More About Compliance
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 AI Medical Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;