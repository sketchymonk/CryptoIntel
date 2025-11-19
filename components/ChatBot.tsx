import React, { useState, useRef, useEffect } from 'react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';
import { ChatMessage } from '../types';

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
      { role: 'model', text: 'Hi! I can help you refine your crypto research strategy. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Initialize chat once
  useEffect(() => {
      if (!chatRef.current) {
          try {
            chatRef.current = createChatSession();
          } catch (e) {
              console.error("Chat init failed:", e);
              setMessages(prev => [...prev, { role: 'model', text: 'Error: API Key missing or invalid.' }]);
          }
      }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading || !chatRef.current) return;

      const userMsg = input;
      setInput('');
      setIsLoading(true);
      
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      
      // Add placeholder for model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      try {
          const stream = await sendMessageStream(chatRef.current, userMsg);
          
          let fullText = '';
          for await (const chunk of stream) {
              const contentChunk = chunk as GenerateContentResponse;
              if (contentChunk.text) {
                  fullText += contentChunk.text;
                  
                  setMessages(prev => {
                      const newArr = [...prev];
                      // Update the last message (model's placeholder)
                      if (newArr.length > 0) {
                          newArr[newArr.length - 1] = { role: 'model', text: fullText };
                      }
                      return newArr;
                  });
              }
          }
      } catch (error) {
          console.error("Chat error", error);
          setMessages(prev => {
              const newArr = [...prev];
              newArr[newArr.length - 1] = { role: 'model', text: 'Error: Could not connect to Gemini.' };
              return newArr;
          });
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-800 rounded-xl shadow-2xl border border-gray-600 flex flex-col z-50 overflow-hidden">
      <div className="bg-purple-700 p-4 flex justify-between items-center shadow-md">
        <h3 className="font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full shadow-sm"></span>
            Research Assistant
        </h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 font-bold text-xl leading-none">&times;</button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                 m.role === 'user' 
                 ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                 : 'bg-gray-700 text-gray-200 rounded-bl-none border border-gray-600'
             }`}>
                 {m.text}
             </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1].text === '' && (
            <div className="flex justify-start">
                 <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                 </div>
            </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
        <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 placeholder-gray-400"
        />
        <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
            Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;