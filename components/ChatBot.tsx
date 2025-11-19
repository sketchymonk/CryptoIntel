
import React, { useState, useRef, useEffect } from 'react';
import { getChatSession, sendMessageStream } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { ChatMessage } from '../types';

interface ChatBotProps {
  onClose: () => void;
  context?: {
    prompt: string;
    response: string;
  };
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose, context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Construct system instruction based on context
    let systemInstruction = "You are a helpful expert research assistant.";
    if (context?.prompt) {
        systemInstruction += `\n\nYou are helping the user with the following research task:\n${context.prompt}`;
    }
    if (context?.response) {
        systemInstruction += `\n\nHere is the analysis output you have already generated for them:\n${context.response.substring(0, 5000)}... [truncated for context window]`;
    }
    
    // Initialize chat
    // If context exists, we force a reset to ensure the model gets the new system prompt.
    // This useEffect will only fire if `context` prop changes. 
    // Parent component now ensures `context` is stable and doesn't change on every keystroke.
    const shouldReset = !!context?.prompt; 
    chatRef.current = getChatSession(systemInstruction, shouldReset);
    
    // If we have context, we can welcome the user appropriately.
    // If messages are empty (first load or reset), set initial message.
    setMessages(prev => {
        if (prev.length === 0 || shouldReset) {
             return [{ role: 'model', text: context?.prompt ? 'I have reviewed your active research prompt and analysis. How can I help you refine it or answer follow-up questions?' : 'Hello! How can I help you today?' }];
        }
        return prev;
    });

  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let fullResponse = '';
    const modelMessage: ChatMessage = { role: 'model', text: '...' };
    // Add the model message placeholder immediately
    setMessages(prev => [...prev, modelMessage]);

    try {
      const stream = await sendMessageStream(chatRef.current!, userMessage.text);
      let firstChunk = true;
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        if (firstChunk) {
            // Replace placeholder with the start of the actual response
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
            firstChunk = false;
        } else {
            // Update the last message with the appended text
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.role === 'model') {
            lastMsg.text = "Sorry, something went wrong. Please try again.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Start a new chat session? History will be cleared.")) {
        chatRef.current = getChatSession("You are a helpful expert research assistant.", true);
        setMessages([{ role: 'model', text: 'Chat reset. How can I help?' }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-md h-[70vh] max-h-[600px] bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-gray-700 rounded-t-lg">
        <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">Gemini Chat</h3>
            {context?.prompt && <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full border border-blue-700">Context Active</span>}
        </div>
        <div className="flex items-center gap-3">
            <button onClick={handleReset} className="text-xs text-gray-300 hover:text-white underline">Reset</button>
            <button onClick={onClose} className="text-gray-300 hover:text-white text-2xl leading-none font-bold">&times;</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-sm lg:max-w-md px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
              <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-white placeholder-gray-400"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="bg-purple-600 text-white px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors font-semibold">
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
