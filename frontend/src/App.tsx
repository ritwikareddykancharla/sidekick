import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles, Terminal, Code2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
  tool_calls?: string[];
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Prepare history
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const response = await axios.post('/api/chat', {
        message: userMsg.content,
        history: history
      });

      const botMsg: Message = {
        role: 'model',
        content: response.data.response,
        tool_calls: response.data.tool_calls
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ Error connecting to Nexus." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '1200px', margin: '0 auto', background: '#0f172a' }}>
      
      {/* Header */}
      <header style={{ padding: '1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.6rem', borderRadius: '0.75rem' }}>
          <Sparkles color="white" size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Nexus Sidekick</h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>Gemini 3 Powered Agentic Workspace</p>
        </div>
      </header>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#475569', marginTop: '5rem' }}>
            <Sparkles size={64} style={{ margin: '0 auto 1rem auto', opacity: 0.2 }} />
            <h2 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>What are we building today?</h2>
            <p>Ask me to solve a Kaggle problem, write a paper, or analyze code.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              background: msg.role === 'user' ? '#334155' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            
            <div style={{ maxWidth: '85%' }}>
              {/* Tool Execution Logs */}
              {msg.tool_calls && msg.tool_calls.length > 0 && (
                <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {msg.tool_calls.map((log, i) => (
                    <div key={i} style={{ 
                      background: '#1e293b', padding: '0.75rem', borderRadius: '0.5rem', 
                      fontFamily: 'monospace', fontSize: '0.85rem', color: '#94a3b8',
                      borderLeft: '3px solid #6366f1', display: 'flex', gap: '0.5rem', alignItems: 'center'
                    }}>
                      <Terminal size={14} /> {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Message Content */}
              <div style={{ 
                background: msg.role === 'user' ? '#334155' : '#1e293b', 
                color: '#f8fafc',
                padding: '1.5rem', 
                borderRadius: '1rem',
                borderTopRightRadius: msg.role === 'user' ? '0' : '1rem',
                borderTopLeftRadius: msg.role === 'model' ? '0' : '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="prose" style={{ lineHeight: 1.6 }}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: '#94a3b8' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Bot size={18} />
            </div>
            <p>Nexus is thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '2rem', borderTop: '1px solid #1e293b', background: '#0f172a' }}>
        <div style={{ display: 'flex', gap: '1rem', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your task (e.g., 'Load titanic.csv and train a model')..."
            style={{
              flex: 1,
              padding: '1.25rem 1.5rem',
              borderRadius: '1rem',
              border: '1px solid #334155',
              background: '#1e293b',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input}
            style={{
              padding: '0 2rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
