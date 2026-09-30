import React, { lazy, Suspense, useEffect, useState } from 'react';
import type {
  FrontendTopicData,
  FrontendSectionId,
  FoundationsSection,
  VisualExplorerItem,
  InteractiveExample,
  CodeLabExercise,
  DebuggingLabExercise,
  FrontendInterviewSection,
  ProductionDeepDiveSection,
  ProjectBuilderSection,
  SandboxConfig,
  SubtopicDetail,
} from '../../../core/types/frontend';
import { FRONTEND_SECTIONS } from '../../../core/types/frontend';
import type { ConceptualInterviewQuestion, CodingInterviewQuestion, ExplainerScript, McqQuestion } from '../../../core/types/types';
import { FRONTEND_VISUALIZATIONS } from '../visualizations/registry';
import { EditableSandbox } from '../../../core/components/EditableSandbox';
const ExplainerPlayer = lazy(() => import('../../data-engineering/components/ExplainerPlayer').then(module => ({ default: module.ExplainerPlayer })));
import { formatText } from '../../../core/utils/textFormatting';
import { SystemDesignWorkbench } from '../../../core/components/SystemDesignWorkbench';
import '../frontend.css';
import {
  BookOpen, Eye, Code2, Bug, GraduationCap, Server, Hammer, Sparkles,
  ChevronDown, ChevronUp, Lightbulb, ChevronLeft, ChevronRight, CheckCircle2, PlayCircle,
} from 'lucide-react';

const SECTION_ICON: Record<FrontendSectionId, any> = {
  foundations: BookOpen,
  visualExplorer: Eye,
  interactiveExamples: Sparkles,
  codeLab: Code2,
  debuggingLab: Bug,
  interviewPrep: GraduationCap,
  productionDeepDive: Server,
  projectBuilder: Hammer,
};

const BLUE = '#3b82f6';

const buildExplainer = (data: FrontendTopicData): ExplainerScript => {
  const scenes: ExplainerScript['scenes'] = [
    { template: 'title', kicker: `${data.tech} · ${data.difficulty}`, headline: data.title, subtitle: data.summary || 'A visual guide to the core idea', narration: `${data.title}. ${data.summary || data.foundations.overview}` },
    { template: 'callout', kicker: 'Start with the idea', headline: 'In plain language', text: data.foundations.overview, narration: data.foundations.overview, tone: 'neutral' },
  ];
  const concepts = (data.subtopics || []).slice(0, 4);
  if (concepts.length > 1) scenes.push({ template: 'flow', kicker: 'Build the mental model', headline: 'The pieces fit together', nodes: concepts.map((item) => item.title), narration: concepts.map((item) => `${item.title}: ${item.explanation}`).join(' ') });
  else if (concepts.length === 1) scenes.push({ template: 'bullets', kicker: 'Core concept', headline: concepts[0].title, items: [concepts[0].explanation], narration: concepts[0].explanation });
  if (data.keyTakeaways?.length) scenes.push({ template: 'bullets', kicker: 'Remember', headline: 'What to keep', items: data.keyTakeaways.slice(0, 4), narration: data.keyTakeaways.slice(0, 4).join(' ') });
  return { topicId: data.id, title: data.title, scenes };
};

type RecallRating = 'again' | 'almost' | 'got-it';
type RecallRecord = Record<string, { rating: RecallRating; dueAt: number }>;

