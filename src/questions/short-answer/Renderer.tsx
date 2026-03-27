import { useState } from 'react';
import type { ShortAnswerQuestion } from '../types';

export function ShortAnswerRenderer({ question }: { question: ShortAnswerQuestion }) {
  const [answer, setAnswer] = useState('');

  return (
    <div className="p-3 space-y-2">
      <p className="text-sm font-medium text-slate-700">{question.prompt}</p>
      <textarea
        className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-400 resize-none"
        rows={3}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
      />
    </div>
  );
}