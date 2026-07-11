import React, { useEffect, useState } from 'react';
import { LoadingBlock } from '../../../core/components/LoadingBlock';
import { getPyodide, runPythonChallenge, OFFLINE_UNSUPPORTED, type PyRunResult } from '../../../core/lib/pythonRunner';
import type {
  Category,
  Difficulty,
  InterviewCategory,
  InterviewPrepQuestion,
  ConceptualInterviewQuestion,
  CodingInterviewQuestion,
} from '../../../core/types/types';
import { INTERVIEW_CATEGORIES } from '../../../core/types/types';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Search,
  Lightbulb,
  Play,
} from 'lucide-react';
import { formatText } from '../../../core/utils/textFormatting';
import { MockInterview } from './MockInterview';

interface InterviewPrepTabProps {
  tech: Category;
}

// Logical clusters so the category nav isn't a wall of chips.
const CATEGORY_GROUPS: { label: string; ids: InterviewCategory[] }[] = [
  { label: 'Core Q&A', ids: ['basic', 'intermediate', 'advanced'] },
  { label: 'Applied', ids: ['scenario', 'production', 'optimization'] },
  { label: 'Design', ids: ['architecture', 'systemdesign'] },
  { label: 'Coding', ids: ['coding', 'takehome'] },
  { label: 'Behavioral', ids: ['behavioral'] },
];

const TECH_LABELS: Partial<Record<Category, string>> = {
  'data-engineering': 'Data Engineering',
  sql: 'SQL',
  python: 'Python',
  pyspark: 'PySpark',
  databricks: 'Databricks',
  golang: 'Go',
  react: 'React',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  nextjs: 'Next.js',
};

// Falls back to a prettified id for any tech without an explicit label.
const techLabel = (tech: Category): string =>
  TECH_LABELS[tech] || tech.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const CATEGORY_COLOR = '#3b82f6';

// In-memory cache so switching tabs doesn't re-fetch.
const cache: Record<string, InterviewPrepQuestion[]> = {};

