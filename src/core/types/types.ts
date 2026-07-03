// Backend / data-engineering technologies.
export type BackendCategory = 'sql' | 'pyspark' | 'python' | 'data-engineering' | 'databricks' | 'golang' | 'java' | 'foundations' | 'cloud' | 'streaming' | 'orchestration' | 'warehousing' | 'devops' | 'dataquality' | 'sre';

// Frontend technologies (the frontend domain). Kept broad so future content
// slots in without further type changes.
export type FrontendCategory =
  | 'html'
  | 'css'
  | 'tailwind'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'nextjs'
  | 'state-management'
  | 'api-integration'
  | 'authentication'
  | 'forms'
  | 'testing'
  | 'performance'
  | 'frontend-security'
  | 'accessibility'
  | 'frontend-architecture'
  | 'design-systems'
  | 'frontend-system-design'
  | 'build-tools'
  | 'deployment'
  | 'internet-fundamentals';

// Category is the union of every technology id across all domains.
export type Category = BackendCategory | FrontendCategory;

// Top-level learning domains.
export type Domain = 'data-engineering' | 'frontend' | 'backend-engineering';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

export interface ConceptDetail {
  overview: string;
  bookDefinition: string;
  simpleExplanation: string;
  whyItMatters: string;
  analogy: string;
  useCases: string[];
  diagram: string;
  detailedExample: {
    input: string;
    processing: string;
    output: string;
  };
  codeExample: string;
  stepByStepBreakdown: string;
  commonMistakes: string[];
  bestPractices: string[];
  interviewQuestions: Array<{
    question: string;
    answer: string;
    whyAsked: string;
    wrongAnswer: string;
    difficulty: Difficulty;
  }>;
  scenarioQuestions: Array<{
    question: string;
    solution: string;
  }>;
  summaryNotes: string[];
  cheatSheet: {
    definition: string;
    mostAskedQuestion: string;
    commonMistake: string;
    bestPractice: string;
  };
}

export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  concept: ConceptDetail;
  // Optional curriculum group (e.g. "Hooks", "Fundamentals") used by the
  // sidebar for frontend topics; backend topics omit it and group by difficulty.
  group?: string;
}

export interface PremiumTopicData {
  coreConcept: {
    overview: string[];
    learningObjectives: string[];
    formalDefinition: string;
    simpleExplanation: string;
    historicalContext: string;
    whyItMatters: { business: string; engineering: string; scalability: string; cost: string; reliability: string };
    coreComponents: Array<{ name: string; definition: string; purpose: string; responsibilities: string; examples: string }>;
    internalWorking: string[];
    architectureFlow: string;
    dataFlowWalkthrough: string[];
    keyTerminology: Array<{ term: string; meaning: string; importance: string }>;
    importantConcepts: Array<{ concept: string; explanation: string }>;
    variationsAndTypes: string[];
    advantages: string[];
    disadvantages: string[];
    tradeOffs: { whenToUse: string; whenToAvoid: string };
    realWorldAnalogy: string;
    commonMisconceptions: Array<{ myth: string; reality: string }>;
    productionConsiderations: { scalability: string; reliability: string; faultTolerance: string; monitoring: string; security: string; costOptimization: string; performance: string };
  };
  practicalImplementation: {
    codeExamples: Array<{ title: string; overview: string; code: string; language: string; breakdown: string; expectedOutput: string; commonIssues: string; optimizationTips: string }>;
  };
  endToEndExample: {
    businessProblem: string;
    inputData: string;
    architecture: string;
    processingSteps: string[];
    output: string;
    monitoring: string;
    errorHandling: string;
    finalResult: string;
  };
  industryUseCases: Array<{ company: string; problem: string; solution: string; benefits: string }>;
  productionDeepDive: {
    scalability: string;
    faultTolerance: string;
    highAvailability: string;
    disasterRecovery: string;
    performanceOptimization: string;
    costOptimization: string;
    securityConsiderations: string;
    monitoringAndObservability: string;
    dataQualityValidation: string;
    loggingAndAlerting: string;
  };
  bestPractices: {
    recommendedPractices: string[];
    engineeringStandards: string[];
    designRecommendations: string[];
    namingConventions: string[];
    documentationStandards: string[];
    testingStrategies: string[];
  };
  commonMistakes: Array<{ mistake: string; whyItHappens: string; impact: string; correctApproach: string }>;
  comparisonSection: Array<{ feature: string; optionA: string; optionB: string; explanation: string }>;
  interviewPreparation: {
    beginnerQuestions: Array<{ question: string; answer: string; explanation: string }>;
    intermediateQuestions: Array<{ question: string; answer: string; explanation: string }>;
    advancedQuestions: Array<{ question: string; answer: string; explanation: string }>;
    scenarioBasedQuestions: Array<{ scenario: string; thinkingProcess: string; expectedAnswer: string }>;
    systemDesignQuestions: Array<{ problemStatement: string; designApproach: string; tradeOffs: string; scalingStrategy: string }>;
    followUpQuestions: string[];
  };
  cheatSheet: {
    oneLineDefinition: string;
    keyConcepts: string[];
    formulas: string[];
    commands: string[];
    interviewPoints: string[];
    quickNotes: string[];
  };
  keyTakeaways: string[];
}

