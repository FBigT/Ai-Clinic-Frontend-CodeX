import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({ 
  isRecording, 
  onToggleRecording 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50 p-4 rounded-lg">
      <div>
        <h2 className="text-lg font-medium text-blue-900 mb-1">Meeting Recording</h2>
        <p className="text-sm text-blue-700">
          {isRecording 
            ? "Currently recording... Speak clearly and we'll transcribe what you say"
            : "Click the microphone button to start recording your meeting"}
        </p>
      </div>
      
      <button
        onClick={onToggleRecording}
        className={`flex items-center justify-center rounded-full w-12 h-12 transition-all duration-300
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-md' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
    </div>
  );
};

export default RecordingControls;