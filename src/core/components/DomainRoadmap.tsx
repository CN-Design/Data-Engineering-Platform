import React, { useEffect, useMemo, useState } from 'react';
import type { Category, Topic } from '../types/types';
import { getStats, levelFromXp } from '../../domains/data-engineering/utils/engagement';
import {
  ArrowLeft, ChevronRight, Rocket, Flame, Zap, Star, Sun, Moon,
  FileCode2, Palette, Braces, Atom, Triangle, Globe, Terminal, Code2, Database, Network,
  Warehouse, Workflow, Radio, Cloud, Container, ShieldCheck, Siren, Layers, Server, Coffee,
  Brain, Wrench, Search, Save, Users, Plug, Gauge,
} from 'lucide-react';

const TECH_ICON: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  html: FileCode2, css: Palette, javascript: Braces, typescript: Braces, react: Atom, nextjs: Triangle, systems: Globe,
  foundations: Terminal, python: Code2, sql: Database, 'data-engineering': Network, warehousing: Warehouse,
  orchestration: Workflow, pyspark: Zap, streaming: Radio, cloud: Cloud, devops: Container, dataquality: ShieldCheck,
  sre: Siren, databricks: Layers, golang: Server, java: Coffee,
  'agent-foundations': Brain, 'agent-tools': Wrench, 'agent-rag': Search, 'agent-orchestration': Workflow,
  'agent-memory': Save, 'agent-multi': Users, 'agent-mcp': Plug, 'agent-eval': Gauge, 'agent-safety': ShieldCheck, 'agent-production': Rocket,
};

export interface RoadmapTech { id: Category; label: string; color: string; soon?: boolean; }
export interface RoadmapStage { n: number; title: string; subtitle: string; techs: RoadmapTech[]; }
export interface RoadmapConfig { title: string; subtitle: string; stages: RoadmapStage[]; }

