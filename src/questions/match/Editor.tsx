import { nanoid } from 'nanoid';
import { useQuestionStore } from '../../store/questionStore';
import type { MatchQuestion } from '../types';

interface Props {
  question: MatchQuestion;
  onChange: (q: MatchQuestion) => void;
}

export function MatchEditor({ question, onChange }: Props) {
  const updateQuestion = useQuestionStore((s) => s.updateQuestion);

  const update = (updated: MatchQuestion) => {
    onChange(updated);
    updateQuestion(updated);
  };

  const updatePair = (id: string, side: 'left' | 'right', value: string) => {
    update({
      ...question,
      pairs: question.pairs.map((p) => (p.id === id ? { ...p, [side]: value } : p)),
    });
  };

  const add = () =>
    update({ ...question, pairs: [...question.pairs, { id: nanoid(), left: '', right: '' }] });

  const remove = (id: string) =>
    update({ ...question, pairs: question.pairs.filter((p) => p.id !== id) });

  return (
    <div className="p-3 space-y-2">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-1 text-xs text-slate-400 px-1">
        <span>Left</span><span>Right</span><span />
      </div>
      {question.pairs.map((pair) => (
        <div key={pair.id} className="grid grid-cols-[1fr_1fr_auto] gap-1 items-center">
          <input
            className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-brand-400"
            value={pair.left}
            onChange={(e) => updatePair(pair.id, 'left', e.target.value)}
            placeholder="Left item"
          />
          <input
            className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-brand-400"
            value={pair.right}
            onChange={(e) => updatePair(pair.id, 'right', e.target.value)}
            placeholder="Right item"
          />
          <button
            onClick={() => remove(pair.id)}
            disabled={question.pairs.length <= 2}
            className="text-slate-300 hover:text-red-400 disabled:opacity-30 text-lg leading-none px-1"
          >
            ×
          </button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-brand-500 hover:text-brand-600">
        + Add pair
      </button>
    </div>
  );
}