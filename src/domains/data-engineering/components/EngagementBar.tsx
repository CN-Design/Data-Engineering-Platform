import React, { useRef, useState } from 'react';
import type { Topic } from '../../../core/types/types';
import { Flame, Trophy, Star, X, Zap, BarChart3, Lock, CheckCircle2, Download, Upload } from 'lucide-react';
import { getStats, levelFromXp, getAchievements } from '../utils/engagement';
import { getAllMastery } from '../utils/learnProgress';
import { useEscapeToClose } from '../utils/useEscapeToClose';
import { exportProgress, importProgress } from '../utils/backup';
import { Certificate } from './Certificate';

const TRACK_LABEL: Record<string, string> = {
  foundations: 'Foundations', python: 'Python', sql: 'SQL', 'data-engineering': 'DE Core',
  warehousing: 'Warehousing', orchestration: 'dbt & Orchestration', pyspark: 'PySpark',
  streaming: 'Streaming', cloud: 'Cloud', devops: 'DevOps', dataquality: 'Data Quality',
  sre: 'Reliability (SRE)', databricks: 'Databricks',
};

const Stat: React.FC<{ icon: React.ReactNode; value: React.ReactNode; label: string; color: string }> = ({ icon, value, label, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ color, display: 'flex' }}>{icon}</span>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
      <strong style={{ fontSize: 15, color: 'var(--text-primary)' }}>{value}</strong>
      <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  </div>
);

