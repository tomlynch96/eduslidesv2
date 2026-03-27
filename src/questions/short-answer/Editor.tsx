import { useQuestionStore } from '../../store/questionStore';
import type { ShortAnswerQuestion } from '../types';

interface Props {
  question: ShortAnswerQuestion;
  onChange: (q: ShortAnswerQuestion) => void;
}

export function ShortAnswerEditor({ question, onChange }: Props) {
  const updateQuestion = useQuestionStore((s) => s.updateQuestion);

  const update = (updated: ShortAnswerQuestion) => {
    onChange(updated);
    updateQuestion(updated);
  };

  return (
    <div className="p-3 space-y-2">
      <input
        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-brand-400"
        value={question.prompt}
        onChange={(e) => update({ ...question, prompt: e.target.value })}
        placeholder="Question prompt"
      />
      <div>
        <p className="text-xs text-slate-400 mb-1">Mark scheme (teacher only)</p>
        <textarea
          className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-brand-400 resize-none"
          rows={2}
          value={question.markScheme ?? ''}
          onChange={(e) => update({ ...question, markScheme: e.target.value })}
          placeholder="Key points to award marks for..."
        />
      </div>
    </div>
  );
}