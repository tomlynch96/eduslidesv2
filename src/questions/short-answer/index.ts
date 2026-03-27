import { nanoid } from 'nanoid';
import type { ShortAnswerQuestion, QuestionRegistryEntry } from '../types';
import { ShortAnswerEditor } from './Editor';
import { ShortAnswerRenderer } from './Renderer';

export const makeDefault = (): ShortAnswerQuestion => ({
  id: nanoid(),
  type: 'short-answer',
  prompt: 'Explain in your own words...',
  markScheme: '',
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const entry: QuestionRegistryEntry<ShortAnswerQuestion> = {
  type: 'short-answer',
  label: 'Short answer',
  icon: '✏️',
  description: 'Free-writing prompt',
  makeDefault,
  Editor: ShortAnswerEditor,
  Renderer: ShortAnswerRenderer,
};