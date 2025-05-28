import React, { useState } from 'react';
import TranscriptionArea from './TranscriptionArea';
import ExtractionResults from './ExtractionResults';
import RecordingControls from './RecordingControls';
import { ExtractedInfo } from '../types';

const MeetingAssistant: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  const handleTranscriptChange = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  const handleExtractInfo = async () => {
    if (!transcript.trim()) return;
    
    setIsExtracting(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would call an AI service
      const extracted: ExtractedInfo = {
        names: extractNames(transcript),
        dates: extractDates(transcript),
        actionItems: extractActionItems(transcript),
        concerns: extractConcerns(transcript)
      };
      
      setExtractedInfo(extracted);
    } catch (error) {
      console.error('Error extracting information:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  // Simple extraction functions (these would be more sophisticated in a real app)
  const extractNames = (text: string): string[] => {
    // This is a simplified implementation
    const nameRegex = /Mr\.\s+\w+|Mrs\.\s+\w+|Ms\.\s+\w+|Dr\.\s+\w+|\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    const matches = text.match(nameRegex) || [];
    return [...new Set(matches)];
  };

  const extractDates = (text: string): string[] => {
    // Simplified date extraction
    const dateRegex = /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b\d{1,2}-\d{1,2}-\d{2,4}\b/g;
    const matches = text.match(dateRegex) || [];
    return [...new Set(matches)];
  };

  const extractActionItems = (text: string): string[] => {
    // Look for sentences that might be action items
    const lines = text.split(/[.!?]+/);
    return lines
      .filter(line => 
        /\b(?:need to|should|will|must|have to|going to|plan to)\b/i.test(line) && 
        line.trim().length > 20
      )
      .map(line => line.trim())
      .filter(Boolean);
  };

  const extractConcerns = (text: string): string[] => {
    // Look for sentences that might express concerns
    const lines = text.split(/[.!?]+/);
    return lines
      .filter(line => 
        /\b(?:concerned|worry|issue|problem|challenge|difficult|trouble|afraid|risk)\b/i.test(line) && 
        line.trim().length > 15
      )
      .map(line => line.trim())
      .filter(Boolean);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <RecordingControls 
          isRecording={isRecording} 
          onToggleRecording={() => setIsRecording(!isRecording)} 
        />
        
        <div className="mt-6">
          <TranscriptionArea 
            transcript={transcript}
            onTranscriptChange={handleTranscriptChange}
            isRecording={isRecording}
          />
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
              ${transcript.trim() ? 
                'bg-blue-600 hover:bg-blue-700 text-white' : 
                'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={handleExtractInfo}
            disabled={!transcript.trim() || isExtracting}
          >
            {isExtracting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Extracting...
              </>
            ) : (
              'Extract Key Information'
            )}
          </button>
        </div>
        
        {extractedInfo && (
          <div className="mt-8">
            <ExtractionResults extractedInfo={extractedInfo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingAssistant;