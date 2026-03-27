import type React from 'react';

export type QuestionType = 'cloze' | 'match' | 'order' | 'mcq' | 'short-answer';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  lessonId?: string;
  unitId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClozeToken {
  id: string;
  text: string;
  isBlank: boolean;
}

export interface ClozeQuestion extends BaseQuestion {
  type: 'cloze';
  sourceText: string;
  tokens: ClozeToken[];
  wordBank: boolean;
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: Array<{ id: string; left: string; right: string }>;
}

export interface OrderQuestion extends BaseQuestion {
  type: 'order';
  items: Array<{ id: string; text: string }>;
}

export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  stem: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }>;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  prompt: string;
  markScheme?: string;
}

export type Question =
  | ClozeQuestion
  | MatchQuestion
  | OrderQuestion
  | McqQuestion
  | ShortAnswerQuestion;

export interface QuestionRegistryEntry<Q extends Question = Question> {
  type: QuestionType;
  label: string;
  icon: string;
  description: string;
  makeDefault: () => Q;
  Editor: React.ComponentType<{ question: Q; onChange: (q: Q) => void }>;
  Renderer: React.ComponentType<{ question: Q }>;
  WorksheetRenderer?: React.ComponentType<{ question: Q; index: number }>;
}