const ProgressModal: React.FC<{ topics: Topic[]; onClose: () => void }> = ({ topics, onClose }) => {
  const [cert, setCert] = useState<{ label: string; kind: 'track' | 'domain' } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEscapeToClose(onClose);

  const onImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const n = await importProgress(file);
      alert(`Restored ${n} progress entries. Reloading to apply.`);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Import failed.');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };
  const stats = getStats();
  const lvl = levelFromXp(stats.xp);
  const achievements = getAchievements(stats);
  const mastery = getAllMastery();

  const byTrack: Record<string, number[]> = {};
  topics.forEach(t => { (byTrack[t.category] ||= []).push(mastery[t.id] || 0); });
  const tracks = Object.entries(byTrack)
    .map(([cat, arr]) => ({ cat, avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length), n: arr.length }))
    .sort((a, b) => b.avg - a.avg);

  // Completed tracks → certificates. A track is complete when every topic is marked done.
  let completedTopics: Record<string, boolean> = {};
  try { completedTopics = JSON.parse(localStorage.getItem('de_completed_topics') || '{}'); } catch { /* ignore */ }
  const trackTotals: Record<string, { total: number; done: number }> = {};
  topics.forEach(t => {
    const rec = (trackTotals[t.category] ||= { total: 0, done: 0 });
    rec.total += 1; if (completedTopics[t.id]) rec.done += 1;
  });
  const completeTracks = Object.entries(trackTotals).filter(([, v]) => v.total > 0 && v.done === v.total).map(([cat]) => cat);
  const domainComplete = Object.values(trackTotals).length > 0 && Object.values(trackTotals).every(v => v.total > 0 && v.done === v.total);

  return (
    <div role="dialog" aria-modal="true" aria-label="Your progress"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} className="glass-panel animate-slide-up"
        style={{ width: '100%', maxWidth: 640, maxHeight: '85vh', overflowY: 'auto', padding: 24, background: 'var(--bg-secondary)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <button onClick={onClose} aria-label="Close" autoFocus style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>

        {/* Level header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#3b82f6,#a855f7)', color: '#fff', fontWeight: 800, fontSize: 20 }}>{lvl.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>Level {lvl.level} · {lvl.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <div style={{ flex: 1, height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${lvl.pctToNext}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#a855f7)' }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lvl.intoLevel}/{lvl.forNext} XP</span>
            </div>
          </div>
        </div>

        {/* XP breakdown */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>XP · {stats.xp} total</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stats.xpBreakdown.map(b => (
              <div key={b.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)' }}>
                <span>{b.label}</span><strong style={{ color: 'var(--text-primary)' }}>{b.xp} XP</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Mastery by track */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><BarChart3 size={13} /> Mastery by track</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {tracks.map(t => (
              <div key={t.cat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 130, fontSize: 12, color: 'var(--text-secondary)' }}>{TRACK_LABEL[t.cat] || t.cat}</span>
                <div style={{ flex: 1, height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                  <div style={{ width: `${t.avg}%`, height: '100%', background: t.avg >= 80 ? '#10b981' : t.avg >= 40 ? '#f59e0b' : '#3b82f6' }} />
                </div>
                <span style={{ width: 34, textAlign: 'right', fontSize: 11.5, color: 'var(--text-muted)' }}>{t.avg}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>
            Achievements · {achievements.filter(a => a.earned).length}/{achievements.length}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {achievements.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 10, borderRadius: 10, border: `1px solid ${a.earned ? '#10b981' : 'var(--border-glass)'}`, background: a.earned ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)', opacity: a.earned ? 1 : 0.7 }}>
                <span style={{ color: a.earned ? '#10b981' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>{a.earned ? <CheckCircle2 size={16} /> : <Lock size={14} />}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
                  {!a.earned && a.progress > 0 && (
                    <div style={{ marginTop: 5, height: 4, borderRadius: 999, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <div style={{ width: `${a.progress}%`, height: '100%', background: '#3b82f6' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>Certificates</div>
          {completeTracks.length === 0 ? (
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)' }}>Complete every topic in a track to earn a downloadable certificate.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {domainComplete && (
                <button onClick={() => setCert({ label: 'Data Engineering', kind: 'domain' })} className="btn btn-primary" style={{ padding: '7px 12px', fontSize: 12.5 }}>
                  🎓 Full Data Engineering
                </button>
              )}
              {completeTracks.map(cat => (
                <button key={cat} onClick={() => setCert({ label: TRACK_LABEL[cat] || cat, kind: 'track' })} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: 12.5 }}>
                  🎓 {TRACK_LABEL[cat] || cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Backup / restore */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-muted)', marginBottom: 8 }}>Backup &amp; restore</div>
          <p style={{ margin: '0 0 8px 0', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>
            Progress is stored in this browser only. Export a backup to keep it safe or move it to another device.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => exportProgress()} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: 12.5 }}>
              <Download size={13} /> Export progress
            </button>
            <button onClick={() => fileRef.current?.click()} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: 12.5 }}>
              <Upload size={13} /> Import progress
            </button>
            <input ref={fileRef} type="file" accept="application/json,.json" onChange={onImportFile} style={{ display: 'none' }} />
          </div>
        </div>
      </div>
      {cert && <Certificate label={cert.label} kind={cert.kind} onClose={() => setCert(null)} />}
    </div>
  );
};

export const EngagementBar: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  const [open, setOpen] = useState(false);
  const stats = getStats();
  const lvl = levelFromXp(stats.xp);
  const achievements = getAchievements(stats);
  const earned = achievements.filter(a => a.earned).length;

  return (
    <>
      <style>{`
        .engagement-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .engagement-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          flex: 1;
        }
        .engagement-btn {
          margin-left: auto;
        }
        .engagement-level {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        @media (max-width: 640px) {
          .engagement-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
          .engagement-level {
            width: 100%;
          }
          .engagement-level > div:last-child {
            flex: 1;
          }
          .engagement-stats {
            gap: 16px;
            justify-content: space-between;
          }
          .engagement-btn {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
      <div className="glass-panel engagement-bar" style={{ width: '100%', maxWidth: 1100, marginBottom: 24, padding: '18px 22px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
        <div className="engagement-level">
          <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#3b82f6,#a855f7)', color: '#fff', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{lvl.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Level {lvl.level} · {lvl.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <div style={{ flex: 1, minWidth: 140, maxWidth: 200, height: 6, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${lvl.pctToNext}%`, height: '100%', background: 'linear-gradient(90deg,#3b82f6,#a855f7)' }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{stats.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="engagement-stats">
          <Stat icon={<Flame size={20} />} value={`${stats.streak}d`} label="streak" color={stats.streak > 0 ? '#f97316' : 'var(--text-muted)'} />
          <Stat icon={<Zap size={20} />} value={stats.topicsCompleted} label="topics done" color="#3b82f6" />
          <Stat icon={<Star size={20} />} value={stats.masteredTopics} label="mastered" color="#eab308" />
          <Stat icon={<Trophy size={20} />} value={`${earned}/${achievements.length}`} label="achievements" color="#10b981" />
        </div>

        <button onClick={() => setOpen(true)} className="btn btn-secondary engagement-btn" style={{ padding: '10px 18px', fontSize: 13, fontWeight: 600, display: 'flex' }}>
          View progress
        </button>
      </div>
      {open && <ProgressModal topics={topics} onClose={() => setOpen(false)} />}
    </>
  );
};
