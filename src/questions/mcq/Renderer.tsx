import { useState } from 'react';
import type { McqQuestion } from '../types';

export function McqRenderer({ question }: { question: McqQuestion }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);

  const toggle = (id: string) => {
    if (checked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getResult = (id: string, isCorrect: boolean) => {
    if (!checked) return 'neutral';
    if (isCorrect && selected.has(id)) return 'correct';
    if (!isCorrect && selected.has(id)) return 'incorrect';
    if (isCorrect && !selected.has(id)) return 'missed';
    return 'neutral';
  };

  return (
    <div className="p-3 space-y-3">
      <p className="text-sm font-medium text-slate-700">{question.stem}</p>
      <div className="space-y-1">
        {question.options.map((opt) => {
          const result = getResult(opt.id, opt.isCorrect);
          return (
            <label
              key={opt.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                result === 'correct' ? 'border-green-400 bg-green-50 text-green-700' :
                result === 'incorrect' ? 'border-red-400 bg-red-50 text-red-700' :
                result === 'missed' ? 'border-amber-400 bg-amber-50 text-amber-700' :
                selected.has(opt.id) ? 'border-brand-400 bg-brand-50' :
                'border-slate-200 hover:border-brand-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(opt.id)}
                onChange={() => toggle(opt.id)}
                className="accent-brand-500"
              />
              {opt.text}
            </label>
          );
        })}
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