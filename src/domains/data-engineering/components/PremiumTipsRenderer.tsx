import React from 'react';
import type { PremiumTopicData } from '../../../core/types/types';
import { ShieldCheck, AlertTriangle, Lightbulb } from 'lucide-react';
import { formatText } from '../../../core/utils/textFormatting';

interface PremiumTipsRendererProps {
  data: PremiumTopicData;
}

export const PremiumTipsRenderer: React.FC<PremiumTipsRendererProps> = ({ data }) => {
  const { bestPractices, commonMistakes, productionDeepDive } = data;

  if (!bestPractices && !commonMistakes && !productionDeepDive) return null;

  return (
    <div className="premium-content-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Best Practices */}
      {bestPractices && (
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
            <ShieldCheck size={22} style={{ color: '#10b981' }} /> 
            Best Practices & Standards
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {bestPractices.recommendedPractices && bestPractices.recommendedPractices.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #10b981' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Recommended Practices</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.recommendedPractices.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}
            
            {bestPractices.engineeringStandards && bestPractices.engineeringStandards.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #3b82f6' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Engineering Standards</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.engineeringStandards.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}
            
            {bestPractices.testingStrategies && bestPractices.testingStrategies.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #a855f7' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Testing Strategies</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.testingStrategies.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}

            {bestPractices.designRecommendations && bestPractices.designRecommendations.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #06b6d4' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Design Recommendations</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.designRecommendations.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}

            {bestPractices.namingConventions && bestPractices.namingConventions.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #f59e0b' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Naming Conventions</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.namingConventions.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}

            {bestPractices.documentationStandards && bestPractices.documentationStandards.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderTop: '3px solid #8b5cf6' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>Documentation Standards</strong>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
                  {bestPractices.documentationStandards.map((p, i) => <li key={i} style={{ marginBottom: '6px' }}>{formatText(p)}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {commonMistakes && commonMistakes.length > 0 && (
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
            <AlertTriangle size={22} style={{ color: '#ef4444' }} /> 
            Common Mistakes to Avoid
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {commonMistakes.map((mistake, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <strong style={{ color: '#ef4444', fontSize: '16px', display: 'block', marginBottom: '8px' }}>{mistake.mistake}</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <p style={{ margin: 0 }}><strong>Why it happens:</strong> {formatText(mistake.whyItHappens)}</p>
                  <p style={{ margin: 0 }}><strong>Impact:</strong> {formatText(mistake.impact)}</p>
                  <p style={{ margin: 0, color: '#10b981' }}><strong>Correct Approach:</strong> {formatText(mistake.correctApproach)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Deep Dive */}
      {productionDeepDive && (
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
            <Lightbulb size={22} style={{ color: '#f59e0b' }} /> 
            Production Deep Dive
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {Object.entries(productionDeepDive).map(([key, value]) => {
              if (!value || value.trim() === '') return null;
              // Format camel case to title case
              const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={key} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>{title}</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>{formatText(value)}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
