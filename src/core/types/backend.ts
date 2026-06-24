import type { Category, Difficulty } from './types';
import type {
  ConceptualInterviewQuestion,
  CodingInterviewQuestion,
} from './types';

// ============================================================
// Backend Engineering learning experience schema (schema: "backend.v1")
// A section-oriented, interactive, interview-focused topic format rendered
// by BackendTopicRenderer. Distinct from the data-engineering Premium flow
// and the frontend.v1 flow. Designed for languages like Go (and later
// Python / Java). Theme-consistent (uses the app's dark/light CSS vars).
//
// NOTE on execution: backend languages (Go) cannot run in the browser, so
// code blocks are DISPLAY + EDIT (Monaco) + REVEAL, and engagement comes
// from interactive `checkpoints` (predict-output / mcq / spot-the-bug /
// fill-blank) plus a shipped local `go test` harness.
// ============================================================

// A Go (or other backend-language) code block. Not executed in-browser.
export interface BackendCode {
  language: 'go' | 'bash' | 'text';
  code: string;
  // Optional caption / what this snippet demonstrates.
  caption?: string;
  // The output the program would print when run locally.
  expectedOutput?: string;
  // If true, render in an editable Monaco editor with a "Reveal Solution".
  editable?: boolean;
  // Hidden reference solution revealed on demand (used with editable starters).
  solution?: string;
}

export interface FoundationsSection {
  overview: string;
  formalDefinition: string;
  whyItMatters: string;
  mentalModel: string;
  // How the Go runtime/compiler treats this concept (analog of the frontend
  // "browserPerspective").
  runtimePerspective: string;
  realWorldUsage: string;
  businessImpact: string;
  engineeringImpact: string;
  performanceImpact: string;
  commonUseCases: string[];
  commonMisconceptions: Array<{ myth: string; reality: string }>;
}

// References a code-split visualization component by id; `config` is passed
// to that component as props. The interactive UI lives in code, not JSON.
export interface VisualExplorerItem {
  visualId: string;
  title: string;
  caption?: string;
  config?: Record<string, unknown>;
}

// A worked, editable example. Not executed; expectedOutput shows the result.
export interface InteractiveExample {
  level: 'beginner' | 'intermediate' | 'advanced' | 'production';
  title: string;
  explanation: string;
  code: BackendCode;
}

// ---- Interactive checkpoints (the engagement layer) ----
// Each is a small, self-grading widget rendered inline in the lesson.
export type Checkpoint =
  | {
      kind: 'predict-output';
      prompt: string;
      code: string; // Go snippet to reason about
      options: string[];
      answerIndex: number;
      explanation: string;
    }
  | {
      kind: 'mcq';
      prompt: string;
      code?: string; // optional code context
      options: string[];
      answerIndex: number;
      explanation: string;
    }
  | {
      kind: 'spot-the-bug';
      prompt: string;
      code: string; // Go snippet containing a bug
      options: string[]; // candidate explanations of the bug
      answerIndex: number;
      explanation: string;
    }
  | {
      kind: 'fill-blank';
      prompt: string;
      codeBefore: string; // code shown before the blank
      codeAfter: string; // code shown after the blank
      options: string[]; // candidate fillers
      answerIndex: number;
      explanation: string;
    };

export interface CodeLabExercise {
  id: string;
  title: string;
  instructions: string;
  starter: BackendCode; // starter code (editable)
  solution: BackendCode; // reference solution
  // A runnable table-driven `go test` snippet the learner can copy to verify
  // locally (the app does not execute Go).
  testHarness?: string;
  expectedOutput?: string;
  hints: string[];
}

export interface DebuggingLabExercise {
  id: string;
  difficulty: Difficulty;
  title: string;
  symptom: string;
  brokenCode: BackendCode;
  errorAnalysis: string;
  commonMistakes: string[];
  fixChallenge: string;
  solution: BackendCode;
}

// The embedded, topic-scoped interview block reuses the interview schemas.
export interface BackendInterviewSection {
  theory: ConceptualInterviewQuestion[];
  scenario: ConceptualInterviewQuestion[];
  coding: CodingInterviewQuestion[];
  systemDesign?: ConceptualInterviewQuestion[];
}

export interface ProductionCaseStudy {
  company: string;
  problem: string;
  solution: string;
  tradeoffs: string;
  lessons: string;
}

export interface ProductionDeepDiveSection {
  architecture: string;
  performance: string;
  concurrency: string;
  reliability: string;
  observability: string;
  security: string;
  caseStudies: ProductionCaseStudy[];
}

export interface SubtopicDetail {
  title: string;
  explanation: string;
  example?: string; // optional Go snippet
}

export interface BackendTopicData {
  schema: 'backend.v1';
  id: string;
  tech: Category;
  domain: 'backend-engineering';
  title: string;
  difficulty: Difficulty;
  summary?: string;
  // Knowledge-graph edges. prerequisites & relatedConcepts hold TOPIC IDS.
  prerequisites?: string[];
  relatedConcepts?: string[];
  // nestedConcepts: short labels shown as scope chips in the header.
  nestedConcepts?: string[];
  // subtopics: nested concepts explained in detail (expandable in the UI).
  subtopics?: SubtopicDetail[];

  foundations: FoundationsSection;
  visualExplorer?: VisualExplorerItem[];
  interactiveExamples?: InteractiveExample[];
  checkpoints?: Checkpoint[];
  codeLab?: CodeLabExercise[];
  debuggingLab?: DebuggingLabExercise[];
  interviewPrep?: BackendInterviewSection;
  productionDeepDive?: ProductionDeepDiveSection;
  keyTakeaways: string[];
}

// Per-technology manifest. Lives at /content/backend/<tech>/manifest.json
export interface BackendManifestTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  group?: string; // e.g. "Fundamentals", "Concurrency", "Mastery"
  prerequisites?: string[];
}

export interface BackendManifest {
  tech: Category;
  title: string;
  description?: string;
  topics: BackendManifestTopic[];
}

// The ordered in-topic learning sections.
export type BackendSectionId =
  | 'foundations'
  | 'visualExplorer'
  | 'interactiveExamples'
  | 'checkpoints'
  | 'codeLab'
  | 'debuggingLab'
  | 'interviewPrep'
  | 'productionDeepDive';

export interface BackendSectionMeta {
  id: BackendSectionId;
  label: string;
  description: string;
}

export const BACKEND_SECTIONS: BackendSectionMeta[] = [
  { id: 'foundations', label: 'Foundations', description: 'Understand the concept deeply' },
  { id: 'visualExplorer', label: 'Visual Explorer', description: 'See how it works under the hood' },
  { id: 'interactiveExamples', label: 'Interactive Examples', description: 'Learn by reading & editing Go' },
  { id: 'checkpoints', label: 'Checkpoints', description: 'Test yourself as you go' },
  { id: 'codeLab', label: 'Code Lab', description: 'Hands-on coding with a test harness' },
  { id: 'debuggingLab', label: 'Debugging Lab', description: 'Find and fix real bugs' },
  { id: 'interviewPrep', label: 'Interview Prep', description: 'Technical + coding rounds' },
  { id: 'productionDeepDive', label: 'Production Deep Dive', description: 'Real-world engineering' },
];

// Backend technology registry (drives PathSelection + labels).
export interface BackendTechMeta {
  id: Category;
  title: string;
  description: string;
  color: string;
  available: boolean;
  topicCount?: number;
}
