import type { QuestionRegistryEntry, Question } from './types';
import { entry as cloze } from './cloze';
import { entry as match } from './match';
import { entry as order } from './order';
import { entry as mcq } from './mcq';
import { entry as shortAnswer } from './short-answer';

export const QUESTION_REGISTRY: Record<string, QuestionRegistryEntry<Question>> = {
  cloze,
  match,
  order,
  mcq,
  'short-answer': shortAnswer,
};