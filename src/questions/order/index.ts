import { nanoid } from 'nanoid';
import type { OrderQuestion, QuestionRegistryEntry } from '../types';
import { OrderEditor } from './Editor';
import { OrderRenderer } from './Renderer';

export const makeDefault = (): OrderQuestion => ({
  id: nanoid(),
  type: 'order',
  items: [
    { id: nanoid(), text: 'First step' },
    { id: nanoid(), text: 'Second step' },
    { id: nanoid(), text: 'Third step' },
  ],
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const entry: QuestionRegistryEntry<OrderQuestion> = {
  type: 'order',
  label: 'Put in order',
  icon: '🔢',
  description: 'Arrange items in the correct sequence',
  makeDefault,
  Editor: OrderEditor,
  Renderer: OrderRenderer,
};