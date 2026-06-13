import React, { useState, useEffect } from 'react';
import type { Topic } from '../data/types';
import { 
  Book, Lightbulb, Code, ShieldCheck, AlertTriangle, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, FileText, Settings, Award, Sparkles, Key, Loader2
} from 'lucide-react';

interface LearnTabProps {
  topic: Topic | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const parseInlineFormatting = (text: string) => {
  if (!text) return '';
  // Simple bold replacer
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
    }
    // Code blocks inline
    const inlineCodeParts = part.split(/(`.*?`)/g);
    return inlineCodeParts.map((subPart, sIdx) => {
      if (subPart.startsWith('`') && subPart.endsWith('`')) {
        return <code key={`${idx}-${sIdx}`} style={{ background: 'var(--bg-inner)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12.5px', color: '#f43f5e' }}>{subPart.slice(1, -1)}</code>;
      }
      return subPart;
    });
  });
};

const renderMarkdown = (text: string) => {
  if (!text) return null;
  
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('```')) {
      const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
      const language = match ? match[1] : '';
      const codeContent = match ? match[2] : part.replace(/```/g, '');
      return (
        <pre key={idx} className="code-block" style={{ marginTop: '12px', marginBottom: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {language && <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{language}</span>}
          <code>{codeContent.trim()}</code>
        </pre>
      );
    }
    
    // Normal text - process headers, bolding, list items line by line
    const lines = part.split('\n');
    return (
      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} style={{ height: '8px' }} />;
          
          // Headers
          if (trimmed.startsWith('### ')) {
            return <h4 key={lIdx} style={{ margin: '16px 0 6px 0', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>{trimmed.replace('### ', '')}</h4>;
          }
          if (trimmed.startsWith('## ')) {
            return <h3 key={lIdx} style={{ margin: '20px 0 8px 0', fontSize: '17px', color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid var(--border-glass)', paddingBottom: '4px' }}>{trimmed.replace('## ', '')}</h3>;
          }
          if (trimmed.startsWith('# ')) {
            return <h2 key={lIdx} style={{ margin: '24px 0 12px 0', fontSize: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>{trimmed.replace('# ', '')}</h2>;
          }
          
          // List items
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
              <ul key={lIdx} style={{ margin: '0 0 4px 0', paddingLeft: '20px' }}>
                <li style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{parseInlineFormatting(content)}</li>
              </ul>
            );
          }
          
          // Default paragraph
          return <p key={lIdx} style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{parseInlineFormatting(trimmed)}</p>;
        })}
      </div>
    );
  });
};

export const LearnTab: React.FC<LearnTabProps> = ({ topic, isCompleted, onToggleComplete }) => {
  const [activeSubTab, setActiveSubTab] = useState<'concept' | 'deepdive' | 'examples' | 'bestpractices' | 'interview'>('concept');
  const [revealedQs, setRevealedQs] = useState<Record<number, boolean>>({});
  
  // API Key & Cache States
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [deepDives, setDeepDives] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('de_deepdives_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Automatically switch to 'concept' when topic changes
  useEffect(() => {
    setActiveSubTab('concept');
    setError(null);
  }, [topic?.id]);

  if (!topic) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        Select a topic from the sidebar to begin learning.
      </div>
    );
  }

  const { concept } = topic;

  const toggleQ = (idx: number) => {
    setRevealedQs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const saveKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowKeyInput(false);
    setError(null);
  };

  const fetchDeepDive = async () => {
    const keyToUse = apiKey || localStorage.getItem('gemini_api_key');
    if (!keyToUse) {
      setError("Please save a valid Gemini API Key first.");
      return;
    }

    setLoading(true);
    setError(null);

    const promptText = `You are a Principal Data Engineer and Senior Technical Instructor. Provide a highly detailed, comprehensive study guide for the topic "${topic.title}" under the category "${topic.category}".
Your response MUST be extremely detailed and structured into the following sections:
1. **Overview & Architectural Role**: Explain why this exists, where it fits in a modern production data architecture, and how it compares to alternative approaches.
2. **Sub-Concepts & Technical Deep Dive**: Break down at least 3-4 sub-concepts or internal details (e.g. for SQL JOINs: explain Inner, Left, Full, Cross, Hash Join vs Merge Join vs Loop Join execution, and partition skew).
3. **Step-by-Step Production Code Example**: Provide a complete, production-ready code example (SQL or PySpark/Python depending on category) showing standard syntax and best practices.
4. **Performance Tuning & Failure Modes**: Detail common production failure modes (OOM, skew, serialization, indexing issues) and how to tune/resolve them.
5. **Key Scenario Interview Question**: Provide a realistic, scenario-based interview question and a detailed, high-scoring answer.

Be detailed, technical, and use markdown formatting.`;

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
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (answer) {
        const updated = { ...deepDives, [topic.id]: answer };
        setDeepDives(updated);
        localStorage.setItem('de_deepdives_cache', JSON.stringify(updated));
      } else {
        throw new Error(data.error?.message || "No content returned from Gemini API.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to call Gemini API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Sub tabs header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border-glass)',
        paddingBottom: '8px',
        gap: '12px'
      }}>
        <button
          onClick={() => setActiveSubTab('concept')}
          className={`tab-btn ${activeSubTab === 'concept' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 12px' }}
        >
          <Book size={14} /> Core Concept
        </button>
        <button
          onClick={() => setActiveSubTab('deepdive')}
          className={`tab-btn ${activeSubTab === 'deepdive' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 12px' }}
        >
          <Sparkles size={14} color="#a855f7" /> AI Deep Dive
        </button>
        <button
          onClick={() => setActiveSubTab('examples')}
          className={`tab-btn ${activeSubTab === 'examples' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 12px' }}
        >
          <Code size={14} /> Examples & Code
        </button>
        <button
          onClick={() => setActiveSubTab('bestpractices')}
          className={`tab-btn ${activeSubTab === 'bestpractices' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 12px' }}
        >
          <ShieldCheck size={14} /> Production Tips
        </button>
        <button
          onClick={() => setActiveSubTab('interview')}
          className={`tab-btn ${activeSubTab === 'interview' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 12px' }}
        >
          <Award size={14} /> Interview Prep ({concept.interviewQuestions.length + concept.scenarioQuestions.length})
        </button>
      </div>

      {/* Sub tab content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* TAB 1: CORE CONCEPT */}
        {activeSubTab === 'concept' && (
          <>
            <div className="glass-panel section-card">
              <div className="section-header">
                <Book size={18} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Topic Overview</h3>
              </div>
              <div className="section-body">
                <p>{concept.overview}</p>
                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  borderLeft: '4px solid #3b82f6',
                  padding: '12px 16px',
                  borderRadius: '0 8px 8px 0',
                  marginTop: '12px'
                }}>
                  <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Book Definition:</strong>
                  <span style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)' }}>"{concept.bookDefinition}"</span>
                </div>
              </div>
            </div>

            <div className="glass-panel section-card">
              <div className="section-header">
                <Lightbulb size={18} color="#eab308" />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Simple Language Explanation</h3>
              </div>
              <div className="section-body">
                <p>{concept.simpleExplanation}</p>
                <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '6px' }}>Real-World Analogy:</strong>
                  <p style={{ color: 'var(--text-secondary)' }}>{concept.analogy}</p>
                </div>
              </div>
            </div>

            <div className="grid-concept">
              <div className="glass-panel section-card">
                <div className="section-header">
                  <Award size={18} color="#3b82f6" />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Why This Matters</h3>
                </div>
                <div className="section-body">
                  <p>{concept.whyItMatters}</p>
                </div>
              </div>

              <div className="glass-panel section-card">
                <div className="section-header">
                  <Settings size={18} color="#10b981" />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Real World Use Cases</h3>
                </div>
                <div className="section-body">
                  <ul style={{ paddingLeft: '18px', margin: 0 }}>
                    {concept.useCases.map((uc, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{uc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-panel section-card">
              <div className="section-header">
                <FileText size={18} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Visual Pipeline Layout</h3>
              </div>
              <div className="section-body">
                <pre style={{
                  fontFamily: 'Fira Code, monospace',
                  background: '#07080b',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-glass)',
                  overflowX: 'auto',
                  fontSize: '13px',
                  color: '#10b981'
                }}>{concept.diagram}</pre>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: AI DEEP-DIVE (NEW DETAILED EXPLANATION PANEL) */}
        {activeSubTab === 'deepdive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Configure Key Card */}
            {showKeyInput && (
              <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={18} color="#a855f7" />
                  <strong style={{ fontSize: '14px' }}>Gemini API Key Required</strong>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Unlock textbook-level deep dives, exhaustive sub-concept breakdowns, and customized production code examples generated on-the-fly for this topic.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="password"
                    placeholder="Enter your Gemini API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '13px'
                    }}
                  />
                  <button onClick={() => saveKey(apiKey)} className="btn btn-primary">
                    Save Key
                  </button>
                </div>
              </div>
            )}

            {!showKeyInput && !deepDives[topic.id] && !loading && (
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={32} color="#a855f7" style={{ animation: 'pulse 2s infinite' }} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Generate Rich Deep Dive</h3>
                <p style={{ maxWidth: '600px', fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Generate an in-depth, master-level guide for **{topic.title}**. This will break down internal execution details, sub-concepts, optimization rules, and common interview scenarios.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button onClick={fetchDeepDive} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={14} /> Generate Guide
                  </button>
                  <button onClick={() => setShowKeyInput(true)} className="btn btn-secondary" style={{ fontSize: '12px' }}>
                    Configure Key
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Loader2 size={36} color="#a855f7" style={{ animation: 'spin 1.5s linear infinite' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>Analyzing Topic Architecture...</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', marginBlockEnd: 0 }}>
                    Gemini is generating detailed explanations and code sub-concepts for **{topic.title}**
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #ef4444', color: '#ef4444', fontSize: '13px' }}>
                {error}
              </div>
            )}

            {deepDives[topic.id] && (
              <div className="glass-panel section-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#a855f7" />
                    <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>AI Study Guide & Sub-Concepts</strong>
                  </div>
                  <button onClick={fetchDeepDive} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                    Regenerate
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {renderMarkdown(deepDives[topic.id])}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: EXAMPLES & CODE */}
        {activeSubTab === 'examples' && (
          <>
            <div className="glass-panel section-card">
              <div className="section-header">
                <FileText size={18} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Detailed Example Breakdown</h3>
              </div>
              <div className="section-body grid-example-breakdown">
                <div style={{ background: 'var(--bg-inner)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Inputs</strong>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>{concept.detailedExample.input}</p>
                </div>
                <div style={{ background: 'var(--bg-inner)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. Processing Flow</strong>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>{concept.detailedExample.processing}</p>
                </div>
                <div style={{ background: 'var(--bg-inner)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <strong style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>3. Output Results</strong>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>{concept.detailedExample.output}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel section-card">
              <div className="section-header">
                <Code size={18} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Working Code Implementation</h3>
              </div>
              <div className="section-body">
                <pre className="code-block">
                  <code>{concept.codeExample}</code>
                </pre>
                <div style={{ marginTop: '16px' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>Line-by-Line Breakdown:</strong>
                  <div style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    background: 'var(--bg-inner)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px dashed var(--border-glass)'
                  }}>{concept.stepByStepBreakdown}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: PRODUCTION TIPS */}
        {activeSubTab === 'bestpractices' && (
          <div className="grid-two-columns">
            <div className="glass-panel section-card">
              <div className="section-header">
                <ShieldCheck size={18} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Production Best Practices</h3>
              </div>
              <div className="section-body">
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  {concept.bestPractices.map((bp, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>{bp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass-panel section-card">
              <div className="section-header">
                <AlertTriangle size={18} color="#ef4444" />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Common Mistakes to Avoid</h3>
              </div>
              <div className="section-body">
                <ul style={{ paddingLeft: '18px', margin: 0 }}>
                  {concept.commonMistakes.map((cm, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>{cm}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INTERVIEW PREP */}
        {activeSubTab === 'interview' && (
          <>
            {/* Quick Review Cheat Sheet */}
            <div className="glass-panel section-card grid-two-columns" style={{ background: 'rgba(168, 85, 247, 0.03)' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '8px' }}>Interview Cheat Sheet</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <span><strong>Def:</strong> {concept.cheatSheet.definition}</span>
                  <span><strong>Common Mistake:</strong> {concept.cheatSheet.commonMistake}</span>
                  <span><strong>Best Practice:</strong> {concept.cheatSheet.bestPractice}</span>
                </div>
              </div>
              <div>
                <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)', marginBottom: '6px' }}>Key Takeaways:</strong>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {concept.summaryNotes.map((note, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Questions list */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Topic Interview Q&As</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {concept.interviewQuestions.map((q, idx) => {
                  const isRev = !!revealedQs[idx];
                  return (
                    <div 
                      key={idx} 
                      className="glass-panel question-card" 
                      onClick={() => toggleQ(idx)}
                      style={{ padding: '16px' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <HelpCircle size={16} color="#3b82f6" />
                          <span style={{ fontWeight: 600, fontSize: '14px' }}>[{q.difficulty}] {q.question}</span>
                        </div>
                        {isRev ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>

                      {isRev && (
                        <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-glass)', paddingTop: '12px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <strong style={{ color: 'var(--text-primary)' }}>Answer:</strong>
                            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>{q.answer}</p>
                          </div>
                          <div className="grid-two-columns" style={{ gap: '16px', background: 'var(--bg-inner)', padding: '8px', borderRadius: '4px' }}>
                            <div>
                              <strong style={{ color: '#10b981' }}>Why asked:</strong>
                              <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{q.whyAsked}</p>
                            </div>
                            <div>
                              <strong style={{ color: '#ef4444' }}>Wrong answer to avoid:</strong>
                              <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{q.wrongAnswer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Scenario Questions */}
                {concept.scenarioQuestions.map((sq, idx) => {
                  const sIdx = idx + 100;
                  const isRev = !!revealedQs[sIdx];
                  return (
                    <div 
                      key={`sec-${idx}`} 
                      className="glass-panel question-card" 
                      onClick={() => toggleQ(sIdx)}
                      style={{ padding: '16px', borderLeft: '3px solid #a855f7' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '14px', color: '#a855f7' }}>Scenario: {sq.question}</span>
                        {isRev ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>

                      {isRev && (
                        <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-glass)', paddingTop: '12px', fontSize: '13px' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Solution Approach:</strong>
                          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{sq.solution}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Complete trigger */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={onToggleComplete}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          style={{ padding: '10px 20px', fontSize: '14px' }}
        >
          <CheckCircle2 size={16} />
          {isCompleted ? 'Completed (Click to Undo)' : 'Mark Topic as Completed'}
        </button>
      </div>
    </div>
  );
};
