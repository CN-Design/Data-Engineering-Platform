import React, { useEffect, useMemo, useState } from 'react';
import type { Topic, PremiumTopicData, McqQuestion } from '../../../core/types/types';
import { CheckCircle2, XCircle, RotateCcw, Eye, ThumbsUp, RefreshCw, Layers, ListChecks, Repeat, Target } from 'lucide-react';
import {
  getSelfCheck, setSelfCheckAnswer, masteryFromSelfCheck, setMastery, scheduleReview,
  getMcqAnswers, setMcqAnswer, clearMcqAnswers,
  type SelfRating,
} from '../utils/learnProgress';
import { recordActivityToday } from '../utils/engagement';

interface SelfCheckQuizProps {
  topic: Topic;
  data: PremiumTopicData;
  onMasteryChange: (pct: number) => void;
}

interface QItem {
  key: string;
  difficulty: string;
  prompt: string;
  answer: string;
  note?: string;
}

const DIFF_COLOR: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
  scenario: '#a855f7',
};

const buildQuestions = (data: PremiumTopicData): QItem[] => {
  const ip = data.interviewPreparation;
  const out: QItem[] = [];
  (ip?.beginnerQuestions || []).forEach((q, i) => out.push({ key: `b${i}`, difficulty: 'beginner', prompt: q.question, answer: q.answer, note: q.explanation }));
  (ip?.intermediateQuestions || []).forEach((q, i) => out.push({ key: `i${i}`, difficulty: 'intermediate', prompt: q.question, answer: q.answer, note: q.explanation }));
  (ip?.advancedQuestions || []).forEach((q, i) => out.push({ key: `a${i}`, difficulty: 'advanced', prompt: q.question, answer: q.answer, note: q.explanation }));
  (ip?.scenarioBasedQuestions || []).forEach((q, i) => out.push({ key: `s${i}`, difficulty: 'scenario', prompt: q.scenario, answer: q.expectedAnswer, note: q.thinkingProcess }));
  return out;
};

interface FlashItem { front: string; back: string; tag: string; }

const buildFlashcards = (data: PremiumTopicData): FlashItem[] => {
  const cc = data.coreConcept;
  const cards: FlashItem[] = [];
  (cc?.keyTerminology || []).forEach(t => cards.push({ front: t.term, back: t.meaning, tag: 'Term' }));
  (cc?.commonMisconceptions || []).forEach(m => cards.push({ front: `Myth: ${m.myth}`, back: `Reality: ${m.reality}`, tag: 'Myth vs Reality' }));
  return cards;
};

