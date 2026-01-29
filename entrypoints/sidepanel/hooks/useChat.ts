import { useState, useCallback } from 'react';
import { geminiService } from '../../../services/gemini.service';
import { ChatMessage } from '../../../types';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'model',
            text: 'Hi! I\'m Sidekick. How can I help you coding today?',
            timestamp: Date.now()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = useCallback(async (text: string) => {
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Use Service Layer
            const result = await geminiService.generateStream(text);

            let fullText = '';
            const botMsgId = (Date.now() + 1).toString();

            // Initial placeholder
            setMessages(prev => [...prev, {
                id: botMsgId,
                role: 'model',
                text: '',
                timestamp: Date.now()
            }]);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                setMessages(prev => prev.map(msg =>
                    msg.id === botMsgId ? { ...msg, text: fullText } : msg
                ));
            }
        } catch (error) {
            console.error('Gemini Service Error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                role: 'system',
                text: 'Error connecting to AI Service. Check API Key.',
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { messages, isLoading, sendMessage };
}
