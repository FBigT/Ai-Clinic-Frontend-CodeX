import { useEffect, useState, useCallback, useRef } from 'react';

interface SpeechRecognitionOptions {
  onResult?: (result: string) => void;
  onError?: (error: string) => void;
  isListening: boolean;
  language?: string;
}

export const useSpeechRecognition = ({
  onResult,
  onError,
  isListening,
  language = 'en-US'
}: SpeechRecognitionOptions) => {
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  // Store recognition instance in a ref to persist between renders
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Check if the browser supports speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);
  
  // Reset transcript function
  const resetTranscript = useCallback(() => {
    setFinalTranscript('');
    setInterimTranscript('');
  }, []);
  
  // Setup and start/stop recognition based on isListening prop
  useEffect(() => {
    if (!isSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (isListening) {
      // Initialize recognition if it doesn't exist
      if (!recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;
        
        recognition.onresult = (event) => {
          let interim = '';
          let final = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }
          
          if (interim) {
            setInterimTranscript(interim);
            onResult?.(interim);
          }
          
          if (final) {
            setFinalTranscript(final);
          }
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          onError?.(event.error);
        };
        
        recognitionRef.current = recognition;
      }
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else if (recognitionRef.current) {
      // Stop recognition if it's running
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    
    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore errors when stopping during cleanup
        }
      }
    };
  }, [isListening, isSupported, language, onError, onResult]);
  
  return {
    finalTranscript,
    interimTranscript,
    resetTranscript,
    isSupported
  };
};