export const SelfCheckQuiz: React.FC<SelfCheckQuizProps> = ({ topic, data, onMasteryChange }) => {
  const [mode, setMode] = useState<'mcq' | 'quiz' | 'flashcards'>('quiz');
  const questions = useMemo(() => buildQuestions(data), [data]);
  const flashcards = useMemo(() => buildFlashcards(data), [data]);

  const [answers, setAnswers] = useState<Record<string, SelfRating>>(() => getSelfCheck(topic.id));
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  // Objective, auto-graded MCQs (loaded per topic; graded quiz takes priority when present).
  const [mcqs, setMcqs] = useState<McqQuestion[] | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>(() => getMcqAnswers(topic.id));

  useEffect(() => {
    let cancelled = false;
    setMcqs(null);
    setMcqAnswers(getMcqAnswers(topic.id));
    (async () => {
      try {
        const res = await fetch(`/content/quiz/${topic.category}/${topic.id}.json`);
        if (res.ok && !cancelled) {
          const arr = (await res.json()) as McqQuestion[];
          if (Array.isArray(arr) && arr.length) { setMcqs(arr); setMode('mcq'); }
        }
      } catch { /* no MCQs for this topic — fall back to self-rated */ }
    })();
    return () => { cancelled = true; };
  }, [topic.id, topic.category]);

  const mcqTotal = mcqs?.length || 0;
  const mcqCorrect = mcqs ? mcqs.filter(q => mcqAnswers[q.id] === q.correctIndex).length : 0;
  const mcqAnswered = mcqs ? mcqs.filter(q => mcqAnswers[q.id] !== undefined).length : 0;

  const answerMcq = (q: McqQuestion, idx: number) => {
    if (mcqAnswers[q.id] !== undefined) return; // lock after first answer
    const next = setMcqAnswer(topic.id, q.id, idx);
    setMcqAnswers(next);
    const correct = mcqs!.filter(x => next[x.id] === x.correctIndex).length;
    const pct = Math.round((correct / mcqTotal) * 100);
    setMastery(topic.id, pct);
    recordActivityToday();
    onMasteryChange(pct);
  };

  const resetMcq = () => {
    clearMcqAnswers(topic.id);
    setMcqAnswers({});
    setMastery(topic.id, 0);
    onMasteryChange(0);
  };

  const total = questions.length;
  const answeredCount = Object.keys(answers).filter(k => questions.some(q => q.key === k)).length;
  const mastery = masteryFromSelfCheck(answers, total);

  const rate = (q: QItem, rating: SelfRating) => {
    const next = setSelfCheckAnswer(topic.id, q.key, rating);
    setAnswers(next);
    const pct = masteryFromSelfCheck(next, total);
    setMastery(topic.id, pct);
    scheduleReview(topic.id, rating, pct);
    recordActivityToday();
    onMasteryChange(pct);
  };

  const reset = () => {
    setAnswers({});
    setRevealed({});
    setMastery(topic.id, 0);
    onMasteryChange(0);
    // Persist an empty self-check map for this topic.
    try {
      const raw = localStorage.getItem('de_selfcheck_v1');
      const all = raw ? JSON.parse(raw) : {};
      all[topic.id] = {};
      localStorage.setItem('de_selfcheck_v1', JSON.stringify(all));
    } catch { /* ignore */ }
  };

  if (total === 0 && flashcards.length === 0 && mcqTotal === 0) {
    return (
      <div className="glass-panel section-card">
        <div className="section-body" style={{ color: 'var(--text-muted)' }}>
          No self-check items available for this topic yet.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Mode toggle + progress */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-inner)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-glass)', flexWrap: 'wrap' }}>
          {mcqTotal > 0 && (
            <button
              onClick={() => setMode('mcq')}
              className={`btn ${mode === 'mcq' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '7px 14px', fontSize: '13px' }}
            >
              <Target size={14} /> Quiz ({mcqTotal})
            </button>
          )}
          <button
            onClick={() => setMode('quiz')}
            className={`btn ${mode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            <ListChecks size={14} /> Self-Check ({total})
          </button>
          <button
            onClick={() => setMode('flashcards')}
            className={`btn ${mode === 'flashcards' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            <Layers size={14} /> Flashcards ({flashcards.length})
          </button>
        </div>

        {mode === 'mcq' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ minWidth: 160 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Score</span><span>{mcqCorrect}/{mcqTotal} correct · {mcqAnswered}/{mcqTotal} done</span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${mcqTotal ? Math.round((mcqCorrect / mcqTotal) * 100) : 0}%`, height: '100%', background: mcqCorrect / (mcqTotal || 1) >= 0.8 ? '#10b981' : 'linear-gradient(90deg,#3b82f6,#a855f7)', transition: 'width .3s ease' }} />
              </div>
            </div>
            <button onClick={resetMcq} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: '12px' }} title="Reset quiz for this topic">
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ minWidth: 160 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Mastery</span><span>{answeredCount}/{total} rated</span>
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-inner)', overflow: 'hidden' }}>
                <div style={{ width: `${mastery}%`, height: '100%', background: mastery >= 80 ? '#10b981' : 'linear-gradient(90deg,#3b82f6,#a855f7)', transition: 'width .3s ease' }} />
              </div>
            </div>
            <button onClick={reset} className="btn btn-secondary" style={{ padding: '7px 12px', fontSize: '12px' }} title="Reset self-check for this topic">
              <RotateCcw size={13} /> Reset
            </button>
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
                <div key={q.id} className="glass-panel" style={{ padding: '16px' }}>
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
                    <div className="animate-slide-up" style={{ marginTop: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, background: 'rgba(59,130,246,0.05)', borderLeft: '3px solid #3b82f6', borderRadius: '0 8px 8px 0', padding: '9px 12px' }}>
                      <strong style={{ color: chosen === q.correctIndex ? '#10b981' : '#ef4444' }}>{chosen === q.correctIndex ? 'Correct. ' : 'Not quite. '}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {mcqAnswered === mcqTotal && mcqTotal > 0 && (
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 10, background: mcqCorrect / mcqTotal >= 0.8 ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)' }}>
              <CheckCircle2 size={20} color={mcqCorrect / mcqTotal >= 0.8 ? '#10b981' : '#3b82f6'} />
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                Quiz complete — <strong>{mcqCorrect}/{mcqTotal} correct ({Math.round((mcqCorrect / mcqTotal) * 100)}%)</strong>. This is now your topic mastery.
              </span>
            </div>
          )}
        </>
      )}

      {/* QUIZ MODE */}
      {mode === 'quiz' && (
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
                <div key={q.key} className="glass-panel" style={{ padding: '16px', borderLeft: `3px solid ${color}` }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px', color, border: `1px solid ${color}`, borderRadius: 5, padding: '2px 6px', flexShrink: 0, marginTop: 2 }}>{q.difficulty}</span>
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q.prompt}</span>
                  </div>

                  {!isRev ? (
                    <button
                      onClick={() => setRevealed(p => ({ ...p, [q.key]: true }))}
                      className="btn btn-secondary"
                      style={{ marginTop: 12, padding: '6px 12px', fontSize: '12px' }}
                    >
                      <Eye size={13} /> Reveal answer
                    </button>
                  ) : (
                    <div className="animate-slide-up" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ background: 'rgba(59,130,246,0.05)', borderLeft: '3px solid #3b82f6', borderRadius: '0 8px 8px 0', padding: '10px 12px' }}>
                        <strong style={{ fontSize: 12, color: 'var(--text-primary)' }}>Model answer</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.answer}</p>
                      </div>
                      {q.note && (
                        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{q.note}</p>
                      )}
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>How did you do?</span>
                        <button
                          onClick={() => rate(q, 'got')}
                          className="btn"
                          style={{ padding: '6px 12px', fontSize: 12, background: rating === 'got' ? '#10b981' : 'var(--bg-inner)', color: rating === 'got' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border-glass)' }}
                        >
                          <ThumbsUp size={13} /> I knew it
                        </button>
                        <button
                          onClick={() => rate(q, 'review')}
                          className="btn"
                          style={{ padding: '6px 12px', fontSize: 12, background: rating === 'review' ? '#f59e0b' : 'var(--bg-inner)', color: rating === 'review' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border-glass)' }}
                        >
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
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 10, background: mastery >= 80 ? 'rgba(16,185,129,0.08)' : 'var(--bg-inner)' }}>
              <CheckCircle2 size={20} color={mastery >= 80 ? '#10b981' : '#3b82f6'} />
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
          <div className="glass-panel section-card"><div className="section-body" style={{ color: 'var(--text-muted)' }}>No flashcards for this topic.</div></div>
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
                    className="glass-panel"
                    style={{ textAlign: 'left', cursor: 'pointer', padding: 16, minHeight: 120, display: 'flex', flexDirection: 'column', gap: 8, border: '1px solid var(--border-glass)', background: isFlipped ? 'var(--bg-inner)' : 'var(--bg-secondary)' }}
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
