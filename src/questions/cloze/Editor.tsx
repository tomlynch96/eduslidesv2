import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useQuestionStore } from '../../store/questionStore';
import type { ClozeQuestion, ClozeToken } from '../types';

interface Props {
  question: ClozeQuestion;
  onChange: (q: ClozeQuestion) => void;
}

function tokenise(text: string): ClozeToken[] {
  return text
    .split(/(\s+)/)
    .filter((t) => t.trim().length > 0)
    .map((t) => ({ id: nanoid(), text: t, isBlank: false }));
}

export function ClozeEditor({ question, onChange }: Props) {
  const updateQuestion = useQuestionStore((s) => s.updateQuestion);
  const [rawText, setRawText] = useState(question.sourceText);
  const [committed, setCommitted] = useState((question.tokens?.length ?? 0) > 0);

  const commit = () => {
    if (!rawText.trim()) return;
    const tokens = tokenise(rawText);
    const updated = { ...question, sourceText: rawText, tokens };
    onChange(updated);
    updateQuestion(updated);
    setCommitted(true);
  };

  const toggleToken = (id: string) => {
    const updated: ClozeQuestion = {
      ...question,
      tokens: question.tokens.map((t) =>
        t.id === id ? { ...t, isBlank: !t.isBlank } : t
      ),
    };
    onChange(updated);
    updateQuestion(updated);
  };

  const toggleWordBank = (checked: boolean) => {
    const updated: ClozeQuestion = { ...question, wordBank: checked };
    onChange(updated);
    updateQuestion(updated);
  };

  const reset = () => {
    const updated: ClozeQuestion = { ...question, tokens: [] };
    onChange(updated);
    updateQuestion(updated);
    setCommitted(false);
  };

  const blankCount = question.tokens?.filter((t) => t.isBlank).length ?? 0;

  return (
    <div className="p-4 space-y-4">
      {!committed ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Paste or type your text
          </label>
          <textarea
            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-400 resize-none leading-relaxed"
            rows={4}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="e.g. Energy cannot be created or destroyed, only transferred or stored."
          />
          <button
            onClick={commit}
            disabled={!rawText.trim()}
            className="text-sm bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            Set blanks →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Click words to blank them
            </label>
            <button
              onClick={reset}
              className="text-xs text-slate-400 hover:text-slate-600 underline"
            >
              Edit text
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed">
            {question.tokens.map((token) => (
              <button
                key={token.id}
                type="button"
                onClick={() => toggleToken(token.id)}
                className={`px-1.5 py-0.5 rounded text-sm transition-all select-none ${
                  token.isBlank
                    ? 'bg-brand-500 text-white font-medium shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50'
                }`}
              >
                {token.text}
              </button>
            ))}
          </div>

          {blankCount > 0 && (
            <p className="text-xs text-slate-400">
              {blankCount} blank{blankCount !== 1 ? 's' : ''} selected
            </p>
          )}

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={question.wordBank}
              onChange={(e) => toggleWordBank(e.target.checked)}
              className="accent-brand-500"
            />
            <span className="text-sm text-slate-600">Include word bank</span>
          </label>
        </div>
      )}
    </div>
  );
}