export const ROADMAPS: Record<string, RoadmapConfig> = {
  'frontend': {
    title: 'Frontend Engineering', subtitle: 'UIs from zero to interview-ready — one guided path.',
    stages: [
      { n: 1, title: 'Structure & Style', subtitle: 'Build accessible, responsive pages', techs: [{ id: 'html' as Category, label: 'HTML', color: '#e34f26' }, { id: 'css' as Category, label: 'CSS', color: '#1572b6' }] },
      { n: 2, title: 'Language Mastery', subtitle: 'Program the browser with JavaScript', techs: [{ id: 'javascript' as Category, label: 'JavaScript', color: '#eab308' }] },
      { n: 3, title: 'Type Safety & the Platform', subtitle: 'TypeScript + how the web actually works', techs: [{ id: 'typescript' as Category, label: 'TypeScript', color: '#3178c6' }, { id: 'systems' as Category, label: 'Systems', color: '#0ea5e9' }] },
      { n: 4, title: 'React', subtitle: 'Component-driven UIs', techs: [{ id: 'react' as Category, label: 'React', color: '#06b6d4' }] },
      { n: 5, title: 'Next.js & Production', subtitle: 'Rendering models, data, and shipping', techs: [{ id: 'nextjs' as Category, label: 'Next.js', color: '#a855f7' }] },
    ],
  },
  'data-engineering': {
    title: 'Data Engineering', subtitle: 'Pipelines, warehousing & big data — the zero-to-senior path.',
    stages: [
      { n: 1, title: 'Foundations', subtitle: 'CLI, Git, and the ground floor', techs: [{ id: 'foundations' as Category, label: 'Foundations', color: '#64748b' }] },
      { n: 2, title: 'Programming', subtitle: 'Python & SQL for data work', techs: [{ id: 'python' as Category, label: 'Python for DE', color: '#f59e0b' }, { id: 'sql' as Category, label: 'Advanced SQL', color: '#10b981' }] },
      { n: 3, title: 'Core & Warehousing', subtitle: 'Modeling, ETL, and warehouses', techs: [{ id: 'data-engineering' as Category, label: 'DE Core', color: '#3b82f6' }, { id: 'warehousing' as Category, label: 'Warehousing', color: '#0891b2' }] },
      { n: 4, title: 'Processing at Scale', subtitle: 'Batch & streaming', techs: [{ id: 'pyspark' as Category, label: 'PySpark', color: '#ef4444' }, { id: 'streaming' as Category, label: 'Kafka & Streaming', color: '#14b8a6' }] },
      { n: 5, title: 'Orchestration & Platform', subtitle: 'Pipelines, cloud, lakehouse', techs: [{ id: 'orchestration' as Category, label: 'dbt & Orchestration', color: '#f97316' }, { id: 'cloud' as Category, label: 'Cloud & Storage', color: '#0ea5e9' }, { id: 'databricks' as Category, label: 'Databricks', color: '#a855f7' }] },
      { n: 6, title: 'Reliability & Quality', subtitle: 'Ship and operate in production', techs: [{ id: 'devops' as Category, label: 'DevOps', color: '#6366f1' }, { id: 'dataquality' as Category, label: 'Data Quality', color: '#22c55e' }, { id: 'sre' as Category, label: 'Reliability (SRE)', color: '#f43f5e' }] },
    ],
  },
  'backend-engineering': {
    title: 'Backend Engineering', subtitle: 'Production services & distributed systems.',
    stages: [
      { n: 1, title: 'Go: Language & Concurrency', subtitle: 'From syntax to goroutines & channels', techs: [{ id: 'golang' as Category, label: 'Go (Golang)', color: '#00ADD8' }] },
      { n: 2, title: 'More Languages', subtitle: 'Expanding soon', techs: [{ id: 'python' as Category, label: 'Python', color: '#ffd43b', soon: true }, { id: 'java' as Category, label: 'Java', color: '#f89820', soon: true }] },
    ],
  },
  'ai-agents': {
    title: 'AI Agents', subtitle: 'Production agents from first principles.',
    stages: [
      { n: 1, title: 'Foundations', subtitle: 'How LLMs power agents', techs: [{ id: 'agent-foundations' as Category, label: 'Agent Foundations', color: '#8b5cf6' }] },
      { n: 2, title: 'Capabilities', subtitle: 'Tools, retrieval, and memory', techs: [{ id: 'agent-tools' as Category, label: 'Tool Use', color: '#a855f7' }, { id: 'agent-rag' as Category, label: 'RAG', color: '#ec4899' }, { id: 'agent-memory' as Category, label: 'Memory & State', color: '#0ea5e9' }] },
      { n: 3, title: 'Systems', subtitle: 'Orchestration & protocols', techs: [{ id: 'agent-orchestration' as Category, label: 'Orchestration', color: '#6366f1' }, { id: 'agent-multi' as Category, label: 'Multi-Agent', color: '#14b8a6' }, { id: 'agent-mcp' as Category, label: 'MCP', color: '#f59e0b' }] },
      { n: 4, title: 'Production', subtitle: 'Evaluate, secure, and deploy', techs: [{ id: 'agent-eval' as Category, label: 'Evaluation', color: '#22c55e' }, { id: 'agent-safety' as Category, label: 'Safety & Guardrails', color: '#ef4444' }, { id: 'agent-production' as Category, label: 'Production', color: '#f97316' }] },
    ],
  },
};

interface Props {
  config: RoadmapConfig;
  getTopics: () => Promise<Topic[]>;
  completedTopics: Record<string, boolean>;
  onOpenTrack: (tech: Category) => void;
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const card: React.CSSProperties = { border: '1px solid var(--border-glass)', borderRadius: 14, background: 'var(--bg-secondary)', padding: '18px 20px' };
const statTile: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' };

export const DomainRoadmap: React.FC<Props> = ({ config, getTopics, completedTopics, onOpenTrack, onBack, theme = 'dark', onToggleTheme }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => { let c = false; getTopics().then(t => { if (!c) setTopics(t); }); return () => { c = true; }; }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const byTech = useMemo(() => {
    const m: Record<string, { total: number; done: number }> = {};
    topics.forEach(t => { const r = (m[t.category] || (m[t.category] = { total: 0, done: 0 })); r.total++; if (completedTopics[t.id]) r.done++; });
    return m;
  }, [topics, completedTopics]);

  const stats = useMemo(() => getStats(), [completedTopics]);
  const lvl = useMemo(() => levelFromXp(stats.xp), [stats.xp]);

  const overall = useMemo(() => {
    let total = 0, done = 0;
    config.stages.forEach(s => s.techs.forEach(t => { if (t.soon) return; const r = byTech[t.id]; if (r) { total += r.total; done += r.done; } }));
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [byTech, config]);

  const next = useMemo(() => {
    const all = config.stages.flatMap(s => s.techs).filter(t => !t.soon);
    return all.find(t => { const r = byTech[t.id]; return !r || r.done < r.total; }) || all[0] || null;
  }, [byTech, config]);
  const anyProgress = overall.done > 0;

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

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(22px,4vw,40px) clamp(16px,5vw,40px) 60px', overflowX: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer', marginBottom: 18 }}>
            <ArrowLeft size={16} /> All domains
          </button>