const TopicRecall: React.FC<{ topicId: string; takeaways: string[] }> = ({ topicId, takeaways }) => {
  const storageKey = `fe_recall_${topicId}`;
  const [records, setRecords] = useState<RecallRecord>(() => {
    try { return JSON.parse(window.localStorage.getItem(storageKey) || '{}') as RecallRecord; } catch { return {}; }
  });
  const rate = (index: number, rating: RecallRating) => {
    const days = rating === 'again' ? 1 : rating === 'almost' ? 3 : 7;
    const next = { ...records, [String(index)]: { rating, dueAt: Date.now() + days * 24 * 60 * 60 * 1000 } };
    setRecords(next);
    try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* local progress is optional */ }
  };
  if (!takeaways.length) return null;
  return (
    <section className="fe-takeaways" aria-label="Self-check and spaced review">
      <p className="fe-block-title" style={{ color: BLUE }}>Quick self-check</p>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 12px' }}>Cover the takeaway, explain it from memory, then choose when to review it.</p>
      <div style={{ display: 'grid', gap: 10 }}>
        {takeaways.slice(0, 5).map((item, index) => {
          const record = records[String(index)];
          return <details key={`${topicId}-${index}`} style={{ padding: 12, border: '1px solid var(--border-glass)', borderRadius: 10, background: 'var(--bg-inner)' }}>
            <summary style={{ cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600 }}>Explain this idea in your own words: {index + 1}</summary>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{formatText(item)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              {(['again', 'almost', 'got-it'] as RecallRating[]).map(rating => <button key={rating} aria-pressed={record?.rating === rating} className="fe-foot-btn" onClick={() => rate(index, rating)}>{rating === 'again' ? 'Review tomorrow' : rating === 'almost' ? 'Review in 3 days' : 'Got it · 7 days'}</button>)}
              {record && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Saved: {record.rating.replace('-', ' ')} · due {new Date(record.dueAt).toLocaleDateString()}</span>}
            </div>
          </details>;
        })}
      </div>
    </section>
  );
};

