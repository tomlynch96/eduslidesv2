import { useState } from 'react';
import type { ShortAnswerQuestion } from '../types';

export function ShortAnswerRenderer({ question }: { question: ShortAnswerQuestion }) {
  const [answer, setAnswer] = useState('');
  const [showMark, setShowMark] = useState(false);

  return (
    <div className="p-4 space-y-3">
      <p className="text-sm font-medium text-slate-800 leading-snug">{question.prompt}</p>

      <textarea
        className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-400 resize-none leading-relaxed"
        rows={3}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here…"
      />

      {question.markScheme && (
        <div>
          {!showMark ? (
            <button
              onClick={() => setShowMark(true)}
              className="text-xs text-brand-500 hover:text-brand-700 font-medium"
            >
              Show mark scheme
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">Mark scheme</p>
              <p className="text-xs text-amber-800 leading-relaxed">{question.markScheme}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}