import { nanoid } from 'nanoid';
import type { ClozeQuestion, QuestionRegistryEntry } from '../types';
import { ClozeEditor } from './Editor';
import { ClozeRenderer } from './Renderer';
import { ClozeWorksheetRenderer } from './WorksheetRenderer';

export function tokenise(text: string): ClozeQuestion['tokens'] {
  return text
    .split(/(\s+)/)
    .filter((t) => t.trim().length > 0)
    .map((t) => ({ id: nanoid(), text: t, isBlank: false }));
}

export const makeDefault = (): ClozeQuestion => ({
  id: nanoid(),
  type: 'cloze',
  sourceText: 'Energy cannot be created or destroyed, only transferred or stored.',
  tokens: tokenise('Energy cannot be created or destroyed, only transferred or stored.'),
  wordBank: true,
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const entry: QuestionRegistryEntry<ClozeQuestion> = {
  type: 'cloze',
  label: 'Fill in the blanks',
  icon: '🔡',
  description: 'Click words to blank them',
  makeDefault,
  Editor: ClozeEditor,
  Renderer: ClozeRenderer,
  WorksheetRenderer: ClozeWorksheetRenderer,
};