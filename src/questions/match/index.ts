import { nanoid } from 'nanoid';
import type { MatchQuestion, QuestionRegistryEntry } from '../types';
import { MatchEditor } from './Editor';
import { MatchRenderer } from './Renderer';
import { MatchWorksheetRenderer } from './WorksheetRenderer';

export const makeDefault = (): MatchQuestion => ({
  id: nanoid(),
  type: 'match',
  pairs: [
    { id: nanoid(), left: 'Kinetic energy', right: 'Energy of movement' },
    { id: nanoid(), left: 'Potential energy', right: 'Stored energy' },
    { id: nanoid(), left: 'Thermal energy', right: 'Energy from heat' },
  ],
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const entry: QuestionRegistryEntry<MatchQuestion> = {
  type: 'match',
  label: 'Match up',
  icon: '🔗',
  description: 'Connect pairs of items',
  makeDefault,
  Editor: MatchEditor,
  Renderer: MatchRenderer,
  WorksheetRenderer: MatchWorksheetRenderer,
};