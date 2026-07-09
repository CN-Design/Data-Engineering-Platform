import type { Category, Difficulty, ConceptualInterviewQuestion, CodingInterviewQuestion } from './types';
import type { Checkpoint } from './backend';

// ============================================================
// AI Agents learning schema (schema: "agent.v1")
// Reuses the proven section-oriented lesson format, adds:
//  - `archetype`      → drives ADAPTIVE sections (no forced repetition)
//  - `interactiveWidget` → a stateful, animated agent widget (mock-driven,
//                          fully client-side, no API keys / no backend)
// Code is Python-first, provider-agnostic. Rendered by AiAgentTopicRenderer.
// ============================================================

export type AgentArchetype = 'concept' | 'pattern' | 'hands-on' | 'framework' | 'system-design';

export interface AgentCode {
  language: 'python' | 'bash' | 'text' | 'json';
  code: string;
  caption?: string;
  expectedOutput?: string;
  editable?: boolean;
  solution?: string;
}

export interface AgentFoundations {
  overview: string;
  formalDefinition?: string;
  whyItMatters?: string;
  mentalModel?: string;
  realWorldUsage?: string;
  businessImpact?: string;
  engineeringImpact?: string;
  performanceImpact?: string;
  commonUseCases?: string[];
  commonMisconceptions?: Array<{ myth: string; reality: string }>;
}

// Reference to a stateful widget in the agent-widget registry; `config` is
// passed to the component. Everything runs on canned/mock data.
export interface AgentWidgetRef {
  widgetId: string;
  title: string;
  caption?: string;
  config?: Record<string, unknown>;
}

export interface AgentExample {
  level: 'beginner' | 'intermediate' | 'advanced' | 'production';
  title: string;
  explanation: string;
  code: AgentCode;
}

export interface AgentCodeLabExercise {
  id: string;
  title: string;
  instructions: string;
  starter: AgentCode;
  solution: AgentCode;
  testHarness?: string;
  expectedOutput?: string;
  hints: string[];
}

export interface AgentDebuggingExercise {
  id: string;
  difficulty: Difficulty;
  title: string;
  symptom: string;
  brokenCode: AgentCode;
  errorAnalysis: string;
  commonMistakes: string[];
  fixChallenge: string;
  solution: AgentCode;
}

export interface AgentInterviewSection {
  theory: ConceptualInterviewQuestion[];
  scenario: ConceptualInterviewQuestion[];
  coding: CodingInterviewQuestion[];
  systemDesign?: ConceptualInterviewQuestion[];
}

export interface AgentProductionDeepDive {
  architecture: string;
  performance: string;
  reliability: string;
  observability: string;
  security: string;
  cost: string;
  caseStudies: Array<{ company: string; problem: string; solution: string; tradeoffs: string; lessons: string }>;
}

export interface AgentSubtopic {
  title: string;
  explanation: string;
  example?: string; // Python snippet
}

export interface AgentTopicData {
  schema: 'agent.v1';
  id: string;
  tech: Category;
  domain: 'ai-agents';
  title: string;
  difficulty: Difficulty;
  archetype: AgentArchetype;
  summary?: string;
  prerequisites?: string[];
  relatedConcepts?: string[];
  nestedConcepts?: string[];
  subtopics?: AgentSubtopic[];

  foundations: AgentFoundations;
  interactiveWidget?: AgentWidgetRef;
  interactiveExamples?: AgentExample[];
  checkpoints?: Checkpoint[];
  codeLab?: AgentCodeLabExercise[];
  debuggingLab?: AgentDebuggingExercise[];
  interviewPrep?: AgentInterviewSection;
  productionDeepDive?: AgentProductionDeepDive;
  keyTakeaways: string[];
}

// ---- manifest + tech registry ----
export interface AgentManifestTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  archetype?: AgentArchetype;
  group?: string;
  prerequisites?: string[];
}

export interface AgentManifest {
  tech: Category;
  title: string;
  description?: string;
  topics: AgentManifestTopic[];
}

export type AgentSectionId =
  | 'foundations'
  | 'interactiveWidget'
  | 'interactiveExamples'
  | 'checkpoints'
  | 'codeLab'
  | 'debuggingLab'
  | 'interviewPrep'
  | 'productionDeepDive';

export interface AgentSectionMeta { id: AgentSectionId; label: string; description: string; }

export const AGENT_SECTIONS: AgentSectionMeta[] = [
  { id: 'foundations', label: 'Foundations', description: 'Understand the concept deeply' },
  { id: 'interactiveWidget', label: 'Interactive', description: 'Play with it — watch it run' },
  { id: 'interactiveExamples', label: 'Examples', description: 'Learn by reading & editing Python' },
  { id: 'checkpoints', label: 'Checkpoints', description: 'Test yourself as you go' },
  { id: 'codeLab', label: 'Code Lab', description: 'Hands-on coding' },
  { id: 'debuggingLab', label: 'Debugging Lab', description: 'Find and fix real bugs' },
  { id: 'interviewPrep', label: 'Interview Prep', description: 'Technical + coding rounds' },
  { id: 'productionDeepDive', label: 'Production', description: 'Ship it for real' },
];

export interface AiAgentTechMeta {
  id: Category;
  title: string;
  description: string;
  color: string;
  available: boolean;
  topicCount?: number;
}
