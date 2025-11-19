
import React, { useState, useMemo, useEffect } from 'react';

interface JsonExplorerProps {
  data: any;
}

interface JsonNodeProps {
  name: string;
  value: any;
  depth?: number;
  filterText: string;
  isLast: boolean;
}

const getTypeColor = (value: any) => {
  if (value === null) return 'text-gray-500';
  switch (typeof value) {
    case 'string': return 'text-green-400';
    case 'number': return 'text-orange-400';
    case 'boolean': return 'text-red-400';
    default: return 'text-gray-300';
  }
};

// Helper to check if a node or its children match the filter
const checkMatch = (key: string, value: any, term: string): boolean => {
  if (!term) return true;
  const lowerTerm = term.toLowerCase();
  
  // Check current key
  if (key.toLowerCase().includes(lowerTerm)) return true;
  
  // Check primitive value
  if (value !== null && typeof value !== 'object') {
    return String(value).toLowerCase().includes(lowerTerm);
  }
  
  // Check children (recursive)
  if (value && typeof value === 'object') {
    return Object.entries(value).some(([k, v]) => checkMatch(k, v, term));
  }
  
  return false;
};

const JsonNode: React.FC<JsonNodeProps> = ({ name, value, depth = 0, filterText, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty = isObject && Object.keys(value).length === 0;
  
  // Determine if this node should be visible
  const isVisible = useMemo(() => checkMatch(name, value, filterText), [name, value, filterText]);
  
  // Auto-expand if user is searching and this node contains a match
  useEffect(() => {
    if (filterText && isVisible && isObject) {
      setIsExpanded(true);
    }
  }, [filterText, isVisible, isObject]);

  if (!isVisible) return null;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const indent = depth * 1.5; // rem

  if (!isObject) {
    return (
      <div className="font-mono text-sm hover:bg-gray-700/30 py-0.5 rounded px-1 transition-colors" style={{ marginLeft: `${indent}rem` }}>
        <span className="text-purple-300 font-semibold">{name}</span>: <span className={getTypeColor(value)}>{JSON.stringify(value)}</span>
        {!isLast && <span className="text-gray-500">,</span>}
      </div>
    );
  }

  const keys = Object.keys(value);
  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';

  return (
    <div className="font-mono text-sm">
      <div 
        className="flex items-center hover:bg-gray-700/30 py-0.5 rounded px-1 cursor-pointer transition-colors select-none" 
        style={{ marginLeft: `${indent}rem` }}
        onClick={handleToggle}
      >
        <span className={`mr-1 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} text-xs`}>
          ▶
        </span>
        <span className="text-purple-300 font-semibold">{name}</span>: <span className="text-yellow-500 font-bold">{bracketOpen}</span>
        {!isExpanded && <span className="text-gray-500 italic text-xs ml-2">... {keys.length} items ... {bracketClose} {!isLast && ','}</span>}
      </div>
      
      {isExpanded && !isEmpty && (
        <div>
          {keys.map((key, index) => (
            <JsonNode 
              key={key} 
              name={key} 
              value={value[key]} 
              depth={depth + 1} 
              filterText={filterText}
              isLast={index === keys.length - 1}
            />
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="hover:bg-gray-700/30 py-0.5 rounded px-1" style={{ marginLeft: `${indent}rem` }}>
          <span className="text-yellow-500 font-bold">{bracketClose}</span>
          {!isLast && <span className="text-gray-500">,</span>}
        </div>
      )}
    </div>
  );
};

const JsonExplorer: React.FC<JsonExplorerProps> = ({ data }) => {
  const [filterText, setFilterText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopyFeedback('Copied JSON!');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 p-3 border-b border-gray-700 bg-gray-800/50">
        <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Filter keys or values..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-10 pr-3 py-1.5 bg-gray-900 border border-gray-600 rounded text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
        </div>
        <button 
            onClick={handleCopy}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded border border-gray-600 transition-colors whitespace-nowrap"
        >
            {copyFeedback || 'Copy JSON'}
        </button>
      </div>
      
      {/* Tree View */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <JsonNode 
          name="root" 
          value={data} 
          depth={0} 
          filterText={filterText} 
          isLast={true} 
        />
      </div>
    </div>
  );
};

export default JsonExplorer;
