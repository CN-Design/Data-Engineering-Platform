import React, { useEffect, useMemo, useState } from 'react';
import type { BackendTopicData } from '../../../core/types/backend';
import type { McqQuestion } from '../../../core/types/types';
import { Eye, ThumbsUp, Repeat, RotateCcw, RefreshCw, CheckCircle2, XCircle, Target, ListChecks, Layers } from 'lucide-react';
import {
  getSelfCheck, setSelfCheckAnswer, masteryFromSelfCheck, setMastery, scheduleReview,
  getMcqAnswers, setMcqAnswer, clearMcqAnswers,
  type SelfRating,
} from '../../data-engineering/utils/learnProgress';
import { recordActivityToday } from '../../data-engineering/utils/engagement';
import { formatText } from '../../../core/utils/textFormatting';

interface Props {
  topicId: string;
  data: BackendTopicData;
  onMasteryChange: (pct: number) => void;
}

interface QItem { key: string; difficulty: string; prompt: string; answer: string; note?: string; }
interface FlashItem { front: string; back: string; tag: string; }

const activeToggle: React.CSSProperties = {
  color: '#fff', border: '1px solid transparent',
  background: 'linear-gradient(135deg,#00ADD8,#a855f7)',
};

const DIFF_COLOR: Record<string, string> = {
  beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444',
  scenario: '#a855f7', 'system design': '#06b6d4', coding: '#00ADD8',
};

const buildQuestions = (data: BackendTopicData): QItem[] => {
  const ip = data.interviewPrep;
  const out: QItem[] = [];
  (ip?.theory || []).forEach((q, i) => out.push({ key: `t${i}`, difficulty: q.difficulty || 'beginner', prompt: q.question, answer: q.directAnswer, note: q.whyImportant }));
  (ip?.scenario || []).forEach((q, i) => out.push({ key: `sc${i}`, difficulty: 'scenario', prompt: q.question, answer: q.directAnswer, note: q.realWorldExample }));
  (ip?.systemDesign || []).forEach((q, i) => out.push({ key: `sd${i}`, difficulty: 'system design', prompt: q.question, answer: q.directAnswer, note: q.whyImportant }));
  (ip?.coding || []).forEach((q, i) => out.push({ key: `c${i}`, difficulty: 'coding', prompt: q.question, answer: q.thoughtProcess, note: q.solution?.code ? `Solution:\n${q.solution.code}` : undefined }));
  return out;
};

const buildFlashcards = (data: BackendTopicData): FlashItem[] => {
  const cards: FlashItem[] = [];
  (data.foundations?.commonMisconceptions || []).forEach(m => cards.push({ front: `Myth: ${m.myth}`, back: `Reality: ${m.reality}`, tag: 'Myth vs Reality' }));
  (data.subtopics || []).forEach(s => cards.push({ front: s.title, back: s.explanation, tag: 'Concept' }));
  return cards;
};

