import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { allSubjects } from '../data/curriculum';
import type { Subject, Qualification, YearGroup, Unit, Lesson } from '../types';

export default function NewLessonPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const createPresentation = usePresentationStore((s) => s.createPresentation);
  const setActive = usePresentationStore((s) => s.setActivePresentation);

  // Read any pre-fill params from the curriculum page
  const preSubjectId = searchParams.get('subjectId');
  const preQualId = searchParams.get('qualificationId');
  const preYearGroupId = searchParams.get('yearGroupId');
  const preUnitId = searchParams.get('unitId');
  const preLessonId = searchParams.get('lessonId');
  const isPreFilled = !!(preSubjectId && preQualId && preYearGroupId && preUnitId && preLessonId);

  const [title, setTitle] = useState('');
  const [variantName, setVariantName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedQual, setSelectedQual] = useState<Qualification | null>(null);
  const [selectedYearGroup, setSelectedYearGroup] = useState<YearGroup | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // On mount, pre-fill from params if present
  useEffect(() => {
    if (!isPreFilled) return;
    const subject = allSubjects.find((s) => s.id === preSubjectId) ?? null;
    const qual = subject?.qualifications.find((q) => q.id === preQualId) ?? null;
    const yg = qual?.yearGroups.find((y) => y.id === preYearGroupId) ?? null;
    const unit = yg?.units.find((u) => u.id === preUnitId) ?? null;
    const lesson = unit?.lessons.find((l) => l.id === preLessonId) ?? null;
    setSelectedSubject(subject);
    setSelectedQual(qual);
    setSelectedYearGroup(yg);
    setSelectedUnit(unit);
    setSelectedLesson(lesson);
    // Auto-populate title from lesson name
    if (lesson) setTitle(lesson.title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Cascade handlers (used only in manual/freeform mode) ──────────────────

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

  const handleLessonChange = (lessonId: string) => {
    const lesson = selectedUnit?.lessons?.find((l) => l.id === lessonId) ?? null;
    setSelectedLesson(lesson);
    if (lesson && !title.trim()) setTitle(lesson.title);
  };

  // ── Submit ────────────────────────────────────────────────────────────────

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

  const readonlyClass =
    'w-full border border-slate-100 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-500 cursor-default';

  return (
    <div className="max-w-xl mx-auto px-8 py-10">
      <div className="mb-6">
        <Link
          to="/lessons"
          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-4"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to curriculum
        </Link>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          {isPreFilled ? 'Create presentation' : 'New presentation'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isPreFilled
            ? 'Linked to your selected curriculum lesson'
            : 'Link this presentation to your curriculum'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-2xl p-6">

        {/* ── Curriculum display (pre-filled, locked) ── */}
        {isPreFilled && selectedLesson && (
          <div className="bg-slate-50 rounded-xl p-4 space-y-1 border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">Curriculum lesson</p>
            <p className="text-xs text-slate-400">
              {selectedSubject?.title}
              {selectedQual ? ` › ${selectedQual.title}` : ''}
              {selectedYearGroup ? ` › ${selectedYearGroup.title}` : ''}
            </p>
            <p className="text-sm font-medium text-slate-700">
              <span className="text-brand-600 mr-1.5">
                {selectedUnit?.code}
              </span>
              {selectedUnit?.title}
            </p>
            <p className="text-sm text-slate-600">
              <span className="text-brand-500 mr-1.5">{selectedLesson.code}</span>
              {selectedLesson.title}
            </p>
          </div>
        )}

        {/* ── Curriculum selectors (freeform mode only) ── */}
        {!isPreFilled && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Subject</label>
              <select
                className={inputClass}
                value={selectedSubject?.id ?? ''}
                onChange={(e) => handleSubjectChange(e.target.value)}
              >
                <option value="">Select subject…</option>
                {allSubjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Qualification</label>
              <select
                className={inputClass}
                value={selectedQual?.id ?? ''}
                onChange={(e) => handleQualChange(e.target.value)}
                disabled={!selectedSubject}
              >
                <option value="">Select qualification…</option>
                {selectedSubject?.qualifications.map((q) => (
                  <option key={q.id} value={q.id}>{q.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Year group</label>
              <select
                className={inputClass}
                value={selectedYearGroup?.id ?? ''}
                onChange={(e) => handleYearGroupChange(e.target.value)}
                disabled={!selectedQual}
              >
                <option value="">Select year group…</option>
                {selectedQual?.yearGroups.map((y) => (
                  <option key={y.id} value={y.id}>{y.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Unit</label>
              <select
                className={inputClass}
                value={selectedUnit?.id ?? ''}
                onChange={(e) => handleUnitChange(e.target.value)}
                disabled={!selectedYearGroup}
              >
                <option value="">Select unit…</option>
                {selectedYearGroup?.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.code} — {u.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Lesson</label>
              <select
                className={inputClass}
                value={selectedLesson?.id ?? ''}
                onChange={(e) => handleLessonChange(e.target.value)}
                disabled={!selectedUnit}
              >
                <option value="">Select lesson…</option>
                {selectedUnit?.lessons.map((l) => (
                  <option key={l.id} value={l.id}>{l.code} — {l.title}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* ── Title ── */}
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

        {/* ── Variant name ── */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Variant <span className="text-slate-400 font-normal">(optional — e.g. Higher, Foundation, Re-teach)</span>
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Leave blank for default version"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
          />
        </div>

        {/* ── Learning objectives preview ── */}
        {selectedLesson && selectedLesson.objectives && selectedLesson.objectives.length > 0 && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">Learning objectives</p>
            <ul className="space-y-1">
              {selectedLesson.objectives.map((obj) => (
                <li key={obj.id} className="text-xs text-slate-600 flex gap-2">
                  <span className="text-brand-400 mt-0.5 flex-shrink-0">›</span>
                  <span>{obj.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
        >
          Create presentation
        </button>
      </form>
    </div>
  );
}