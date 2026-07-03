import { sqlTopics } from './sql/topics';
import { pysparkTopics } from './pyspark/topics';
import { databricksTopics } from './databricks/topics';
import { deTopics } from './data-engineering/topics';
import { pythonTopics } from './python/topics';
import { foundationsTopics } from './foundations/topics';
import { cloudTopics } from './cloud/topics';
import { streamingTopics } from './streaming/topics';
import { orchestrationTopics } from './orchestration/topics';
import { warehousingTopics } from './warehousing/topics';
import { devopsTopics } from './devops/topics';
import { dataqualityTopics } from './dataquality/topics';
import { sreTopics } from './sre/topics';
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
  foundationsTopics,
  cloudTopics,
  streamingTopics,
  orchestrationTopics,
  warehousingTopics,
  devopsTopics,
  dataqualityTopics,
  sreTopics,
  codingChallenges,
};

export const allTopics = [
  ...foundationsTopics,
  ...deTopics,
  ...sqlTopics,
  ...pythonTopics,
  ...warehousingTopics,
  ...orchestrationTopics,
  ...pysparkTopics,
  ...streamingTopics,
  ...cloudTopics,
  ...devopsTopics,
  ...dataqualityTopics,
  ...sreTopics,
  ...databricksTopics,
];

export const allChallenges = codingChallenges;
