import React from 'react';
import { Database, Layout, Server, ChevronRight, Lock } from 'lucide-react';

interface DashboardProps {
  onSelectDomain: (domain: string) => void;
  theme: 'light' | 'dark';
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectDomain, theme }) => {
  return (
    <div className="dashboard-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--bg-primary)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          Choose Your Path
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Select a learning domain to access interactive courses, coding challenges, and interview preparation.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        
        {/* Data Engineering Card - Active */}
        <div 
          onClick={() => onSelectDomain('data-engineering')}
          className="domain-card active-card glass-panel"
          style={{
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #3b82f6, #a855f7)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '14px', 
              background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Database size={28} color="#3b82f6" />
            </div>
            <ChevronRight size={24} color="var(--text-muted)" className="card-arrow" />
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Data Engineering</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
            Master distributed systems, data modeling, and pipelines. Prepare for top-tier data engineering interviews.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {['Data Engineering', 'SQL', 'Python', 'PySpark', 'Databricks'].map(tech => (
               <span key={tech} style={{
                 padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                 background: 'var(--bg-inner)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)'
               }}>{tech}</span>
             ))}
          </div>
        </div>

        {/* Frontend Card - Disabled */}
        <div 
          className="domain-card disabled-card glass-panel"
          style={{
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            cursor: 'not-allowed',
            opacity: 0.7,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '14px', 
              background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Layout size={28} color="#10b981" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-inner)', padding: '4px 10px', borderRadius: '20px' }}>
              <Lock size={12} color="var(--text-muted)" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coming Soon</span>
            </div>
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Frontend Engineering</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
            Build responsive, accessible, and performant user interfaces with modern web technologies.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {['React', 'Vue', 'TypeScript', 'CSS', 'System Design'].map(tech => (
               <span key={tech} style={{
                 padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                 background: 'var(--bg-inner)', color: 'var(--text-muted)', border: '1px solid var(--border-glass)'
               }}>{tech}</span>
             ))}
          </div>
        </div>

        {/* Backend Card - Disabled */}
        <div 
          className="domain-card disabled-card glass-panel"
          style={{
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            cursor: 'not-allowed',
            opacity: 0.7,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '14px', 
              background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Server size={28} color="#f59e0b" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-inner)', padding: '4px 10px', borderRadius: '20px' }}>
              <Lock size={12} color="var(--text-muted)" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Coming Soon</span>
            </div>
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Backend Engineering</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
            Design scalable APIs, robust microservices, and efficient database architectures.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {['Node.js', 'Go', 'System Design', 'PostgreSQL', 'Redis'].map(tech => (
               <span key={tech} style={{
                 padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                 background: 'var(--bg-inner)', color: 'var(--text-muted)', border: '1px solid var(--border-glass)'
               }}>{tech}</span>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};
