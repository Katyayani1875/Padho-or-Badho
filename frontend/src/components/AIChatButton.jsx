import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const AIChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-40"
      aria-label="Open AI Tutor"
    >
      <ChatBubbleLeftRightIcon className="h-8 w-8" />
    </button>
  );
};

export default AIChatButton;