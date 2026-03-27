import type { McqQuestion } from '../types';

interface Props {
  question: McqQuestion;
  index: number;
}

export function McqWorksheetRenderer({ question, index }: Props) {
  return (
    <div className="py-4 space-y-2 break-inside-avoid text-sm text-slate-800">
      <p className="font-medium">
        <span className="font-bold">{index}.</span> {question.stem}
      </p>
      <div className="space-y-1.5 pl-2">
        {question.options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-3">
            <div className="w-5 h-5 border border-slate-400 rounded-sm flex-shrink-0" />
            <span>{String.fromCharCode(65 + i)}. {opt.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}