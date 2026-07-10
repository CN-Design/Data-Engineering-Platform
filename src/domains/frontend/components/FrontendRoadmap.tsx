import React, { useEffect, useMemo, useState } from 'react';
import type { Category } from '../../../core/types/types';
import type { FrontendManifest } from '../../../core/types/frontend';
import { loadFrontendManifest } from '../loader';
import {
  ArrowLeft, ChevronDown, ChevronUp, CheckCircle2, Circle,
  Map as MapIcon, Rocket, Wrench, GraduationCap, Flame, Zap, Star, Lock,
} from 'lucide-react';
import { getStats, levelFromXp } from '../../data-engineering/utils/engagement';

interface FrontendRoadmapProps {
  completedTopics: Record<string, boolean>;
  onOpenTopic: (tech: Category, topicId?: string) => void;
  onBack: () => void;
}

interface StageDef {
  n: number;
  title: string;
  subtitle: string;
  tracks: Category[];
  note?: string;
  kind?: 'info';
}

// The zero-to-senior spine. Stages 1-5 map to content tracks; stages 0 and 6
// frame the journey (setup and interview prep) without faking interactivity.
const STAGES: StageDef[] = [
  { n: 0, title: 'Setup & Foundations', subtitle: 'How the web works, your tools, Git', tracks: [], kind: 'info',
    note: 'Before any framework: how the browser talks to servers over HTTP, setting up your editor, and version control with Git & GitHub. These are taught in depth in the Systems & the Web Platform track (Stage 3) — skim them here if you are brand new, then start Stage 1.' },
  { n: 1, title: 'Structure & Style', subtitle: 'Build static, accessible, responsive pages', tracks: ['html', 'css'] },
  { n: 2, title: 'Language Mastery', subtitle: 'Program the browser with JavaScript', tracks: ['javascript'] },
  { n: 3, title: 'Type Safety & the Platform', subtitle: 'TypeScript, plus how the web actually works', tracks: ['typescript', 'systems'] },
  { n: 4, title: 'React', subtitle: 'Build component-driven UIs', tracks: ['react'] },
  { n: 5, title: 'Next.js & Production', subtitle: 'Rendering models, data, and shipping', tracks: ['nextjs'] },
  { n: 6, title: 'Interview Ready', subtitle: 'Drills, machine-coding & system design', tracks: [], kind: 'info',
    note: 'Use the Interview Prep tab and per-topic interview sections in every track, plus the Coding Practice tab. (A dedicated machine-coding gauntlet and a frontend system-design module are the next build.)' },
];

const TECH_COLOR: Record<string, string> = {
  html: '#e34f26', css: '#1572b6', javascript: '#f7df1e',
  typescript: '#3178c6', react: '#06b6d4', nextjs: '#a855f7', systems: '#0ea5e9',
};

const STAGE_ICON: Record<number, any> = { 0: Wrench, 6: GraduationCap };

const card: React.CSSProperties = {
  border: '1px solid var(--border-glass)', borderRadius: '14px',
  background: 'var(--bg-secondary)', padding: '18px 20px',
};

const statTile: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '10px',
  padding: '10px 14px', borderRadius: '10px',
  background: 'var(--bg-inner)', border: '1px solid var(--border-glass)',
};

