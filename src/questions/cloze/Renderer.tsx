import { useState } from 'react';
import type { ClozeQuestion } from '../types';

interface Props {
  question: ClozeQuestion;
}

export function ClozeRenderer({ question }: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const reveal = (id: string) =>
    setRevealed((prev) => new Set([...prev, id]));

  const revealAll = () =>
    setRevealed(new Set(question.tokens.filter((t) => t.isBlank).map((t) => t.id)));

  const reset = () => setRevealed(new Set());

  const blanks = question.tokens.filter((t) => t.isBlank);
  const wordBank = blanks.map((t) => t.text).sort(() => Math.random() - 0.5);
  const allRevealed = blanks.every((t) => revealed.has(t.id));

  return (
    <div className="p-4 space-y-4">
      {/* Text with blanks */}
      <p className="text-sm leading-8 text-slate-800 flex flex-wrap items-baseline gap-x-1">
        {question.tokens.map((token) => {
          if (!token.isBlank) {
            return <span key={token.id}>{token.text}</span>;
          }

          const isRevealed = revealed.has(token.id);
          const charWidth = Math.max(token.text.length * 9, 40);

          return isRevealed ? (
            <span
              key={token.id}
              className="inline-block bg-brand-100 text-brand-700 font-semibold px-2 py-0.5 rounded"
            >
              {token.text}
            </span>
          ) : (
            <button
              key={token.id}
              onClick={() => reveal(token.id)}
              style={{ width: `${charWidth}px` }}
              className="inline-block h-6 bg-slate-200 hover:bg-brand-200 rounded cursor-pointer transition-colors border-b-2 border-slate-400 hover:border-brand-500"
              title="Click to reveal"
            />
          );
        })}
      </p>

      {/* Word bank */}
      {question.wordBank && blanks.length > 0 && (
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Word bank
          </p>
          <div className="flex flex-wrap gap-2">
            {wordBank.map((word, i) => (
              <span
                key={i}
                className="text-sm bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={allRevealed ? reset : revealAll}
          className="text-xs bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          {allRevealed ? 'Reset' : 'Reveal all'}
        </button>
      </div>
    </div>
  );
}