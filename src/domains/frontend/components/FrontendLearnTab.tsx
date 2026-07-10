import React, { useCallback, useEffect, useState } from 'react';
import type { Category } from '../../../core/types/types';
import type { FrontendTopicData } from '../../../core/types/frontend';
import { FrontendTopicRenderer } from './FrontendTopicRenderer';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface FrontendLearnTabProps {
  tech: Category;
  topicId: string | null;
  topics?: Array<{ id: string; title: string }>;
  onNavigate?: (id: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

type Status = 'idle' | 'loading' | 'ok' | 'missing' | 'error';
const cache: Record<string, FrontendTopicData | null> = {};

// --- Skeleton (loading) ---
const shimmer: React.CSSProperties = {
  background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-inner) 37%, var(--bg-secondary) 63%)',
  backgroundSize: '400% 100%',
  animation: 'fe-shimmer 1.4s ease infinite',
  borderRadius: 8,
};
const Bar: React.FC<{ w: string; h?: number }> = ({ w, h = 14 }) => (
  <div style={{ ...shimmer, width: w, height: h, marginBottom: 10 }} />
);
const TopicSkeleton: React.FC = () => (
  <div style={{ maxWidth: 1060, margin: '0 auto' }} aria-busy="true" aria-label="Loading lesson">
    <style>{'@keyframes fe-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}'}</style>
    <div style={{ ...shimmer, height: 120, marginBottom: 18, borderRadius: 14 }} />
    <div style={{ ...shimmer, height: 46, marginBottom: 18, borderRadius: 12 }} />
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: 14, padding: 22 }}>
      <Bar w="80%" h={18} /><Bar w="100%" /><Bar w="95%" /><Bar w="88%" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 14, marginTop: 18 }}>
        {[0, 1, 2, 3].map(i => <div key={i} style={{ ...shimmer, height: 96 }} />)}
      </div>
    </div>
  </div>
);

export const FrontendLearnTab: React.FC<FrontendLearnTabProps> = ({ tech, topicId, topics, onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle }) => {
  const [data, setData] = useState<FrontendTopicData | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    if (topicId) delete cache[`${tech}/${topicId}`];
    setReloadKey(k => k + 1);
  }, [tech, topicId]);

  useEffect(() => {
    if (!topicId) { setStatus('idle'); setData(null); return; }
    const key = `${tech}/${topicId}`;
    if (key in cache) { setData(cache[key]); setStatus(cache[key] ? 'ok' : 'missing'); return; }
    let cancelled = false;
    const load = async () => {
      setStatus('loading');
      try {
        const res = await fetch(`/content/frontend/${tech}/${topicId}.json`);
        if (res.ok) {
          const json = (await res.json()) as FrontendTopicData;
          cache[key] = json;
          if (!cancelled) { setData(json); setStatus('ok'); }
        } else if (res.status === 404) {
          cache[key] = null;
          if (!cancelled) { setData(null); setStatus('missing'); }
        } else {
          if (!cancelled) { setData(null); setStatus('error'); }
        }
      } catch {
        // network / parse failure — recoverable, so do NOT cache
        if (!cancelled) { setData(null); setStatus('error'); }
      }
    };
    load();
    return () => { cancelled = true; };
  }, [tech, topicId, reloadKey]);

  if (status === 'idle') {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Select a topic from the sidebar to begin.</div>;
  }
  if (status === 'loading') {
    return <TopicSkeleton />;
  }
  if (status === 'error') {
    return (
      <div style={{ maxWidth: 520, margin: '48px auto', textAlign: 'center', padding: 28, border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, background: 'rgba(239,68,68,0.06)' }}>
        <AlertTriangle size={28} color="#ef4444" />
        <h3 style={{ margin: '12px 0 6px', color: 'var(--text-primary)' }}>Couldn't load this lesson</h3>
        <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: 14 }}>The request failed — this is usually a temporary network issue, not missing content.</p>
        <button onClick={retry} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 10, border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    );
  }
  if (status === 'missing' || !data) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>This lesson is coming soon.</div>;
  }
  return (
    <FrontendTopicRenderer
      data={data}
      topics={topics}
      onNavigate={onNavigate}
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onPrev={onPrev}
      onNext={onNext}
      prevTitle={prevTitle}
      nextTitle={nextTitle}
    />
  );
};
