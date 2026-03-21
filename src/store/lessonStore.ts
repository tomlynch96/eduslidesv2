import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonPlan, Slide, Block } from '../types';
import { nanoid } from 'nanoid';

interface LessonStore {
  lessons: LessonPlan[];
  activeLessonId: string | null;

  // Lesson actions
  createLesson: (data: Omit<LessonPlan, 'id' | 'slides' | 'createdAt' | 'updatedAt'>) => string;
  setActiveLesson: (id: string) => void;
  getActiveLesson: () => LessonPlan | undefined;

  // Slide actions
  addSlide: (lessonId: string) => void;
  removeSlide: (lessonId: string, slideId: string) => void;
  reorderSlides: (lessonId: string, slideIds: string[]) => void;

  // Block actions
  addBlock: (lessonId: string, slideId: string, block: Block) => void;
  updateBlock: (lessonId: string, slideId: string, block: Block) => void;
  removeBlock: (lessonId: string, slideId: string, blockId: string) => void;
}

const makeEmptySlide = (): Slide => ({
  id: nanoid(),
  blocks: [],
});

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      lessons: [],
      activeLessonId: null,

      createLesson: (data) => {
        const id = nanoid();
        const now = new Date().toISOString();
        const lesson: LessonPlan = {
          ...data,
          id,
          slides: [makeEmptySlide()],
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ lessons: [...s.lessons, lesson] }));
        return id;
      },

      setActiveLesson: (id) => set({ activeLessonId: id }),

      getActiveLesson: () => {
        const { lessons, activeLessonId } = get();
        return lessons.find((l) => l.id === activeLessonId);
      },

      addSlide: (lessonId) => {
        set((s) => ({
          lessons: s.lessons.map((l) =>
            l.id === lessonId
              ? { ...l, slides: [...l.slides, makeEmptySlide()], updatedAt: new Date().toISOString() }
              : l
          ),
        }));
      },

      removeSlide: (lessonId, slideId) => {
        set((s) => ({
          lessons: s.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  slides: l.slides.length > 1 ? l.slides.filter((sl) => sl.id !== slideId) : l.slides,
                  updatedAt: new Date().toISOString(),
                }
              : l
          ),
        }));
      },

      reorderSlides: (lessonId, slideIds) => {
        set((s) => ({
          lessons: s.lessons.map((l) => {
            if (l.id !== lessonId) return l;
            const ordered = slideIds.map((id) => l.slides.find((sl) => sl.id === id)!).filter(Boolean);
            return { ...l, slides: ordered, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      addBlock: (lessonId, slideId, block) => {
        set((s) => ({
          lessons: s.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  slides: l.slides.map((sl) =>
                    sl.id === slideId ? { ...sl, blocks: [...sl.blocks, block] } : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : l
          ),
        }));
      },

      updateBlock: (lessonId, slideId, block) => {
        set((s) => ({
          lessons: s.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  slides: l.slides.map((sl) =>
                    sl.id === slideId
                      ? { ...sl, blocks: sl.blocks.map((b) => (b.id === block.id ? block : b)) }
                      : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : l
          ),
        }));
      },

      removeBlock: (lessonId, slideId, blockId) => {
        set((s) => ({
          lessons: s.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  slides: l.slides.map((sl) =>
                    sl.id === slideId ? { ...sl, blocks: sl.blocks.filter((b) => b.id !== blockId) } : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : l
          ),
        }));
      },
    }),
    { name: 'lesson-store' }
  )
);
