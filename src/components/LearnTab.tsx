import React, { useState } from 'react';
import type { Topic } from '../data/types';
import { 
  Book, Lightbulb, Code, ShieldCheck, AlertTriangle, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, FileText, Settings, Award
} from 'lucide-react';

interface LearnTabProps {
  topic: Topic | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({ topic, isCompleted, onToggleComplete }) => {
  const [activeSubTab, setActiveSubTab] = useState<'concept' | 'examples' | 'bestpractices' | 'interview'>('concept');
  const [revealedQs, setRevealedQs] = useState<Record<number, boolean>>({});

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Sub tabs header */}
      <div style={{
        display: 'flex',
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

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
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

        {/* TAB 2: EXAMPLES & CODE */}
        {activeSubTab === 'examples' && (
          <>
            <div className="glass-panel section-card">
              <div className="section-header">
                <FileText size={18} />
                <h3 style={{ margin: 0, fontSize: '16px' }}>Detailed Example Breakdown</h3>
              </div>
              <div className="section-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
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

        {/* TAB 3: PRODUCTION TIPS */}
        {activeSubTab === 'bestpractices' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

        {/* TAB 4: INTERVIEW PREP */}
        {activeSubTab === 'interview' && (
          <>
            {/* Quick Review Cheat Sheet */}
            <div className="glass-panel section-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'rgba(168, 85, 247, 0.03)' }}>
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
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '11px', background: 'var(--bg-inner)', padding: '8px', borderRadius: '4px' }}>
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
