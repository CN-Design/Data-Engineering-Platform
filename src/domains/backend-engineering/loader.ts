import type { Topic, ConceptDetail, Category } from '../../core/types/types';
import type { BackendManifest, BackendTechMeta } from '../../core/types/backend';

// Backend Engineering technology registry — drives the backend PathSelection.
// `available: true` means content exists; others render as "coming soon".
export const BACKEND_TECHS: BackendTechMeta[] = [
  { id: 'golang', title: 'Go (Golang)', description: 'Master Go from first principles to production: types, interfaces, goroutines, channels, generics, and concurrent system design — with interactive checkpoints, a code lab, and full technical + coding interview prep.', color: '#00ADD8', available: true, topicCount: 76 },
  { id: 'python', title: 'Python', description: 'Backend Python: data model, typing, async, packaging, and web services. Coming soon.', color: '#ffd43b', available: false },
  { id: 'java', title: 'Java', description: 'JVM internals, collections, concurrency, Spring, and system design. Coming soon.', color: '#f89820', available: false },
];

// A minimal ConceptDetail stub. Backend topics are rendered by the
// BackendTopicRenderer (not the data-engineering LearnTab), so this is never
// shown — it only satisfies the existing Topic shape used by Sidebar/App.
const STUB_CONCEPT: ConceptDetail = {
  overview: '',
  bookDefinition: '',
  simpleExplanation: '',
  whyItMatters: '',
  analogy: '',
  useCases: [],
  diagram: '',
  detailedExample: { input: '', processing: '', output: '' },
  codeExample: '',
  stepByStepBreakdown: '',
  commonMistakes: [],
  bestPractices: [],
  interviewQuestions: [],
  scenarioQuestions: [],
  summaryNotes: [],
  cheatSheet: { definition: '', mostAskedQuestion: '', commonMistake: '', bestPractice: '' },
};

const manifestCache: Record<string, BackendManifest | null> = {};

export async function loadBackendManifest(tech: Category): Promise<BackendManifest | null> {
  if (tech in manifestCache) return manifestCache[tech];
  try {
    const res = await fetch(`/content/backend/${tech}/manifest.json`);
    const data = res.ok ? ((await res.json()) as BackendManifest) : null;
    manifestCache[tech] = data;
    return data;
  } catch {
    manifestCache[tech] = null;
    return null;
  }
}

// Convert manifest entries into Topic-shaped objects for the sidebar/app.
export function manifestToTopics(manifest: BackendManifest): Topic[] {
  return manifest.topics.map(t => ({
    id: t.id,
    title: t.title,
    category: manifest.tech,
    difficulty: t.difficulty,
    concept: STUB_CONCEPT,
    group: t.group,
  }));
}
