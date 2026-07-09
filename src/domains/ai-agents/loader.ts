import type { Topic, ConceptDetail, Category } from '../../core/types/types';
import type { AgentManifest, AiAgentTechMeta } from '../../core/types/aiagents';

// AI Agents technology registry — drives the AI-Agents PathSelection.
// `available: true` means content exists; others render as "coming soon".
export const AI_AGENT_TECHS: AiAgentTechMeta[] = [
  { id: 'agent-foundations', title: 'Agent Foundations', description: 'How LLMs power agents: tokens, context windows, sampling, structured output, and when an agent beats a single call — with interactive playgrounds.', color: '#8b5cf6', available: true, topicCount: 9 },
  { id: 'agent-tools', title: 'Tool Use & Function Calling', description: 'The agent loop from first principles: tool schemas, function calling, ReAct, parallel tools, and loop safety.', color: '#a855f7', available: true, topicCount: 8 },
  { id: 'agent-rag', title: 'Retrieval-Augmented Generation', description: 'Embeddings, chunking, vector search, reranking, grounding & citations, and RAG evaluation.', color: '#ec4899', available: true, topicCount: 10 },
  { id: 'agent-orchestration', title: 'Orchestration & Frameworks', description: 'Agent design patterns, LangGraph state graphs, and the OpenAI Agents SDK.', color: '#6366f1', available: true, topicCount: 8 },
  { id: 'agent-memory', title: 'Memory & State', description: 'Working/episodic/semantic memory, summarization, context engineering, and persistence.', color: '#0ea5e9', available: true, topicCount: 8 },
  { id: 'agent-multi', title: 'Multi-Agent Systems', description: 'Supervisor/worker, handoffs, shared state, and agent communication.', color: '#14b8a6', available: true, topicCount: 8 },
  { id: 'agent-mcp', title: 'MCP & Tool Ecosystems', description: 'The Model Context Protocol, safe tool design, and Anthropic tool use.', color: '#f59e0b', available: true, topicCount: 8 },
  { id: 'agent-eval', title: 'Evaluation & Observability', description: 'Eval harnesses, LLM-as-judge, tracing, and metrics.', color: '#22c55e', available: true, topicCount: 8 },
  { id: 'agent-safety', title: 'Safety, Guardrails & Security', description: 'Prompt injection, validation, sandboxing, and human-in-the-loop.', color: '#ef4444', available: true, topicCount: 8 },
  { id: 'agent-production', title: 'Production & Deployment', description: 'Streaming, caching, routing, cost/latency, and scaling agents.', color: '#f97316', available: true, topicCount: 8 },
];

// Minimal ConceptDetail stub (Topic shape needs it; AI-Agents topics are
// rendered by AiAgentTopicRenderer, so this is never shown).
const STUB_CONCEPT: ConceptDetail = {
  overview: '', bookDefinition: '', simpleExplanation: '', whyItMatters: '', analogy: '',
  useCases: [], diagram: '', detailedExample: { input: '', processing: '', output: '' },
  codeExample: '', stepByStepBreakdown: '', commonMistakes: [], bestPractices: [],
  interviewQuestions: [], scenarioQuestions: [], summaryNotes: [],
  cheatSheet: { definition: '', mostAskedQuestion: '', commonMistake: '', bestPractice: '' },
};

const manifestCache: Record<string, AgentManifest | null> = {};

export async function loadAgentManifest(tech: Category): Promise<AgentManifest | null> {
  if (tech in manifestCache) return manifestCache[tech];
  try {
    const res = await fetch(`/content/ai-agents/${tech}/manifest.json`);
    const data = res.ok ? ((await res.json()) as AgentManifest) : null;
    manifestCache[tech] = data;
    return data;
  } catch {
    manifestCache[tech] = null;
    return null;
  }
}

export function manifestToTopics(manifest: AgentManifest): Topic[] {
  return manifest.topics.map(t => ({
    id: t.id,
    title: t.title,
    category: manifest.tech,
    difficulty: t.difficulty,
    concept: STUB_CONCEPT,
    group: t.group,
  }));
}
