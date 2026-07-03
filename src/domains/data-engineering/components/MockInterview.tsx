import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Category, ConceptualInterviewQuestion } from '../../../core/types/types';
import { Clock, ArrowRight, Eye, X, RotateCcw, Trophy, ThumbsUp, Minus, ThumbsDown, Play } from 'lucide-react';
import { formatText } from '../../../core/utils/textFormatting';
import { recordActivityToday } from '../utils/engagement';
import { useEscapeToClose } from '../utils/useEscapeToClose';

interface MockInterviewProps {
  tech: Category;
  techLabel: string;
  onExit: () => void;
}

const TECH_CATS = ['basic', 'intermediate', 'advanced', 'scenario', 'production', 'optimization', 'architecture'];
const SHARED_CATS = ['behavioral', 'systemdesign'];

type Rating = 'strong' | 'ok' | 'weak';
const RATING_SCORE: Record<Rating, number> = { strong: 1, ok: 0.6, weak: 0.2 };
const CAT_LABEL: Record<string, string> = {
  basic: 'Basics', intermediate: 'Intermediate', advanced: 'Advanced', scenario: 'Scenario',
  production: 'Production', optimization: 'Optimization', architecture: 'Architecture',
  behavioral: 'Behavioral', systemdesign: 'System Design',
};

