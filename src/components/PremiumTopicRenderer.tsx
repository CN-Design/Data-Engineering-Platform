import React from 'react';
import type { PremiumTopicData } from '../data/types';
import { Book, Server, GitBranch, Activity, CheckCircle2 } from 'lucide-react';
import { formatText } from '../utils/textFormatting';

interface PremiumTopicRendererProps {
  data: PremiumTopicData;
}

export const PremiumTopicRenderer: React.FC<PremiumTopicRendererProps> = ({ data }) => {
  const { coreConcept, industryUseCases, comparisonSection } = data;
  if (!coreConcept) return null;

  return (
    <div className="premium-content-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Overview Section */}
      <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
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
          <Book size={22} style={{ color: '#3b82f6' }} /> 
          Topic Overview
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {coreConcept.overview?.map((para, i) => (
            <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>{formatText(para)}</p>
          ))}
        </div>
        
        {coreConcept.formalDefinition && (
          <div style={{ 
            marginTop: '28px', 
            padding: '20px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px', 
            borderLeft: '4px solid #3b82f6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 8px 0', fontWeight: 600 }}>Formal Definition</h3>
            <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>"{formatText(coreConcept.formalDefinition)}"</p>
          </div>
        )}
      </section>

      {/* Why it Matters */}
      <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
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
          <Activity size={22} style={{ color: '#10b981' }} /> 
          Why It Matters
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {coreConcept.whyItMatters && Object.entries(coreConcept.whyItMatters).map(([key, value]) => (
            <div key={key} style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '8px',
              borderTop: '3px solid #10b981'
            }}>
              <strong style={{ 
                display: 'block', 
                marginBottom: '10px', 
                color: 'var(--text-primary)', 
                textTransform: 'capitalize',
                fontSize: '15px',
                fontWeight: 600
              }}>
                {key} Impact
              </strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{formatText(value as string)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Components */}
      <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
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
          <Server size={22} style={{ color: '#a855f7' }} /> 
          Core Components
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {coreConcept.coreComponents?.map((comp, i) => (
            <div key={i} style={{ 
              padding: '20px', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px', 
              border: '1px solid var(--border-glass)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '17px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#a855f7" />
                {comp.name}
              </h3>
              <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{formatText(comp.definition)}</p>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ flex: '0 0 120px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Purpose</div>
                    <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(comp.purpose)}</div>
                  </div>
                  
                  {comp.responsibilities && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                      <div style={{ flex: '0 0 120px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Responsibilities</div>
                      <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(comp.responsibilities)}</div>
                    </div>
                  )}
                  
                  {comp.examples && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '12px 0', borderTop: '1px solid var(--border-glass)' }}>
                      <div style={{ flex: '0 0 120px', fontSize: '12px', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, paddingTop: '2px' }}>Examples</div>
                      <div style={{ flex: '1 1 200px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>{formatText(comp.examples)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
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
          <GitBranch size={22} style={{ color: '#f59e0b' }} /> 
          Architecture & Data Flow
        </h2>
        
        {coreConcept.architectureFlow && (
          <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '8px', overflowX: 'auto', marginBottom: '28px', border: '1px solid var(--border-glass)' }}>
            <pre style={{ color: '#10b981', fontFamily: '"Fira Code", monospace', fontSize: '13px', margin: 0 }}>
              {coreConcept.architectureFlow}
            </pre>
          </div>
        )}
        
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Step-by-Step Execution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coreConcept.dataFlowWalkthrough?.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  background: 'var(--bg-primary)', border: '1px solid #f59e0b',
                  color: '#f59e0b', width: '24px', height: '24px', borderRadius: '50%', fontSize: '13px', fontWeight: 'bold', flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '14.5px' }}>{formatText(step)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      {industryUseCases && industryUseCases.length > 0 && (
        <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--text-primary)', 
            margin: '0 0 24px 0',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-primary)' }}>
              <Activity size={20} style={{ color: '#10b981' }} /> 
            </div>
            Industry Implementations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {industryUseCases.map((uc, i) => (
              <div key={i} style={{ 
                background: 'var(--bg-secondary)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid var(--border-glass)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '16px', letterSpacing: '0.01em' }}>
                    {uc.company}
                  </strong>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid var(--border-glass)' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '4px' }}>The Challenge</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{formatText(uc.problem)}</p>
                  </div>
                  
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid #3b82f6' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '4px' }}>The Solution</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{formatText(uc.solution)}</p>
                  </div>
                  
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '2px solid #10b981' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em', marginBottom: '4px' }}>Business Impact</strong>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{formatText(uc.benefits)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison Section */}
      {comparisonSection && comparisonSection.length > 0 && (
        <section className="glass-panel" style={{ padding: '32px', borderRadius: '12px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--text-primary)', 
            margin: '0 0 24px 0',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-primary)' }}>
              <GitBranch size={20} style={{ color: '#f59e0b' }} /> 
            </div>
            Comparative Analysis
          </h2>
          <div style={{ overflowX: 'auto', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-glass)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '18px 24px', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.02em', width: '18%' }}>Dimension</th>
                  <th style={{ padding: '18px 24px', color: '#60a5fa', fontWeight: 600, letterSpacing: '0.02em', width: '27%' }}>Option A</th>
                  <th style={{ padding: '18px 24px', color: '#c084fc', fontWeight: 600, letterSpacing: '0.02em', width: '27%' }}>Option B</th>
                  <th style={{ padding: '18px 24px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em' }}>Context</th>
                </tr>
              </thead>
              <tbody>
                {comparisonSection.map((comp, i) => (
                  <tr key={i} style={{ 
                    borderBottom: i === comparisonSection.length - 1 ? 'none' : '1px solid var(--border-glass)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--bg-primary)',
                    transition: 'background 0.2s ease',
                  }}>
                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)', fontWeight: 500, verticalAlign: 'top' }}>{comp.feature}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: 1.6 }}>{formatText(comp.optionA)}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: 1.6 }}>{formatText(comp.optionB)}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '13px', verticalAlign: 'top', lineHeight: 1.6, fontStyle: 'italic' }}>{formatText(comp.explanation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
};
