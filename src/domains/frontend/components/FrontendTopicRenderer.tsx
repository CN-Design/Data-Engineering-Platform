import React, { useState } from 'react';
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
import type { ConceptualInterviewQuestion, CodingInterviewQuestion } from '../../../core/types/types';
import { FRONTEND_VISUALIZATIONS } from '../visualizations/registry';
import { EditableSandbox } from '../../../core/components/EditableSandbox';
import { formatText } from '../../../core/utils/textFormatting';
import { SystemDesignWorkbench } from '../../../core/components/SystemDesignWorkbench';
import '../frontend.css';
import {
  BookOpen, Eye, Code2, Bug, GraduationCap, Server, Hammer, Sparkles,
  ChevronDown, ChevronUp, Lightbulb, ChevronLeft, ChevronRight, CheckCircle2,
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

const SubtopicItem: React.FC<{ s: SubtopicDetail }> = ({ s }) => {
  const [open, setOpen] = useState(false);
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
          {subtopics.map((s, i) => <SubtopicItem key={i} s={s} />)}
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

const ChipRow: React.FC<{ label: string; items?: string[]; core?: boolean }> = ({ label, items, core }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="fe-chip-row">
      <span className="fe-chip-label">{label}</span>
      {items.map((c, i) => <span key={i} className={`fe-chip${core ? ' core' : ''}`}>{c}</span>)}
    </div>
  );
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

export const FrontendTopicRenderer: React.FC<FrontendTopicRendererProps> = ({ data, topics = [], onNavigate, isCompleted, onToggleComplete, onPrev, onNext, prevTitle, nextTitle }) => {
  const navMap = Object.fromEntries(topics.map(t => [t.id, t.title])) as Record<string, string>;
  // Only show sections that have content.
  const available = FRONTEND_SECTIONS.filter(s => {
    const v = (data as any)[s.id];
    return v && (Array.isArray(v) ? v.length > 0 : true);
  });
  const [active, setActive] = useState<FrontendSectionId>(available[0]?.id || 'foundations');

  // Presentation tier: explicit override, else derived from difficulty.
  const tier: 'core' | 'deep' = data.tier ?? (data.difficulty === 'beginner' ? 'core' : 'deep');

  const renderSection = () => {
    switch (active) {
      case 'foundations': return <Foundations data={data.foundations} subtopics={data.subtopics} tier={tier} />;
      case 'visualExplorer': return data.visualExplorer ? <VisualExplorer items={data.visualExplorer} /> : null;
      case 'interactiveExamples': return data.interactiveExamples ? <InteractiveExamples items={data.interactiveExamples} /> : null;
      case 'codeLab': return data.codeLab ? <CodeLab items={data.codeLab} /> : null;
      case 'debuggingLab': return data.debuggingLab ? <DebuggingLab items={data.debuggingLab} /> : null;
      case 'interviewPrep': return data.interviewPrep ? <InterviewEmbedded data={data.interviewPrep} /> : null;
      case 'productionDeepDive': return data.productionDeepDive ? <ProductionDeepDive data={data.productionDeepDive} /> : null;
      case 'projectBuilder': return data.projectBuilder ? <ProjectBuilder data={data.projectBuilder} /> : null;
      default: return null;
    }
  };

  const diff = DIFFICULTY_PILL[data.difficulty] || DIFFICULTY_PILL.beginner;
  const activeMeta = FRONTEND_SECTIONS.find(s => s.id === active);
  const ActiveIcon = SECTION_ICON[active];

  return (
    <div className="fe-root">
      {/* Topic header */}
      <header className="fe-header">
        <div className="fe-title-row">
          <h1 className="fe-title">{data.title}</h1>
          <span className="fe-pill" style={{ background: diff.bg, color: diff.color }}>{data.difficulty}</span>
          <span className="fe-pill" style={tier === 'core' ? { background: 'var(--bg-inner)', color: 'var(--text-muted)' } : { background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' }}>{tier === 'core' ? 'Core' : 'Deep dive'}</span>
        </div>
        {data.summary && <p className="fe-summary">{formatText(data.summary)}</p>}
        <div className="fe-chips">
          <NavChipRow label="Prerequisites" items={data.prerequisites} navMap={navMap} onNavigate={onNavigate} />
          <ChipRow label="Core sub-topics" items={data.nestedConcepts} core />
          <NavChipRow label="Related" items={data.relatedConcepts} navMap={navMap} onNavigate={onNavigate} />
        </div>
      </header>

      {/* Section nav */}
      <nav className="fe-nav">
        {available.map(s => {
          const Icon = SECTION_ICON[s.id];
          return (
            <button key={s.id} onClick={() => setActive(s.id)} title={s.description} className={`fe-nav-btn${s.id === active ? ' active' : ''}`}>
              <Icon size={15} /> {s.label}
            </button>
          );
        })}
      </nav>

      {/* Active section panel */}
      <section className="fe-panel">
        <div className="fe-panel-head">
          <div className="fe-panel-icon"><ActiveIcon size={20} /></div>
          <div>
            <h2 className="fe-panel-title">{activeMeta?.label}</h2>
            <p className="fe-panel-desc">{activeMeta?.description}</p>
          </div>
        </div>
        <div className="fe-panel-body animate-fade-in" key={active}>{renderSection()}</div>
      </section>

      {data.keyTakeaways?.length > 0 && (
        <div className="fe-takeaways">
          <p className="fe-block-title" style={{ color: BLUE }}>Key Takeaways</p>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {data.keyTakeaways.map((k, i) => <li key={i}>{formatText(k)}</li>)}
          </ul>
        </div>
      )}

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
