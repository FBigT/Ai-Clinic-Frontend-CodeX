import React, { useState } from 'react';
import { Mic, MicOff, Cpu, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

const NotesApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(false);
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
    // In a real app, implement WebRTC connection to IoT device
    setDeviceConnected(!deviceConnected);
  };

  const generateSOAP = () => {
    // In a real app, this would use the edge AI to analyze the transcript
    setSOAPNote({
      subjective: "Patient reports...",
      objective: "Vital signs...",
      assessment: "Based on examination...",
      plan: "Treatment plan includes..."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Status Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${deviceConnected ? 'text-green-600' : 'text-gray-400'}`}>
              <Cpu className="w-5 h-5 mr-2" />
              <span>{deviceConnected ? 'Device Connected' : 'Device Disconnected'}</span>
            </div>
            <div className={`flex items-center ${isRecording ? 'text-red-600' : 'text-gray-400'}`}>
              {isRecording ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
              <span>{isRecording ? 'Recording' : 'Not Recording'}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDeviceConnection}
              className={`px-4 py-2 rounded-lg font-medium ${
                deviceConnected 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {deviceConnected ? 'Disconnect Device' : 'Connect Device'}
            </button>
            <button
              onClick={() => setIsRecording(!isRecording)}
              disabled={!deviceConnected}
              className={`px-4 py-2 rounded-lg font-medium ${
                isRecording
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } ${!deviceConnected && 'opacity-50 cursor-not-allowed'}`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transcription Area */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Live Transcription</h2>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full h-[calc(100vh-400px)] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Transcription will appear here..."
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={generateSOAP}
                disabled={!transcript.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate SOAP Note
              </button>
            </div>
          </div>

          {/* SOAP Note Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">SOAP Note</h2>
            <div className="space-y-4">
              {Object.entries(soapNote).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key}
                  </label>
                  <textarea
                    value={value}
                    onChange={(e) => setSOAPNote(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter ${key} notes...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isSupported && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-700">
              Speech recognition is not supported in your browser. Please use a modern browser like Chrome or Edge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;