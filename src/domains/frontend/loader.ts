import type { Topic, ConceptDetail, Category } from '../../core/types/types';
import type { FrontendManifest, FrontendTechMeta } from '../../core/types/frontend';

// Frontend technology registry — drives the frontend PathSelection screen.
// `available: true` means content exists; others render as "coming soon".
export const FRONTEND_TECHS: FrontendTechMeta[] = [
  { id: 'react', title: 'React', description: 'Components, hooks, rendering, performance, and patterns — the most-asked frontend framework in interviews.', color: '#06b6d4', available: true, topicCount: 44 },
  { id: 'javascript', title: 'JavaScript', description: 'The language of the web: closures, the event loop, async, prototypes, and the DOM.', color: '#f7df1e', available: true, topicCount: 40 },
  { id: 'typescript', title: 'TypeScript', description: 'Types, interfaces, generics, and utility types for safer frontend code.', color: '#3178c6', available: true, topicCount: 32 },
  { id: 'css', title: 'CSS', description: 'The box model, Flexbox, Grid, responsive design, and animations.', color: '#1572b6', available: true, topicCount: 32 },
  { id: 'nextjs', title: 'Next.js', description: 'Routing, SSR/SSG/ISR, server components, and production deployment.', color: '#a855f7', available: true, topicCount: 30 },
  { id: 'html', title: 'HTML', description: 'Semantic markup, forms, accessibility, and document structure.', color: '#e34f26', available: true, topicCount: 28 },
];

// A minimal ConceptDetail stub. Frontend topics are rendered by the
// FrontendTopicRenderer (not the backend LearnTab), so this is never shown —
// it only satisfies the existing Topic shape used by the Sidebar/App.
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

const manifestCache: Record<string, FrontendManifest | null> = {};

export async function loadFrontendManifest(tech: Category): Promise<FrontendManifest | null> {
  if (tech in manifestCache) return manifestCache[tech];
  try {
    const res = await fetch(`/content/frontend/${tech}/manifest.json`);
    const data = res.ok ? ((await res.json()) as FrontendManifest) : null;
    manifestCache[tech] = data;
    return data;
  } catch {
    manifestCache[tech] = null;
    return null;
  }
}

// Convert manifest entries into Topic-shaped objects for the sidebar/app.
export function manifestToTopics(manifest: FrontendManifest): Topic[] {
  return manifest.topics.map(t => ({
    id: t.id,
    title: t.title,
    category: manifest.tech,
    difficulty: t.difficulty,
    concept: STUB_CONCEPT,
    group: t.group,
  }));
}