export const BackendSelfCheck: React.FC<Props> = ({ topicId, data, onMasteryChange }) => {
  const questions = useMemo(() => buildQuestions(data), [data]);
  const flashcards = useMemo(() => buildFlashcards(data), [data]);
  const [mode, setMode] = useState<'mcq' | 'quiz' | 'flashcards'>(questions.length > 0 ? 'quiz' : 'flashcards');

  const [answers, setAnswers] = useState<Record<string, SelfRating>>(() => getSelfCheck(topicId));
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  // Objective, auto-graded MCQs (loaded per topic; graded quiz takes priority when present).
  const [mcqs, setMcqs] = useState<McqQuestion[] | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>(() => getMcqAnswers(topicId));

  useEffect(() => {
    let cancelled = false;
    setMcqs(null);
    setMcqAnswers(getMcqAnswers(topicId));
    (async () => {
      try {
        const res = await fetch(`/content/quiz/${data.tech}/${topicId}.json`);
        if (res.ok && !cancelled) {
          const arr = (await res.json()) as McqQuestion[];
          if (Array.isArray(arr) && arr.length) { setMcqs(arr); setMode('mcq'); }
        }
      } catch { /* no MCQs for this topic — fall back to self-rated */ }
    })();
    return () => { cancelled = true; };
  }, [topicId, data.tech]);

  const mcqTotal = mcqs?.length || 0;
  const mcqCorrect = mcqs ? mcqs.filter(q => mcqAnswers[q.id] === q.correctIndex).length : 0;
  const mcqAnswered = mcqs ? mcqs.filter(q => mcqAnswers[q.id] !== undefined).length : 0;

  const answerMcq = (q: McqQuestion, idx: number) => {
    if (mcqAnswers[q.id] !== undefined) return; // lock after first answer
    const next = setMcqAnswer(topicId, q.id, idx);
    setMcqAnswers(next);
    const correct = mcqs!.filter(x => next[x.id] === x.correctIndex).length;
    const pct = Math.round((correct / mcqTotal) * 100);
    setMastery(topicId, pct);
    recordActivityToday();
    onMasteryChange(pct);
  };

  const resetMcq = () => {
    clearMcqAnswers(topicId);
    setMcqAnswers({});
    setMastery(topicId, 0);
    onMasteryChange(0);
  };

  const total = questions.length;
  const answeredCount = Object.keys(answers).filter(k => questions.some(q => q.key === k)).length;
  const mastery = masteryFromSelfCheck(answers, total);

  const rate = (q: QItem, rating: SelfRating) => {
    const next = setSelfCheckAnswer(topicId, q.key, rating);
    setAnswers(next);
    const pct = masteryFromSelfCheck(next, total);
    setMastery(topicId, pct);
    scheduleReview(topicId, rating, pct);
    recordActivityToday();
    onMasteryChange(pct);
  };

  const reset = () => {
    setAnswers({});
    setRevealed({});
    setMastery(topicId, 0);
    onMasteryChange(0);
    try {
      const raw = localStorage.getItem('de_selfcheck_v1');
      const all = raw ? JSON.parse(raw) : {};
      all[topicId] = {};
      localStorage.setItem('de_selfcheck_v1', JSON.stringify(all));
    } catch { /* ignore */ }
  };

  if (total === 0 && flashcards.length === 0) {
    return <div className="be-field" style={{ color: 'var(--text-muted)' }}>No self-check items available for this topic yet.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Mode toggle + progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-inner)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-glass)', flexWrap: 'wrap' }}>
          {mcqTotal > 0 && (
            <button onClick={() => setMode('mcq')} className="be-btn" style={mode === 'mcq' ? activeToggle : undefined}>
              <Target size={14} /> Quiz ({mcqTotal})
            </button>
          )}
          {total > 0 && (
            <button onClick={() => setMode('quiz')} className="be-btn" style={mode === 'quiz' ? activeToggle : undefined}>
              <ListChecks size={14} /> Self-Check ({total})
            </button>
          )}
          {flashcards.length > 0 && (
            <button onClick={() => setMode('flashcards')} className="be-btn" style={mode === 'flashcards' ? activeToggle : undefined}>
              <Layers size={14} /> Flashcards ({flashcards.length})
            </button>
          )}
        </div>

        {mode === 'quiz' && total > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ minWidth: 160 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Mastery</span><span>{answeredCount}/{total} rated</span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${mastery}%`, height: '100%', background: mastery >= 80 ? '#10b981' : 'linear-gradient(90deg,#00ADD8,#a855f7)', transition: 'width .3s ease' }} />
              </div>
            </div>
            <button onClick={reset} className="be-btn" title="Reset self-check for this topic"><RotateCcw size={13} /> Reset</button>
          </div>
        )}

        {mode === 'mcq' && mcqTotal > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ minWidth: 170 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Score</span><span>{mcqCorrect}/{mcqTotal} correct · {mcqAnswered}/{mcqTotal} done</span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${mcqTotal ? Math.round((mcqCorrect / mcqTotal) * 100) : 0}%`, height: '100%', background: mcqCorrect / (mcqTotal || 1) >= 0.8 ? '#10b981' : 'linear-gradient(90deg,#00ADD8,#a855f7)', transition: 'width .3s ease' }} />
              </div>
            </div>
            <button onClick={resetMcq} className="be-btn" title="Reset quiz for this topic"><RotateCcw size={13} /> Reset</button>
          </div>
        )}
      </div>

      {/* GRADED MCQ MODE */}
      {mode === 'mcq' && mcqs && (
        <>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Pick the best answer. Each question is graded instantly and your score sets this topic&apos;s mastery — no self-rating.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mcqs.map((q, qi) => {
              const chosen = mcqAnswers[q.id];
              const answered = chosen !== undefined;
              return (
                <div key={q.id} style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>Q{qi + 1}</span>
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q.question}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                    {q.options.map((opt, oi) => {
                      const isChosen = chosen === oi;
                      const isCorrect = oi === q.correctIndex;
                      let border = 'var(--border-glass)';
                      let bg = 'var(--bg-inner)';
                      let icon: React.ReactNode = null;
                      if (answered) {
                        if (isCorrect) { border = '#10b981'; bg = 'rgba(16,185,129,0.1)'; icon = <CheckCircle2 size={15} color="#10b981" />; }
                        else if (isChosen) { border = '#ef4444'; bg = 'rgba(239,68,68,0.1)'; icon = <XCircle size={15} color="#ef4444" />; }
                      }
                      return (
                        <button
                          key={oi}
                          onClick={() => answerMcq(q, oi)}
                          disabled={answered}
                          style={{
                            textAlign: 'left', cursor: answered ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: 13.5,
                            padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg,
                            color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8,
                          }}
                        >
                          <span style={{ flexShrink: 0, width: 18, textAlign: 'center', fontWeight: 700, color: 'var(--text-muted)' }}>{String.fromCharCode(65 + oi)}</span>
                          <span style={{ flex: 1 }}>{opt}</span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div className="animate-slide-up" style={{ marginTop: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, background: 'rgba(0,173,216,0.06)', borderLeft: '3px solid #00ADD8', borderRadius: '0 8px 8px 0', padding: '9px 12px' }}>
                      <strong style={{ color: chosen === q.correctIndex ? '#10b981' : '#ef4444' }}>{chosen === q.correctIndex ? 'Correct. ' : 'Not quite. '}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {mcqAnswered === mcqTotal && mcqTotal > 0 && (
            <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: 10, background: mcqCorrect / mcqTotal >= 0.8 ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)' }}>
              <CheckCircle2 size={20} color={mcqCorrect / mcqTotal >= 0.8 ? '#10b981' : '#00ADD8'} />
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                Quiz complete — <strong>{mcqCorrect}/{mcqTotal} correct ({Math.round((mcqCorrect / mcqTotal) * 100)}%)</strong>. This is now your topic mastery.
              </span>
            </div>
          )}
        </>
      )}

      {/* QUIZ MODE */}
      {mode === 'quiz' && total > 0 && (
        <>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Answer each in your head, reveal the model answer, then rate yourself honestly. Ratings drive your mastery score and schedule a spaced-repetition review.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions.map(q => {
              const isRev = !!revealed[q.key];
              const rating = answers[q.key];
              const color = DIFF_COLOR[q.difficulty] || 'var(--text-muted)';
              return (
                <div key={q.key} style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px', color, border: `1px solid ${color}`, borderRadius: 5, padding: '2px 6px', flexShrink: 0, marginTop: 2 }}>{q.difficulty}</span>
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q.prompt}</span>
                  </div>

                  {!isRev ? (
                    <button onClick={() => setRevealed(p => ({ ...p, [q.key]: true }))} className="be-btn" style={{ marginTop: 12 }}>
                      <Eye size={13} /> Reveal answer
                    </button>
                  ) : (
                    <div className="animate-slide-up" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ background: 'rgba(0,173,216,0.06)', borderLeft: '3px solid #00ADD8', borderRadius: '0 8px 8px 0', padding: '10px 12px' }}>
                        <strong style={{ fontSize: 12, color: 'var(--text-primary)' }}>Model answer</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{q.answer}</p>
                      </div>
                      {q.note && (
                        q.note.startsWith('Solution:')
                          ? <div className="be-code"><pre><code>{q.note.replace(/^Solution:\n/, '')}</code></pre></div>
                          : <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{formatText(q.note)}</p>
                      )}
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>How did you do?</span>
                        <button onClick={() => rate(q, 'got')} className="be-btn" style={{ background: rating === 'got' ? '#10b981' : undefined, color: rating === 'got' ? '#fff' : undefined }}>
                          <ThumbsUp size={13} /> I knew it
                        </button>
                        <button onClick={() => rate(q, 'review')} className="be-btn" style={{ background: rating === 'review' ? '#f59e0b' : undefined, color: rating === 'review' ? '#fff' : undefined }}>
                          <Repeat size={13} /> Review again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {answeredCount === total && total > 0 && (
            <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: 10, background: mastery >= 80 ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)' }}>
              <CheckCircle2 size={20} color={mastery >= 80 ? '#10b981' : '#00ADD8'} />
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                Self-check complete — <strong>{mastery}% mastery</strong>.{' '}
                {mastery >= 80 ? 'Strong recall. Scheduled for a later review.' : 'Items you flagged are queued for a sooner review.'}
              </span>
            </div>
          )}
        </>
      )}

      {/* FLASHCARD MODE */}
      {mode === 'flashcards' && (
        flashcards.length === 0 ? (
          <div className="be-field" style={{ color: 'var(--text-muted)' }}>No flashcards for this topic.</div>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>Tap a card to flip. Great for a fast pre-interview refresher.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {flashcards.map((c, i) => {
                const isFlipped = !!flipped[i];
                return (
                  <button
                    key={i}
                    onClick={() => setFlipped(p => ({ ...p, [i]: !p[i] }))}
                    style={{ textAlign: 'left', cursor: 'pointer', padding: 16, minHeight: 120, display: 'flex', flexDirection: 'column', gap: 8, borderRadius: 10, border: '1px solid var(--border-glass)', background: isFlipped ? 'var(--bg-inner)' : 'var(--bg-secondary)', fontFamily: 'inherit' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--text-muted)' }}>{isFlipped ? 'Answer' : c.tag}</span>
                      <RefreshCw size={13} className="text-muted" />
                    </div>
                    <span style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: isFlipped ? 400 : 600 }}>
                      {isFlipped ? c.back : c.front}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )
      )}
    </div>
  );
};
