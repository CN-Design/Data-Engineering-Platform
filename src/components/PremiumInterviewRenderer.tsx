import React, { useState } from 'react';
import type { PremiumTopicData } from '../data/types';
import { Award, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { formatText } from '../utils/textFormatting';

interface PremiumInterviewRendererProps {
  data: PremiumTopicData;
}

export const PremiumInterviewRenderer: React.FC<PremiumInterviewRendererProps> = ({ data }) => {
  const { interviewPreparation, cheatSheet, keyTakeaways } = data;
  const [revealedQs, setRevealedQs] = useState<Record<string, boolean>>({});

  if (!interviewPreparation && !cheatSheet) return null;

  const toggleQ = (id: string) => {
    setRevealedQs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderQuestions = (questions: any[], category: string, color: string) => {
    if (!questions || questions.length === 0) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 8px 0', borderBottom: `2px solid ${color}`, paddingBottom: '8px', display: 'inline-block' }}>{category} Questions</h3>
        {questions.map((q, i) => {
          const id = `${category}-${i}`;
          const isRev = !!revealedQs[id];
          return (
            <div key={id} className="glass-panel" onClick={() => toggleQ(id)} style={{ padding: '16px', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <HelpCircle size={18} color={color} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{q.question || q.scenario || q.problemStatement}</span>
                </div>
                {isRev ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
              </div>
              
              {isRev && (
                <div className="animate-slide-up" style={{ marginTop: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', fontSize: '14.5px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {q.answer && (
                    <div>
                      <strong style={{ color: color }}>Answer:</strong>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(q.answer)}</p>
                    </div>
                  )}
                  {q.explanation && (
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Explanation:</strong>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(q.explanation)}</p>
                    </div>
                  )}
                  {q.thinkingProcess && (
                    <div>
                      <strong style={{ color: color }}>Thinking Process:</strong>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(q.thinkingProcess)}</p>
                    </div>
                  )}
                  {q.expectedAnswer && (
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Expected Answer:</strong>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(q.expectedAnswer)}</p>
                    </div>
                  )}
                  {q.designApproach && (
                    <div>
                      <strong style={{ color: color }}>Design Approach:</strong>
                      <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(q.designApproach)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="premium-content-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Cheat Sheet */}
      {cheatSheet && (
        <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)' }}>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            color: 'var(--text-primary)', 
            margin: '0 0 20px 0',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            <Award size={22} style={{ color: '#a855f7' }} /> 
            Interview Cheat Sheet
          </h2>
          
          <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #a855f7', marginBottom: '20px' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>One Line Definition</strong>
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '16px', fontStyle: 'italic' }}>{cheatSheet.oneLineDefinition}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {cheatSheet.keyConcepts && cheatSheet.keyConcepts.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Key Concepts</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', paddingLeft: '20px' }}>
                  {cheatSheet.keyConcepts.map((item, i) => <li key={i}>{formatText(item)}</li>)}
                </ul>
              </div>
            )}
            {cheatSheet.interviewPoints && cheatSheet.interviewPoints.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Interview Points</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', paddingLeft: '20px' }}>
                  {cheatSheet.interviewPoints.map((item, i) => <li key={i}>{formatText(item)}</li>)}
                </ul>
              </div>
            )}
            {cheatSheet.quickNotes && cheatSheet.quickNotes.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Quick Notes</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', paddingLeft: '20px' }}>
                  {cheatSheet.quickNotes.map((item, i) => <li key={i}>{formatText(item)}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <section className="glass-panel" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#10b981' }}>Key Takeaways</h3>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
            {keyTakeaways.map((takeaway, i) => <li key={i} style={{ marginBottom: '8px' }}>{formatText(takeaway)}</li>)}
          </ul>
        </section>
      )}

      {/* Questions */}
      {interviewPreparation && (
        <section style={{ marginTop: '16px' }}>
          {renderQuestions(interviewPreparation.beginnerQuestions, 'Beginner', '#10b981')}
          {renderQuestions(interviewPreparation.intermediateQuestions, 'Intermediate', '#f59e0b')}
          {renderQuestions(interviewPreparation.advancedQuestions, 'Advanced', '#ef4444')}
          {renderQuestions(interviewPreparation.scenarioBasedQuestions, 'Scenario', '#a855f7')}
          {renderQuestions(interviewPreparation.systemDesignQuestions, 'System Design', '#3b82f6')}
        </section>
      )}

    </div>
  );
};
