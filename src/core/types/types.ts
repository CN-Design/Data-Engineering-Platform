export type Category = 'sql' | 'pyspark' | 'python' | 'data-engineering' | 'databricks';
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

export interface InterviewQuestion {
  id: string;
  topicId: string;
  category: Category;
  question: string;
  answer: string;
  difficulty: Difficulty;
}

export interface CodingChallenge {
  id: string;
  topicId: string;
  category: Category;
  title: string;
  question: string;
  type: 'sql' | 'pyspark' | 'python' | 'scenario';
  initialCode: string;
  solutionCode: string;
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