const FrontendGradedQuiz: React.FC<{ tech: string; topicId: string }> = ({ tech, topicId }) => {
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try { return JSON.parse(window.localStorage.getItem(`fe_mcq_${topicId}`) || '{}') as Record<string, number>; } catch { return {}; }
  });
  useEffect(() => {
    let cancelled = false;
    fetch(`/content/quiz/${tech}/${topicId}.json`).then(r => r.ok ? r.json() : []).then((items: McqQuestion[]) => { if (!cancelled && Array.isArray(items)) setQuestions(items); }).catch(() => {});
    return () => { cancelled = true; };
  }, [tech, topicId]);
  if (!questions.length) return null;
  const correct = questions.filter(q => answers[q.id] === q.correctIndex).length;
  const answered = questions.filter(q => answers[q.id] !== undefined).length;
  const choose = (q: McqQuestion, index: number) => {
    if (answers[q.id] !== undefined) return;
    const next = { ...answers, [q.id]: index };
    setAnswers(next);
    try { window.localStorage.setItem(`fe_mcq_${topicId}`, JSON.stringify(next)); } catch { /* progress is optional */ }
  };
  const reset = () => { setAnswers({}); try { window.localStorage.removeItem(`fe_mcq_${topicId}`); } catch { /* ignore */ } };
  return <section className="fe-takeaways" aria-label="Graded knowledge check">
    <p className="fe-block-title" style={{ color: BLUE }}>Knowledge check</p>
    <p style={{ color: 'var(--text-secondary)' }}>Choose the best answer. Your score is saved on this device. {answered}/{questions.length} answered · {correct} correct.</p>
    {questions.map((q, qi) => <fieldset key={q.id} style={{ border: '1px solid var(--border-glass)', borderRadius: 10, padding: 14, margin: '12px 0', background: 'var(--bg-inner)' }}>
      <legend id={`fe-quiz-question-${qi}`} style={{ color: 'var(--text-primary)', fontWeight: 650 }}>Q{qi + 1}. {q.question}</legend>
      <div role="radiogroup" aria-labelledby={`fe-quiz-question-${qi}`}>
      {q.options.map((option, oi) => {
        const selected = answers[q.id] === oi;
        const isCorrect = oi === q.correctIndex;
        const color = answers[q.id] === undefined ? 'var(--text-secondary)' : isCorrect ? '#10b981' : selected ? '#ef4444' : 'var(--text-muted)';
        const optionId = `fe-quiz-option-${qi}-${oi}`;
        return <button key={oi} id={optionId} type="button" role="radio" aria-checked={selected} tabIndex={selected || (answers[q.id] === undefined && oi === 0) ? 0 : -1} disabled={answers[q.id] !== undefined} onClick={() => choose(q, oi)} onKeyDown={event => {
          if (answers[q.id] !== undefined || !['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
          event.preventDefault();
          const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
          const next = (oi + delta + q.options.length) % q.options.length;
          document.getElementById(`fe-quiz-option-${qi}-${next}`)?.focus();
        }} style={{ display: 'block', width: '100%', textAlign: 'left', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: `1px solid ${color}`, color: 'var(--text-primary)', background: selected ? 'rgba(59,130,246,.08)' : 'var(--bg-secondary)', cursor: answers[q.id] !== undefined ? 'default' : 'pointer' }}>{String.fromCharCode(65 + oi)}. {conciseQuizOption(option)}</button>;
      })}
      </div>
      {answers[q.id] !== undefined && <p role="status" style={{ color: answers[q.id] === q.correctIndex ? '#10b981' : 'var(--text-secondary)', lineHeight: 1.6 }}>{answers[q.id] === q.correctIndex ? 'Correct. ' : 'Review this concept. '}{q.explanation}</p>}
    </fieldset>)}
    <button type="button" className="fe-foot-btn" onClick={reset}>Reset quiz</button>
  </section>;
};

const conciseQuizOption = (option: string): string => {
  const text = option.trim();
  const sentenceEnd = text.search(/[.!?](?:["”’')\]]*)\s+/);
  return sentenceEnd >= 0 ? text.slice(0, sentenceEnd + 1).trim() : text;
};

const Prose: React.FC<{ children?: string }> = ({ children }) =>
  children ? (
    <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{formatText(children)}</p>
  ) : null;

const Field: React.FC<{ label: string; value?: string; color?: string }> = ({ label, value, color = 'var(--text-primary)' }) =>
  value ? (
    <div className="fe-field" style={{ borderLeftColor: color }}>
      <div className="fe-field-label" style={{ color }}>{label}</div>
      <p className="fe-field-body">{formatText(value)}</p>
    </div>
  ) : null;

const editableProps = (s: SandboxConfig) => ({
  mode: s.mode,
  files: s.files,
  code: s.code,
  language: s.language,
});

// ---------------- Foundations ----------------
const Facet: React.FC<{ label: string; value?: string; accent?: string }> = ({ label, value, accent }) =>
  value ? (
    <div className="fe-facet" style={accent ? { borderTop: `2px solid ${accent}` } : undefined}>
      <div className="fe-facet-label">{label}</div>
      <p className="fe-facet-body">{formatText(value)}</p>
    </div>
  ) : null;

const SubtopicItem: React.FC<{ s: SubtopicDetail; defaultOpen?: boolean }> = ({ s, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="fe-sub">
      <button className="fe-sub-head" onClick={() => setOpen(o => !o)}>
        <span className="fe-sub-title">{s.title}</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <div className="fe-sub-body">
          <p className="fe-field-body" style={{ margin: 0 }}>{formatText(s.explanation)}</p>
          {s.example && <pre style={pre}><code>{s.example}</code></pre>}
        </div>
      )}
    </div>
  );
};

const Foundations: React.FC<{ data: FoundationsSection; subtopics?: SubtopicDetail[]; tier: 'core' | 'deep' }> = ({ data, subtopics, tier }) => {
  const [showMore, setShowMore] = useState(false);
  const extras = (
    <>
      <Facet label="Browser Perspective" value={data.browserPerspective} accent="#06b6d4" />
      <Facet label="How It Works in Production" value={data.realWorldUsage} accent="#8b5cf6" />
      <Facet label="Performance Impact" value={data.performanceImpact} accent="#f59e0b" />
      <Facet label="Engineering Impact" value={data.engineeringImpact} />
      <Facet label="Business Impact" value={data.businessImpact} />
    </>
  );
  const hasExtras = !!(data.browserPerspective || data.realWorldUsage || data.performanceImpact || data.engineeringImpact || data.businessImpact);
  return (
  <div>
    {data.overview && <p className="fe-lead">{formatText(data.overview)}</p>}

    {subtopics && subtopics.length > 0 && (
      <div className="fe-subsection" style={{ marginTop: 0, marginBottom: '20px' }}>
        <p className="fe-block-title" style={{ color: BLUE }}>Core Sub-topics — Explained</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {subtopics.map((s, i) => <SubtopicItem key={i} s={s} defaultOpen={i === 0} />)}
        </div>
      </div>
    )}

    <div className="fe-grid">
      <Facet label="Formal Definition" value={data.formalDefinition} accent={BLUE} />
      <Facet label="Why It Matters" value={data.whyItMatters} accent="#3b82f6" />
      <Facet label="Mental Model" value={data.mentalModel} accent="#10b981" />
      {tier === 'deep' && extras}
    </div>

    {tier === 'core' && hasExtras && (
      <div style={{ marginTop: '12px' }}>
        <button onClick={() => setShowMore(s => !s)} style={hintBtn}>
          {showMore ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {showMore ? 'Hide deeper context' : 'More context — production, performance & impact'}
        </button>
        {showMore && <div className="fe-grid" style={{ marginTop: '12px' }}>{extras}</div>}
      </div>
    )}

    {data.commonUseCases?.length > 0 && (
      <div className="fe-subsection">
        <p className="fe-block-title">Common Use Cases</p>
        <div className="fe-usecases">
          {data.commonUseCases.map((u, i) => <span key={i} className="fe-usecase">{formatText(u)}</span>)}
        </div>
      </div>
    )}

    {data.commonMisconceptions?.length > 0 && (
      <div className="fe-subsection">
        <p className="fe-block-title" style={{ color: '#ef4444' }}>Common Misconceptions</p>
        {data.commonMisconceptions.map((m, i) => (
          <div key={i} className="fe-callout myth">
            <div className="fe-callout-title">Myth: {m.myth}</div>
            <p className="fe-field-body" style={{ margin: 0 }}>{formatText(`Reality: ${m.reality}`)}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

// ---------------- Visual Explorer ----------------
const VisualExplorer: React.FC<{ items: VisualExplorerItem[] }> = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {items.map((item, i) => {
      const Viz = FRONTEND_VISUALIZATIONS[item.visualId];
      return (
        <div key={i}>
          <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{item.title}</h4>
          {item.caption && <Prose>{item.caption}</Prose>}
          <div style={{ marginTop: '10px' }}>
            {Viz ? <Viz config={item.config} /> : (
              <div style={{ padding: '14px', borderRadius: '8px', border: '1px dashed var(--border-glass)', color: 'var(--text-muted)', fontSize: '13px' }}>
                Visualization "{item.visualId}" is not registered yet.
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

// ---------------- Interactive Examples ----------------
const LEVEL_COLOR: Record<string, string> = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444', production: '#a855f7' };
const InteractiveExamples: React.FC<{ items: InteractiveExample[] }> = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {items.map((ex, i) => (
      <div key={i} style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '14px', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#fff', background: LEVEL_COLOR[ex.level] || BLUE, padding: '2px 8px', borderRadius: '6px' }}>{ex.level}</span>
          <strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong>
        </div>
        <Prose>{ex.explanation}</Prose>
        <div style={{ marginTop: '10px' }}>
          <EditableSandbox {...editableProps(ex.sandbox)} title={ex.title} />
        </div>
        {ex.expectedOutput && <Prose>{`Expected: ${ex.expectedOutput}`}</Prose>}
      </div>
    ))}
  </div>
);

// ---------------- Code Lab ----------------
const CodeLab: React.FC<{ items: CodeLabExercise[] }> = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {items.map(ex => <CodeLabCard key={ex.id} ex={ex} />)}
  </div>
);
const CodeLabCard: React.FC<{ ex: CodeLabExercise }> = ({ ex }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '14px', background: 'var(--bg-secondary)' }}>
      <strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong>
      <Prose>{ex.instructions}</Prose>
      <div style={{ marginTop: '10px' }}><EditableSandbox {...editableProps(ex.sandbox)} title="Your code — edit & Run" /></div>
      {ex.expectedOutput && <Prose>{`Expected output: ${ex.expectedOutput}`}</Prose>}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
        {ex.hints?.length > 0 && revealedHints < ex.hints.length && (
          <button onClick={() => setRevealedHints(n => n + 1)} style={hintBtn}>
            <Lightbulb size={13} /> Hint ({revealedHints + 1}/{ex.hints.length})
          </button>
        )}
        <button onClick={() => setShowSolution(s => !s)} style={hintBtn}>
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>
      {revealedHints > 0 && (
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6 }}>
          {ex.hints.slice(0, revealedHints).map((h, i) => <li key={i}>{formatText(h)}</li>)}
        </ul>
      )}
      {showSolution && (
        <div style={{ marginTop: '12px' }}>
          <strong style={{ color: '#10b981', fontSize: '12.5px', textTransform: 'uppercase' }}>Solution</strong>
          <EditableSandbox {...editableProps(ex.solution)} title="Solution" />
        </div>
      )}
    </div>
  );
};

// ---------------- Debugging Lab ----------------
const DebuggingLab: React.FC<{ items: DebuggingLabExercise[] }> = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {items.map(ex => <DebugCard key={ex.id} ex={ex} />)}
  </div>
);
const DebugCard: React.FC<{ ex: DebuggingLabExercise }> = ({ ex }) => {
  const [showFix, setShowFix] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '14px', background: 'var(--bg-secondary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bug size={16} color="#ef4444" />
        <strong style={{ color: 'var(--text-primary)' }}>{ex.title}</strong>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{ex.difficulty}</span>
      </div>
      <Prose>{`Symptom: ${ex.symptom}`}</Prose>
      <div style={{ marginTop: '10px' }}><EditableSandbox {...editableProps(ex.brokenCode)} title="Buggy code — try to fix it" /></div>
      <Field label="Error Analysis" value={ex.errorAnalysis} color="#ef4444" />
      {ex.commonMistakes?.length > 0 && (
        <ul style={{ margin: '0 0 10px 0', paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6 }}>
          {ex.commonMistakes.map((m, i) => <li key={i}>{formatText(m)}</li>)}
        </ul>
      )}
      <Prose>{ex.fixChallenge}</Prose>
      <button onClick={() => setShowFix(s => !s)} style={{ ...hintBtn, marginTop: '10px' }}>{showFix ? 'Hide Fix' : 'Show Fix'}</button>
      {showFix && (
        <div style={{ marginTop: '12px' }}>
          <strong style={{ color: '#10b981', fontSize: '12.5px', textTransform: 'uppercase' }}>Fixed Code</strong>
          <EditableSandbox {...editableProps(ex.solution)} title="Fixed code" />
        </div>
      )}
    </div>
  );
};

// ---------------- Interview (embedded) ----------------
const InterviewEmbedded: React.FC<{ data: FrontendInterviewSection }> = ({ data }) => {
  const groups: Array<{ label: string; qs?: ConceptualInterviewQuestion[]; coding?: CodingInterviewQuestion[]; design?: boolean }> = [
    { label: 'Theory', qs: data.theory },
    { label: 'Scenario', qs: data.scenario },
    { label: 'System Design', qs: data.systemDesign, design: true },
    { label: 'Coding', coding: data.coding },
    { label: 'Machine Coding', coding: data.machineCoding },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {groups.map(g => {
        const items = g.qs || g.coding;
        if (!items || items.length === 0) return null;
        return (
          <div key={g.label}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)', borderBottom: `2px solid ${BLUE}`, paddingBottom: '6px', display: 'inline-block' }}>{g.label}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {g.qs?.map(q => g.design ? <SystemDesignWorkbench key={q.id} q={q} accent={BLUE} /> : <ConceptualCard key={q.id} q={q} />)}
              {g.coding?.map(q => <CodingCard key={q.id} q={q} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ConceptualCard: React.FC<{ q: ConceptualInterviewQuestion }> = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={qCard}>
      <div onClick={() => setOpen(o => !o)} style={qHead}>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.question}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {open && (
        <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
          <Field label="Direct Answer" value={q.directAnswer} color={BLUE} />
          {q.detailedExplanation && (
            <>
              <Field label="What It Is" value={q.detailedExplanation.whatItIs} />
              <Field label="Why It Exists" value={q.detailedExplanation.whyItExists} />
              <Field label="How It Works" value={q.detailedExplanation.howItWorks} />
            </>
          )}
          <Field label="Why It Matters" value={q.whyImportant} />
          <Field label="Real-World Example" value={q.realWorldExample} color="#10b981" />
          {q.followUps?.length > 0 && (
            <div>
              <strong style={{ color: '#a855f7', fontSize: '13px', textTransform: 'uppercase' }}>Follow-ups</strong>
              {q.followUps.map((f, i) => (
                <div key={i} style={{ marginTop: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {f.question}</span>
                  <Prose>{f.answer}</Prose>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CodingCard: React.FC<{ q: CodingInterviewQuestion }> = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={qCard}>
      <div onClick={() => setOpen(o => !o)} style={qHead}>
        <span style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>
          <Code2 size={15} color={BLUE} /> {q.question}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {!open && (
        <button onClick={() => setOpen(true)} style={{ ...hintBtn, marginTop: '10px' }}><Lightbulb size={13} /> Show Answer</button>
      )}
      {open && (
        <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
          <Field label="Thought Process" value={q.thoughtProcess} color={BLUE} />
          {q.solution?.code && (
            <pre style={pre}><code>{q.solution.code}</code></pre>
          )}
          <Field label="Line-by-Line" value={q.lineByLine} />
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Field label="Time" value={q.timeComplexity} color="#f59e0b" />
            <Field label="Space" value={q.spaceComplexity} color="#f59e0b" />
          </div>
          {q.followUps?.length > 0 && (
            <div>
              <strong style={{ color: '#a855f7', fontSize: '13px', textTransform: 'uppercase' }}>Follow-ups</strong>
              {q.followUps.map((f, i) => (
                <div key={i} style={{ marginTop: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {f.question}</span>
                  <Prose>{f.answer}</Prose>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------- Production Deep Dive ----------------
const ProductionDeepDive: React.FC<{ data: ProductionDeepDiveSection }> = ({ data }) => (
  <div>
    <Field label="Architecture" value={data.architecture} color={BLUE} />
    <Field label="Performance" value={data.performance} color="#f59e0b" />
    <Field label="Security" value={data.security} color="#ef4444" />
    <Field label="Scaling" value={data.scaling} />
    <Field label="Maintainability" value={data.maintainability} />
    <Field label="Observability" value={data.observability} />
    {data.caseStudies?.length > 0 && (
      <div>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Real-World Scenarios</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {data.caseStudies.map((c, i) => (
            <div key={i} style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
              <strong style={{ color: BLUE }}>{c.company}</strong>
              <Prose>{`Problem: ${c.problem}`}</Prose>
              <Prose>{`Solution: ${c.solution}`}</Prose>
              <Prose>{`Tradeoffs: ${c.tradeoffs}`}</Prose>
              <Prose>{`Lessons: ${c.lessons}`}</Prose>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ---------------- Project Builder ----------------
const ProjectBuilder: React.FC<{ data: ProjectBuilderSection }> = ({ data }) => (
  <div>
    <Prose>{data.summary}</Prose>
    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>Contributes to: <strong style={{ color: BLUE }}>{data.contributesTo}</strong></p>
    {data.requirements?.length > 0 && (
      <div style={{ marginTop: '8px' }}>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase' }}>Requirements</strong>
        <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.requirements.map((r, i) => <li key={i}>{formatText(r)}</li>)}</ul>
      </div>
    )}
    <Field label="Architecture" value={data.architecture} />
    {data.folderStructure && (
      <div style={{ marginBottom: '14px' }}>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase' }}>Folder Structure</strong>
        <pre style={pre}><code>{data.folderStructure}</code></pre>
      </div>
    )}
    {data.steps?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase' }}>Implementation Steps</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {data.steps.map((s, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{i + 1}. {s.title}</strong>
              <Prose>{s.instructions}</Prose>
              {s.code && <pre style={pre}><code>{s.code}</code></pre>}
              {s.checkpoint && <Prose>{`Checkpoint: ${s.checkpoint}`}</Prose>}
            </div>
          ))}
        </div>
      </div>
    )}
    {data.enhancements?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase' }}>Enhancements</strong>
        <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.enhancements.map((e, i) => <li key={i}>{formatText(e)}</li>)}</ul>
      </div>
    )}
    {data.interviewQuestions?.length > 0 && (
      <div>
        <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: '#a855f7' }}>Interview Questions on This Project</strong>
        <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.interviewQuestions.map((q, i) => <li key={i}>{formatText(q)}</li>)}</ul>
      </div>
    )}
  </div>
);

// ---------------- Shared styles ----------------
const hintBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: BLUE, fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' };
const qCard: React.CSSProperties = { padding: '14px', borderRadius: '10px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' };
const qHead: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' };
const pre: React.CSSProperties = { margin: '8px 0 0 0', padding: '12px', borderRadius: '8px', background: 'var(--bg-code, #0d1117)', overflowX: 'auto', fontSize: '12.5px', lineHeight: 1.5, fontFamily: 'ui-monospace, monospace', color: 'var(--text-code, #e2e8f0)' };

const DIFFICULTY_PILL: Record<string, { bg: string; color: string }> = {
  beginner: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  intermediate: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  advanced: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
};

// Prerequisites / Related hold topic IDs — render them as clickable links to
// those lessons when the id resolves against the manifest; otherwise plain chip.
const NavChipRow: React.FC<{ label: string; items?: string[]; navMap: Record<string, string>; onNavigate?: (id: string) => void }> = ({ label, items, navMap, onNavigate }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="fe-chip-row">
      <span className="fe-chip-label">{label}</span>
      {items.map((id, i) => {
        const title = navMap[id];
        return title && onNavigate
          ? <button key={i} className="fe-chip fe-chip-link" onClick={() => onNavigate(id)}>{title} →</button>
          : <span key={i} className="fe-chip">{id}</span>;
      })}
    </div>
  );
};

// ---------------- Orchestrator ----------------
interface FrontendTopicRendererProps {
  data: FrontendTopicData;
  topics?: Array<{ id: string; title: string }>;
  onNavigate?: (id: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

// Learner-facing step labels (plain language, replaces dev section names).
const STEP_LABEL: Record<FrontendSectionId, string> = {
  foundations: 'Learn the concept',
  visualExplorer: 'See it visually',
  interactiveExamples: 'Study worked examples',
  codeLab: 'Try it yourself',
  debuggingLab: 'Debug it',
  interviewPrep: 'Interview prep',
  productionDeepDive: 'In production',
  projectBuilder: 'Build a project',
};

type StepId = FrontendSectionId | 'review';

export const FrontendTopicRenderer: React.FC<FrontendTopicRendererProps> = ({ data, topics = [], onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle }) => {
  const [showExplainer, setShowExplainer] = useState(false);
  const navMap = Object.fromEntries(topics.map(t => [t.id, t.title])) as Record<string, string>;
  // Only show sections that have content.
  const available = FRONTEND_SECTIONS.filter(s => {
    const v = (data as any)[s.id];
    return v && (Array.isArray(v) ? v.length > 0 : true);
  });

  // Presentation tier: explicit override, else derived from difficulty.
  const tier: 'core' | 'deep' = data.tier ?? (data.difficulty === 'beginner' ? 'core' : 'deep');

  // Guided linear path: content sections in order, then a final "Check yourself" step.
  const hasReview = (data.keyTakeaways?.length || 0) > 0;
  const steps: Array<{ id: StepId; label: string; desc: string }> = [
    ...available.map(s => ({ id: s.id as StepId, label: STEP_LABEL[s.id] || s.label, desc: s.description })),
    ...(hasReview ? [{ id: 'review' as StepId, label: 'Check yourself', desc: 'Recap, recall from memory, then take the graded quiz.' }] : []),
  ];
  const [stepIndex, setStepIndex] = useState(0);
  const current = steps[Math.min(stepIndex, steps.length - 1)] || steps[0];

  // Reset to the first step whenever the lesson changes.
  useEffect(() => { setStepIndex(0); setShowExplainer(false); }, [data.id]);

  // Where this lesson sits in the whole track (Lesson X of Y).
  const lessonPos = topics.findIndex(t => t.id === data.id);
  const lessonNo = lessonPos >= 0 ? lessonPos + 1 : null;
  const trackPct = topics.length ? Math.round(((lessonPos >= 0 ? lessonPos + 1 : 1) / topics.length) * 100) : 0;

  const renderStep = (id: StepId) => {
    switch (id) {
      case 'foundations': return <Foundations data={data.foundations} subtopics={data.subtopics} tier={tier} />;
      case 'visualExplorer': return data.visualExplorer ? <VisualExplorer items={data.visualExplorer} /> : null;
      case 'interactiveExamples': return data.interactiveExamples ? <InteractiveExamples items={data.interactiveExamples} /> : null;
      case 'codeLab': return data.codeLab ? <CodeLab items={data.codeLab} /> : null;
      case 'debuggingLab': return data.debuggingLab ? <DebuggingLab items={data.debuggingLab} /> : null;
      case 'interviewPrep': return data.interviewPrep ? <InterviewEmbedded data={data.interviewPrep} /> : null;
      case 'productionDeepDive': return data.productionDeepDive ? <ProductionDeepDive data={data.productionDeepDive} /> : null;
      case 'projectBuilder': return data.projectBuilder ? <ProjectBuilder data={data.projectBuilder} /> : null;
      case 'review': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {data.keyTakeaways?.length > 0 && (
            <div>
              <p className="fe-block-title" style={{ color: BLUE }}>Key Takeaways</p>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {data.keyTakeaways.map((k, i) => <li key={i}>{formatText(k)}</li>)}
              </ul>
            </div>
          )}
          <TopicRecall topicId={data.id} takeaways={data.keyTakeaways || []} />
          <FrontendGradedQuiz tech={data.tech} topicId={data.id} />
          {(data.prerequisites?.length || data.relatedConcepts?.length) ? (
            <div className="fe-chips">
              <NavChipRow label="Prerequisites" items={data.prerequisites} navMap={navMap} onNavigate={onNavigate} />
              <NavChipRow label="Related lessons" items={data.relatedConcepts} navMap={navMap} onNavigate={onNavigate} />
            </div>
          ) : null}
        </div>
      );
      default: return null;
    }
  };

  const diff = DIFFICULTY_PILL[data.difficulty] || DIFFICULTY_PILL.beginner;
  const StepIcon = current.id === 'review' ? CheckCircle2 : SECTION_ICON[current.id as FrontendSectionId];
  const isLastStep = stepIndex >= steps.length - 1;

  return (
    <div className="fe-root">
      {/* Topic header */}
      <header className="fe-header">
        <div className="fe-title-row">
          <h1 className="fe-title">{data.title}</h1>
          <span className="fe-pill" style={{ background: diff.bg, color: diff.color }}>{data.difficulty}</span>
        </div>
        {data.summary && <p className="fe-summary">{formatText(data.summary)}</p>}
      </header>

      {/* Where you are in the track */}
      <div className="fe-path-bar">
        <span className="fe-path-meta">{lessonNo ? `Lesson ${lessonNo} of ${topics.length}` : 'Lesson'} · {data.tech}</span>
        <div className="fe-path-track"><div className="fe-path-fill" style={{ width: `${trackPct}%` }} /></div>
        <span className="fe-path-meta">{trackPct}%</span>
      </div>

      {/* Guided step map */}
      <nav className="fe-stepper" aria-label="Lesson steps">
        {steps.map((s, i) => {
          const Icon = s.id === 'review' ? CheckCircle2 : SECTION_ICON[s.id as FrontendSectionId];
          const state = i === stepIndex ? 'active' : i < stepIndex ? 'done' : '';
          return (
            <button key={s.id} onClick={() => setStepIndex(i)} title={s.desc} className={`fe-step-chip ${state}`}>
              <span className="fe-step-num">{i < stepIndex ? '✓' : i + 1}</span>
              <Icon size={14} /> {s.label}
            </button>
          );
        })}
      </nav>

      {/* Current step */}
      <section className="fe-panel">
        <div className="fe-panel-head">
          <div className="fe-panel-icon"><StepIcon size={20} /></div>
          <div>
            <h2 className="fe-panel-title">Step {stepIndex + 1} of {steps.length} · {current.label}</h2>
            <p className="fe-panel-desc">{current.desc}</p>
          </div>
        </div>
        <div className="fe-panel-body animate-fade-in" key={current.id}>
          {current.id === 'foundations' && (
            <>
              <button type="button" className="fe-explainer-card" onClick={() => setShowExplainer(v => !v)}>
                <span className="fe-explainer-ic"><PlayCircle size={22} /></span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)' }}>Watch the animated lesson first</span>
                  <span style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)' }}>A short narrated walkthrough of the core idea.</span>
                </span>
                {showExplainer ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showExplainer && <div style={{ marginBottom: 20 }}><Suspense fallback={<p style={{ color: 'var(--text-secondary)' }}>Preparing the animated lesson…</p>}><ExplainerPlayer script={buildExplainer(data)} /></Suspense></div>}
            </>
          )}
          {renderStep(current.id)}
          {!isLastStep && (
            <button type="button" className="fe-continue" onClick={() => { setStepIndex(i => Math.min(i + 1, steps.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </section>

      {(onPrev || onNext || onToggleComplete) && (
        <div className="fe-footer">
          <div className="fe-footer-side">
            {onPrev && (
              <button className="fe-foot-btn" onClick={onPrev}>
                <ChevronLeft size={16} />
                <span className="fe-foot-label">{prevTitle || 'Previous'}</span>
              </button>
            )}
          </div>
          {onToggleComplete && (
            <button className={`fe-complete-btn${isCompleted ? ' done' : ''}`} onClick={onToggleComplete}>
              <CheckCircle2 size={16} /> {isCompleted ? 'Completed' : 'Mark complete'}
            </button>
          )}
          <div className="fe-footer-side fe-footer-right">
            {onNext && (
              <button className="fe-foot-btn" onClick={onNext}>
                <span className="fe-foot-label">{nextTitle || 'Next'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
