import React, { useState } from 'react';
import type { Topic } from '../../../core/types/types';
import { MessageSquare, Key, Sparkles, Send, RefreshCw } from 'lucide-react';

interface GeminiTabProps {
  topic: Topic | null;
}

export const GeminiTab: React.FC<GeminiTabProps> = ({ topic }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'gemini', text: string }>>([
    { sender: 'gemini', text: "Hello! I am your Gemini Data Engineering Assistant. Setup your API key to ask questions, explain topics with analogies, or start a mock interview!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);

  const saveKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowKeyInput(false);
  };

  const callGemini = async (promptText: string) => {
    const keyToUse = apiKey || localStorage.getItem('gemini_api_key');
    if (!keyToUse) {
      setMessages(prev => [
        ...prev,
        { sender: 'gemini', text: "⚠️ Gemini API Key not found. Please click 'Configure API Key' to input your key." }
      ]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received. Please check your key or prompt.";
      setMessages(prev => [...prev, { sender: 'gemini', text: answer }]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { sender: 'gemini', text: `Error calling Gemini API: ${err.message || err}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    
    const contextPrompt = topic 
      ? `You are an expert Data Engineering Interview Coach. The user is asking about the topic: "${topic.title}" (${topic.category}).\nUser Question: ${userMsg}`
      : `You are an expert Data Engineering Interview Coach.\nUser Question: ${userMsg}`;
      
    callGemini(contextPrompt);
  };

  const handlePresetAction = (action: 'explain' | 'mock' | 'generate') => {
    if (!topic) return;
    let systemPrompt = '';
    let userDisplayMsg = '';

    if (action === 'explain') {
      userDisplayMsg = `Please explain "${topic.title}" again with a fresh real-world analogy.`;
      systemPrompt = `Explain the concept "${topic.title}" from ${topic.category} with a completely new real-world analogy, simplified code blocks, and best practices.`;
    } else if (action === 'mock') {
      userDisplayMsg = `Start a mock interview for "${topic.title}".`;
      systemPrompt = `You are a Principal Data Engineer interviewing a candidate for a role requiring knowledge in "${topic.title}" (${topic.category}). Ask one technical scenario question to start the interview, and wait for my response. Do not output the entire interview at once.`;
    } else {
      userDisplayMsg = `Generate 5 more advanced interview questions for "${topic.title}".`;
      systemPrompt = `Generate 5 highly advanced, real-world scenario interview questions and detailed answers for "${topic.title}" (${topic.category}) that test deep systems knowledge.`;
    }

    setMessages(prev => [...prev, { sender: 'user', text: userDisplayMsg }]);
    callGemini(systemPrompt);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* API Key Header */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Key size={18} className="text-muted" />
          <span style={{ fontSize: '14px' }}>
            {apiKey ? 'Gemini API Key Configured' : 'Optional: Setup Gemini Key for AI Assistance'}
          </span>
        </div>
        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          {showKeyInput ? 'Cancel' : 'Configure API Key'}
        </button>
      </div>

      {showKeyInput && (
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Gemini API Key</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="password"
              placeholder="Paste your Gemini API key here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                flex: 1,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-glass)',
                borderRadius: '6px',
                padding: '10px',
                color: 'var(--text-primary)',
                fontSize: '13px'
              }}
            />
            <button
              onClick={() => saveKey(apiKey)}
              className="btn btn-primary"
            >
              Save Key
            </button>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            This assistant is optional and requires your own Google Gemini API key — get one free at{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent, #a855f7)' }}>aistudio.google.com/app/apikey</a>.
            Your key is stored only in this browser and is sent directly to Google's API — never to us.
          </span>
        </div>
      )}

      {/* Preset Action Buttons */}
      {topic && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handlePresetAction('explain')} className="btn btn-secondary" style={{ flex: 1 }}>
            <RefreshCw size={14} /> Explain Again
          </button>
          <button onClick={() => handlePresetAction('mock')} className="btn btn-secondary" style={{ flex: 1 }}>
            <Sparkles size={14} color="#a855f7" /> Mock Interview
          </button>
          <button onClick={() => handlePresetAction('generate')} className="btn btn-secondary" style={{ flex: 1 }}>
            <MessageSquare size={14} color="#10b981" /> Generate More Questions
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? 'var(--accent-active)' : 'var(--bg-inner)',
              border: `1px solid ${m.sender === 'user' ? 'rgba(59, 130, 246, 0.3)' : 'var(--border-glass)'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              maxWidth: '85%',
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="spinner" style={{ width: '12px', height: '12px', border: '2px solid var(--text-muted)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            Gemini is thinking...
          </div>
        )}
      </div>

      {/* Input controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Ask a question about this topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-glass)',
            borderRadius: '6px',
            padding: '12px',
            color: 'var(--text-primary)',
            fontSize: '14px'
          }}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary"
          style={{ padding: '0 20px' }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
