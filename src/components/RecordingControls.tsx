import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  onToggleRecording,
}) => {
  return (
    <div className="backdrop-blur-sm bg-glass-light dark:bg-glass-dark border-l-2 border-t-2 border-white/5 dark:border-white/10 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-light text-neo-gray-800 dark:text-neo-gray-100 mb-1">
          Meeting Recording
        </h2>
        <p className="text-sm font-light text-neo-gray-600 dark:text-neo-gray-300 max-w-md">
          {isRecording
            ? "Currently recording... Speak clearly and we'll transcribe what you say."
            : "Click the microphone button to start recording your meeting."}
        </p>
      </div>

      <button
        onClick={onToggleRecording}
        className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md transition-all duration-300
          ${isRecording
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-neo-gray-800 dark:bg-neo-gray-100 text-white dark:text-neo-gray-800 hover:translate-x-1 hover:-translate-y-1'}`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default RecordingControls;
