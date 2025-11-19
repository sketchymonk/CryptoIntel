
import React, { useState } from 'react';
import Tooltip from './Tooltip';
import { helpContent } from './helpContent';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  sectionId: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, sectionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  // helpContent keys can return an object (for field help) or string (for section help).
  // We only want the string value for the section tooltip.
  const rawHelpText = helpContent[`${sectionId}_section`];
  const helpText = typeof rawHelpText === 'string' ? rawHelpText : undefined;

  return (
    <div className="border border-gray-700 bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-purple-300 hover:bg-gray-700 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1">
          {title}
          {helpText && <Tooltip content={helpText} />}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
