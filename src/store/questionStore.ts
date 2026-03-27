import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question } from '../questions/types';
import { nanoid } from 'nanoid';

interface QuestionStore {
  questions: Question[];
  addQuestion: (q: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateQuestion: (q: Question) => void;
  removeQuestion: (id: string) => void;
  getQuestion: (id: string) => Question | undefined;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: [],

      addQuestion: (data) => {
        const id = nanoid();
        const now = new Date().toISOString();
        const question = { ...data, id, createdAt: now, updatedAt: now } as Question;
        set((s) => ({ questions: [...s.questions, question] }));
        return id;
      },

      updateQuestion: (q) => {
        set((s) => ({
          questions: s.questions.map((existing) =>
            existing.id === q.id ? { ...q, updatedAt: new Date().toISOString() } : existing
          ),
        }));
      },

      removeQuestion: (id) => {
        set((s) => ({ questions: s.questions.filter((q) => q.id !== id) }));
      },

      getQuestion: (id) => get().questions.find((q) => q.id === id),
    }),
    { name: 'question-store-v3' }
  )
);