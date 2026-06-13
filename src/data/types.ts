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
