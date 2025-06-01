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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-base font-light tracking-wide transition-all duration-300
        ${isActive 
          ? 'bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 translate-x-1 -translate-y-1' 
          : 'text-neo-gray-800 dark:text-neo-gray-100 hover:translate-x-1 hover:-translate-y-1'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-r border-white/5 dark:border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-light tracking-wider text-neo-gray-800 dark:text-neo-gray-100">
                MED<span className="font-normal">AI</span>
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="text-neo-gray-100" /> : <Moon className="text-neo-gray-800" />}
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
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-red-600 dark:text-red-400 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-light tracking-wide">Sign Out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {/* Status Bar */}
          <header className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-b border-white/5 dark:border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center ${deviceConnected ? 'text-green-600 dark:text-green-400' : 'text-neo-gray-500 dark:text-neo-gray-400'}`}>
                  <Cpu className="w-5 h-5 mr-2" />
                  <span className="text-sm font-light">{deviceConnected ? 'Device Connected' : 'Device Disconnected'}</span>
                </div>
                <div className={`flex items-center ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-neo-gray-500 dark:text-neo-gray-400'}`}>
                  {isRecording ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
                  <span className="text-sm font-light">{isRecording ? 'Recording' : 'Not Recording'}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDeviceConnection}
                  className={`px-6 py-2 rounded-sm font-light tracking-wide transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 ${
                    deviceConnected 
                      ? 'bg-red-600 text-white dark:text-white' 
                      : 'bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800'
                  }`}
                >
                  {deviceConnected ? 'Disconnect' : 'Connect Device'}
                </button>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  disabled={!deviceConnected}
                  className={`px-6 py-2 rounded-sm font-light tracking-wide transition-all duration-300 hover:translate-x-1 hover:-translate-y-1
                    ${isRecording
                      ? 'bg-red-600 text-white'
                      : 'bg-green-600 text-white'
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
              <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-sm p-6">
                <h2 className="text-xl font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-4">Live Transcription</h2>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 rounded-sm resize-none backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 text-neo-gray-800 dark:text-neo-gray-100 font-light focus:outline-none focus:ring-2 focus:ring-neo-gray-800 dark:focus:ring-neo-gray-100 transition-all duration-300"
                  placeholder="Transcription will appear here..."
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={generateSOAP}
                    disabled={!transcript.trim()}
                    className="px-6 py-2 rounded-sm bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate SOAP Note
                  </button>
                </div>
              </div>

              {/* SOAP Note */}
              <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-sm p-6">
                <h2 className="text-xl font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-4">SOAP Note</h2>
                <div className="space-y-4">
                  {Object.entries(soapNote).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-2 capitalize">
                        {key}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => setSOAPNote(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full h-32 p-3 rounded-sm resize-none backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 text-neo-gray-800 dark:text-neo-gray-100 font-light focus:outline-none focus:ring-2 focus:ring-neo-gray-800 dark:focus:ring-neo-gray-100 transition-all duration-300"
                        placeholder={`Enter ${key} notes...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unsupported Warning */}
            {!isSupported && (
              <div className="mt-6 backdrop-blur-sm bg-red-500/10 dark:bg-red-500/5 border border-red-500/20 dark:border-red-500/10 rounded-sm p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <p className="text-sm font-light text-red-800 dark:text-red-200">
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