import React from 'react';
import type { Topic, Category } from '../../../core/types/types';
import { PlayCircle, RefreshCw, Compass, ArrowRight, Sparkles, CalendarCheck } from 'lucide-react';
import { getLastTopic, getDueReviews, getDiagnostic, getMastery } from '../utils/learnProgress';

interface LearnJourneyPanelProps {
  topics: Topic[]; // all DE topics
  onSelectTech: (tech: Category, topicId?: string) => void;
  onStartDiagnostic: () => void;
}

const TRACK_LABEL: Record<string, string> = {
  foundations: 'Foundations',
  python: 'Python for DE',
  sql: 'Advanced SQL',
  'data-engineering': 'Data Engineering Core',
};

const Card: React.FC<{ children: React.ReactNode; accent: string }> = ({ children, accent }) => (
  <div
    className="glass-panel"
    style={{ padding: 18, background: 'var(--bg-secondary)', borderLeft: `3px solid ${accent}`, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}
  >
    {children}
  </div>
);

const Head: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ color, display: 'flex' }}>{icon}</span>
    <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)' }}>{label}</span>
  </div>
);

export const LearnJourneyPanel: React.FC<LearnJourneyPanelProps> = ({ topics, onSelectTech, onStartDiagnostic }) => {
  const byId = React.useMemo(() => {
    const m = new Map<string, Topic>();
    topics.forEach(t => m.set(t.id, t));
    return m;
  }, [topics]);

  const lastId = getLastTopic();
  const lastTopic = lastId ? byId.get(lastId) : undefined;

  const dueIds = getDueReviews().filter(id => byId.has(id)).slice(0, 4);
  const diag = getDiagnostic();

  // Deterministic "today's focus" — prefer an unfinished topic, stable per day.
  let doneMap: Record<string, boolean> = {};
  try { doneMap = JSON.parse(localStorage.getItem('de_completed_topics') || '{}'); } catch { /* ignore */ }
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').reduce((a, c) => a + parseInt(c, 10), 0);
  const pool = topics.filter(t => !doneMap[t.id]);
  const dailyPool = pool.length ? pool : topics;
  const daily = dailyPool.length ? dailyPool[seed % dailyPool.length] : undefined;

  // Show the panel only when there's something useful to surface.
  const hasResume = !!lastTopic;
  const hasReviews = dueIds.length > 0;
  // Always offer the diagnostic card (CTA or recommendation).

  return (
    <div style={{ width: '100%', maxWidth: 1100, marginBottom: 32, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)' }}>For You</span>
        <span style={{ height: 1, flex: 1, background: 'var(--border-glass)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {/* Resume */}
        {hasResume && lastTopic && (
          <Card accent="#3b82f6">
            <Head icon={<PlayCircle size={16} />} label="Resume" color="#3b82f6" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{lastTopic.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, textTransform: 'capitalize' }}>
                {TRACK_LABEL[lastTopic.category] || lastTopic.category} · {getMastery(lastTopic.id)}% mastery
              </div>
            </div>
            <button onClick={() => onSelectTech(lastTopic.category, lastTopic.id)} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 14px', fontSize: 13 }}>
              Continue <ArrowRight size={14} />
            </button>
          </Card>
        )}

        {/* Due for revision */}
        {hasReviews && (
          <Card accent="#f59e0b">
            <Head icon={<RefreshCw size={16} />} label={`Due for revision (${getDueReviews().length})`} color="#f59e0b" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {dueIds.map(id => {
                const t = byId.get(id)!;
                return (
                  <button
                    key={id}
                    onClick={() => onSelectTech(t.category, t.id)}
                    style={{ textAlign: 'left', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}
                  >
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span>
                    <ArrowRight size={13} className="text-muted" style={{ flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Spaced-repetition keeps recall sharp.</span>
          </Card>
        )}

        {/* Today's focus */}
        {daily && (
          <Card accent="#14b8a6">
            <Head icon={<CalendarCheck size={16} />} label="Today's focus" color="#14b8a6" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{daily.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, textTransform: 'capitalize' }}>
                {TRACK_LABEL[daily.category] || daily.category} · keep your streak alive
              </div>
            </div>
            <button onClick={() => onSelectTech(daily.category, daily.id)} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 14px', fontSize: 13 }}>
              Start today&apos;s topic <ArrowRight size={14} />
            </button>
          </Card>
        )}

        {/* Placement / recommendation */}
        <Card accent="#a855f7">
          <Head icon={<Compass size={16} />} label="Placement" color="#a855f7" />
          {diag ? (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Sparkles size={13} color="#a855f7" />
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Recommended for you</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{TRACK_LABEL[diag.recommendedTrack] || diag.recommendedTrack}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => onSelectTech(diag.recommendedTrack as Category)} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>
                  Go <ArrowRight size={14} />
                </button>
                <button onClick={onStartDiagnostic} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 13 }}>
                  Retake
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Not sure where to begin? Take a 2-minute placement and we&apos;ll recommend the right on-ramp.
              </p>
              <button onClick={onStartDiagnostic} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 14px', fontSize: 13 }}>
                Take the 2-min placement <ArrowRight size={14} />
              </button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};
