import { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { nanoid } from 'nanoid';
import { usePresentationStore } from '../../store/presentationStore';
import { useQuestionStore } from '../../store/questionStore';
import { QUESTION_REGISTRY } from '../../questions/registry';
import type { Block, TextBlock, QuestionRefBlock, Slide } from '../../types';
import TextBlockComponent from '../blocks/TextBlock';
import QuestionRefBlockComponent from '../../blocks/QuestionRefBlock';

type CanvasMode = 'edit' | 'present';

// ─── Palette ──────────────────────────────────────────────────────────────────

const TEXT_PALETTE = [
  { type: 'text', label: 'Text', icon: '📝', description: 'Title or instructions' },
];

function PaletteItem({ type, label, icon, description }: {
  type: string; label: string; icon: string; description: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: 'palette', blockType: type },
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all select-none ${
        isDragging
          ? 'opacity-40 border-brand-300 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50'
      }`}
    >
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

// ─── Slide canvas drop zone ───────────────────────────────────────────────────

function SlideCanvas({ slide, lessonId, isActive, mode }: {
  slide: Slide; lessonId: string; isActive: boolean; mode: CanvasMode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `slide-${slide.id}` });
  const removeBlock = usePresentationStore((s) => s.removeBlock);

  return (
    <div
      ref={setNodeRef}
      className={`relative slide-aspect w-full rounded-xl border-2 transition-colors overflow-hidden bg-white ${
        isOver
          ? 'border-brand-400 bg-brand-50/30'
          : isActive
          ? 'border-brand-300'
          : 'border-slate-200'
      }`}
    >
      {slide.blocks.length === 0 && mode === 'edit' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-slate-300 text-sm select-none">Drag blocks here</p>
        </div>
      )}
      {slide.blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          onRemove={() => removeBlock(lessonId, slide.id, block.id)}
          lessonId={lessonId}
          slideId={slide.id}
          mode={mode}
        />
      ))}
    </div>
  );
}

// ─── Draggable block ──────────────────────────────────────────────────────────

function DraggableBlock({ block, onRemove, lessonId, slideId, mode }: {
  block: Block; onRemove: () => void; lessonId: string; slideId: string; mode: CanvasMode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { source: 'canvas', block, slideId },
    disabled: mode === 'present',
  });
  const updateBlock = usePresentationStore((s) => s.updateBlock);

  const style = {
    position: 'absolute' as const,
    left: block.position.x,
    top: block.position.y,
    width: block.position.width,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      {mode === 'edit' && (
        <>
          <div
            {...listeners}
            {...attributes}
            className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full select-none z-10"
          >
            ⠿
          </div>
          <button
            onClick={onRemove}
            className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center z-10 hover:bg-red-600"
          >
            ×
          </button>
        </>
      )}
      <BlockRenderer
        block={block}
        mode={mode}
        onChange={(updated) => updateBlock(lessonId, slideId, updated)}
      />
    </div>
  );
}

// ─── Block renderer ───────────────────────────────────────────────────────────

function BlockRenderer({ block, mode, onChange }: {
  block: Block; mode: CanvasMode; onChange: (b: Block) => void;
}) {
  if (block.type === 'text') {
    return <TextBlockComponent block={block as TextBlock} onChange={(b) => onChange(b)} />;
  }
  if (block.type === 'question-ref') {
    return (
      <QuestionRefBlockComponent
        block={block as QuestionRefBlock}
        mode={mode === 'present' ? 'present' : 'edit'}
      />
    );
  }
  return null;
}

// ─── Default block factory ────────────────────────────────────────────────────

function makeDefaultBlock(
  type: string,
  addQuestion: (q: never) => string,
  curriculumLessonId: string
): Block {
  const base = { id: nanoid(), position: { x: 40, y: 40, width: 380, height: 140 } };

  if (type === 'text') {
    return { ...base, type: 'text', content: 'Click to edit text…' } as TextBlock;
  }

  const entry = QUESTION_REGISTRY[type];
  if (entry) {
    const question = { ...entry.makeDefault(), lessonId: curriculumLessonId };
    const questionId = addQuestion(question as never);
    return { ...base, type: 'question-ref', questionId } as QuestionRefBlock;
  }

  return { ...base, type: 'text', content: '' } as TextBlock;
}

// ─── Slide thumbnail ──────────────────────────────────────────────────────────

function SlideThumbnail({ slide, index, isActive, onClick, onRemove }: {
  slide: Slide; index: number; isActive: boolean; onClick: () => void; onRemove: () => void;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-full text-left rounded-lg border-2 transition-all overflow-hidden ${
          isActive ? 'border-brand-500' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="slide-aspect bg-white relative">
          <span className="absolute bottom-1 right-1.5 text-[9px] text-slate-400">{index + 1}</span>
          {slide.blocks.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[8px] text-slate-400">
                {slide.blocks.length} block{slide.blocks.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </button>
      <button
        onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-400 text-white text-[10px] items-center justify-center hidden group-hover:flex hover:bg-red-500"
      >
        ×
      </button>
    </div>
  );
}

// ─── Main Canvas ──────────────────────────────────────────────────────────────

export default function Canvas({ lessonId, mode = 'edit' }: {
  lessonId: string; mode?: CanvasMode;
}) {
  const lesson = usePresentationStore((s) => s.presentations.find((p) => p.id === lessonId));
  const addSlide = usePresentationStore((s) => s.addSlide);
  const removeSlide = usePresentationStore((s) => s.removeSlide);
  const addBlock = usePresentationStore((s) => s.addBlock);
  const updateBlock = usePresentationStore((s) => s.updateBlock);
  const addQuestion = useQuestionStore((s) => s.addQuestion);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [_dragType, setDragType] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  if (!lesson) return <div className="p-8 text-slate-400">Presentation not found.</div>;

  const activeSlide = lesson.slides[activeSlideIndex] ?? lesson.slides[0];

  const handleDragStart = (event: DragStartEvent) => {
    setDragType((event.active.data.current as { source?: string })?.source ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDragType(null);
    if (mode === 'present') return;

    const { active, over, delta } = event;
    const activeData = active.data.current as {
      source: string;
      blockType?: string;
      block?: Block;
      slideId?: string;
    };

    if (!over) return;

    if (activeData.source === 'palette' && String(over.id).startsWith('slide-')) {
      const targetSlideId = String(over.id).replace('slide-', '');
      const newBlock = makeDefaultBlock(
        activeData.blockType!,
        addQuestion as never,
        lesson.lessonId
      );
      addBlock(lessonId, targetSlideId, newBlock);
    }

    if (activeData.source === 'canvas' && activeData.block) {
      const moved: Block = {
        ...activeData.block,
        position: {
          ...activeData.block.position,
          x: Math.max(0, activeData.block.position.x + delta.x),
          y: Math.max(0, activeData.block.position.y + delta.y),
        },
      };
      updateBlock(lessonId, activeData.slideId ?? activeSlide.id, moved);
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        {/* Slide strip */}
        <div className="w-36 flex-shrink-0 bg-slate-100 border-r border-slate-200 p-2 overflow-y-auto flex flex-col gap-2">
          {lesson.slides.map((slide, i) => (
            <SlideThumbnail
              key={slide.id}
              slide={slide}
              index={i}
              isActive={slide.id === activeSlide.id}
              onClick={() => setActiveSlideIndex(i)}
              onRemove={() => {
                removeSlide(lessonId, slide.id);
                setActiveSlideIndex(Math.max(0, i - 1));
              }}
            />
          ))}
          {mode === 'edit' && (
            <button
              onClick={() => {
                addSlide(lessonId);
                setActiveSlideIndex(lesson.slides.length);
              }}
              className="w-full rounded-lg border-2 border-dashed border-slate-300 hover:border-brand-400 text-slate-400 hover:text-brand-500 transition-colors py-2 text-xs"
            >
              + slide
            </button>
          )}
        </div>

        {/* Canvas + palette */}
        <div className="flex-1 flex gap-4 p-6 overflow-auto">
          <div className="flex-1">
            <div className="max-w-4xl w-full mx-auto">
              <SlideCanvas
                slide={activeSlide}
                lessonId={lessonId}
                isActive
                mode={mode}
              />
            </div>
          </div>

          {/* Palette — edit only */}
          {mode === 'edit' && (
            <div className="w-44 flex-shrink-0 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Content
                </p>
                <div className="space-y-2">
                  {TEXT_PALETTE.map((item) => (
                    <PaletteItem key={item.type} {...item} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Questions
                </p>
                <div className="space-y-2">
                  {Object.values(QUESTION_REGISTRY).map((entry) => (
                    <PaletteItem
                      key={entry.type}
                      type={entry.type}
                      label={entry.label}
                      icon={entry.icon}
                      description={entry.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {_dragType === 'palette' && (
          <div className="bg-white border-2 border-brand-400 rounded-lg px-3 py-2 shadow-lg text-xs font-medium text-brand-600">
            Drop onto slide
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}