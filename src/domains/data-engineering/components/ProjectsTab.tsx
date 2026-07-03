import React, { useState, useEffect, useMemo } from 'react';
import type { DeProject } from '../../../core/types/types';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, ChevronDown, ChevronUp,
  Target, Wrench, ListChecks, GitBranch, Database, Rocket, Award,
  Layers, Lightbulb, BookOpen, Package, Trophy
} from 'lucide-react';

const LEVEL_COLOR: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const PROGRESS_KEY = 'de_project_progress';

// Render an "A -> B -> C" flow string as connected node boxes.
const FlowDiagram: React.FC<{ flow: string }> = ({ flow }) => {
  const nodes = flow
    .split(/->|→|=>/)
    .map(s => s.trim())
    .filter(Boolean);
  if (nodes.length <= 1) {
    return <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{flow}</p>;
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '8px' }}>
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', padding: '10px 14px',
            borderRadius: '10px', background: 'var(--bg-inner)',
            border: '1px solid var(--border-glass)', fontSize: '13px',
            fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35,
            maxWidth: '220px'
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minWidth: '20px', height: '20px', borderRadius: '6px', marginRight: '8px',
              background: 'rgba(59,130,246,0.15)', color: '#3b82f6',
              fontSize: '11px', fontWeight: 700, flexShrink: 0
            }}>{i + 1}</span>
            {n}
          </div>
          {i < nodes.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
              <ArrowRight size={16} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Chip: React.FC<{ children: React.ReactNode; accent?: boolean }> = ({ children, accent }) => (
  <span style={{
    fontSize: '12px', padding: '5px 11px', borderRadius: '999px',
    background: accent ? 'rgba(59,130,246,0.12)' : 'var(--bg-inner)',
    border: `1px solid ${accent ? 'rgba(59,130,246,0.4)' : 'var(--border-glass)'}`,
    color: accent ? '#3b82f6' : 'var(--text-secondary)', fontWeight: 500
  }}>{children}</span>
);

const SectionCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; desc?: string }> = ({ icon, title, children, desc }) => (
  <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-inner)' }}>
      <span style={{ display: 'flex', width: '34px', height: '34px', borderRadius: '9px', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.14)', color: '#3b82f6', flexShrink: 0 }}>{icon}</span>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
        {desc && <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</p>}
      </div>
    </div>
    <div style={{ padding: '18px' }}>{children}</div>
  </div>
);