// ============================================================
// Progressive Projects (build-along ladder) types — DE domain
// ============================================================

export interface DeProjectMilestone {
  id: string;
  title: string;
  goal: string;
  tasks: string[];
  acceptanceCriteria: string[];
  hints: string[];
  deliverable: string;
}

export interface DeProject {
  id: string;
  order: number;
  title: string;
  tagline: string;
  level: Difficulty;
  estimatedTime: string;
  summary: string;
  scenario: string;
  learningGoals: string[];
  skillsDemonstrated: string[];
  techStack: string[];
  prerequisites: string[];
  datasetDescription: string;
  // Data-flow description using "->" arrows for the flow diagram renderer.
  architectureFlow: string;
  // Suggested repository layout (tree text).
  repoStructure: string;
  milestones: DeProjectMilestone[];
  productionChecklist: string[];
  stretchGoals: string[];
  portfolioTips: string;
  // Learn tracks this project builds on / reinforces.
  relatedTechs: Category[];
}

export interface InterviewQuestion {
  id: string;
  topicId: string;
  category: Category;
  question: string;
  answer: string;
  difficulty: Difficulty;
}

// Objective, auto-graded multiple-choice question for a topic's Self-Check.
// Loaded at runtime from /content/quiz/<tech>/<topicId>.json.
export interface McqQuestion {
  id: string;
  question: string;
  options: string[];      // 3–4 choices
  correctIndex: number;   // index into options
  explanation: string;    // shown after answering
}

// Animated, narrated topic explainer ("60-second video"). A data-driven script
// rendered by ExplainerPlayer from a fixed set of scene templates. Loaded at
// runtime from /content/explainer/<tech>/<topicId>.json.
export type ExplainerTemplate = 'title' | 'bullets' | 'flow' | 'compare' | 'code' | 'callout';

export interface ExplainerScene {
  template: ExplainerTemplate;
  narration?: string;   // spoken + shown as caption
  seconds?: number;     // auto-advance duration (default 5)
  icon?: string;        // optional emoji/glyph accent
  accent?: string;      // optional hex accent color (else auto-cycled)
  kicker?: string;      // optional small uppercase label above the headline
  tag?: string;         // callout pill label (e.g., "Remember")
  // template-specific fields (all optional; the renderer uses what's relevant)
  headline?: string;
  subtitle?: string;
  items?: string[];                                   // bullets
  nodes?: string[];                                   // flow
  columns?: { title: string; points: string[] }[];   // compare
  code?: string;                                      // code
  lang?: string;                                      // code language label
  text?: string;                                      // callout
  tone?: 'good' | 'bad' | 'neutral';                  // callout
}

export interface ExplainerScript {
  topicId: string;
  title: string;
  scenes: ExplainerScene[];
}

