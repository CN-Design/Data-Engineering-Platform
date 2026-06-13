import React from 'react';
import type { PremiumTopicData } from '../data/types';
import { Book, Server, GitBranch, Activity } from 'lucide-react';

interface PremiumTopicRendererProps {
  data: PremiumTopicData;
}

export const PremiumTopicRenderer: React.FC<PremiumTopicRendererProps> = ({ data }) => {
  const { coreConcept } = data;
  if (!coreConcept) return null;

  return (
    <div className="premium-content-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Overview Section */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', marginBottom: '16px' }}>
          <Book size={20} /> Topic Overview
        </h2>
        {coreConcept.overview?.map((para, i) => (
          <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>{para}</p>
        ))}
        
        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-inner)', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>Formal Definition</h3>
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{coreConcept.formalDefinition}</p>
        </div>
      </section>

      {/* Why it Matters */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '16px' }}>
          <Activity size={20} /> Why It Matters
        </h2>
        <div className="grid-two-columns" style={{ gap: '16px' }}>
          {coreConcept.whyItMatters && Object.entries(coreConcept.whyItMatters).map(([key, value]) => (
            <div key={key} style={{ background: 'var(--bg-inner)', padding: '16px', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{key} Impact</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Components */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', marginBottom: '16px' }}>
          <Server size={20} /> Core Components
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {coreConcept.coreComponents?.map((comp, i) => (
            <div key={i} style={{ padding: '16px', background: 'var(--bg-inner)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ color: '#a855f7', marginBottom: '8px' }}>{comp.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}><strong>Definition:</strong> {comp.definition}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}><strong>Purpose:</strong> {comp.purpose}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}><strong>Examples:</strong> {comp.examples}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '16px' }}>
          <GitBranch size={20} /> Architecture & Data Flow
        </h2>
        <div style={{ background: '#1e1e1e', padding: '16px', borderRadius: '8px', overflowX: 'auto', marginBottom: '24px' }}>
          <pre style={{ color: '#d4d4d4', fontFamily: 'monospace', fontSize: '14px' }}>
            {coreConcept.architectureFlow}
          </pre>
        </div>
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Data Flow Walkthrough</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {coreConcept.dataFlowWalkthrough?.map((step, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f59e0b', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</span>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{step}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};
