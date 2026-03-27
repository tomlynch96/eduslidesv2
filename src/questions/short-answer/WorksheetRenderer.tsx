import type { ShortAnswerQuestion } from '../types';

interface Props {
  question: ShortAnswerQuestion;
  index: number;
}

export function ShortAnswerWorksheetRenderer({ question, index }: Props) {
  return (
    <div className="py-4 space-y-3 break-inside-avoid text-sm text-slate-800">
      <p className="font-medium">
        <span className="font-bold">{index}.</span> {question.prompt}
      </p>
      <div className="space-y-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-b border-slate-300 w-full h-5" />
        ))}
      </div>
    </div>
  );
}