import { useState } from 'react';
import { allSubjects } from '../../data/curriculum';
import type { Presentation } from '../../types';
import LessonRow, { ChevronIcon } from './LessonRow';

interface Props {
  presentations: Presentation[];
}

export default function CurriculumTree({ presentations }: Props) {
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
  );
}