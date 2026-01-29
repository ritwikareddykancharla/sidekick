interface ChatBubbleProps {
    role: 'user' | 'model';
    text: string;
}

export function ChatBubble({ role, text }: ChatBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-wrap ${isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
            >
                {text}
            </div>
        </div>
    );
}
