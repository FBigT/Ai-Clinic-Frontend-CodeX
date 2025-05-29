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
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">MedAI</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
          
          <nav className="space-y-2">
            <SidebarLink icon={Layout} label="Notes" isActive={activeTab === 'notes'} />
            <SidebarLink icon={FileText} label="History" isActive={activeTab === 'history'} />
            <SidebarLink icon={Settings} label="Settings" isActive={activeTab === 'settings'} />
          </nav>

          <div className="absolute bottom-4 w-52">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Status Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${deviceConnected ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                  <Cpu className="w-5 h-5 mr-2" />
                  <span>{deviceConnected ? 'Device Connected' : 'Device Disconnected'}</span>
                </div>
                <div className={`flex items-center ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}>
                  {isRecording ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
                  <span>{isRecording ? 'Recording' : 'Not Recording'}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeviceConnection}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    deviceConnected 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40' 
                      : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40'
                  }`}
                >
                  {deviceConnected ? 'Disconnect Device' : 'Connect Device'}
                </button>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  disabled={!deviceConnected}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  } ${!deviceConnected && 'opacity-50 cursor-not-allowed'}`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 h-[calc(100vh-73px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transcription Area */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-4">Live Transcription</h2>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 rounded-lg resize-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                  placeholder="Transcription will appear here..."
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={generateSOAP}
                    disabled={!transcript.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate SOAP Note
                  </button>
                </div>
              </div>

              {/* SOAP Note Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold mb-4">SOAP Note</h2>
                <div className="space-y-4">
                  {Object.entries(soapNote).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2 capitalize">
                        {key}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => setSOAPNote(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full h-32 p-3 rounded-lg resize-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                        placeholder={`Enter ${key} notes...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!isSupported && (
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <p className="text-yellow-700 dark:text-yellow-300">
                  Speech recognition is not supported in your browser. Please use a modern browser like Chrome or Edge.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;