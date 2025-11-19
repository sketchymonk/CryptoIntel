
import React, { useState, useMemo, useEffect } from 'react';
import { GroundingChunk } from '../types';
import JsonExplorer from './JsonExplorer';

interface OutputDisplayProps {
  title: string;
  text: string;
  isMarkdown?: boolean;
  groundingChunks?: GroundingChunk[];
}

// Helper to try and extract JSON from the output text
const extractJson = (text: string): any | null => {
  if (!text) return null;

  // 1. Try extracting from a markdown code block
  const jsonBlockRegex = /```json\n([\s\S]*?)\n```/;
  const match = text.match(jsonBlockRegex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      // Continue to next method
    }
  }

  // 2. Try parsing the entire text (in case it's raw JSON)
  try {
    const parsed = JSON.parse(text);
    if (parsed && (typeof parsed === 'object' || Array.isArray(parsed))) {
        return parsed;
    }
  } catch (e) {
    // Not valid JSON
  }

  return null;
};

const OutputDisplay: React.FC<OutputDisplayProps> = ({ title, text, isMarkdown = false, groundingChunks }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'text' | 'data'>('text');

  const jsonData = useMemo(() => extractJson(text), [text]);

  // Auto-switch to data view if valid JSON is detected and it's the primary content
  useEffect(() => {
    if (jsonData) {
        setViewMode('data');
    } else {
        setViewMode('text');
    }
  }, [jsonData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileType = jsonData && viewMode === 'data' ? 'application/json' : 'text/markdown';
    const fileExtension = jsonData && viewMode === 'data' ? 'json' : 'md';
    const content = jsonData && viewMode === 'data' ? JSON.stringify(jsonData, null, 2) : text;

    const file = new Blob([content], {type: fileType});
    element.href = URL.createObjectURL(file);
    
    // Sanitize title for filename
    const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    element.download = `${filename}.${fileExtension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative flex flex-col min-h-[400px] max-h-[800px]">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-purple-400">{title}</h3>
            {jsonData && (
                <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
                    <button
                        onClick={() => setViewMode('text')}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                            viewMode === 'text' 
                            ? 'bg-gray-700 text-white shadow' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Report
                    </button>
                    <button
                        onClick={() => setViewMode('data')}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                            viewMode === 'data' 
                            ? 'bg-purple-700 text-white shadow' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Interactive Data
                    </button>
                </div>
            )}
        </div>

        <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-1 px-3 rounded-md text-sm transition flex items-center gap-2"
              title={viewMode === 'data' ? "Download JSON" : "Download Markdown"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export
            </button>
            <button
              onClick={handleCopy}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-1 px-3 rounded-md text-sm transition flex items-center gap-2"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {viewMode === 'data' && jsonData ? (
            <JsonExplorer data={jsonData} />
        ) : (
            <div className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-y-auto flex-1 custom-scrollbar">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    <code>{text}</code>
                </pre>
                {groundingChunks && groundingChunks.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-400 mb-2 font-sans">Sources from Google Search:</h4>
                    <ul className="list-disc list-inside space-y-1 font-sans">
                    {groundingChunks.map((chunk, index) => (
                        chunk.web && chunk.web.uri && (
                        <li key={index} className="truncate">
                            <a 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline"
                            title={chunk.web.title || chunk.web.uri}
                            >
                            {chunk.web.title || chunk.web.uri}
                            </a>
                        </li>
                        )
                    ))}
                    </ul>
                </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
