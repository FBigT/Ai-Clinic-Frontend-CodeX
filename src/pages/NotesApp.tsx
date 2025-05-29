import React, { useState } from 'react';
import { Mic, MicOff, Cpu, AlertCircle, Moon, Sun, Layout, FileText, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface NotesAppProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const NotesApp: React.FC<NotesAppProps> = ({ darkMode, setDarkMode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const navigate = useNavigate();
  const [soapNote, setSOAPNote] = useState<SOAPNote>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  const { finalTranscript, isSupported } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(prev => prev + ' ' + result);
    },
    isListening: isRecording
  });

  const handleDeviceConnection = () => {
    setDeviceConnected(!deviceConnected);
  };

  const generateSOAP = () => {
    setSOAPNote({
      subjective: "Patient reports...",
      objective: "Vital signs...",
      assessment: "Based on examination...",
      plan: "Treatment plan includes..."
    });
  };

    const SidebarLink = ({ icon: Icon, label, isActive }: { icon: any, label: string, isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(label.toLowerCase())}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-neo-gray-800 dark:text-neo-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
  return (
    <div className="min-h-screen bg-glass-light dark:bg-glass-dark backdrop-blur-sm text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex h-screen">
        {/* Sidebar */}
<aside className="w-64 bg-glass-light dark:bg-glass-dark backdrop-blur-sm border-r border-white/10 dark:border-white/5 p-6 flex flex-col justify-between shadow-xl rounded-r-2xl">
          <div>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">MedAI</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600 dark:text-gray-300" />}
              </button>
            </div>
            <nav className="space-y-3">
              <SidebarLink icon={Layout} label="Notes" isActive={activeTab === 'notes'} />
              <SidebarLink icon={FileText} label="History" isActive={activeTab === 'history'} />
              <SidebarLink icon={Settings} label="Settings" isActive={activeTab === 'settings'} />
            </nav>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {/* Status Bar */}
<header className="bg-glass-light dark:bg-glass-dark backdrop-blur-sm border-b border-white/10 dark:border-white/5 p-6 shadow-md rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center ${deviceConnected ? 'text-green-600 dark:text-green-400' : 'text-neo-gray-500 dark:text-neo-gray-400'}`}>
                  <Cpu className="w-5 h-5 mr-2" />
                  <span className="text-sm">{deviceConnected ? 'Device Connected' : 'Device Disconnected'}</span>
                </div>
                <div className={`flex items-center ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-neo-gray-500 dark:text-neo-gray-400'}`}>
                  {isRecording ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
                  <span className="text-sm">{isRecording ? 'Recording' : 'Not Recording'}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDeviceConnection}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    deviceConnected 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200/80 dark:hover:bg-red-900/50' 
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200/80 dark:hover:bg-blue-900/50'
                  }`}
                >
                  {deviceConnected ? 'Disconnect' : 'Connect Device'}
                </button>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  disabled={!deviceConnected}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  } ${!deviceConnected && 'opacity-50 cursor-not-allowed'}`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            </div>
          </header>

          {/* Main Panels */}
          <section className="p-6 h-[calc(100vh-96px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transcription */}
<div className="bg-glass-light dark:bg-glass-dark backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 dark:border-white/5 p-6">
                <h2 className="text-xl font-semibold mb-4">Live Transcription</h2>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 rounded-xl resize-none bg-glass-light dark:bg-glass-dark backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Transcription will appear here..."
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={generateSOAP}
                    disabled={!transcript.trim()}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate SOAP Note
                  </button>
                </div>
              </div>

              {/* SOAP Note */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4">SOAP Note</h2>
                <div className="space-y-4">
                  {Object.entries(soapNote).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                        {key}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => setSOAPNote(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full h-32 p-3 rounded-xl resize-none bg-glass-light dark:bg-glass-dark backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${key} notes...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unsupported Warning */}
            {!isSupported && (
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Speech recognition is not supported in your browser. Please use a modern browser like Chrome or Edge.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default NotesApp;