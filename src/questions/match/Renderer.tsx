import { useState } from 'react';
import type { MatchQuestion } from '../types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Assign a colour to each pair by index
const PAIR_COLOURS = [
  'bg-violet-100 border-violet-400 text-violet-800',
  'bg-sky-100 border-sky-400 text-sky-800',
  'bg-emerald-100 border-emerald-400 text-emerald-800',
  'bg-amber-100 border-amber-400 text-amber-800',
  'bg-rose-100 border-rose-400 text-rose-800',
  'bg-teal-100 border-teal-400 text-teal-800',
];

const SELECTED = 'bg-brand-100 border-brand-500 text-brand-800';
const DEFAULT = 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50';

export function MatchRenderer({ question }: { question: MatchQuestion }) {
  const [leftItems] = useState(() => question.pairs);
  const [rightItems] = useState(() => shuffle(question.pairs));

  // Map of pairId → colour class for correctly matched pairs
  const [matched, setMatched] = useState<Record<string, string>>({});
  // Currently selected left id
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const handleLeft = (id: string) => {
    // If already matched, do nothing
    if (matched[id]) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
  };

  const handleRight = (id: string) => {
    // If already matched, do nothing
    if (matched[id]) return;
    if (!selectedLeft) return;

    if (selectedLeft === id) {
      // Correct — same pair id on both sides
      const colourIndex = question.pairs.findIndex((p) => p.id === id);
      const colour = PAIR_COLOURS[colourIndex % PAIR_COLOURS.length];
      setMatched((prev) => ({ ...prev, [id]: colour }));
      setSelectedLeft(null);
    } else {
      // Incorrect — deselect
      setSelectedLeft(null);
    }
  };

  const getLeftClass = (id: string) => {
    if (matched[id]) return `${matched[id]} border`;
    if (selectedLeft === id) return `${SELECTED} border`;
    return `${DEFAULT} border`;
  };

  const getRightClass = (id: string) => {
    if (matched[id]) return `${matched[id]} border`;
    if (selectedLeft && !matched[id]) return `${DEFAULT} border cursor-pointer`;
    return `${DEFAULT} border`;
  };

  const allMatched = Object.keys(matched).length === question.pairs.length;

  return (
    <div className="p-4 space-y-3">
      {allMatched && (
        <p className="text-xs font-semibold text-emerald-600 text-center">
          ✓ All matched!
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          {leftItems.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleLeft(pair.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${getLeftClass(pair.id)}`}
            >
              {pair.left}
            </button>
          ))}
        </div>

        {/* Right column — shuffled */}
        <div className="space-y-2">
          {rightItems.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleRight(pair.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${getRightClass(pair.id)}`}
            >
              {pair.right}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}