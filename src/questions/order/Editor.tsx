import { nanoid } from 'nanoid';
import type { OrderQuestion } from '../types';

interface Props {
  question: OrderQuestion;
  onChange: (q: OrderQuestion) => void;
}

export function OrderEditor({ question, onChange }: Props) {
  const update = (id: string, text: string) =>
    onChange({ ...question, items: question.items.map((item) => (item.id === id ? { ...item, text } : item)) });

  const move = (index: number, dir: -1 | 1) => {
    const items = [...question.items];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    onChange({ ...question, items });
  };

  const add = () =>
    onChange({ ...question, items: [...question.items, { id: nanoid(), text: '' }] });

  const remove = (id: string) =>
    onChange({ ...question, items: question.items.filter((i) => i.id !== id) });

  return (
    <div className="p-3 space-y-1">
      <p className="text-xs text-slate-400 mb-2">Items in correct order</p>
      {question.items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-1">
          <span className="text-xs text-slate-300 w-4 text-right">{i + 1}</span>
          <input
            className="flex-1 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-brand-400"
            value={item.text}
            onChange={(e) => update(item.id, e.target.value)}
            placeholder={`Item ${i + 1}`}
          />
          <button onClick={() => move(i, -1)} disabled={i === 0} className="text-slate-300 hover:text-slate-500 disabled:opacity-20 text-xs">▲</button>
          <button onClick={() => move(i, 1)} disabled={i === question.items.length - 1} className="text-slate-300 hover:text-slate-500 disabled:opacity-20 text-xs">▼</button>
          <button onClick={() => remove(item.id)} disabled={question.items.length <= 2} className="text-slate-300 hover:text-red-400 disabled:opacity-20 text-lg leading-none">×</button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-brand-500 hover:text-brand-600 mt-1">+ Add item</button>
    </div>
  );
}