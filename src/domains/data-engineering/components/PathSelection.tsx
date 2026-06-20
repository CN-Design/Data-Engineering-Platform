import React from 'react';
import { Database, Code, Zap, Layers, Network, ChevronRight, ArrowLeft } from 'lucide-react';
import type { Category } from '../../../core/types/types';

interface PathSelectionProps {
  onSelectTech: (tech: Category) => void;
  onBack: () => void;
}

export const PathSelection: React.FC<PathSelectionProps> = ({ onSelectTech, onBack }) => {
  const techOptions: { id: Category; title: string; description: string; icon: any; color: string; bg: string }[] = [
    {
      id: 'data-engineering',
      title: 'Data Engineering Core',
      description: 'Master core concepts, data modeling, ETL pipelines, and data warehouse architecture.',
      icon: Network,
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.1)'
    },
    {
      id: 'sql',
      title: 'Advanced SQL',
      description: 'Deep dive into complex queries, window functions, query optimization, and performance tuning.',
      icon: Database,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)'
    },
    {
      id: 'python',
      title: 'Python for DE',
      description: 'Learn Python programming from scratch with a focus on data structures, OOP, and data manipulation.',
      icon: Code,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: 'pyspark',
      title: 'Apache PySpark',
      description: 'Scale your data processing with distributed computing, RDDs, DataFrames, and Spark SQL.',
      icon: Zap,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)'
    },
    {
      id: 'databricks',
      title: 'Databricks',
      description: 'Build modern data lakehouses, manage Delta Lake, and orchestrate workflows efficiently.',
      icon: Layers,
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)'
    }
  ];

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
          Data Engineering Stack
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
            onClick={() => onSelectTech(tech.id)}
            className="domain-card glass-panel group"
            style={{
              padding: '28px',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
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
              <ChevronRight size={22} color="var(--text-muted)" className="card-arrow" style={{ transition: 'transform 0.3s ease' }} />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {tech.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5, flex: 1, margin: 0 }}>
              {tech.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
