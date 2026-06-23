import type { Category, Difficulty } from './types';
import type {
  ConceptualInterviewQuestion,
  CodingInterviewQuestion,
} from './types';

// ============================================================
// Frontend learning experience schema (schema: "frontend.v1")
// A section-oriented, visual, project-driven topic format that is
// rendered by FrontendTopicRenderer (separate from the backend
// PremiumTopicRenderer flow).
// ============================================================

export type SandboxMode = 'web' | 'react';

// A self-contained runnable example/lab. `files` is a filename -> source map.
// For mode "web": files may include index.html / styles.css / script.js.
// For mode "react": provide an `App` component in code (default export or a
// top-level `App` function); React/ReactDOM are injected automatically.
export interface SandboxConfig {
  mode: SandboxMode;
  files?: Record<string, string>;
  code?: string; // convenience single-file source (used when files is absent)
  language?: 'html' | 'css' | 'javascript' | 'typescript' | 'jsx' | 'tsx';
  autoRun?: boolean;
  showConsole?: boolean;
  showPreview?: boolean;
}

export interface FoundationsSection {
  overview: string;
  formalDefinition: string;
  whyItMatters: string;
  mentalModel: string;
  browserPerspective: string;
  realWorldUsage: string;
  businessImpact: string;
  engineeringImpact: string;
  performanceImpact: string;
  commonUseCases: string[];
  commonMisconceptions: Array<{ myth: string; reality: string }>;
}

// References a code-split visualization component by id; `config` is passed
// to that component as props. The actual interactive UI lives in code, not JSON.
export interface VisualExplorerItem {
  visualId: string;
  title: string;
  caption?: string;
  config?: Record<string, unknown>;
}

export interface InteractiveExample {
  level: 'beginner' | 'intermediate' | 'advanced' | 'production';
  title: string;
  explanation: string;
  expectedOutput?: string;
  sandbox: SandboxConfig;
}

export interface CodeLabExercise {
  id: string;
  title: string;
  instructions: string;
  sandbox: SandboxConfig; // starter code lives here
  expectedOutput?: string;
  validationId?: string; // assertion suite id (ValidationHarness)
  solution: SandboxConfig;
  hints: string[];
}

export interface DebuggingLabExercise {
  id: string;
  difficulty: Difficulty;
  title: string;
  symptom: string;
  brokenCode: SandboxConfig;
  errorAnalysis: string;
  commonMistakes: string[];
  fixChallenge: string;
  solution: SandboxConfig;
  validationId?: string;
}

// The embedded, topic-scoped interview block reuses the interview schemas.
export interface FrontendInterviewSection {
  theory: ConceptualInterviewQuestion[];
  scenario: ConceptualInterviewQuestion[];
  coding: CodingInterviewQuestion[];
  machineCoding?: CodingInterviewQuestion[];
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
  security: string;
  scaling: string;
  maintainability: string;
  observability: string;
  caseStudies: ProductionCaseStudy[];
}

export interface ProjectStep {
  title: string;
  instructions: string;
  code?: string;
  checkpoint?: string;
}

export interface ProjectBuilderSection {
  projectId: string;
  contributesTo: string;
  summary: string;
  requirements: string[];
  architecture: string;
  folderStructure: string;
  steps: ProjectStep[];
  enhancements: string[];
  interviewQuestions: string[];
}

export interface SubtopicDetail {
  title: string;
  explanation: string;
  example?: string;
}

export interface FrontendTopicData {
  schema: 'frontend.v1';
  id: string;
  tech: Category;
  domain: 'frontend';
  title: string;
  difficulty: Difficulty;
  summary?: string;
  // Knowledge-graph edges (recursive learning / cross-linking).
  // prerequisites & relatedConcepts hold TOPIC IDS (used as clickable links).
  prerequisites?: string[];
  relatedConcepts?: string[];
  // nestedConcepts: short labels shown as scope chips in the header.
  nestedConcepts?: string[];
  // subtopics: the nested concepts explained in detail (expandable in the UI).
  subtopics?: SubtopicDetail[];

  foundations: FoundationsSection;
  visualExplorer?: VisualExplorerItem[];
  interactiveExamples?: InteractiveExample[];
  codeLab?: CodeLabExercise[];
  debuggingLab?: DebuggingLabExercise[];
  interviewPrep?: FrontendInterviewSection;
  productionDeepDive?: ProductionDeepDiveSection;
  projectBuilder?: ProjectBuilderSection;
  keyTakeaways: string[];
}

// Per-technology manifest: drives the sidebar + knowledge graph without
// bundling all topic content. Lives at /content/frontend/<tech>/manifest.json
export interface FrontendManifestTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  group?: string; // e.g. "Hooks", "Fundamentals"
  prerequisites?: string[];
}

export interface FrontendManifest {
  tech: Category;
  title: string;
  description?: string;
  topics: FrontendManifestTopic[];
}

// The 8 frontend learning sections (ordered) for the in-topic nav.
export type FrontendSectionId =
  | 'foundations'
  | 'visualExplorer'
  | 'interactiveExamples'
  | 'codeLab'
  | 'debuggingLab'
  | 'interviewPrep'
  | 'productionDeepDive'
  | 'projectBuilder';

export interface FrontendSectionMeta {
  id: FrontendSectionId;
  label: string;
  description: string;
}

export const FRONTEND_SECTIONS: FrontendSectionMeta[] = [
  { id: 'foundations', label: 'Foundations', description: 'Understand the concept deeply' },
  { id: 'visualExplorer', label: 'Visual Explorer', description: 'See how it works' },
  { id: 'interactiveExamples', label: 'Interactive Examples', description: 'Learn by example' },
  { id: 'codeLab', label: 'Code Lab', description: 'Hands-on coding' },
  { id: 'debuggingLab', label: 'Debugging Lab', description: 'Find and fix bugs' },
  { id: 'interviewPrep', label: 'Interview Prep', description: 'Be interview ready' },
  { id: 'productionDeepDive', label: 'Production Deep Dive', description: 'Real-world engineering' },
  { id: 'projectBuilder', label: 'Project Builder', description: 'Build a portfolio project' },
];

// Frontend technology registry (drives PathSelection + labels).
export interface FrontendTechMeta {
  id: Category;
  title: string;
  description: string;
  color: string;
  available: boolean;
  topicCount?: number;
}
