import React, { useState } from 'react';
import { Copy, Check, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { ExtractedInfo } from '../types';

interface ExtractionResultsProps {
  extractedInfo: ExtractedInfo;
}

const ExtractionResults: React.FC<ExtractionResultsProps> = ({ extractedInfo }) => {
  const [copied, setCopied] = useState(false);
  
  const hasResults = 
    extractedInfo.names.length > 0 || 
    extractedInfo.dates.length > 0 || 
    extractedInfo.actionItems.length > 0 || 
    extractedInfo.concerns.length > 0;
  
  const copyAllResults = () => {
    const sections = [
      extractedInfo.names.length > 0 ? `People: ${extractedInfo.names.join(', ')}` : '',
      extractedInfo.dates.length > 0 ? `Dates: ${extractedInfo.dates.join(', ')}` : '',
      extractedInfo.actionItems.length > 0 ? `Action Items:\n- ${extractedInfo.actionItems.join('\n- ')}` : '',
      extractedInfo.concerns.length > 0 ? `Concerns/Issues:\n- ${extractedInfo.concerns.join('\n- ')}` : ''
    ].filter(Boolean).join('\n\n');
    
    navigator.clipboard.writeText(sections);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderSection = (
    title: string, 
    items: string[], 
    icon: React.ReactNode
  ) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="mr-2 text-blue-600">{icon}</div>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
        <div className="ml-7">
          {items.map((item, index) => (
            <div 
              key={index}
              className="mb-1 text-gray-700 bg-blue-50 p-2 rounded-md"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white border border-blue-100 rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-blue-900">Extracted Information</h2>
        {hasResults && (
          <button 
            onClick={copyAllResults}
            className="text-sm flex items-center px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="mr-1.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-1.5" />
                Copy All
              </>
            )}
          </button>
        )}
      </div>
      
      {hasResults ? (
        <div className="space-y-4">
          {renderSection("People", extractedInfo.names, <User size={18} />)}
          {renderSection("Dates", extractedInfo.dates, <Calendar size={18} />)}
          {renderSection("Action Items", extractedInfo.actionItems, <CheckCircle size={18} />)}
          {renderSection("Concerns/Issues", extractedInfo.concerns, <AlertCircle size={18} />)}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No information extracted. Try with more detailed content.</p>
        </div>
      )}
    </div>
  );
};

export default ExtractionResults;