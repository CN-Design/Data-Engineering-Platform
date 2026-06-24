import React, { useEffect, useState } from 'react';
import type { Category } from '../../../core/types/types';
import type { BackendTopicData } from '../../../core/types/backend';
import { BackendTopicRenderer } from './BackendTopicRenderer';
import { Loader2 } from 'lucide-react';

interface BackendLearnTabProps {
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

const cache: Record<string, BackendTopicData | null> = {};

export const BackendLearnTab: React.FC<BackendLearnTabProps> = ({ tech, topicId, topics, onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle, theme }) => {
  const [data, setData] = useState<BackendTopicData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topicId) { setData(null); return; }
    const key = `${tech}/${topicId}`;
    if (key in cache) { setData(cache[key]); return; }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/content/backend/${tech}/${topicId}.json`);
        if (res.ok) {
          const json = (await res.json()) as BackendTopicData;
          cache[key] = json;
          if (!cancelled) setData(json);
        } else {
          cache[key] = null;
          if (!cancelled) setData(null);
        }
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [tech, topicId]);

  if (!topicId) return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Select a topic from the sidebar to begin.</div>;
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '60px', color: 'var(--text-secondary)' }}><Loader2 size={18} className="spin" /> Loading lesson...</div>;
  if (!data) return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>This lesson is coming soon.</div>;
  return (
    <BackendTopicRenderer
      data={data}
      topics={topics}
      onNavigate={onNavigate}
      isCompleted={isCompleted}
      onToggleComplete={onToggleComplete}
      onPrev={onPrev}
      onNext={onNext}
      prevTitle={prevTitle}
      nextTitle={nextTitle}
      theme={theme}
    />
  );
};
