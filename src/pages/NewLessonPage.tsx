import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLessonStore } from '../store/lessonStore';
import { allSubjects } from '../data/curriculum';
import type { Subject, Unit, Topic, Lesson } from '../types';

export default function NewLessonPage() {
  const navigate = useNavigate();
  const createLesson = useLessonStore((s) => s.createLesson);
  const setActive = useLessonStore((s) => s.setActiveLesson);

  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleSubjectChange = (subjectId: string) => {
    const subject = allSubjects.find((s) => s.id === subjectId) ?? null;
    setSelectedSubject(subject);
    setSelectedUnit(null);
    setSelectedTopic(null);
    setSelectedLesson(null);
    if (subject?.units.length === 1) setSelectedUnit(subject.units[0]);
  };

  const handleTopicChange = (topicId: string) => {
    const topic = selectedUnit?.topics.find((t) => t.id === topicId) ?? null;
    setSelectedTopic(topic);
    setSelectedLesson(null);
  };

  const canSubmit = title.trim() && selectedSubject && selectedUnit && selectedTopic && selectedLesson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const id = createLesson({
      title: title.trim(),
      subjectId: selectedSubject!.id,
      unitId: selectedUnit!.id,
      topicId: selectedTopic!.id,
      lessonId: selectedLesson!.id,
    });
    setActive(id);
    navigate(`/builder/${id}`);
  };

  const inputClass =
    'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white disabled:bg-slate-50 disabled:text-slate-400';

  return (
    <div className="max-w-xl mx-auto px-8 py-10">
      <div className="mb-6">
        <Link to="/lessons" className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to lessons
        </Link>
        <h1 className="font-display text-2xl font-bold text-slate-900">New Lesson</h1>
        <p className="text-slate-500 text-sm mt-1">Link this lesson to your curriculum</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-2xl p-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Lesson title</label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Energy stores and transfers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Subject</label>
          <select
            className={inputClass}
            value={selectedSubject?.id ?? ''}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Select a subject…</option>
            {allSubjects.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        {/* Unit */}
        {selectedSubject && selectedSubject.units.length > 1 && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Year group / Unit</label>
            <select
              className={inputClass}
              value={selectedUnit?.id ?? ''}
              onChange={(e) => {
                const unit = selectedSubject.units.find((u) => u.id === e.target.value) ?? null;
                setSelectedUnit(unit);
                setSelectedTopic(null);
                setSelectedLesson(null);
              }}
            >
              <option value="">Select a unit…</option>
              {selectedSubject.units.map((u) => (
                <option key={u.id} value={u.id}>{u.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Topic */}
        {selectedUnit && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Topic</label>
            <select
              className={inputClass}
              value={selectedTopic?.id ?? ''}
              onChange={(e) => handleTopicChange(e.target.value)}
            >
              <option value="">Select a topic…</option>
              {selectedUnit.topics.map((t) => (
                <option key={t.id} value={t.id}>{t.code} — {t.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Lesson */}
        {selectedTopic && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Curriculum lesson</label>
            <select
              className={inputClass}
              value={selectedLesson?.id ?? ''}
              onChange={(e) => {
                const lesson = selectedTopic.lessons.find((l) => l.id === e.target.value) ?? null;
                setSelectedLesson(lesson);
              }}
            >
              <option value="">Select a lesson…</option>
              {selectedTopic.lessons.map((l) => (
                <option key={l.id} value={l.id}>{l.code} — {l.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Objectives preview */}
        {selectedLesson && (
          <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">Learning objectives</p>
            <ul className="space-y-1">
              {selectedLesson.objectives.map((obj) => (
                <li key={obj.id} className="text-xs text-slate-600 flex gap-2">
                  <span className="text-brand-500 mt-0.5">•</span>
                  {obj.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          Create lesson & open builder →
        </button>
      </form>
    </div>
  );
}
