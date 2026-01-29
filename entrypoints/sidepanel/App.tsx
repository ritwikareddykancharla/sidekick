import { useRef, useEffect } from 'react';
import { ChatBubble } from './components/ChatBubble';
import { useChat } from './hooks/useChat';

function App() {
    const { messages, isLoading, sendMessage } = useChat();
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputRef.current?.value.trim();
        if (text) {
            sendMessage(text);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="p-4 bg-white border-b border-gray-200 shadow-sm z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Sidekick</h1>
                        <p className="text-xs text-green-600 font-medium">● Online • Gemini 3 Flash</p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {messages.map(msg => (
                    <ChatBubble key={msg.id} role={msg.role} text={msg.text} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-500 animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </main>

            {/* Input Area */}
            <footer className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask Sidekick..."
                        className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                        </svg>
                    </button>
                </form>
            </footer>
        </div>
    );
}

export default App;
