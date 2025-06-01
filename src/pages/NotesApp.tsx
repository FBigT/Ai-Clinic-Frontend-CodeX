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
          ? 'bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 translate-x-1 -translate-y-1 shadow-lg' 
          : 'text-neo-gray-800 dark:text-neo-gray-100 hover:translate-x-1 hover:-translate-y-1 hover:bg-neo-gray-200/50 dark:hover:bg-neo-gray-800/50'}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-gray-100 to-white dark:from-neo-gray-900 dark:to-black transition-colors duration-300">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-sm bg-white/80 dark:bg-glass-dark border-r border-neo-gray-200 dark:border-white/10 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-neo-gray-200 dark:border-white/10">
              <h1 className="text-2xl font-light tracking-wider text-neo-gray-800 dark:text-neo-gray-100">
                MED<span className="font-normal">AI</span>
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-sm hover:bg-neo-gray-200 dark:hover:bg-neo-gray-800 transition-colors border border-neo-gray-200 dark:border-white/10"
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
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-red-600 dark:text-red-400 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-light tracking-wide">Sign Out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-white/50 dark:bg-transparent">
          {/* Status Bar */}
          <header className="backdrop-blur-sm bg-white/80 dark:bg-glass-dark border-b border-neo-gray-200 dark:border-white/10 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center px-4 py-2 border rounded-sm ${
                  deviceConnected 
                    ? 'border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10' 
                    : 'border-neo-gray-200 dark:border-white/10'
                }`}>
                  <Cpu className="w-5 h-5 mr-2" />
                  <span className="text-sm font-light">{deviceConnected ? 'Device Connected' : 'Device Disconnected'}</span>
                </div>
                <div className={`flex items-center px-4 py-2 border rounded-sm ${
                  isRecording 
                    ? 'border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10' 
                    : 'border-neo-gray-200 dark:border-white/10'
                }`}>
                  {isRecording ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
                  <span className="text-sm font-light">{isRecording ? 'Recording' : 'Not Recording'}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDeviceConnection}
                  className={`px-6 py-2 rounded-sm font-light tracking-wide transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-sm border ${
                    deviceConnected 
                      ? 'bg-red-600 text-white border-red-700 hover:bg-red-700' 
                      : 'bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 border-neo-gray-900 dark:border-neo-gray-200'
                  }`}
                >
                  {deviceConnected ? 'Disconnect' : 'Connect Device'}
                </button>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  disabled={!deviceConnected}
                  className={`px-6 py-2 rounded-sm font-light tracking-wide transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-sm border
                    ${isRecording
                      ? 'bg-red-600 text-white border-red-700 hover:bg-red-700'
                      : 'bg-green-600 text-white border-green-700 hover:bg-green-700'
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
              <div className="backdrop-blur-sm bg-white/80 dark:bg-glass-dark border border-neo-gray-200 dark:border-white/10 rounded-sm p-6 shadow-lg">
                <h2 className="text-xl font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-4 pb-3 border-b border-neo-gray-200 dark:border-white/10">
                  Live Transcription
                </h2>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 rounded-sm resize-none bg-white dark:bg-black/5 border border-neo-gray-200 dark:border-white/5 text-neo-gray-800 dark:text-neo-gray-100 font-light focus:outline-none focus:ring-2 focus:ring-neo-gray-800 dark:focus:ring-neo-gray-100 transition-all duration-300 shadow-inner"
                  placeholder="Transcription will appear here..."
                />
                <div className="mt-4 pt-3 flex justify-end border-t border-neo-gray-200 dark:border-white/10">
                  <button
                    onClick={generateSOAP}
                    disabled={!transcript.trim()}
                    className="px-6 py-2 rounded-sm bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 font-light tracking-wide hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-neo-gray-900 dark:border-neo-gray-200"
                  >
                    Generate SOAP Note
                  </button>
                </div>
              </div>

              {/* SOAP Note */}
              <div className="backdrop-blur-sm bg-white/80 dark:bg-glass-dark border border-neo-gray-200 dark:border-white/10 rounded-sm p-6 shadow-lg">
                <h2 className="text-xl font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-4 pb-3 border-b border-neo-gray-200 dark:border-white/10">
                  SOAP Note
                </h2>
                <div className="space-y-4">
                  {Object.entries(soapNote).map(([key, value]) => (
                    <div key={key} className="p-3 border border-neo-gray-200 dark:border-white/10 rounded-sm">
                      <label className="block text-sm font-light tracking-wide text-neo-gray-800 dark:text-neo-gray-100 mb-2 capitalize">
                        {key}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => setSOAPNote(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full h-32 p-3 rounded-sm resize-none bg-white dark:bg-black/5 border border-neo-gray-200 dark:border-white/5 text-neo-gray-800 dark:text-neo-gray-100 font-light focus:outline-none focus:ring-2 focus:ring-neo-gray-800 dark:focus:ring-neo-gray-100 transition-all duration-300 shadow-inner"
                        placeholder={`Enter ${key} notes...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unsupported Warning */}
            {!isSupported && (
              <div className="mt-6 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/10 rounded-sm p-4 flex items-center shadow-sm">
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