import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [show, setShow] = useState(false);

  // Use a combination of mouse and focus events for accessibility
  return (
    <div className="relative inline-flex items-center ml-2">
      <button 
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={(e) => { e.preventDefault(); setShow(s => !s); }} // Toggle on click for mobile
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-gray-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full flex items-center justify-center"
        aria-label="More information"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-700 text-white text-sm rounded-lg shadow-xl z-20 border border-gray-600 transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
