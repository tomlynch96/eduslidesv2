import type { MatchQuestion } from '../types';

interface Props {
  question: MatchQuestion;
  index: number;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function MatchWorksheetRenderer({ question, index }: Props) {
  const leftItems = question.pairs;
  const rightItems = shuffle(question.pairs);

  return (
    <div className="py-4 space-y-3 break-inside-avoid text-sm text-slate-800">
      <p className="font-medium">
        <span className="font-bold">{index}.</span> Draw a line to match each item on the left with the correct item on the right.
      </p>

      <div className="flex gap-4 items-start">
        {/* Left column */}
        <div className="flex-1 space-y-2">
          {leftItems.map((pair) => (
            <div
              key={pair.id}
              className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-700 bg-white"
            >
              {pair.left}
            </div>
          ))}
        </div>

        {/* Gap for drawing lines */}
        <div className="w-16 self-stretch flex items-center justify-center">
          <div className="w-full border-t border-dashed border-slate-200" />
        </div>

        {/* Right column — shuffled */}
        <div className="flex-1 space-y-2">
          {rightItems.map((pair) => (
            <div
              key={pair.id}
              className="border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-700 bg-white"
            >
              {pair.right}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}