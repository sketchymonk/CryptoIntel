import React from 'react';
import { SavedAnalysis } from '../types';

interface SavedAnalysesModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyses: SavedAnalysis[];
  onLoad: (analysis: SavedAnalysis) => void;
  onDelete: (id: string) => void;
}

const SavedAnalysesModal: React.FC<SavedAnalysesModalProps> = ({ isOpen, onClose, analyses, onLoad, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-700 transform transition-transform duration-300 scale-95"
        onClick={e => e.stopPropagation()}
        style={isOpen ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.95)', opacity: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-purple-400">Saved Analyses</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-3xl leading-none font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {analyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7V3m0 18v-4" />
               </svg>
              <p className="text-lg">No saved analyses yet.</p>
              <p className="text-sm">Run an analysis and click "Save Analysis" to see it here.</p>
            </div>
          ) : (
            analyses.map(analysis => (
              <div key={analysis.id} className="bg-gray-700/50 p-3 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-200">{analysis.title}</h3>
                  <p className="text-sm text-gray-400">
                    Saved on: {new Date(analysis.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button 
                    onClick={() => onLoad(analysis)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
                  >
                    Load
                  </button>
                  <button 
                    onClick={() => onDelete(analysis.id)} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedAnalysesModal;
