import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Presentation, Slide, Block } from '../types';
import { nanoid } from 'nanoid';

interface PresentationStore {
  presentations: Presentation[];
  activePresentationId: string | null;

  // Presentation actions
  createPresentation: (data: Omit<Presentation, 'id' | 'slides' | 'createdAt' | 'updatedAt'>) => string;
  setActivePresentation: (id: string) => void;
  getActivePresentation: () => Presentation | undefined;

  // Slide actions
  addSlide: (presentationId: string) => void;
  removeSlide: (presentationId: string, slideId: string) => void;
  reorderSlides: (presentationId: string, slideIds: string[]) => void;

  // Block actions
  addBlock: (presentationId: string, slideId: string, block: Block) => void;
  updateBlock: (presentationId: string, slideId: string, block: Block) => void;
  removeBlock: (presentationId: string, slideId: string, blockId: string) => void;
}

const makeEmptySlide = (): Slide => ({
  id: nanoid(),
  blocks: [],
});

export const usePresentationStore = create<PresentationStore>()(
  persist(
    (set, get) => ({
      presentations: [],
      activePresentationId: null,

      createPresentation: (data) => {
        const id = nanoid();
        const now = new Date().toISOString();
        const presentation: Presentation = {
          ...data,
          id,
          slides: [makeEmptySlide()],
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ presentations: [...s.presentations, presentation] }));
        return id;
      },

      setActivePresentation: (id) => set({ activePresentationId: id }),

      getActivePresentation: () => {
        const { presentations, activePresentationId } = get();
        return presentations.find((p) => p.id === activePresentationId);
      },

      addSlide: (presentationId) => {
        set((s) => ({
          presentations: s.presentations.map((p) =>
            p.id === presentationId
              ? { ...p, slides: [...p.slides, makeEmptySlide()], updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      removeSlide: (presentationId, slideId) => {
        set((s) => ({
          presentations: s.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.length > 1 ? p.slides.filter((sl) => sl.id !== slideId) : p.slides,
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      reorderSlides: (presentationId, slideIds) => {
        set((s) => ({
          presentations: s.presentations.map((p) => {
            if (p.id !== presentationId) return p;
            const ordered = slideIds.map((id) => p.slides.find((sl) => sl.id === id)!).filter(Boolean);
            return { ...p, slides: ordered, updatedAt: new Date().toISOString() };
          }),
        }));
      },

      addBlock: (presentationId, slideId, block) => {
        set((s) => ({
          presentations: s.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.map((sl) =>
                    sl.id === slideId ? { ...sl, blocks: [...sl.blocks, block] } : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      updateBlock: (presentationId, slideId, block) => {
        set((s) => ({
          presentations: s.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.map((sl) =>
                    sl.id === slideId
                      ? { ...sl, blocks: sl.blocks.map((b) => (b.id === block.id ? block : b)) }
                      : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      removeBlock: (presentationId, slideId, blockId) => {
        set((s) => ({
          presentations: s.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.map((sl) =>
                    sl.id === slideId ? { ...sl, blocks: sl.blocks.filter((b) => b.id !== blockId) } : sl
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },
    }),
    { name: 'presentation-store' }
  )
);
