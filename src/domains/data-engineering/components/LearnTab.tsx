import React, { useState, useEffect } from 'react';
import type { Topic } from '../../../core/types/types';
import {
  Book, Lightbulb, Code, ShieldCheck, AlertTriangle, CheckCircle2,
  HelpCircle, ChevronDown, ChevronUp, FileText, Settings, Award, ArrowRight, ArrowLeft, Loader2
} from 'lucide-react';
import type { PremiumTopicData } from '../../../core/types/types';
import { PremiumTopicRenderer } from './PremiumTopicRenderer';
import { PremiumExamplesRenderer } from './PremiumExamplesRenderer';
import { PremiumTipsRenderer } from './PremiumTipsRenderer';
import { PremiumInterviewRenderer } from './PremiumInterviewRenderer';

interface LearnTabProps {
  topic: Topic | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}



export const LearnTab: React.FC<LearnTabProps> = ({ topic, isCompleted, onToggleComplete, onPrevious, onNext }) => {
  const [activeSubTab, setActiveSubTab] = useState<'concept' | 'examples' | 'bestpractices' | 'interview'>('concept');
  const [revealedQs, setRevealedQs] = useState<Record<number, boolean>>({});
  const [premiumData, setPremiumData] = useState<PremiumTopicData | null>(null);
  const [isLoadingPremium, setIsLoadingPremium] = useState<boolean>(false);

  // Automatically switch to 'concept' when topic changes
  useEffect(() => {
    setActiveSubTab('concept');
    setPremiumData(null);
    if (!topic?.id) return;

    const fetchPremiumJSON = async () => {
      setIsLoadingPremium(true);
      try {
        const response = await fetch(`/content/${topic.category}/${topic.id}.json`);
        if (response.ok) {
          const data: PremiumTopicData = await response.json();
          setPremiumData(data);
        } else {
          setPremiumData(null);
        }
      } catch (err) {
        setPremiumData(null);
      } finally {
        setIsLoadingPremium(false);
      }
    };
    fetchPremiumJSON();
  }, [topic?.id, topic?.category]);

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
      <div className="scrollable-tabs" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        background: 'var(--bg-inner)',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-inset-tabs)',
        gap: '8px'
      }}>
        <button
          onClick={() => setActiveSubTab('concept')}
          className={`tab-btn ${activeSubTab === 'concept' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '8px' }}
        >
          <Book size={15} /> Core Concept
        </button>
        <button
          onClick={() => setActiveSubTab('examples')}
          className={`tab-btn ${activeSubTab === 'examples' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '8px' }}
        >
          <Code size={15} /> Examples & Code
        </button>
        <button
          onClick={() => setActiveSubTab('bestpractices')}
          className={`tab-btn ${activeSubTab === 'bestpractices' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '8px' }}
        >
          <ShieldCheck size={15} /> Tips
        </button>
        <button
          onClick={() => setActiveSubTab('interview')}
          className={`tab-btn ${activeSubTab === 'interview' ? 'active' : ''}`}
          style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '8px' }}
        >
          <Award size={15} /> Interview Prep ({concept.interviewQuestions.length + concept.scenarioQuestions.length})
        </button>
      </div>

      {/* Sub tab content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* TAB 1: CORE CONCEPT */}
        {activeSubTab === 'concept' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {isLoadingPremium ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Loader2 className="animate-spin" size={24} />
                <span>Loading premium deep dive content...</span>
              </div>
            ) : premiumData ? (
              <PremiumTopicRenderer data={premiumData} />
            ) : (
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
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Explanation</h3>
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
                      background: 'var(--bg-code)',
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
          </div>
        )}

        {/* TAB 2: EXAMPLES & CODE */}
        {activeSubTab === 'examples' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {premiumData ? (
              <PremiumExamplesRenderer data={premiumData} />
            ) : (
              <>
                <div className="glass-panel section-card">
                  <div className="section-header">
                    <FileText size={18} />
                    <h3 style={{ margin: 0, fontSize: '16px' }}>Detailed Example Breakdown</h3>
                  </div>
                  <div className="section-body">
                    <div className="pipeline-flow" style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      gap: '12px',
                      background: 'var(--bg-inner)',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass)',
                      overflowX: 'auto'
                    }}>
                      {/* Step 1 */}
                      <div style={{ flex: 1, minWidth: '150px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <span style={{ background: '#3b82f6', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                          <strong style={{ fontSize: '12px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Input</strong>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{concept.detailedExample.input}</p>
                      </div>
                      
                      <ArrowRight className="pipeline-arrow" size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />

                      {/* Step 2 */}
                      <div style={{ flex: 1, minWidth: '150px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <span style={{ background: '#f59e0b', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                          <strong style={{ fontSize: '12px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Processing Flow</strong>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{concept.detailedExample.processing}</p>
                      </div>

                      <ArrowRight className="pipeline-arrow" size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />

                      {/* Step 3 */}
                      <div style={{ flex: 1, minWidth: '150px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <span style={{ background: '#10b981', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                          <strong style={{ fontSize: '12px', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Output Results</strong>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{concept.detailedExample.output}</p>
                      </div>
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
          </div>
        )}

        {/* TAB 4: PRODUCTION TIPS */}
        {activeSubTab === 'bestpractices' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {premiumData ? (
              <PremiumTipsRenderer data={premiumData} />
            ) : (
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
          </div>
        )}

        {/* TAB 5: INTERVIEW PREP */}
        {activeSubTab === 'interview' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {premiumData ? (
              <PremiumInterviewRenderer data={premiumData} />
            ) : (
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
                              <HelpCircle size={18} color="#3b82f6" />
                              <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                                <span style={{ 
                                  color: q.difficulty === 'beginner' ? '#10b981' : q.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444',
                                  marginRight: '6px',
                                  fontSize: '12px',
                                  textTransform: 'uppercase',
                                  border: '1px solid currentColor',
                                  padding: '2px 6px',
                                  borderRadius: '4px'
                                }}>
                                  {q.difficulty}
                                </span>
                                {q.question}
                              </span>
                            </div>
                            {isRev ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>

                          {isRev && (
                            <div className="animate-slide-up" style={{ marginTop: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>Answer:</strong>
                                <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{q.answer}</p>
                              </div>
                              <div className="grid-two-columns" style={{ gap: '16px', background: 'var(--bg-inner)', padding: '12px', borderRadius: '8px' }}>
                                <div>
                                  <strong style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14}/> Why asked:</strong>
                                  <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>{q.whyAsked}</p>
                                </div>
                                <div>
                                  <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14}/> Wrong answer to avoid:</strong>
                                  <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>{q.wrongAnswer}</p>
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
        )}
      </div>

      {/* Complete trigger and Navigation */}
      <div className="nav-buttons-row">
        <button
          onClick={onPrevious}
          disabled={!onPrevious}
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '14px', opacity: onPrevious ? 1 : 0.5, cursor: onPrevious ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          onClick={onToggleComplete}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          style={{ padding: '10px 24px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <CheckCircle2 size={18} />
          {isCompleted ? 'Completed (Undo)' : 'Mark as Completed'}
        </button>

        <button
          onClick={onNext}
          disabled={!onNext}
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '14px', opacity: onNext ? 1 : 0.5, cursor: onNext ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>Next</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