          {/* Hero */}
          <div style={{ ...card, marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>{config.title} Roadmap</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 14.5 }}>{config.subtitle}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <div style={{ flex: 1, height: 10, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${overall.pct}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{overall.done}/{overall.total} · {overall.pct}%</span>
            </div>

            {next && (
              <button onClick={() => onOpenTrack(next.id)} style={{ width: '100%', marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff' }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Rocket size={20} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.85 }}>{anyProgress ? 'Continue learning' : 'Start here'}</span>
                  <span style={{ display: 'block', fontSize: 16, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{next.label}</span>
                </span>
                <ChevronRight size={22} style={{ flexShrink: 0 }} />
              </button>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
              <div style={statTile}><span style={{ color: '#f97316', display: 'flex' }}><Flame size={18} /></span><div style={{ lineHeight: 1.1 }}><strong style={{ fontSize: 15, color: 'var(--text-primary)' }}>{stats.streak}</strong><div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>day streak</div></div></div>
              <div style={{ ...statTile, flex: 1, minWidth: 170 }}><span style={{ color: '#8b5cf6', display: 'flex' }}><Zap size={18} /></span><div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}><strong style={{ color: 'var(--text-primary)' }}>Level {lvl.level} · {lvl.title}</strong><span style={{ color: 'var(--text-muted)' }}>{lvl.intoLevel}/{lvl.forNext} XP</span></div><div style={{ height: 6, borderRadius: 999, background: 'var(--bg-secondary)', overflow: 'hidden' }}><div style={{ width: `${lvl.pctToNext}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} /></div></div></div>
              <div style={statTile}><span style={{ color: '#f59e0b', display: 'flex' }}><Star size={18} /></span><div style={{ lineHeight: 1.1 }}><strong style={{ fontSize: 15, color: 'var(--text-primary)' }}>{stats.xp}</strong><div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>total XP</div></div></div>
            </div>
          </div>

          {/* Stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {config.stages.map(stage => (
              <div key={stage.n} style={card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff' }}>{stage.n}</div>
                  <div><h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Stage {stage.n} · {stage.title}</h2><p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{stage.subtitle}</p></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10 }}>
                  {stage.techs.map(t => {
                    const r = byTech[t.id];
                    const total = r?.total ?? 0; const done = r?.done ?? 0;
                    const pct = total ? Math.round((done / total) * 100) : 0;
                    const sub = t.soon ? 'Coming soon' : total === 0 ? 'Explore' : done > 0 ? `${done}/${total} · ${pct}%` : `${total} lessons`;
                    const Icon = TECH_ICON[t.id] || Code2;
                    return (
                      <button key={t.id} onClick={() => { if (!t.soon) onOpenTrack(t.id); }} disabled={t.soon} className="dash-tile"
                        style={{ display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left', padding: '13px 14px', borderRadius: 12, cursor: t.soon ? 'default' : 'pointer', opacity: t.soon ? 0.5 : 1, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)' }}>
                        <span style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: `${t.color}22`, border: `1px solid ${t.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={17} color={t.color} /></span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.label}</span>
                          <span style={{ display: 'block', fontSize: 11.5, color: done > 0 ? t.color : 'var(--text-muted)', marginTop: 1 }}>{sub}</span>
                        </span>
                        {!t.soon && <ChevronRight size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
