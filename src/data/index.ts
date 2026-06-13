import { sqlTopics } from './sql/topics';
import { sqlQuestions } from './sql/questions';

import { pysparkTopics } from './pyspark/topics';
import { pysparkQuestions } from './pyspark/questions';

import { databricksTopics } from './databricks/topics';
import { databricksQuestions } from './databricks/questions';

import { deTopics } from './data-engineering/topics';
import { deQuestions } from './data-engineering/questions';

import { pythonTopics } from './python/topics';

import { codingChallenges } from './coding_challenges';

export {
  sqlTopics, sqlQuestions,
  pysparkTopics, pysparkQuestions,
  databricksTopics, databricksQuestions,
  deTopics, deQuestions,
  pythonTopics,
  codingChallenges
};

export const allTopics = [
  ...sqlTopics,
  ...pysparkTopics,
  ...databricksTopics,
  ...deTopics,
  ...pythonTopics
];

export const allQuestions = [
  ...sqlQuestions,
  ...pysparkQuestions,
  ...databricksQuestions,
  ...deQuestions
];

export const allChallenges = codingChallenges;
