import React, { useEffect, useState } from 'react';
import type { Category } from '../../../core/types/types';
import type { FrontendTopicData } from '../../../core/types/frontend';
import { FrontendTopicRenderer } from './FrontendTopicRenderer';
import { Loader2 } from 'lucide-react';

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

const cache: Record<string, FrontendTopicData | null> = {};

export const FrontendLearnTab: React.FC<FrontendLearnTabProps> = ({ tech, topicId, topics, onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle }) => {
  const [data, setData] = useState<FrontendTopicData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topicId) {
      setData(null);
      return;
    }
    const key = `${tech}/${topicId}`;
    if (key in cache) {
      setData(cache[key]);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/content/frontend/${tech}/${topicId}.json`);
        if (res.ok) {
          const json = (await res.json()) as FrontendTopicData;
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

  if (!topicId) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Select a topic from the sidebar to begin.</div>;
  }
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '60px', color: 'var(--text-secondary)' }}>
        <Loader2 size={18} className="spin" /> Loading lesson...
      </div>
    );
  }
  if (!data) {
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
