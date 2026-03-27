console.log(allSubjects[0])

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { allSubjects } from '../data/curriculum';
import type { Subject, Qualification, YearGroup, Unit, Lesson } from '../types';

export default function NewLessonPage() {
  const navigate = useNavigate();
  const createPresentation = usePresentationStore((s) => s.createPresentation);
  const setActive = usePresentationStore((s) => s.setActivePresentation);

  const [title, setTitle] = useState('');
  const [variantName, setVariantName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedQual, setSelectedQual] = useState<Qualification | null>(null);
  const [selectedYearGroup, setSelectedYearGroup] = useState<YearGroup | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleSubjectChange = (subjectId: string) => {
    const subject = allSubjects.find((s) => s.id === subjectId) ?? null;
    setSelectedSubject(subject);
    setSelectedQual(null);
    setSelectedYearGroup(null);
    setSelectedUnit(null);
    setSelectedLesson(null);
    if (subject && subject.qualifications?.length === 1) setSelectedQual(subject.qualifications[0]);
  };

  const handleQualChange = (qualId: string) => {
    const qual = selectedSubject?.qualifications?.find((q) => q.id === qualId) ?? null;
    setSelectedQual(qual);
    setSelectedYearGroup(null);
    setSelectedUnit(null);
    setSelectedLesson(null);
    if (qual && qual.yearGroups?.length === 1) setSelectedYearGroup(qual.yearGroups[0]);
  };

  const handleYearGroupChange = (ygId: string) => {
    const yg = selectedQual?.yearGroups?.find((y) => y.id === ygId) ?? null;
    setSelectedYearGroup(yg);
    setSelectedUnit(null);
    setSelectedLesson(null);
  };

  const handleUnitChange = (unitId: string) => {
    const unit = selectedYearGroup?.units?.find((u) => u.id === unitId) ?? null;
    setSelectedUnit(unit);
    setSelectedLesson(null);
  };

  const canSubmit =
    title.trim() &&
    selectedSubject &&
    selectedQual &&
    selectedYearGroup &&
    selectedUnit &&
    selectedLesson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const id = createPresentation({
      title: title.trim(),
      variantName: variantName.trim(),
      subjectId: selectedSubject!.id,
      qualificationId: selectedQual!.id,
      yearGroupId: selectedYearGroup!.id,
      unitId: selectedUnit!.id,
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
        <h1 className="font-display text-2xl font-bold text-slate-900">New Presentation</h1>
        <p className="text-slate-500 text-sm mt-1">Link this presentation to your curriculum</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-2xl p-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Presentation title</label>
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Energy stores and transfers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Variant name */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Variant <span className="text-slate-400 font-normal">(optional — e.g. Higher, Foundation, Re-teach)</span>
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Leave blank for the default version"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
          />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Curriculum link</p>

          {/* Subject */}
          <div className="space-y-3">
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

            {/* Qualification */}
            {selectedSubject && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Qualification</label>
                <select
                  className={inputClass}
                  value={selectedQual?.id ?? ''}
                  onChange={(e) => handleQualChange(e.target.value)}
                >
                  <option value="">Select a qualification…</option>
                  {selectedSubject.qualifications.map((q) => (
                    <option key={q.id} value={q.id}>{q.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Year Group */}
            {selectedQual && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Year group</label>
                <select
                  className={inputClass}
                  value={selectedYearGroup?.id ?? ''}
                  onChange={(e) => handleYearGroupChange(e.target.value)}
                >
                  <option value="">Select a year group…</option>
                  {selectedQual.yearGroups.map((y) => (
                    <option key={y.id} value={y.id}>{y.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Unit */}
            {selectedYearGroup && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Unit</label>
                <select
                  className={inputClass}
                  value={selectedUnit?.id ?? ''}
                  onChange={(e) => handleUnitChange(e.target.value)}
                >
                  <option value="">Select a unit…</option>
                  {selectedYearGroup.units.map((u) => (
                    <option key={u.id} value={u.id}>{u.code} — {u.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Lesson */}
            {selectedUnit && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Lesson</label>
                <select
                  className={inputClass}
                  value={selectedLesson?.id ?? ''}
                  onChange={(e) => {
                    const lesson = selectedUnit.lessons.find((l) => l.id === e.target.value) ?? null;
                    setSelectedLesson(lesson);
                  }}
                >
                  <option value="">Select a lesson…</option>
                  {selectedUnit.lessons.map((l) => (
                    <option key={l.id} value={l.id}>{l.code} — {l.title}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

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
          Create presentation & open builder →
        </button>
      </form>
    </div>
  );
}