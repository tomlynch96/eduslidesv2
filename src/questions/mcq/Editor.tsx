import { nanoid } from 'nanoid';
import type { McqQuestion } from '../types';

interface Props {
  question: McqQuestion;
  onChange: (q: McqQuestion) => void;
}

export function McqEditor({ question, onChange }: Props) {
  const updateOption = (id: string, text: string) =>
    onChange({ ...question, options: question.options.map((o) => (o.id === id ? { ...o, text } : o)) });

  const toggleCorrect = (id: string) =>
    onChange({ ...question, options: question.options.map((o) => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o)) });

  const add = () =>
    onChange({ ...question, options: [...question.options, { id: nanoid(), text: '', isCorrect: false }] });

  const remove = (id: string) =>
    onChange({ ...question, options: question.options.filter((o) => o.id !== id) });

  return (
    <div className="p-3 space-y-2">
      <input
        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-brand-400"
        value={question.stem}
        onChange={(e) => onChange({ ...question, stem: e.target.value })}
        placeholder="Question stem"
      />
      <p className="text-xs text-slate-400">Tick correct answers</p>
      {question.options.map((opt) => (
        <div key={opt.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={opt.isCorrect}
            onChange={() => toggleCorrect(opt.id)}
            className="accent-brand-500"
          />
          <input
            className="flex-1 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-brand-400"
            value={opt.text}
            onChange={(e) => updateOption(opt.id, e.target.value)}
            placeholder="Option text"
          />
          <button
            onClick={() => remove(opt.id)}
            disabled={question.options.length <= 2}
            className="text-slate-300 hover:text-red-400 disabled:opacity-20 text-lg leading-none"
          >
            ×
          </button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-brand-500 hover:text-brand-600">+ Add option</button>
    </div>
  );
}