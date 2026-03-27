import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { allSubjects } from '../data/curriculum';
import type { Presentation } from '../types';

// ─── Chevron ──────────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
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

// ─── Lesson row ───────────────────────────────────────────────────────────────

interface LessonRowProps {
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

function LessonRow({
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
              <span className="text-xs text-slate-400 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
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

// ─── Page header ──────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Curriculum</h1>
        <p className="text-slate-500 text-sm mt-1">Find a lesson, then create a presentation</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const presentations = usePresentationStore((s) => s.presentations);
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  const isOpen = (key: string, defaultOpen = false) =>
  key in openNodes ? openNodes[key] : defaultOpen;

  // Index presentations by lessonId for fast lookup
  const byLesson = new Map<string, Presentation[]>();
  for (const p of presentations) {
    if (!byLesson.has(p.lessonId)) byLesson.set(p.lessonId, []);
    byLesson.get(p.lessonId)!.push(p);
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <PageHeader />
      <div className="space-y-3">
        {allSubjects.map((subject) => {
          const sKey = subject.id;
          return (
            <div key={sKey} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {/* Subject header */}
              <button
                onClick={() => toggle(sKey)}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                <ChevronIcon open={isOpen(sKey)} />
                <span>{subject.title}</span>
              </button>

              {isOpen(sKey) &&
                subject.qualifications.map((qual) => {
                  const qKey = `${sKey}-${qual.id}`;
                  return (
                    <div key={qKey}>
                      {/* Qualification header */}
                      <button
                        onClick={() => toggle(qKey)}
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors border-t border-slate-200"
                      >
                        <ChevronIcon open={isOpen(qKey)} />
                        <span>{qual.title}</span>
                      </button>

                      {isOpen(qKey) &&
                        qual.yearGroups.map((yg) =>
                          yg.units.map((unit) => {
                            const uKey = `${qKey}-${unit.id}`;
                            return (
                              <div key={uKey}>
                                {/* Unit header */}
                                <button
                                  onClick={() => toggle(uKey)}
                                  className="w-full flex items-center gap-2.5 px-7 py-2 text-slate-500 text-xs hover:bg-slate-50 transition-colors border-t border-slate-100"
                                >
                                  <ChevronIcon open={isOpen(uKey)} />
                                  <span className="font-semibold text-brand-600 mr-1">{unit.code}</span>
                                  <span>{unit.title}</span>
                                </button>

                                {/* Lessons */}
                                {isOpen(uKey) && (
                                  <div>
                                    {unit.lessons.map((lesson) => (
                                      <LessonRow
                                        key={lesson.id}
                                        lessonId={lesson.id}
                                        lessonCode={lesson.code ?? ''}
                                        lessonTitle={lesson.title}
                                        objectiveCount={lesson.objectives?.length ?? 0}
                                        presentations={byLesson.get(lesson.id) ?? []}
                                        subjectId={subject.id}
                                        qualificationId={qual.id}
                                        yearGroupId={yg.id}
                                        unitId={unit.id}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}