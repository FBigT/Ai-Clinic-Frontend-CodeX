import React from 'react';
import MeetingAssistant from './components/MeetingAssistant';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Meeting Assistant</h1>
          <p className="text-slate-600">AI-powered transcription and information extraction for client meetings</p>
        </header>
        
        <MeetingAssistant />
        
        <footer className="mt-12 pt-6 border-t border-blue-100 text-center text-sm text-slate-500">
          <p>© 2025 Meeting Assistant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;