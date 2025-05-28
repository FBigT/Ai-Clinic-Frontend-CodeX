import React, { useEffect, useRef } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Copy } from 'lucide-react';

interface TranscriptionAreaProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  isRecording: boolean;
}

const TranscriptionArea: React.FC<TranscriptionAreaProps> = ({
  transcript,
  onTranscriptChange,
  isRecording
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { finalTranscript, resetTranscript } = useSpeechRecognition({
    onResult: (result) => {
      onTranscriptChange(transcript + ' ' + result);
    },
    isListening: isRecording
  });

  useEffect(() => {
    if (finalTranscript) {
      onTranscriptChange(transcript + ' ' + finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, resetTranscript, transcript, onTranscriptChange]);

  useEffect(() => {
    if (isRecording && textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [transcript, isRecording]);

  const handleCopyTranscript = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      
      // Visual feedback for copy action (could be replaced with a toast)
      const button = document.getElementById('copy-transcript-btn');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-700">Transcript</h2>
        <button
          id="copy-transcript-btn"
          onClick={handleCopyTranscript}
          disabled={!transcript.trim()}
          className={`text-sm flex items-center px-2 py-1 rounded
            ${transcript.trim() ? 
              'text-blue-600 hover:bg-blue-50' : 
              'text-gray-400 cursor-not-allowed'}`}
        >
          <Copy size={14} className="mr-1" />
          Copy
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        placeholder={isRecording ? "Listening... speak now" : "Transcript will appear here when you start recording"}
        className={`w-full h-64 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400
          ${isRecording ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
          transition-colors duration-300`}
      />
      
      {isRecording && (
        <div className="absolute bottom-3 right-3 flex items-center text-sm text-blue-600 bg-white bg-opacity-80 px-2 py-1 rounded-full">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          Recording...
        </div>
      )}
    </div>
  );
};

export default TranscriptionArea;