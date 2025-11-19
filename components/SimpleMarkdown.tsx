
import React from 'react';

interface SimpleMarkdownProps {
  text: string;
}

const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  let inCodeBlock = false;

  return (
    <div className="space-y-2 text-gray-200 font-sans leading-relaxed">
      {lines.map((line, i) => {
        // Handle code blocks simple toggle
        if (line.trim().startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          return null; // Hide the backticks line for simplicity in this view
        }

        if (inCodeBlock) {
          return <div key={i} className="font-mono text-sm text-yellow-400 bg-gray-900/50 px-2">{line}</div>;
        }

        // Headers
        if (line.startsWith('#### ')) {
            return <h4 key={i} className="text-lg font-bold text-purple-300 mt-4 mb-2">{formatInline(line.replace('#### ', ''))}</h4>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-bold text-purple-400 mt-6 mb-2 border-b border-gray-700 pb-1">{formatInline(line.replace('### ', ''))}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-extrabold text-white mt-8 mb-3">{formatInline(line.replace('## ', ''))}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={i} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">{formatInline(line.replace('# ', ''))}</h1>;
        }

        // List Items
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            const content = line.trim().substring(2);
            return (
                <div key={i} className="flex items-start gap-2 ml-4 mb-1">
                    <span className="text-purple-500 mt-1.5 text-[10px]">●</span>
                    <span>{formatInline(content)}</span>
                </div>
            );
        }
        
        // Empty lines
        if (!line.trim()) {
            return <div key={i} className="h-2"></div>;
        }

        // Standard paragraph
        return <p key={i} className="mb-1">{formatInline(line)}</p>;
      })}
    </div>
  );
};

// Helper to handle bold text like **text**
const formatInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </>
    );
};

export default SimpleMarkdown;
