import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { OrderQuestion } from '../types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface SortableItemProps {
  id: string;
  text: string;
  index: number;
  checked: boolean;
  isCorrect: boolean;
}

function SortableItem({ id, text, index, checked, isCorrect }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-colors ${
        checked
          ? isCorrect
            ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
            : 'border-red-400 bg-red-50 text-red-800'
          : isDragging
          ? 'border-brand-400 bg-brand-50 shadow-lg'
          : 'border-slate-200 bg-white text-slate-700'
      }`}
    >
      <span
        {...listeners}
        {...attributes}
        className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing select-none text-base"
      >
        ⠿
      </span>
      <span className="text-xs font-bold text-slate-300 w-4">{index + 1}</span>
      <span className="flex-1">{text}</span>
      {checked && (
        <span className={`text-xs font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
          {isCorrect ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
}

export function OrderRenderer({ question }: { question: OrderQuestion }) {
  const [items, setItems] = useState(() => shuffle(question.items));
  const [checked, setChecked] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (checked) return;
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const reset = () => {
    setItems(shuffle(question.items));
    setChecked(false);
  };

  const isCorrect = (id: string, index: number) =>
    question.items.findIndex((i) => i.id === id) === index;

  const allCorrect = checked && items.every((item, i) => isCorrect(item.id, i));

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-slate-400">Drag items into the correct order.</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1.5">
            {items.map((item, i) => (
              <SortableItem
                key={item.id}
                id={item.id}
                text={item.text}
                index={i}
                checked={checked}
                isCorrect={isCorrect(item.id, i)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {checked && (
        <p className={`text-xs font-semibold ${allCorrect ? 'text-emerald-600' : 'text-slate-500'}`}>
          {allCorrect ? '✓ Correct order!' : 'Not quite — check the highlighted items.'}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setChecked(true)}
          disabled={checked}
          className="text-xs bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Check order
        </button>
        <button
          onClick={reset}
          className="text-xs border border-slate-200 hover:border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}