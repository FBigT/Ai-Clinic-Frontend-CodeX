import React, { useEffect, useRef, useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Copy, Check } from 'lucide-react';

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

  const [copied, setCopied] = useState(false);

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
    if (!transcript.trim()) return;

    navigator.clipboard.writeText(transcript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Live Transcription</h2>
        <button
          onClick={handleCopyTranscript}
          disabled={!transcript.trim()}
          className={`flex items-center px-3 py-1.5 text-sm rounded-lg transition-all duration-200
            ${transcript.trim()
              ? 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20'
              : 'text-gray-400 cursor-not-allowed'
            }`}
        >
          {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        placeholder={isRecording ? 'Listening... Speak now' : 'Transcript will appear here'}
        className={`w-full h-64 p-4 rounded-lg resize-none border focus:outline-none focus:ring-2
          transition-all duration-300
          ${isRecording
            ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-400 focus:ring-blue-500'
            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-blue-400 dark:focus:ring-blue-500'
          }`}
      />

      {isRecording && (
        <div className="absolute bottom-4 right-4 flex items-center text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-md bg-opacity-90 dark:bg-opacity-80">
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
