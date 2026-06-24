import React from 'react';
import { Database, Layout, Server, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onSelectDomain: (domain: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectDomain }) => {
  return (
    <div className="dashboard-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--bg-primary)',
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px', width: '100%', maxWidth: '600px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px',
          padding: '10px 20px',
          borderRadius: '24px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          boxShadow: 'var(--shadow-glass)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <img src="/logo.svg" alt="CN_DESIGN Logo" style={{ width: '42px', height: '42px' }} />
          <span style={{
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '1px',
            background: 'linear-gradient(to right, #3b82f6, #10b981, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            CN-DESIGN
          </span>
        </div>
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 48px)',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          Choose Your Path
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px, 4vw, 18px)', margin: '0 auto', lineHeight: 1.6 }}>
          Select a learning domain to access interactive courses, coding challenges, and interview preparation.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px',
        boxSizing: 'border-box'
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

        {/* Frontend Card - Active */}
        <div
          onClick={() => onSelectDomain('frontend')}
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
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Layout size={28} color="#10b981" />
            </div>
            <ChevronRight size={24} color="var(--text-muted)" className="card-arrow" />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Frontend Engineering</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
            Build responsive, accessible, and performant user interfaces with modern web technologies. Visual, interactive, project-driven, and interview-focused.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['React', 'JavaScript', 'TypeScript', 'CSS', 'Next.js'].map(tech => (
              <span key={tech} style={{
                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                background: 'var(--bg-inner)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)'
              }}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Backend Card - Active */}
        <div
          onClick={() => onSelectDomain('backend-engineering')}
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
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #00ADD8, #007d9c)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'rgba(0, 173, 216, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Server size={28} color="#00ADD8" />
            </div>
            <ChevronRight size={24} color="var(--text-muted)" className="card-arrow" />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Backend Engineering</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
            Master backend languages from beginner to expert — interactive lessons, hands-on code labs, self-checks, and full technical + coding interview prep.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Go', 'Python (soon)', 'Java (soon)'].map(tech => (
              <span key={tech} style={{
                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                background: 'var(--bg-inner)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)'
              }}>{tech}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
