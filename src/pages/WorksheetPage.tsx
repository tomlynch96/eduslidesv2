import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { useQuestionStore } from '../store/questionStore';
import { QUESTION_REGISTRY } from '../questions/registry';
import { allSubjects } from '../data/curriculum';
import type { Question } from '../questions/types';

export default function WorksheetPage() {
  const { presentationId } = useParams<{ presentationId: string }>();
  const navigate = useNavigate();

  const presentation = usePresentationStore((s) =>
    s.presentations.find((p) => p.id === presentationId)
  );
  const allQuestions = useQuestionStore((s) => s.questions);

  // Questions linked to this lesson
  const lessonQuestions = useMemo(
    () => allQuestions.filter((q) => q.lessonId === presentation?.lessonId),
    [allQuestions, presentation?.lessonId]
  );

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(lessonQuestions.map((q) => q.id))
  );

  if (!presentation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">Presentation not found.</p>
      </div>
    );
  }

  // Find lesson title for header
  const subject = allSubjects.find((s) => s.id === presentation.subjectId);
  const qual = subject?.qualifications.find((q) => q.id === presentation.qualificationId);
  const yg = qual?.yearGroups.find((y) => y.id === presentation.yearGroupId);
  const unit = yg?.units.find((u) => u.id === presentation.unitId);
  const lesson = unit?.lessons.find((l) => l.id === presentation.lessonId);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectedQuestions = lessonQuestions.filter((q) => selected.has(q.id));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Picker panel */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col print:hidden">
        <div className="px-4 py-4 border-b border-slate-200">
          <button
            onClick={() => navigate(`/builder/${presentationId}`)}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-3"
          >
            ← Back to builder
          </button>
          <h2 className="font-display text-sm font-bold text-slate-900">Worksheet builder</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lesson?.code} {lesson?.title}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {lessonQuestions.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              No questions linked to this lesson yet. Create questions in the Question Bank and tag them to this lesson.
            </p>
          ) : (
            lessonQuestions.map((q) => {
              const entry = QUESTION_REGISTRY[q.type];
              return (
                <label
                  key={q.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selected.has(q.id)
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(q.id)}
                    onChange={() => toggle(q.id)}
                    className="accent-brand-500 mt-0.5 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-brand-500">
                      {entry?.icon} {entry?.label}
                    </span>
                    <p className="text-xs text-slate-600 truncate mt-0.5">
                      {getQuestionPreview(q)}
                    </p>
                  </div>
                </label>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <button
            onClick={() => window.print()}
            disabled={selectedQuestions.length === 0}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Print worksheet
          </button>
          <p className="text-xs text-slate-400 text-center">
            {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </aside>

      {/* A4 preview */}
      <main className="flex-1 overflow-auto p-8 print:p-0">
        <div
          className="bg-white mx-auto shadow-lg print:shadow-none"
          style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}
        >
          {/* Worksheet header */}
          <div className="mb-8 pb-4 border-b-2 border-slate-800">
            <h1 className="text-lg font-bold text-slate-900">
              {presentation.title}{presentation.variantName ? ` — ${presentation.variantName}` : ''}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {unit?.code} {unit?.title}
            </p>
            <div className="flex gap-8 mt-4 text-sm">
              <span>Name: <span className="inline-block border-b border-slate-400 w-48 ml-1" /></span>
              <span>Date: <span className="inline-block border-b border-slate-400 w-32 ml-1" /></span>
            </div>
          </div>

          {/* Questions */}
          {selectedQuestions.length === 0 ? (
            <p className="text-slate-300 text-sm text-center py-16">
              Select questions from the panel to build your worksheet
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {selectedQuestions.map((q, i) => {
                const entry = QUESTION_REGISTRY[q.type];
                if (!entry?.WorksheetRenderer) return null;
                return (
                  <entry.WorksheetRenderer
                    key={q.id}
                    question={q as never}
                    index={i + 1}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function getQuestionPreview(q: Question): string {
  if (q.type === 'cloze') return q.sourceText.slice(0, 60) + (q.sourceText.length > 60 ? '…' : '');
  if (q.type === 'mcq') return q.stem.slice(0, 60) + (q.stem.length > 60 ? '…' : '');
  if (q.type === 'short-answer') return q.prompt.slice(0, 60) + (q.prompt.length > 60 ? '…' : '');
  if (q.type === 'match') return `Match up (${q.pairs.length} pairs)`;
  if (q.type === 'order') return `Put in order (${q.items.length} items)`;
  return '';
}