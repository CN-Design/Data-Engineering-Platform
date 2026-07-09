import React, { useEffect, useState } from 'react';
import type { Category, ExplainerScript } from '../../../core/types/types';
import type { AgentTopicData } from '../../../core/types/aiagents';
import { AiAgentTopicRenderer } from './AiAgentTopicRenderer';
import { Loader2 } from 'lucide-react';

interface Props {
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
  theme?: 'dark' | 'light';
}

const cache: Record<string, AgentTopicData | null> = {};

export const AiAgentLearnTab: React.FC<Props> = ({ tech, topicId, topics, onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle, theme }) => {
  const [data, setData] = useState<AgentTopicData | null>(null);
  const [loading, setLoading] = useState(false);
  const [explainer, setExplainer] = useState<ExplainerScript | null>(null);

  useEffect(() => {
    setExplainer(null);
    if (!topicId) return;
    let cancelled = false;
    fetch(`/content/ai-agents/${tech}/explainer/${topicId}.json`)
      .then(r => (r.ok ? r.json() : null))
      .then((d: ExplainerScript | null) => { if (!cancelled && d && Array.isArray(d.scenes)) setExplainer(d); })
      .catch(() => { /* no explainer */ });
    return () => { cancelled = true; };
  }, [tech, topicId]);

  useEffect(() => {
    if (!topicId) { setData(null); return; }
    const key = `${tech}/${topicId}`;
    if (key in cache) { setData(cache[key]); return; }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/content/ai-agents/${tech}/${topicId}.json`);
        if (res.ok) { const json = (await res.json()) as AgentTopicData; cache[key] = json; if (!cancelled) setData(json); }
        else { cache[key] = null; if (!cancelled) setData(null); }
      } catch { if (!cancelled) setData(null); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [tech, topicId]);

  if (!topicId) return <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>Select a topic from the sidebar to begin.</div>;
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 60, color: 'var(--text-secondary)' }}><Loader2 size={18} className="spin" /> Loading lesson...</div>;
  if (!data) return <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>This lesson is coming soon.</div>;
  return (
    <AiAgentTopicRenderer
      data={data} topics={topics} onNavigate={onNavigate}
      isCompleted={isCompleted} onToggleComplete={onToggleComplete}
      onPrev={onPrev} onNext={onNext} prevTitle={prevTitle} nextTitle={nextTitle}
      theme={theme} explainer={explainer}
    />
  );
};
