import React from 'react';
import type { PremiumTopicData } from '../data/types';
import { FileText, Code, Settings } from 'lucide-react';
import { formatText } from '../utils/textFormatting';

interface PremiumExamplesRendererProps {
  data: PremiumTopicData;
}

export const PremiumExamplesRenderer: React.FC<PremiumExamplesRendererProps> = ({ data }) => {
  const { practicalImplementation, endToEndExample } = data;

  if (!practicalImplementation && !endToEndExample) return null;

  return (
    <div className="premium-content-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Code Examples */}
      {practicalImplementation?.codeExamples && practicalImplementation.codeExamples.length > 0 && (
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
            <Code size={22} style={{ color: '#3b82f6' }} /> 
            Practical Implementation
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {practicalImplementation.codeExamples.map((ex, i) => (
              <div key={i} style={{ 
                background: 'var(--bg-secondary)', 
                borderRadius: '8px', 
                border: '1px solid var(--border-glass)',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-primary)' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600 }}>{ex.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: '6px 0 0 0', fontSize: '14px' }}>{formatText(ex.overview)}</p>
                </div>
                <div style={{ padding: '20px' }}>
                  <pre style={{ margin: 0, padding: '16px', background: '#0b0c10', borderRadius: '6px', overflowX: 'auto', border: '1px solid var(--border-glass)' }}>
                    <code style={{ color: '#34d399', fontFamily: '"Fira Code", monospace', fontSize: '13px' }}>{ex.code}</code>
                  </pre>
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: '#60a5fa', letterSpacing: '0.05em' }}>Breakdown</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '4px 0 0 0', lineHeight: 1.6 }}>{formatText(ex.breakdown)}</p>
                    </div>
                    {ex.optimizationTips && (
                      <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                        <strong style={{ fontSize: '13px', color: '#f59e0b' }}>Optimization Tip:</strong>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '4px 0 0 0' }}>{formatText(ex.optimizationTips)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* End to End Example */}
      {endToEndExample && (
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
            <Settings size={22} style={{ color: '#10b981' }} /> 
            End-to-End Pipeline Walkthrough
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>The Business Problem</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', lineHeight: 1.6 }}>{formatText(endToEndExample.businessProblem)}</p>
            </div>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Architecture</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', lineHeight: 1.6 }}>{formatText(endToEndExample.architecture)}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Processing Steps</strong>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                {endToEndExample.processingSteps?.map((step, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{formatText(step)}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Final Result</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 0 0', lineHeight: 1.6 }}>{formatText(endToEndExample.finalResult)}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