export const ProjectsTab: React.FC = () => {
  const [projects, setProjects] = useState<DeProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openMilestone, setOpenMilestone] = useState<string | null>(null);
  const [hintsOpen, setHintsOpen] = useState<Record<string, boolean>>({});

  const [progress, setProgress] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/content/projects/projects.json');
        if (res.ok) {
          const data = (await res.json()) as DeProject[];
          if (!cancelled) setProjects(Array.isArray(data) ? data.sort((a, b) => a.order - b.order) : []);
        }
      } catch {
        /* leave empty */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const toggleMilestone = (id: string) => {
    setProgress(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (!updated[id]) delete updated[id];
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  };

  const projectStats = (p: DeProject) => {
    const done = p.milestones.filter(m => progress[m.id]).length;
    return { done, total: p.milestones.length, pct: p.milestones.length ? Math.round((done / p.milestones.length) * 100) : 0 };
  };

  const selected = useMemo(() => projects.find(p => p.id === selectedId) || null, [projects, selectedId]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading projects…</div>;
  }
  if (projects.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No projects available yet.</div>;
  }

  // ---------- Overview (ladder) ----------
  if (!selected) {
    const totalMilestones = projects.reduce((n, p) => n + p.milestones.length, 0);
    const totalDone = projects.reduce((n, p) => n + p.milestones.filter(m => progress[m.id]).length, 0);
    const overallPct = totalMilestones ? Math.round((totalDone / totalMilestones) * 100) : 0;
    // The first project that is not fully complete is the recommended "next".
    const nextProject = projects.find(p => projectStats(p).done < p.milestones.length) || projects[projects.length - 1];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rocket size={22} color="#3b82f6" />
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Build-Along Projects</h2>
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.65, maxWidth: '75ch' }}>
            A portfolio-ready ladder that turns concepts into a real, end-to-end data platform for the fictional
            e-commerce company <strong>ShopFlow</strong>. Each project builds on the last — from a first batch ETL job all
            the way to a unified cloud lakehouse. Work top to bottom, check off milestones as you go, and finish with a
            capstone you can show in interviews.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '4px' }}>
            <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Overall progress</span>
                <span>{totalDone}/{totalMilestones} milestones</span>
              </div>
              <div style={{ height: '8px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${overallPct}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#a855f7)', transition: 'width .3s ease' }} />
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '10px 16px' }} onClick={() => setSelectedId(nextProject.id)}>
              {totalDone === 0 ? 'Start the ladder' : 'Continue'} <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {projects.map((p, idx) => {
            const st = projectStats(p);
            const complete = st.done === st.total;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className="glass-panel"
                style={{
                  textAlign: 'left', cursor: 'pointer', padding: '18px', border: '1px solid var(--border-glass)',
                  display: 'flex', gap: '16px', alignItems: 'flex-start', width: '100%', background: 'var(--bg-secondary)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{
                    width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: complete ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.12)',
                    color: complete ? '#10b981' : '#3b82f6', fontWeight: 800, fontSize: '16px'
                  }}>
                    {complete ? <CheckCircle2 size={22} /> : p.order}
                  </span>
                  {idx < projects.length - 1 && <span style={{ flex: 1, width: '2px', minHeight: '18px', background: 'var(--border-glass)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: LEVEL_COLOR[p.level] }}>{p.level}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· {p.estimatedTime}</span>
                    {complete && <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>· Completed</span>}
                  </div>
                  <h3 style={{ margin: '4px 0 4px 0', fontSize: '16.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{p.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <div style={{ flex: '0 1 180px', height: '6px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
                      <div style={{ width: `${st.pct}%`, height: '100%', background: complete ? '#10b981' : '#3b82f6' }} />
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{st.done}/{st.total} milestones</span>
                  </div>
                </div>
                <ArrowRight size={18} className="text-muted" style={{ alignSelf: 'center', flexShrink: 0 }} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Detail ----------
  const st = projectStats(selected);
  const list = (items: string[], icon?: React.ReactNode) => (
    <ul style={{ margin: 0, paddingLeft: icon ? 0 : '18px', listStyle: icon ? 'none' : 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, display: icon ? 'flex' : 'list-item', gap: '8px', alignItems: 'flex-start' }}>
          {icon && <span style={{ color: '#10b981', flexShrink: 0, marginTop: '1px' }}>{icon}</span>}
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <button onClick={() => setSelectedId(null)} className="btn btn-secondary" style={{ padding: '6px 12px', alignSelf: 'flex-start' }}>
        <ArrowLeft size={14} /> All Projects
      </button>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.12)', color: '#3b82f6', fontWeight: 800 }}>{selected.order}</span>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: LEVEL_COLOR[selected.level] }}>{selected.level}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· {selected.estimatedTime}</span>
        </div>
        <h2 style={{ margin: 0, fontSize: '23px', fontWeight: 800, letterSpacing: '-0.4px' }}>{selected.title}</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65, maxWidth: '78ch' }}>{selected.summary}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 1 220px', height: '7px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
            <div style={{ width: `${st.pct}%`, height: '100%', background: st.done === st.total ? '#10b981' : 'linear-gradient(90deg,#3b82f6,#a855f7)', transition: 'width .3s ease' }} />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{st.done}/{st.total} milestones complete</span>
        </div>
      </div>

      <SectionCard icon={<Target size={18} />} title="Scenario">
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{selected.scenario}</p>
      </SectionCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        <SectionCard icon={<BookOpen size={18} />} title="Learning Goals">
          {list(selected.learningGoals, <CheckCircle2 size={15} />)}
        </SectionCard>
        <SectionCard icon={<Award size={18} />} title="Skills Demonstrated" desc="Resume-ready outcomes">
          {list(selected.skillsDemonstrated, <CheckCircle2 size={15} />)}
        </SectionCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        <SectionCard icon={<Wrench size={18} />} title="Tech Stack">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selected.techStack.map((t, i) => <Chip key={i} accent>{t}</Chip>)}
          </div>
        </SectionCard>
        <SectionCard icon={<ListChecks size={18} />} title="Prerequisites">
          {list(selected.prerequisites)}
        </SectionCard>
      </div>

      <SectionCard icon={<GitBranch size={18} />} title="Architecture & Data Flow">
        <FlowDiagram flow={selected.architectureFlow} />
      </SectionCard>

      <SectionCard icon={<Database size={18} />} title="Dataset">
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.datasetDescription}</p>
      </SectionCard>

      {/* Milestones */}
      <SectionCard icon={<Layers size={18} />} title="Milestones" desc="Build it step by step — check each off as you finish">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {selected.milestones.map((m, i) => {
            const done = !!progress[m.id];
            const open = openMilestone === m.id;
            return (
              <div key={m.id} style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-inner)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px' }}>
                  <button
                    onClick={() => toggleMilestone(m.id)}
                    aria-label={done ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: done ? '#10b981' : 'var(--text-muted)', display: 'flex', flexShrink: 0, padding: 0 }}
                  >
                    {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </button>
                  <button
                    onClick={() => setOpenMilestone(open ? null : m.id)}
                    aria-expanded={open}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', textAlign: 'left', fontFamily: 'inherit', padding: 0 }}
                  >
                    <span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Milestone {i + 1}</span>
                      <span style={{ display: 'block', fontSize: '14.5px', fontWeight: 600, textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.7 : 1 }}>{m.title}</span>
                    </span>
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                {open && (
                  <div style={{ padding: '0 14px 16px 46px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.goal}</p>

                    <div>
                      <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Tasks</strong>
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {m.tasks.map((t, ti) => <li key={ti} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{t}</li>)}
                      </ul>
                    </div>

                    <div>
                      <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#10b981' }}>Done when</strong>
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {m.acceptanceCriteria.map((a, ai) => (
                          <li key={ai} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '8px', overflow: 'hidden' }}>
                      <button
                        onClick={() => setHintsOpen(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600 }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><Lightbulb size={14} color="#f59e0b" /> Hints ({m.hints.length})</span>
                        {hintsOpen[m.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      {hintsOpen[m.id] && (
                        <ul style={{ margin: 0, padding: '10px 12px 12px 30px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {m.hints.map((h, hi) => <li key={hi} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{h}</li>)}
                        </ul>
                      )}
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Package size={15} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong style={{ color: 'var(--text-primary)' }}>Deliverable:</strong> {m.deliverable}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard icon={<Package size={18} />} title="Suggested Repository Structure">
        <pre style={{ margin: 0, padding: '14px', borderRadius: '8px', background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)', fontSize: '12.5px', lineHeight: 1.55, overflowX: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{selected.repoStructure}</pre>
      </SectionCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        <SectionCard icon={<ListChecks size={18} />} title="Production Checklist" desc="What separates a toy from production">
          {list(selected.productionChecklist, <CheckCircle2 size={15} />)}
        </SectionCard>
        <SectionCard icon={<Rocket size={18} />} title="Stretch Goals">
          {list(selected.stretchGoals)}
        </SectionCard>
      </div>

      <SectionCard icon={<Trophy size={18} />} title="Portfolio Tips" desc="Make it count in interviews">
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.portfolioTips}</p>
      </SectionCard>
    </div>
  );
};