interface PoolItem { q: ConceptualInterviewQuestion; cat: string; }

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export const MockInterview: React.FC<MockInterviewProps> = ({ tech, techLabel, onExit }) => {
  const [phase, setPhase] = useState<'config' | 'loading' | 'run' | 'summary'>('config');
  const [count, setCount] = useState(8);
  const [includeBehavioral, setIncludeBehavioral] = useState(true);
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);
  useEscapeToClose(onExit);

  useEffect(() => {
    if (phase !== 'run') return;
    timerRef.current = window.setInterval(() => setElapsed(e => e + 1), 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [phase]);

  const start = async () => {
    setPhase('loading');
    const cats = [...TECH_CATS.map(c => ({ url: `/content/interview/${tech}/${c}.json`, cat: c }))];
    if (includeBehavioral) SHARED_CATS.forEach(c => cats.push({ url: `/content/interview/_shared/${c}.json`, cat: c }));
    const loaded = await Promise.all(cats.map(c =>
      fetch(c.url).then(r => (r.ok ? r.json() : [])).then((arr: ConceptualInterviewQuestion[]) =>
        (Array.isArray(arr) ? arr : []).map(q => ({ q, cat: c.cat }))).catch(() => [] as PoolItem[])));
    // Spread across categories: round-robin from shuffled per-category buckets.
    const buckets = loaded.map(items => shuffle(items)).filter(b => b.length);
    const picked: PoolItem[] = [];
    let i = 0;
    while (picked.length < count && buckets.some(b => b.length)) {
      const b = buckets[i % buckets.length];
      if (b.length) picked.push(b.shift()!);
      i++;
    }
    setPool(picked);
    setIdx(0); setRevealed(false); setRatings({}); setElapsed(0);
    setPhase(picked.length ? 'run' : 'summary');
  };

  const rate = (r: Rating) => {
    const next = { ...ratings, [idx]: r };
    setRatings(next);
    if (idx < pool.length - 1) { setIdx(idx + 1); setRevealed(false); }
    else { if (timerRef.current) window.clearInterval(timerRef.current); recordActivityToday(); setPhase('summary'); }
  };

  const scorePct = useMemo(() => {
    const vals = Object.values(ratings);
    if (!vals.length) return 0;
    return Math.round((vals.reduce((a, r) => a + RATING_SCORE[r], 0) / pool.length) * 100);
  }, [ratings, pool.length]);

  // ---- Config ----
  if (phase === 'config') {
    return (
      <Shell onExit={onExit} title={`${techLabel} — Mock Interview`}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          A timed, mixed set of questions across {techLabel} concepts, scenarios and design{includeBehavioral ? ', plus behavioral & system-design' : ''}. Answer aloud (or in your head), reveal the model answer, and rate yourself honestly. You&apos;ll get a score and a breakdown of weak areas.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Questions:</span>
          {[6, 8, 12].map(n => (
            <button key={n} onClick={() => setCount(n)} className={`btn ${count === n ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 14px', fontSize: 13 }}>{n}</button>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={includeBehavioral} onChange={e => setIncludeBehavioral(e.target.checked)} />
            Include behavioral & system design
          </label>
        </div>
        <button onClick={start} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 18px' }}>
          <Play size={15} /> Start mock interview
        </button>
      </Shell>
    );
  }

  if (phase === 'loading') {
    return <Shell onExit={onExit} title={`${techLabel} — Mock Interview`}><p style={{ color: 'var(--text-muted)' }}>Assembling your interview…</p></Shell>;
  }

  // ---- Summary ----
  if (phase === 'summary') {
    const weak = pool.map((p, i) => ({ p, r: ratings[i] })).filter(x => x.r === 'weak' || x.r === 'ok');
    const weakCats = Array.from(new Set(weak.map(w => CAT_LABEL[w.p.cat] || w.p.cat)));
    const color = scorePct >= 80 ? '#10b981' : scorePct >= 50 ? '#f59e0b' : '#ef4444';
    return (
      <Shell onExit={onExit} title={`${techLabel} — Results`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `4px solid ${color}` }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>{scorePct}%</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>score</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'var(--text-primary)' }}><Trophy size={18} color={color} /> {pool.length} questions · {fmt(elapsed)} elapsed</div>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {scorePct >= 80 ? 'Strong performance — interview-ready on these areas.' : scorePct >= 50 ? 'Solid, with gaps to shore up.' : 'Good practice — focus your studying next.'}
            </span>
          </div>
        </div>

        {weakCats.length > 0 && (
          <div style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: 10, padding: 14 }}>
            <strong style={{ fontSize: 12.5, color: 'var(--text-primary)' }}>Focus areas</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {weakCats.map(c => <span key={c} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', color: 'var(--text-secondary)' }}>{c}</span>)}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pool.map((p, i) => {
            const r = ratings[i];
            const c = r === 'strong' ? '#10b981' : r === 'ok' ? '#f59e0b' : '#ef4444';
            return (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-inner)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.q.question}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize', flexShrink: 0 }}>{r || 'skipped'}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setPhase('config')} className="btn btn-primary" style={{ padding: '9px 16px' }}><RotateCcw size={14} /> New mock</button>
          <button onClick={onExit} className="btn btn-secondary" style={{ padding: '9px 16px' }}>Back to questions</button>
        </div>
      </Shell>
    );
  }

  // ---- Run ----
  const item = pool[idx];
  const q = item.q;
  return (
    <Shell onExit={onExit} title={`${techLabel} — Mock Interview`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Question {idx + 1} of {pool.length} · <span style={{ textTransform: 'capitalize' }}>{CAT_LABEL[item.cat] || item.cat}</span></span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}><Clock size={14} /> {fmt(elapsed)}</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
        <div style={{ width: `${(idx / pool.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#a855f7)', transition: 'width .3s ease' }} />
      </div>

      <h3 style={{ margin: '4px 0 0 0', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45 }}>{q.question}</h3>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '9px 16px' }}>
          <Eye size={15} /> Reveal model answer
        </button>
      ) : (
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'rgba(59,130,246,0.05)', borderLeft: '3px solid #3b82f6', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
            <strong style={{ fontSize: 12.5, color: 'var(--text-primary)' }}>Model answer</strong>
            <p style={{ margin: '6px 0 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{formatText(q.directAnswer)}</p>
          </div>
          {q.detailedExplanation?.howItWorks && (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{formatText(q.detailedExplanation.howItWorks)}</p>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Rate yourself:</span>
            <button onClick={() => rate('strong')} className="btn" style={{ padding: '7px 13px', fontSize: 12.5, background: 'var(--bg-inner)', border: '1px solid #10b981', color: '#10b981' }}><ThumbsUp size={13} /> Strong</button>
            <button onClick={() => rate('ok')} className="btn" style={{ padding: '7px 13px', fontSize: 12.5, background: 'var(--bg-inner)', border: '1px solid #f59e0b', color: '#f59e0b' }}><Minus size={13} /> Partial</button>
            <button onClick={() => rate('weak')} className="btn" style={{ padding: '7px 13px', fontSize: 12.5, background: 'var(--bg-inner)', border: '1px solid #ef4444', color: '#ef4444' }}><ThumbsDown size={13} /> Missed it</button>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>next <ArrowRight size={12} /></span>
          </div>
        </div>
      )}
    </Shell>
  );
};

const Shell: React.FC<{ title: string; onExit: () => void; children: React.ReactNode }> = ({ title, onExit, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 800, margin: '0 auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{title}</h2>
      <button onClick={onExit} aria-label="Exit mock interview" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12.5 }}><X size={14} /> Exit</button>
    </div>
    <div className="glass-panel" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg-secondary)' }}>
      {children}
    </div>
  </div>
);
