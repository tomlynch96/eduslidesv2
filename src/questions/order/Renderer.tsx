import { useState } from 'react';
import type { OrderQuestion } from '../types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function OrderRenderer({ question }: { question: OrderQuestion }) {
  const [items, setItems] = useState(() => shuffle(question.items));
  const [checked, setChecked] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const handleDragStart = (id: string) => setDragId(id);

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const from = items.findIndex((i) => i.id === dragId);
    const to = items.findIndex((i) => i.id === targetId);
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    setItems(next);
    setDragId(null);
  };

  const isCorrect = (id: string, index: number) =>
    question.items.findIndex((i) => i.id === id) === index;

  return (
    <div className="p-3 space-y-3">
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(item.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-grab transition-colors ${
              checked
                ? isCorrect(item.id, i)
                  ? 'border-green-400 bg-green-50 text-green-700'
                  : 'border-red-400 bg-red-50 text-red-700'
                : 'border-slate-200 bg-white hover:border-brand-300'
            }`}
          >
            <span className="text-slate-300 text-xs">⠿</span>
            {item.text}
          </div>
        ))}
      </div>
      <button
        onClick={() => setChecked(true)}
        className="text-xs bg-brand-500 hover:bg-brand-600 text-white px-3 py-1 rounded"
      >
        Check
      </button>
    </div>
  );
}