export const InterviewPrepTab: React.FC<InterviewPrepTabProps> = ({ tech }) => {
  const [activeCategory, setActiveCategory] = useState<InterviewCategory>('basic');
  const [questions, setQuestions] = useState<InterviewPrepQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [mockActive, setMockActive] = useState(false);

  // Reset to first category when the technology changes.
  useEffect(() => {
    setActiveCategory('basic');
    setMockActive(false);
  }, [tech]);

  // Fetch the active category's question file.
  useEffect(() => {
    const key = `${tech}/${activeCategory}`;
    setSearch('');
    setDifficultyFilter('all');
    setRevealed({});

    if (cache[key]) {
      setQuestions(cache[key]);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        // Some categories are role-level (tech-agnostic): they load from a
        // single shared file that appears on every technology's tab.
        const SHARED_CATEGORIES = ['behavioral', 'systemdesign', 'takehome'];
        const url = SHARED_CATEGORIES.includes(activeCategory)
          ? `/content/interview/_shared/${activeCategory}.json`
          : `/content/interview/${tech}/${activeCategory}.json`;
        const res = await fetch(url);
        if (res.ok) {
          const data = (await res.json()) as InterviewPrepQuestion[];
          const arr = Array.isArray(data) ? data : [];
          cache[key] = arr;
          if (!cancelled) setQuestions(arr);
        } else if (!cancelled) {
          setQuestions([]);
        }
      } catch {
        if (!cancelled) setQuestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [tech, activeCategory]);

  const toggle = (id: string) => setRevealed(prev => ({ ...prev, [id]: !prev[id] }));

  const isCoding = activeCategory === 'coding';

  const filtered = questions.filter(q => {
    const matchesDifficulty =
      difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const haystack = `${q.question} ${(q.tags || []).join(' ')}`.toLowerCase();
    const matchesSearch = search.trim() === '' || haystack.includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  if (mockActive) {
    return <MockInterview tech={tech} techLabel={techLabel(tech)} onExit={() => setMockActive(false)} />;
  }

  const catById = (id: InterviewCategory) => INTERVIEW_CATEGORIES.find(c => c.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
            {techLabel(tech)} Interview Preparation
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '6px 0 0 0', maxWidth: '70ch' }}>
            A complete interview system for {techLabel(tech)} — basics to architecture, scenarios, production support, optimization and coding. Pick a category, or run a timed mock interview.
          </p>
        </div>
        <button
          onClick={() => setMockActive(true)}
          className="btn btn-primary"
          style={{ padding: '10px 16px', fontSize: '13.5px', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <Play size={15} /> Mock Interview
        </button>
      </div>

      {/* Grouped category navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-inner)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
        {CATEGORY_GROUPS.map(group => (
          <div key={group.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', width: '86px', flexShrink: 0 }}>{group.label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {group.ids.map(id => {
                const cat = catById(id);
                if (!cat) return null;
                const active = id === activeCategory;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id)}
                    title={cat.description}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '8px',
                      border: `1px solid ${active ? 'transparent' : 'var(--border-glass)'}`, cursor: 'pointer', fontSize: '13px',
                      fontWeight: active ? 700 : 500,
                      background: active ? 'var(--bg-inner-active, rgba(59,130,246,0.15))' : 'var(--bg-secondary)',
                      color: active ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'all 0.2s ease',
                    }}
                  >
                    {id === 'coding' ? <Code2 size={14} /> : <HelpCircle size={14} />}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Search + difficulty filter */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${INTERVIEW_CATEGORIES.find(c => c.id === activeCategory)?.label} questions...`}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              background: 'var(--bg-inner)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              fontSize: '14px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => {
            const active = difficultyFilter === d;
            return (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-glass)',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: active ? 700 : 500,
                  background: active ? 'var(--bg-inner-active, rgba(59,130,246,0.15))' : 'var(--bg-inner)',
                  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                  textTransform: 'capitalize',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {filtered.length} question{filtered.length === 1 ? '' : 's'}
          {search || difficultyFilter !== 'all' ? ` (filtered from ${questions.length})` : ''}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <LoadingBlock label="Loading interview questions…" />
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
          {questions.length === 0
            ? 'Interview questions for this category are coming soon.'
            : 'No questions match your search/filter.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(q => (
            <QuestionCard
              key={q.id}
              q={q}
              isCoding={isCoding}
              revealed={!!revealed[q.id]}
              onToggle={() => toggle(q.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// Card
// ------------------------------------------------------------------

const Prose: React.FC<{ children?: string }> = ({ children }) => {
  if (!children) return null;
  return (
    <p style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
      {formatText(children)}
    </p>
  );
};

const Section: React.FC<{ label: string; color?: string; children: React.ReactNode }> = ({ label, color = 'var(--text-primary)', children }) => (
  <div>
    <strong style={{ color, fontSize: '13.5px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</strong>
    {children}
  </div>
);

const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// Editable + runnable Python (Pyodide). Lets learners tweak the reference
// solution and run it in-browser. Reuses the shared, verified pythonRunner.
const RunnablePython: React.FC<{ code: string; testCases?: Array<{ input: string; expected: string }> }> = ({ code, testCases }) => {
  const [src, setSrc] = useState(code);
  const [running, setRunning] = useState(false);
  const [pyReady, setPyReady] = useState(false);
  const [pyFailed, setPyFailed] = useState(false);
  const [res, setRes] = useState<PyRunResult | null>(null);
  const graded = !!(testCases && testCases.length);
  useEffect(() => {
    let cancelled = false;
    getPyodide().then(() => { if (!cancelled) setPyReady(true); }).catch(() => { if (!cancelled) setPyFailed(true); });
    return () => { cancelled = true; };
  }, []);
  const run = async () => {
    setRunning(true); setRes(null);
    try { setRes(await runPythonChallenge(src, testCases || [])); }
    catch (e) { setRes({ ok: false, stdout: '', stderr: '', error: e instanceof Error ? e.message : 'Python runtime unavailable.', tests: [], allPassed: false }); setPyFailed(true); }
    finally { setRunning(false); }
  };
  return (
    <div style={{ margin: '8px 0 0 0' }}>
      <div style={{ border: '1px solid var(--border-glass)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', background: 'var(--bg-inner)', borderBottom: '1px solid var(--border-glass)' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>python · {graded ? 'write your solution' : 'editable'}</span>
          <button onClick={run} disabled={running || pyFailed} style={{ cursor: running || pyFailed ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 12, padding: '5px 12px', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff', opacity: running || pyFailed ? 0.6 : 1 }}>
            {running ? 'Running…' : !pyReady && !pyFailed ? 'Loading Python…' : graded ? '▶ Run tests' : '▶ Run'}
          </button>
        </div>
        <textarea value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} rows={Math.min(20, src.split('\n').length + 1)}
          style={{ width: '100%', boxSizing: 'border-box', border: 'none', outline: 'none', resize: 'vertical', padding: 14, fontFamily: mono, fontSize: 13, lineHeight: 1.5, background: 'var(--bg-code, #0d1117)', color: 'var(--text-code, #e2e8f0)' }} />
      </div>
      {res && (
        <div style={{ marginTop: 8, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-inner)', border: `1px solid ${res.error ? '#ef4444' : res.tests.length && !res.allPassed ? '#ef4444' : 'var(--border-glass)'}`, fontFamily: mono, fontSize: 12.5, whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
          {res.error ? <span style={{ color: '#ef4444' }}>{res.error}</span>
            : res.tests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <strong style={{ color: res.allPassed ? '#10b981' : '#ef4444' }}>{res.tests.filter((t) => t.passed).length}/{res.tests.length} tests passed{res.allPassed ? ' — solved!' : ''}</strong>
                {res.tests.map((t) => (
                  <div key={t.index} style={{ borderLeft: `3px solid ${t.passed ? '#10b981' : '#ef4444'}`, paddingLeft: 8 }}>
                    {t.passed ? '✓ ' : '✗ '}{t.input}{!t.passed && `\n   expected: ${t.expected}\n   got:      ${t.actual}`}
                  </div>
                ))}
              </div>
            )
            : (res.stdout.trim() || res.stderr.trim())
              ? <>{res.stdout}{res.stderr && <span style={{ color: '#f59e0b' }}>{res.stderr}</span>}</>
              : <span style={{ color: 'var(--text-muted)' }}>Ran successfully (no output). Add a print() to see results.</span>}
        </div>
      )}
      {pyFailed && <span style={{ display: 'block', marginTop: 6, fontSize: 11.5, color: 'var(--text-muted)' }}>In-browser Python unavailable — copy and run locally.</span>}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  if ((language || '').toLowerCase() === 'python' && !OFFLINE_UNSUPPORTED.test(code)) {
    return <RunnablePython code={code} />;
  }
  return (
    <pre
      style={{
        margin: '8px 0 0 0',
        padding: '14px',
        borderRadius: '10px',
        background: 'var(--bg-code, #0d1117)',
        border: '1px solid var(--border-glass)',
        overflowX: 'auto',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <code style={{ fontFamily: mono, color: 'var(--text-code, #e2e8f0)' }}>
        {code}
      </code>
      {language ? (
        <span style={{ display: 'block', marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>{language}</span>
      ) : null}
    </pre>
  );
};

interface QuestionCardProps {
  q: InterviewPrepQuestion;
  isCoding: boolean;
  revealed: boolean;
  onToggle: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ q, isCoding, revealed, onToggle }) => {
  const diffColor = DIFFICULTY_COLORS[q.difficulty] || CATEGORY_COLOR;
  return (
    <div
      className="glass-panel"
      style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}
    >
      <div
        onClick={onToggle}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: '12px' }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {isCoding ? (
            <Code2 size={18} color={CATEGORY_COLOR} style={{ marginTop: '2px', flexShrink: 0 }} />
          ) : (
            <HelpCircle size={18} color={CATEGORY_COLOR} style={{ marginTop: '2px', flexShrink: 0 }} />
          )}
          <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.45 }}>{q.question}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: diffColor }} title={q.difficulty} />
          {revealed ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
        </div>
      </div>

      {/* Show Answer button for coding (per spec) */}
      {isCoding && !revealed && (
        <button
          onClick={onToggle}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-inner)',
            color: CATEGORY_COLOR,
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Lightbulb size={14} /> Show Answer
        </button>
      )}

      {revealed && (
        <div
          className="animate-slide-up"
          style={{ marginTop: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px', fontSize: '14.5px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {isCoding
            ? <CodingAnswer q={q as CodingInterviewQuestion} />
            : <ConceptualAnswer q={q as ConceptualInterviewQuestion} />}
        </div>
      )}
    </div>
  );
};

const ConceptualAnswer: React.FC<{ q: ConceptualInterviewQuestion }> = ({ q }) => (
  <>
    <Section label="Direct Interview Answer" color={CATEGORY_COLOR}>
      <Prose>{q.directAnswer}</Prose>
    </Section>

    {q.detailedExplanation && (
      <Section label="Detailed Explanation">
        {q.detailedExplanation.whatItIs && (
          <div style={{ marginTop: '6px' }}>
            <em style={{ color: 'var(--text-muted)' }}>What it is</em>
            <Prose>{q.detailedExplanation.whatItIs}</Prose>
          </div>
        )}
        {q.detailedExplanation.whyItExists && (
          <div style={{ marginTop: '10px' }}>
            <em style={{ color: 'var(--text-muted)' }}>Why it exists</em>
            <Prose>{q.detailedExplanation.whyItExists}</Prose>
          </div>
        )}
        {q.detailedExplanation.howItWorks && (
          <div style={{ marginTop: '10px' }}>
            <em style={{ color: 'var(--text-muted)' }}>How it works</em>
            <Prose>{q.detailedExplanation.howItWorks}</Prose>
          </div>
        )}
      </Section>
    )}

    {q.whyImportant && (
      <Section label="Why It Matters">
        <Prose>{q.whyImportant}</Prose>
      </Section>
    )}

    {q.realWorldExample && (
      <Section label="Real-World Example" color="#10b981">
        <Prose>{q.realWorldExample}</Prose>
      </Section>
    )}

    {q.nestedTopics && q.nestedTopics.length > 0 && (
      <Section label="Related Concepts You Should Know">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {q.nestedTopics.map((nt, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px' }}>{nt.title}</strong>
              <Prose>{nt.explanation}</Prose>
            </div>
          ))}
        </div>
      </Section>
    )}

    {q.followUps && q.followUps.length > 0 && (
      <Section label="Likely Follow-Up Questions" color="#a855f7">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {q.followUps.map((f, i) => (
            <div key={i}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {f.question}</span>
              <Prose>{f.answer}</Prose>
            </div>
          ))}
        </div>
      </Section>
    )}
  </>
);

const CodingAnswer: React.FC<{ q: CodingInterviewQuestion }> = ({ q }) => (
  <>
    {q.thoughtProcess && (
      <Section label="Interview Thought Process" color={CATEGORY_COLOR}>
        <Prose>{q.thoughtProcess}</Prose>
      </Section>
    )}

    {q.testCases && q.testCases.length > 0 && q.starterCode && (
      <Section label="Try it yourself" color="#10b981">
        <RunnablePython code={q.starterCode} testCases={q.testCases} />
      </Section>
    )}

    {q.solution?.code && (
      <Section label="Solution">
        <CodeBlock code={q.solution.code} language={q.solution.language} />
      </Section>
    )}

    {q.lineByLine && (
      <Section label="Line-by-Line Explanation">
        <Prose>{q.lineByLine}</Prose>
      </Section>
    )}

    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {q.timeComplexity && (
        <div style={{ flex: 1, minWidth: '180px', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
          <strong style={{ color: '#f59e0b', fontSize: '12.5px' }}>TIME COMPLEXITY</strong>
          <Prose>{q.timeComplexity}</Prose>
        </div>
      )}
      {q.spaceComplexity && (
        <div style={{ flex: 1, minWidth: '180px', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
          <strong style={{ color: '#f59e0b', fontSize: '12.5px' }}>SPACE COMPLEXITY</strong>
          <Prose>{q.spaceComplexity}</Prose>
        </div>
      )}
    </div>

    {q.alternativeApproaches && q.alternativeApproaches.length > 0 && (
      <Section label="Alternative Approaches">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {q.alternativeApproaches.map((a, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px' }}>{a.title}</strong>
              <Prose>{a.explanation}</Prose>
              {a.code ? <CodeBlock code={a.code} /> : null}
            </div>
          ))}
        </div>
      </Section>
    )}

    {q.followUps && q.followUps.length > 0 && (
      <Section label="Common Follow-Up Questions" color="#a855f7">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          {q.followUps.map((f, i) => (
            <div key={i}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {f.question}</span>
              <Prose>{f.answer}</Prose>
            </div>
          ))}
        </div>
      </Section>
    )}
  </>
);
