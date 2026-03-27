import { useQuestionStore } from '../store/questionStore';
import { QUESTION_REGISTRY } from '../questions/registry';
import type { QuestionRefBlock as QuestionRefBlockType } from '../types';

type BlockMode = 'edit' | 'present';

interface Props {
  block: QuestionRefBlockType;
  mode?: BlockMode;
}

export default function QuestionRefBlock({ block, mode = 'edit' }: Props) {
  const question = useQuestionStore((s) => s.getQuestion(block.questionId));

  if (!question) {
    return (
      <div className="p-3 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
        Question not found
      </div>
    );
  }

  const entry = QUESTION_REGISTRY[question.type];
  if (!entry) return null;

  if (mode === 'present') {
    return <entry.Renderer question={question as never} />;
  }

  return (
    <div className="space-y-1 border border-brand-200 rounded-lg bg-white overflow-hidden">
      <div className="flex items-center px-3 pt-2 pb-1 border-b border-slate-100">
        <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
          {entry.icon} {entry.label}
        </span>
      </div>
      <entry.Editor question={question as never} onChange={() => {}} />
    </div>
  );
}