export interface CodingChallenge {
  id: string;
  topicId: string;
  category: Category;
  title: string;
  question: string;
  type: 'sql' | 'pyspark' | 'python' | 'data-engineering' | 'golang' | 'scenario' | 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'nextjs';
  // Optional DE practice track (e.g. "Build-a-DAG", "dbt Model",
  // "Fix-the-Pipeline", "Optimize Spark") used by the Practice tab's track filter.
  track?: string;
  // When false, the challenge is declarative/environment-bound (Airflow DAG, dbt
  // model) and cannot execute in-browser — the runner shows reference guidance
  // instead of attempting to run. Defaults to true (runnable) when omitted.
  runnable?: boolean;
  initialCode: string;
  solutionCode: string;
  // Frontend challenges: optional multi-file starter and assertion-based grading.
  files?: Record<string, string>;
  validationId?: string;
  previewMode?: 'web' | 'react';
  testCases?: { input: any; expected: any }[];
  schema?: string;
  setupSql?: string;
  pysparkSetup?: string;
  hint?: string;
  difficulty: ChallengeDifficulty;
  exampleInput: string;
  exampleOutput: string;
  constraints: string;
  hints: string[];
  bruteForce: string;
  optimized: string;
  complexity: {
    time: string;
    space: string;
  };
  discussion: {
    whyAsked: string;
    mistakes: string;
    followUps: string[];
  };
}

// ============================================================
// Interview Prep (tech-scoped, category-based) types
// ============================================================

// The 8 interview categories (tech-based, not topic-based).
export type InterviewCategory =
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'scenario'
  | 'production'
  | 'architecture'
  | 'optimization'
  | 'coding'
  | 'behavioral'
  | 'systemdesign'
  | 'takehome';

export interface InterviewFollowUp {
  question: string;
  answer: string;
}

export interface InterviewNestedTopic {
  title: string;
  explanation: string;
}

// Conceptual questions: basic, intermediate, advanced, scenario,
// production, architecture, optimization.
export interface ConceptualInterviewQuestion {
  id: string;
  tech: Category;
  category: Exclude<InterviewCategory, 'coding'>;
  difficulty: Difficulty;
  question: string;
  // A concise answer the candidate can speak directly in the interview.
  directAnswer: string;
  // Plain-language explanation of the concept.
  detailedExplanation: {
    whatItIs: string;
    whyItExists: string;
    howItWorks: string;
  };
  // Business / engineering relevance.
  whyImportant: string;
  // Optional — only when an example improves understanding.
  realWorldExample?: string;
  // Important subtopics explained automatically alongside the answer.
  nestedTopics: InterviewNestedTopic[];
  // Likely follow-up questions, each with a full answer.
  followUps: InterviewFollowUp[];
  tags?: string[];
}

// Coding questions: shown as question first, answer revealed on demand.
export interface CodingInterviewQuestion {
  id: string;
  tech: Category;
  category: 'coding';
  difficulty: Difficulty;
  question: string;
  // How an interviewer expects the candidate to reason about the problem.
  thoughtProcess: string;
  solution: {
    code: string;
    language: string;
  };
  // Explanation of every important line.
  lineByLine: string;
  timeComplexity: string;
  spaceComplexity: string;
  alternativeApproaches: Array<{
    title: string;
    explanation: string;
    code?: string;
  }>;
  followUps: InterviewFollowUp[];
  tags?: string[];
}

export type InterviewPrepQuestion = ConceptualInterviewQuestion | CodingInterviewQuestion;

// Ordered category metadata for the Interview Prep tab navigation.
export interface InterviewCategoryMeta {
  id: InterviewCategory;
  label: string;
  description: string;
}

export const INTERVIEW_CATEGORIES: InterviewCategoryMeta[] = [
  { id: 'basic', label: 'Basic', description: 'Fundamental concepts' },
  { id: 'intermediate', label: 'Intermediate', description: 'Practical concepts used in projects' },
  { id: 'advanced', label: 'Advanced', description: 'Senior-level discussions' },
  { id: 'scenario', label: 'Scenario-Based', description: 'Real interview scenarios' },
  { id: 'production', label: 'Production Support', description: 'Support & troubleshooting' },
  { id: 'architecture', label: 'Architecture', description: 'System design & large-scale' },
  { id: 'optimization', label: 'Optimization', description: 'Performance tuning' },
  { id: 'coding', label: 'Coding', description: 'Coding interview questions' },
  { id: 'behavioral', label: 'Behavioral', description: 'STAR stories, ownership, conflict & on-call' },
  { id: 'systemdesign', label: 'System Design', description: 'DE design framework & end-to-end platform problems' },
  { id: 'takehome', label: 'Take-Home & Machine Coding', description: 'Realistic assignments & live build tasks' },
];
