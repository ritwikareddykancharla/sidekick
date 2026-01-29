import { useState, useCallback } from 'react';
import { model } from '../../../utils/gemini';

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'model', text: 'Hi! I\'m Sidekick. How can I help you coding today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (text: string) => {
        const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Stream the response
            const result = await model.generateContentStream(text);

            let fullText = '';
            const botMsgId = (Date.now() + 1).toString();

            // Initial placeholder
            setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                setMessages(prev => prev.map(msg =>
                    msg.id === botMsgId ? { ...msg, text: fullText } : msg
                ));
            }
        } catch (error) {
            console.error('Gemini Error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                role: 'model',
                text: 'Sorry, I encountered an error connecting to Gemini.'
            }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { messages, isLoading, sendMessage };
}
