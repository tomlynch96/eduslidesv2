import type { OrderQuestion } from '../types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props {
  question: OrderQuestion;
  index: number;
}

export function OrderWorksheetRenderer({ question, index }: Props) {
  const shuffled = shuffle(question.items);

  return (
    <div className="py-4 space-y-3 break-inside-avoid text-sm text-slate-800">
      <p className="font-medium">
        <span className="font-bold">{index}.</span> Put the following in the correct order by writing a number in each box.
      </p>
      <div className="space-y-2">
        {shuffled.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-7 h-7 border border-slate-400 rounded flex-shrink-0" />
            <span className="text-sm text-slate-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}