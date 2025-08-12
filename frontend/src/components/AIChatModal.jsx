import { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import apiClient from '../services/api';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AIChatModal = ({ isOpen, setIsOpen, lessonContext }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Set the initial greeting when the modal opens
  useEffect(() => {
    if (isOpen && lessonContext) {
      setMessages([
        { from: 'ai', text: `Hi! I'm your AI tutor. Ask me anything about "${lessonContext.title.en}"!` }
      ]);
    }
  }, [isOpen, lessonContext]);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await apiClient.post('/ai/ask', {
        question: currentInput,
        lessonId: lessonContext._id,
      });
      const aiMessage = { from: 'ai', text: data.answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // --- FIX IS HERE ---
      // We now log the actual error to the console for debugging.
      console.error("AI chat error:", error); 
      const errorMessage = { from: 'ai', text: "I'm having trouble connecting right now. Please try again in a moment." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-xl bg-surface dark:bg-dark-surface flex flex-col h-[80vh] shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-600 flex justify-between items-center flex-shrink-0">
            <Dialog.Title className="font-bold text-lg text-on-surface dark:text-dark-on-surface">AI Tutor</Dialog.Title>
            <button onClick={() => setIsOpen(false)} className="text-on-surface/70 dark:text-dark-on-surface/70 hover:text-on-surface dark:hover:text-dark-on-surface">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.from === 'ai' ? 'bg-gray-200 dark:bg-gray-700 text-on-surface dark:text-dark-on-surface rounded-bl-none' : 'bg-primary text-white rounded-br-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-600 flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-primary text-white rounded-full disabled:bg-gray-400 hover:bg-primary/90 transition-colors">
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AIChatModal;