import { sqlTopics } from './sql/topics';
import { pysparkTopics } from './pyspark/topics';
import { databricksTopics } from './databricks/topics';
import { deTopics } from './data-engineering/topics';
import { pythonTopics } from './python/topics';
import { codingChallenges } from './coding_challenges';

// NOTE: Interview Q&A now lives as JSON under public/content/interview/<tech>/
// and is loaded at runtime by InterviewPrepTab, so the old per-topic
// question banks (data/<tech>/questions.ts) are no longer wired in here.

export {
  sqlTopics,
  pysparkTopics,
  databricksTopics,
  deTopics,
  pythonTopics,
  codingChallenges,
};

export const allTopics = [
  ...deTopics,
  ...sqlTopics,
  ...pythonTopics,
  ...pysparkTopics,
  ...databricksTopics,
];

export const allChallenges = codingChallenges;
