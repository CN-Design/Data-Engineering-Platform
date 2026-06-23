import React from 'react';
import { Database, Code, Zap, Layers, Network, ChevronRight, ArrowLeft, Lock } from 'lucide-react';
import type { Category, Domain } from '../../../core/types/types';
import { FRONTEND_TECHS } from '../../frontend/loader';
import { allTopics } from '../data';

interface PathSelectionProps {
  onSelectTech: (tech: Category) => void;
  onBack: () => void;
  domain?: Domain;
}

type TechOption = { id: Category; title: string; description: string; icon: any; color: string; bg: string; available: boolean; topicCount: number };

// Completed topics from localStorage, used to show per-tech progress.
const getCompleted = (): Record<string, boolean> => {
  try { return JSON.parse(localStorage.getItem('de_completed_topics') || '{}'); } catch { return {}; }
};

const hexToBg = (hex: string) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
};

export const PathSelection: React.FC<PathSelectionProps> = ({ onSelectTech, onBack, domain = 'data-engineering' }) => {
  const countFor = (id: Category) => allTopics.filter(t => t.category === id).length;
  const dataOptions: TechOption[] = [
    { id: 'data-engineering', title: 'Data Engineering Core', description: 'Master core concepts, data modeling, ETL pipelines, and data warehouse architecture.', icon: Network, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', available: true, topicCount: countFor('data-engineering') },
    { id: 'sql', title: 'Advanced SQL', description: 'Deep dive into complex queries, window functions, query optimization, and performance tuning.', icon: Database, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', available: true, topicCount: countFor('sql') },
    { id: 'python', title: 'Python for DE', description: 'Learn Python programming from scratch with a focus on data structures, OOP, and data manipulation.', icon: Code, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', available: true, topicCount: countFor('python') },
    { id: 'pyspark', title: 'Apache PySpark', description: 'Scale your data processing with distributed computing, RDDs, DataFrames, and Spark SQL.', icon: Zap, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', available: true, topicCount: countFor('pyspark') },
    { id: 'databricks', title: 'Databricks', description: 'Build modern data lakehouses, manage Delta Lake, and orchestrate workflows efficiently.', icon: Layers, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', available: true, topicCount: countFor('databricks') },
  ];

  const frontendOptions: TechOption[] = FRONTEND_TECHS.map(t => ({
    id: t.id, title: t.title, description: t.description, icon: Code, color: t.color, bg: hexToBg(t.color), available: t.available, topicCount: t.topicCount || 0,
  }));

  const isFrontend = domain === 'frontend';
  const techOptions: TechOption[] = isFrontend ? frontendOptions : dataOptions;
  const heading = isFrontend ? 'Frontend Engineering' : 'Data Engineering Stack';

  const completed = getCompleted();
  const completedFor = (id: Category) => Object.keys(completed).filter(tid => completed[tid] && tid.startsWith(id + '-')).length;

  return (
    <div className="dashboard-container animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      background: 'var(--bg-primary)',
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="glass-panel"
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-glass)',
          background: 'var(--bg-glass)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          marginBottom: '20px',
          zIndex: 10
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-inner)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-glass)'}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div style={{ textAlign: 'center', marginBottom: '60px', width: '100%', maxWidth: '800px', marginTop: '20px' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          {heading}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px, 4vw, 18px)', margin: '0 auto', lineHeight: 1.6 }}>
          Select a technology or domain to dive into tailored courses, interview prep, and coding challenges.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1100px',
        boxSizing: 'border-box'
      }}>
        {techOptions.map((tech) => (
          <div
            key={tech.id}
            onClick={() => { if (tech.available) onSelectTech(tech.id); }}
            className="domain-card glass-panel group"
            style={{
              padding: '28px',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              cursor: tech.available ? 'pointer' : 'not-allowed',
              opacity: tech.available ? 1 : 0.6,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              if (!tech.available) return;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 24px -10px ${tech.bg.replace('0.1', '0.5')}`;
              e.currentTarget.style.borderColor = tech.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: tech.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }} className="icon-container">
                <tech.icon size={26} color={tech.color} />
              </div>
              {tech.available
                ? <ChevronRight size={22} color="var(--text-muted)" className="card-arrow" style={{ transition: 'transform 0.3s ease' }} />
                : <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-inner)', padding: '4px 10px', borderRadius: '20px' }}><Lock size={12} color="var(--text-muted)" /><span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Soon</span></div>}
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {tech.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5, flex: 1, margin: 0 }}>
              {tech.description}
            </p>

            {tech.available && tech.topicCount > 0 && (() => {
              const done = completedFor(tech.id);
              const pct = Math.round((done / tech.topicCount) * 100);
              return (
                <div style={{ marginTop: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{tech.topicCount} topics</span>
                    <span style={{ color: done > 0 ? tech.color : 'var(--text-muted)', fontWeight: 600 }}>{done > 0 ? `${done} done · ${pct}%` : 'Not started'}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: tech.color, borderRadius: '999px', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
};
