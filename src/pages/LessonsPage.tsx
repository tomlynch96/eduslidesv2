import { Link } from 'react-router-dom';
import { useLessonStore } from '../store/lessonStore';
import { allSubjects } from '../data/curriculum';

export default function LessonsPage() {
  const lessons = useLessonStore((s) => s.lessons);
  const setActive = useLessonStore((s) => s.setActiveLesson);

  const getCurriculumLabel = (lesson: (typeof lessons)[0]) => {
    const subject = allSubjects.find((s) => s.id === lesson.subjectId);
    const unit = subject?.units.find((u) => u.id === lesson.unitId);
    const topic = unit?.topics.find((t) => t.id === lesson.topicId);
    const currLesson = topic?.lessons.find((l) => l.id === lesson.lessonId);
    return [subject?.title, topic?.code, currLesson?.title].filter(Boolean).join(' · ');
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Lessons</h1>
          <p className="text-slate-500 text-sm mt-1">Your saved lesson plans</p>
        </div>
        <Link
          to="/lessons/new"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-slate-500 text-sm">No lessons yet. Create your first one.</p>
          <Link
            to="/lessons/new"
            className="mt-4 inline-block text-brand-500 text-sm font-medium hover:underline"
          >
            Create a lesson →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/builder/${lesson.id}`}
              onClick={() => setActive(lesson.id)}
              className="group flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-brand-500 hover:shadow-sm transition-all"
            >
              <div>
                <p className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors">
                  {lesson.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{getCurriculumLabel(lesson)}</p>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="text-xs">{lesson.slides.length} slide{lesson.slides.length !== 1 ? 's' : ''}</span>
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
