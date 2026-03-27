import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Presentation } from '../../types';

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export interface LessonRowProps {
  lessonId: string;
  lessonCode: string;
  lessonTitle: string;
  objectiveCount: number;
  presentations: Presentation[];
  subjectId: string;
  qualificationId: string;
  yearGroupId: string;
  unitId: string;
}

export default function LessonRow({
  lessonId,
  lessonCode,
  lessonTitle,
  objectiveCount,
  presentations,
  subjectId,
  qualificationId,
  yearGroupId,
  unitId,
}: LessonRowProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const params = new URLSearchParams({
    subjectId,
    qualificationId,
    yearGroupId,
    unitId,
    lessonId,
  }).toString();

  const hasPresentation = presentations.length > 0;
  const hasMany = presentations.length > 1;

  const handleCreate = () => navigate(`/lessons/new?${params}`);

  return (
    <div className="border-t border-slate-100 first:border-t-0">
      <div className="flex items-center gap-3 px-8 py-2.5 hover:bg-slate-50 transition-colors group">
        {/* Lesson label */}
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-brand-600 mr-1.5">{lessonCode}</span>
          <span className="text-sm text-slate-700">{lessonTitle}</span>
          {objectiveCount > 0 && (
            <span className="ml-2 text-xs text-slate-400">
              {objectiveCount} objective{objectiveCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {!hasPresentation && (
            <>
              <span className="text-xs text-slate-300">No presentation</span>
              <button
                onClick={handleCreate}
                className="text-xs font-medium px-3 py-1 rounded-md bg-brand-500 hover:bg-brand-600 text-white transition-colors"
              >
                Create
              </button>
            </>
          )}

          {hasPresentation && !hasMany && (
            <>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                1 presentation
              </span>
              <button
                onClick={() => navigate(`/builder/${presentations[0].id}`)}
                className="text-xs font-medium px-3 py-1 rounded-md border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Open
              </button>
              <button
                onClick={handleCreate}
                className="text-xs font-medium px-3 py-1 rounded-md bg-brand-500 hover:bg-brand-600 text-white transition-colors"
              >
                New version
              </button>
            </>
          )}

          {hasMany && (
            <>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                {presentations.length} presentations
              </span>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-xs font-medium px-3 py-1 rounded-md border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 transition-colors flex items-center gap-1"
              >
                <ChevronIcon open={expanded} />
                Versions
              </button>
              <button
                onClick={handleCreate}
                className="text-xs font-medium px-3 py-1 rounded-md bg-brand-500 hover:bg-brand-600 text-white transition-colors"
              >
                New version
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded version list */}
      {expanded && hasMany && (
        <div className="bg-slate-50 border-t border-slate-100">
          {presentations.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-10 py-2 border-b border-slate-100 last:border-b-0"
            >
              <span className="text-xs text-slate-600">
                {p.variantName ? `${p.title} — ${p.variantName}` : p.title}
              </span>
              <button
                onClick={() => navigate(`/builder/${p.id}`)}
                className="text-xs font-medium px-3 py-1 rounded-md border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}