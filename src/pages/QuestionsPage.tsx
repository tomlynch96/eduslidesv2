import { useState } from 'react';
import { useQuestionStore } from '../store/questionStore';
import { QUESTION_REGISTRY } from '../questions/registry';
import type { Question, QuestionType } from '../questions/types';

export default function QuestionsPage() {
  const { questions, addQuestion, updateQuestion, removeQuestion } = useQuestionStore();
  const [filter, setFilter] = useState<QuestionType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = questions.filter((q) => {
    if (filter !== 'all' && q.type !== filter) return false;
    if (search) {
      const text = JSON.stringify(q).toLowerCase();
      if (!text.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const createQuestion = (type: QuestionType) => {
    const entry = QUESTION_REGISTRY[type];
    const q = entry.makeDefault();
    const id = addQuestion(q as never);
    setEditingId(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage reusable questions</p>
        </div>
        <div className="relative group">
          <button className="bg-brand-500 hover:bg-brand-600 text-white text-sm px-4 py-2 rounded-lg">
            + New question
          </button>
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-10">
            {Object.values(QUESTION_REGISTRY).map((entry) => (
              <button
                key={entry.type}
                onClick={() => createQuestion(entry.type)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
              >
                <span>{entry.icon}</span>
                <span>{entry.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
          placeholder="Search questions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            All
          </button>
          {Object.values(QUESTION_REGISTRY).map((entry) => (
            <button
              key={entry.type}
              onClick={() => setFilter(entry.type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === entry.type ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {entry.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Question cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg mb-1">No questions yet</p>
          <p className="text-sm">Create one using the button above, or drag a question block onto a slide in the builder</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isEditing={editingId === q.id}
              onEdit={() => setEditingId(q.id)}
              onClose={() => setEditingId(null)}
              onChange={updateQuestion}
              onRemove={() => removeQuestion(q.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question, isEditing, onEdit, onClose, onChange, onRemove }: {
  question: Question;
  isEditing: boolean;
  onEdit: () => void;
  onClose: () => void;
  onChange: (q: Question) => void;
  onRemove: () => void;
}) {
  const entry = QUESTION_REGISTRY[question.type];
  if (!entry) return null;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
          {entry.icon} {entry.label}
        </span>
        <div className="flex gap-2">
          <button onClick={isEditing ? onClose : onEdit} className="text-xs text-slate-400 hover:text-slate-600">
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button onClick={onRemove} className="text-xs text-red-400 hover:text-red-600">Delete</button>
        </div>
      </div>
      {isEditing ? (
        <entry.Editor question={question as never} onChange={(q) => onChange(q as Question)} />
      ) : (
        <entry.Renderer question={question as never} />
      )}
    </div>
  );
}