// ---- One track inside a stage: collapsible, groups -> clickable topic chips ----
const TrackBlock: React.FC<{
  tech: Category;
  manifest: FrontendManifest | null;
  completedTopics: Record<string, boolean>;
  onOpenTopic: (tech: Category, topicId?: string) => void;
}> = ({ tech, manifest, completedTopics, onOpenTopic }) => {
  const [open, setOpen] = useState(false);
  const color = TECH_COLOR[tech] || '#3b82f6';

  const { total, done, groups } = useMemo(() => {
    const topics = manifest?.topics ?? [];
    const g: Record<string, typeof topics> = {};
    topics.forEach(t => { (g[t.group || 'Topics'] ||= []).push(t); });
    return {
      total: topics.length,
      done: topics.filter(t => completedTopics[t.id]).length,
      groups: g,
    };
  }, [manifest, completedTopics]);

  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'inherit', textAlign: 'left' }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: color, flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: '15px' }}>{manifest?.title || tech}</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{done}/{total} done</span>
        <div style={{ flex: 1, height: '6px', borderRadius: '999px', background: 'var(--bg-secondary)', overflow: 'hidden', minWidth: '60px', maxWidth: '220px' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#10b981' : color }} />
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onOpenTopic(tech); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onOpenTopic(tech); } }}
          style={{ fontSize: '12px', fontWeight: 700, color, padding: '5px 10px', borderRadius: '8px', border: `1px solid ${color}55`, whiteSpace: 'nowrap' }}
        >
          {done > 0 ? 'Continue' : 'Start'} →
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div style={{ padding: '0 14px 14px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(groups).map(([group, topics]) => (
            <div key={group}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', margin: '4px 0 8px' }}>{group}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {topics.map(t => {
                  const isDone = !!completedTopics[t.id];
                  return (
                    <button
                      key={t.id}
                      onClick={() => onOpenTopic(tech, t.id)}
                      title={t.title}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '12.5px', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer',
                        fontFamily: 'inherit',
                        border: `1px solid ${isDone ? '#10b98155' : 'var(--border-glass)'}`,
                        background: isDone ? 'rgba(16,185,129,0.12)' : 'var(--bg-secondary)',
                        color: isDone ? '#10b981' : 'var(--text-secondary)',
                      }}
                    >
                      {isDone ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                      {t.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FrontendRoadmap: React.FC<FrontendRoadmapProps> = ({ completedTopics, onOpenTopic, onBack }) => {
  const [manifests, setManifests] = useState<Record<string, FrontendManifest | null>>({});
  const techs = useMemo(() => Array.from(new Set(STAGES.flatMap(s => s.tracks))), []);

  useEffect(() => {
    let cancelled = false;
    Promise.all(techs.map(t => loadFrontendManifest(t).then(m => [t, m] as const))).then(pairs => {
      if (!cancelled) setManifests(Object.fromEntries(pairs));
    });
    return () => { cancelled = true; };
  }, [techs]);

  const overall = useMemo(() => {
    let total = 0, done = 0;
    techs.forEach(t => {
      const topics = manifests[t]?.topics ?? [];
      total += topics.length;
      done += topics.filter(x => completedTopics[x.id]).length;
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [manifests, completedTopics, techs]);

  // XP / streak / level are derived from the same progress signals the whole
  // app writes to (completedTopics is passed so this recomputes on return).
  const stats = useMemo(() => getStats(), [completedTopics]);
  const lvl = useMemo(() => levelFromXp(stats.xp), [stats.xp]);

  // Stage gating: a track-bearing stage unlocks once the previous one is >=50% complete.
  const manifestsReady = techs.every(t => manifests[t] !== undefined);
  const lockedStages = useMemo(() => {
    const locked: Record<number, boolean> = {};
    if (!manifestsReady) return locked; // never lock before data loads
    const trackStages = STAGES.filter(s => s.tracks.length > 0);
    const pct = (s: StageDef) => {
      let tot = 0, dn = 0;
      s.tracks.forEach(t => { const tp = manifests[t]?.topics ?? []; tot += tp.length; dn += tp.filter(x => completedTopics[x.id]).length; });
      return tot ? dn / tot : 0;
    };
    trackStages.forEach((s, i) => { locked[s.n] = i > 0 && pct(trackStages[i - 1]) < 0.5; });
    return locked;
  }, [manifestsReady, manifests, completedTopics]);
  const prevTrackStage = (n: number): StageDef | null => {
    const ts = STAGES.filter(s => s.tracks.length > 0);
    const i = ts.findIndex(s => s.n === n);
    return i > 0 ? ts[i - 1] : null;
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px 60px' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer', marginBottom: '18px' }}>
        <ArrowLeft size={16} /> All domains
      </button>

      <div style={{ ...card, marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'rgba(59,130,246,0.14)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapIcon size={22} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Frontend Engineer Roadmap</h1>
            <p style={{ margin: '3px 0 0', color: 'var(--text-secondary)', fontSize: '14.5px' }}>Absolute beginner → interview-ready, one guided path. Pick up anywhere.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
          <div style={{ flex: 1, height: '10px', borderRadius: '999px', background: 'var(--bg-inner)', overflow: 'hidden' }}>
            <div style={{ width: `${overall.pct}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{overall.done}/{overall.total} topics · {overall.pct}%</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '14px' }}>
          <div style={statTile}>
            <span style={{ color: '#f97316', display: 'flex' }}><Flame size={18} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{stats.streak}</strong>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>day streak</span>
            </div>
          </div>
          <div style={{ ...statTile, flex: 1, minWidth: '170px' }}>
            <span style={{ color: '#8b5cf6', display: 'flex' }}><Zap size={18} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Level {lvl.level} · {lvl.title}</strong>
                <span style={{ color: 'var(--text-muted)' }}>{lvl.intoLevel}/{lvl.forNext} XP</span>
              </div>
              <div style={{ height: '6px', borderRadius: '999px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${lvl.pctToNext}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
              </div>
            </div>
          </div>
          <div style={statTile}>
            <span style={{ color: '#f59e0b', display: 'flex' }}><Star size={18} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{stats.xp}</strong>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>total XP</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {STAGES.map(stage => {
          const Icon = STAGE_ICON[stage.n] || Rocket;
          const locked = !!lockedStages[stage.n];
          const prev = prevTrackStage(stage.n);
          return (
            <div key={stage.n} style={{ ...card, opacity: locked ? 0.72 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: stage.tracks.length || stage.note ? '14px' : 0 }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px', background: locked ? 'var(--bg-inner)' : stage.kind === 'info' ? 'var(--bg-inner)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: locked || stage.kind === 'info' ? 'var(--text-secondary)' : '#fff' }}>
                  {locked ? <Lock size={16} /> : stage.kind === 'info' ? <Icon size={17} /> : stage.n}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>Stage {stage.n} · {stage.title}</h2>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>{stage.subtitle}</p>
                </div>
                {locked && <span style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', border: '1px solid var(--border-glass)', borderRadius: 6, padding: '3px 8px' }}>Locked</span>}
              </div>

              {stage.note && !locked && (
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>{stage.note}</p>
              )}

              {stage.tracks.length > 0 && (
                locked ? (
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-inner)', border: '1px dashed var(--border-glass)', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                    <Lock size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                    Reach 50% of {prev ? `Stage ${prev.n} · ${prev.title}` : 'the previous stage'} to unlock {stage.tracks.map(t => manifests[t]?.title || t).join(' & ')}.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {stage.tracks.map(tech => (
                      <TrackBlock key={tech} tech={tech} manifest={manifests[tech] ?? null} completedTopics={completedTopics} onOpenTopic={onOpenTopic} />
                    ))}
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
