import { nanoid } from 'nanoid';
import type { McqQuestion, QuestionRegistryEntry } from '../types';
import { McqEditor } from './Editor';
import { McqRenderer } from './Renderer';
import { McqWorksheetRenderer } from './WorksheetRenderer';

export const makeDefault = (): McqQuestion => ({
  id: nanoid(),
  type: 'mcq',
  stem: 'Which of the following are correct?',
  options: [
    { id: nanoid(), text: 'Option A', isCorrect: true },
    { id: nanoid(), text: 'Option B', isCorrect: false },
    { id: nanoid(), text: 'Option C', isCorrect: false },
  ],
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const entry: QuestionRegistryEntry<McqQuestion> = {
  type: 'mcq',
  label: 'Multiple choice',
  icon: '☑️',
  description: 'Stem with one or more correct options',
  makeDefault,
  Editor: McqEditor,
  Renderer: McqRenderer,
  WorksheetRenderer: McqWorksheetRenderer,
};