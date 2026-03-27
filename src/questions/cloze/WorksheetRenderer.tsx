import type { ClozeQuestion } from '../types';

interface Props {
  question: ClozeQuestion;
  index: number;
}

export function ClozeWorksheetRenderer({ question, index }: Props) {
  const blanks = question.tokens.filter((t) => t.isBlank);
  const wordBank = [...blanks.map((t) => t.text)].sort(() => Math.random() - 0.5);
  const instruction = question.wordBank
    ? 'Fill in the gaps using the words in the box below.'
    : 'Fill in the gaps.';

  return (
    <div className="py-3 space-y-3 text-sm text-slate-800 break-inside-avoid">
      {/* Question number + instruction */}
      <p className="font-medium">
        <span className="font-bold">{index}. </span>
        {instruction}
      </p>

      {/* Text with blank lines */}
      <p className="leading-9 flex flex-wrap items-baseline gap-x-1">
        {question.tokens.map((token) => {
          if (!token.isBlank) {
            return <span key={token.id}>{token.text}</span>;
          }
          const lineWidth = Math.max(token.text.length * 8, 40);
          return (
            <span
              key={token.id}
              className="inline-block border-b-2 border-slate-800"
              style={{ width: `${lineWidth}px`, marginBottom: '2px' }}
            />
          );
        })}
      </p>

      {/* Word bank */}
      {question.wordBank && blanks.length > 0 && (
        <div className="border border-slate-400 rounded p-2 inline-flex flex-wrap gap-3">
          {wordBank.map((word, i) => (
            <span key={i} className="text-sm text-slate-700">
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}