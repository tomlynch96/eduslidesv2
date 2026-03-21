import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLessonStore } from '../store/lessonStore';
import { allSubjects } from '../data/curriculum';
import Canvas from '../components/canvas/Canvas';

export default function BuilderPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = useLessonStore((s) => s.lessons.find((l) => l.id === lessonId));
  const setActive = useLessonStore((s) => s.setActiveLesson);

  useEffect(() => {
    if (lessonId) setActive(lessonId);
  }, [lessonId, setActive]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-400">Lesson not found.</p>
        <Link to="/lessons" className="text-brand-500 text-sm hover:underline">
          Back to lessons
        </Link>
      </div>
    );
  }

  // Resolve curriculum labels
  const subject = allSubjects.find((s) => s.id === lesson.subjectId);
  const unit = subject?.units.find((u) => u.id === lesson.unitId);
  const topic = unit?.topics.find((t) => t.id === lesson.topicId);
  const currLesson = topic?.lessons.find((l) => l.id === lesson.lessonId);

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/lessons')}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-sm font-semibold text-slate-900 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-xs text-slate-400">
              {subject?.title} · {topic?.code} · {currLesson?.title}
            </p>
          </div>
        </div>

        {/* Objectives summary */}
        {currLesson && (
          <details className="relative group">
            <summary className="list-none cursor-pointer text-xs text-brand-500 hover:text-brand-700 font-medium select-none flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {currLesson.objectives.length} objectives
            </summary>
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
              <p className="text-xs font-semibold text-slate-600 mb-2">{currLesson.code} — {currLesson.title}</p>
              <ul className="space-y-1.5">
                {currLesson.objectives.map((obj) => (
                  <li key={obj.id} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">•</span>
                    {obj.text}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {lesson.slides.length} slide{lesson.slides.length !== 1 ? 's' : ''}
          </span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            Draft
          </span>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <Canvas lessonId={lesson.id} />
      </div>
    </div>
  );
}
