import { useState } from 'react';
import type { MatchQuestion } from '../types';

export function MatchRenderer({ question }: { question: MatchQuestion }) {
  const shuffled = [...question.pairs].sort(() => Math.random() - 0.5);
  const rightItems = [...question.pairs].sort(() => Math.random() - 0.5);

  const [selected, setSelected] = useState<string | null>(null); // left pair id
  const [matches, setMatches] = useState<Record<string, string>>({}); // leftId → rightId
  const [checked, setChecked] = useState(false);

  const handleLeft = (id: string) => {
    if (checked) return;
    setSelected(selected === id ? null : id);
  };

  const handleRight = (rightId: string) => {
    if (checked || !selected) return;
    setMatches((prev) => ({ ...prev, [selected]: rightId }));
    setSelected(null);
  };

  const getResult = (leftId: string) => {
    if (!checked) return 'neutral';
    const pair = question.pairs.find((p) => p.id === leftId);
    return matches[leftId] === pair?.id ? 'correct' : 'incorrect';
  };

  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          {shuffled.map((pair) => (
            <button
              key={pair.id}
              onClick={() => handleLeft(pair.id)}
              className={`w-full text-left text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                selected === pair.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : checked
                  ? getResult(pair.id) === 'correct'
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-red-400 bg-red-50 text-red-700'
                  : matches[pair.id]
                  ? 'border-slate-400 bg-slate-50'
                  : 'border-slate-200 hover:border-brand-300'
              }`}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="space-y-1">
          {rightItems.map((pair) => (
            <button
              key={pair.id}
              onClick={() => handleRight(pair.id)}
              className={`w-full text-left text-sm px-3 py-1.5 rounded-lg border transition-colors ${
                selected
                  ? 'border-brand-300 hover:border-brand-500 hover:bg-brand-50 cursor-pointer'
                  : 'border-slate-200 cursor-default'
              }`}
            >
              {pair.right}
            </button>
          ))}
        </div>
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