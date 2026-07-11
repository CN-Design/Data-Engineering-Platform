import React from 'react';
import { Layout, Database, Server, Bot, ChevronRight, PlayCircle, Sun, Moon, ArrowRight } from 'lucide-react';
import type { Category } from '../types/types';

type DomainId = 'frontend' | 'backend-engineering' | 'ai-agents' | 'data-engineering';

interface DashboardProps {
  onSelectDomain: (domain: string) => void;
  onResumeFrontend?: (tech: Category, topicId: string) => void;
  onLaunch?: (domain: DomainId, tech: Category) => void; // accepted for compatibility; unused here
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

interface DomainDef {
  id: DomainId;
  title: string;
  description: string;
  meta: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  bar: string;
  tint: string;
  color: string;
  tags: string[];
}

const DOMAINS: DomainDef[] = [
  {
    id: 'frontend', title: 'Frontend Engineering', meta: '7 tracks · 213 lessons',
    description: 'HTML, CSS, JavaScript, TypeScript, React & Next.js — visual, interactive, project-driven, and interview-focused.',
    Icon: Layout, bar: 'linear-gradient(90deg,#10b981,#06b6d4)', tint: 'rgba(16,185,129,0.14)', color: '#10b981',
    tags: ['React', 'TypeScript', 'Next.js', 'CSS', 'Systems'],
  },
  {
    id: 'data-engineering', title: 'Data Engineering', meta: '13 tracks',
    description: 'Python, SQL, Spark, warehousing, orchestration, streaming, and reliability — the full modern data stack.',
    Icon: Database, bar: 'linear-gradient(90deg,#3b82f6,#a855f7)', tint: 'rgba(59,130,246,0.14)', color: '#3b82f6',
    tags: ['SQL', 'Python', 'PySpark', 'Databricks', 'Airflow'],
  },
  {
    id: 'backend-engineering', title: 'Backend Engineering', meta: 'Go · 94 lessons',
    description: 'Production Go from first principles — types, concurrency, web & services, and distributed-systems design.',
    Icon: Server, bar: 'linear-gradient(90deg,#00ADD8,#007d9c)', tint: 'rgba(0,173,216,0.14)', color: '#00ADD8',
    tags: ['Go', 'gRPC', 'Microservices', 'Python (soon)'],
  },
  {
    id: 'ai-agents', title: 'AI Agents', meta: '10 tracks',
    description: 'Build production agents from scratch — tool use, RAG, memory, orchestration, multi-agent, MCP, and safety.',
    Icon: Bot, bar: 'linear-gradient(90deg,#8b5cf6,#ec4899)', tint: 'rgba(139,92,246,0.14)', color: '#8b5cf6',
    tags: ['RAG', 'Tool Use', 'LangGraph', 'MCP'],
  },
];

export const Dashboard: React.FC<DashboardProps> = ({ onSelectDomain, onResumeFrontend, theme = 'dark', onToggleTheme }) => {
  let resume: { tech: Category; topicId: string; title: string; techTitle: string } | null = null;
  try { resume = JSON.parse(localStorage.getItem('fe_last_topic') || 'null'); } catch { /* ignore */ }

  return (
    <div style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px clamp(16px,5vw,40px)', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.svg" alt="" aria-hidden="true" style={{ width: 30, height: 30 }} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.5px', background: 'linear-gradient(to right,#3b82f6,#10b981,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CN-DESIGN</span>
          <span className="dash-subtitle" style={{ fontSize: 12.5, color: 'var(--text-muted)', marginLeft: 6, borderLeft: '1px solid var(--border-glass)', paddingLeft: 12 }}>Engineering Academy</span>
        </div>
        {onToggleTheme && (
          <button onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle theme" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
      </header>

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(28px,5vw,60px) clamp(16px,5vw,40px)', overflowX: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: '1080px' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,40px)' }}>
            <h1 style={{ fontSize: 'clamp(30px,6vw,46px)', fontWeight: 800, letterSpacing: '-1.2px', margin: '0 0 12px', background: 'linear-gradient(135deg,#3b82f6 0%,#a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
              From Foundations to Job-Ready
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px,2.5vw,18px)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Choose a domain to open its guided roadmap — interactive lessons, live playgrounds, graded practice, and interview prep.
            </p>
          </div>

          {/* Resume */}
          {resume && onResumeFrontend && (
            <button onClick={() => onResumeFrontend(resume!.tech, resume!.topicId)} className="dash-card"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', cursor: 'pointer', marginBottom: 'clamp(18px,3vw,26px)', padding: '15px 20px', borderRadius: 16, border: '1px solid var(--border-glass)', background: 'linear-gradient(135deg, rgba(59,130,246,0.16), rgba(139,92,246,0.16))', color: 'var(--text-primary)' }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#c4b5fd' }}><PlayCircle size={24} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-secondary)' }}>Continue where you left off</span>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 700, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{resume.techTitle} · {resume.title}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Resume <ChevronRight size={18} /></span>
            </button>
          )}

          {/* Domain cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(14px,2vw,20px)' }}>
            {DOMAINS.map(d => (
              <button key={d.id} onClick={() => onSelectDomain(d.id)} className="dash-card"
                style={{ position: 'relative', overflow: 'hidden', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: 26, borderRadius: 18, border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}>
                <span style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: d.bar }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ width: 52, height: 52, borderRadius: 14, background: d.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><d.Icon size={26} color={d.color} /></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{d.meta}</span>
                </div>
                <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 8px' }}>{d.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>{d.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
                  {d.tags.map(t => (
                    <span key={t} style={{ padding: '3px 9px', borderRadius: 6, fontSize: 11.5, fontWeight: 600, background: 'var(--bg-inner)', color: 'var(--text-secondary)', border: '1px solid var(--border-glass)' }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', padding: '8px 15px', borderRadius: 10, fontWeight: 700, fontSize: 13.5, color: '#fff', background: d.bar }}>
                  Explore roadmap <ArrowRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
