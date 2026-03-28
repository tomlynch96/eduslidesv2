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

  const reset = () => {
    setSelected(new Set());
    setChecked(false);
  };

  const getStyle = (id: string, isCorrect: boolean) => {
    if (!checked) {
      return selected.has(id)
        ? 'border-brand-400 bg-brand-50 text-brand-800'
        : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50';
    }
    if (isCorrect && selected.has(id)) return 'border-emerald-400 bg-emerald-50 text-emerald-800';
    if (isCorrect && !selected.has(id)) return 'border-amber-400 bg-amber-50 text-amber-800'; // missed
    if (!isCorrect && selected.has(id)) return 'border-red-400 bg-red-50 text-red-800';
    return 'border-slate-200 bg-white text-slate-500';
  };

  const allCorrect =
    checked &&
    question.options.every((o) => o.isCorrect === selected.has(o.id));

  return (
    <div className="p-4 space-y-3">
      <p className="text-sm font-medium text-slate-800 leading-snug">{question.stem}</p>

      <div className="space-y-1.5">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${getStyle(opt.id, opt.isCorrect)}`}
          >
            <input
              type="checkbox"
              checked={selected.has(opt.id)}
              onChange={() => toggle(opt.id)}
              className="accent-brand-500 flex-shrink-0"
            />
            <span>{opt.text}</span>
            {checked && opt.isCorrect && !selected.has(opt.id) && (
              <span className="ml-auto text-xs text-amber-600 font-medium">missed</span>
            )}
          </label>
        ))}
      </div>

      {checked && (
        <p className={`text-xs font-semibold ${allCorrect ? 'text-emerald-600' : 'text-slate-500'}`}>
          {allCorrect ? '✓ Correct!' : 'Not quite — amber options were correct answers you missed.'}
        </p>
      )}

      <div className="flex gap-2">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={selected.size === 0}
            className="text-xs bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={reset}
            className="text-xs border border-slate-200 hover:border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}