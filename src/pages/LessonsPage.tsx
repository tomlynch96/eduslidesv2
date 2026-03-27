import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { allSubjects } from '../data/curriculum';
import type { Presentation } from '../types';

// ─── Unit section with slide-in versions panel ────────────────────────────────

function UnitSection({ unitGroup }: { unitGroup: UnitGroup }) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const navigate = useNavigate();
  const setActive = usePresentationStore((s) => s.setActivePresentation);

  const selectedLesson = unitGroup.lessons.find((l) => l.lessonId === selectedLessonId);

  const openPresentation = (p: Presentation) => {
    setActive(p.id);
    navigate(`/builder/${p.id}`);
  };

  return (
    <div className="flex overflow-hidden transition-all">
      {/* Lessons list — compresses when a lesson is selected */}
      <div className={`transition-all duration-300 ease-in-out ${selectedLessonId ? 'w-1/2' : 'w-full'}`}>
        {unitGroup.lessons.map((lessonGroup) => {
          const isSelected = lessonGroup.lessonId === selectedLessonId;
          const hasVariants = lessonGroup.presentations.length > 1;
          const defaultP = lessonGroup.presentations[0];

          return (
            <div
              key={lessonGroup.lessonId}
              className={`border-t border-slate-100 flex items-center justify-between px-11 py-3 cursor-pointer transition-colors ${
                isSelected ? 'bg-brand-50' : 'hover:bg-slate-50'
              }`}
              onClick={() => {
                if (hasVariants) {
                  setSelectedLessonId(isSelected ? null : lessonGroup.lessonId);
                } else {
                  openPresentation(defaultP);
                }
              }}
            >
              <div>
                <p className={`text-sm font-medium transition-colors ${isSelected ? 'text-brand-600' : 'text-slate-800'}`}>
                  <span className="text-slate-400 font-normal mr-2">{lessonGroup.lessonCode}</span>
                  {lessonGroup.lessonTitle}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {defaultP.slides.length} slide{defaultP.slides.length !== 1 ? 's' : ''}
                  {hasVariants && (
                    <span className={`ml-2 font-medium ${isSelected ? 'text-brand-500' : 'text-slate-400'}`}>
                      {lessonGroup.presentations.length} versions
                    </span>
                  )}
                </p>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isSelected ? 'text-brand-400 rotate-180' : 'text-slate-300'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Versions panel — squeezes in from the right */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden border-l border-slate-100 ${
        selectedLessonId ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
      }`}>
        {selectedLesson && (
          <div className="h-full bg-slate-50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Versions</p>
              <button
                onClick={() => setSelectedLessonId(null)}
                className="text-slate-300 hover:text-slate-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedLesson.presentations.map((p) => (
              <button
                key={p.id}
                onClick={() => openPresentation(p)}
                className="w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-white transition-colors flex items-center justify-between gap-2 group"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
                    {p.variantName || 'Default'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {p.slides.length} slide{p.slides.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Collapsible section ──────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const presentations = usePresentationStore((s) => s.presentations);
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  const isOpen = (key: string, defaultOpen = true) => key in openNodes ? openNodes[key] : defaultOpen;

  if (presentations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-10">
        <PageHeader />
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-slate-500 text-sm">No presentations yet. Create your first one.</p>
          <Link to="/lessons/new" className="mt-4 inline-block text-brand-500 text-sm font-medium hover:underline">
            Create a presentation →
          </Link>
        </div>
      </div>
    );
  }

  const grouped = buildGroupedTree(presentations);

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <PageHeader />
      <div className="space-y-3">
        {grouped.map((subjectGroup) => {
          const sKey = subjectGroup.subjectId;
          return (
            <div key={sKey} className="bg-white border border-slate-200 rounded-xl">
              {/* Subject header */}
              <button
                onClick={() => toggle(sKey)}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors rounded-t-xl"
              >
                <ChevronIcon open={isOpen(sKey)} />
                <span>{subjectGroup.subjectTitle}</span>
                <span className="ml-auto text-xs text-white/40 font-normal">
                  {subjectGroup.totalCount} presentation{subjectGroup.totalCount !== 1 ? 's' : ''}
                </span>
              </button>

              {isOpen(sKey) && subjectGroup.qualifications.map((qualGroup) => {
                const qKey = `${sKey}-${qualGroup.qualId}`;
                return (
                  <div key={qKey}>
                    <button
                      onClick={() => toggle(qKey)}
                      className="w-full flex items-center gap-2.5 px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors border-t border-slate-200"
                    >
                      <ChevronIcon open={isOpen(qKey)} />
                      <span>{qualGroup.qualTitle}</span>
                    </button>

                    {isOpen(qKey) && qualGroup.units.map((unitGroup) => {
                      const uKey = `${qKey}-${unitGroup.unitId}`;
                      return (
                        <div key={uKey}>
                          <button
                            onClick={() => toggle(uKey)}
                            className="w-full flex items-center gap-2.5 px-7 py-2 text-slate-500 text-xs hover:bg-slate-50 transition-colors border-t border-slate-100"
                          >
                            <ChevronIcon open={isOpen(uKey)} />
                            <span className="font-semibold text-brand-600 mr-1">{unitGroup.unitCode}</span>
                            <span>{unitGroup.unitTitle}</span>
                          </button>

                          {isOpen(uKey) && <UnitSection unitGroup={unitGroup} />}
                        </div>
                      );
                    })}
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

function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Presentations</h1>
        <p className="text-slate-500 text-sm mt-1">Organised by curriculum</p>
      </div>
      <Link
        to="/lessons/new"
        className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Presentation
      </Link>
    </div>
  );
}

// ─── Tree builder ─────────────────────────────────────────────────────────────

interface LessonGroup {
  lessonId: string;
  lessonCode: string;
  lessonTitle: string;
  presentations: Presentation[];
}

interface UnitGroup {
  unitId: string;
  unitCode: string;
  unitTitle: string;
  lessons: LessonGroup[];
}

interface QualGroup {
  qualId: string;
  qualTitle: string;
  units: UnitGroup[];
}

interface SubjectGroup {
  subjectId: string;
  subjectTitle: string;
  totalCount: number;
  qualifications: QualGroup[];
}

function buildGroupedTree(presentations: Presentation[]): SubjectGroup[] {
  const subjectMap = new Map<string, SubjectGroup>();

  for (const p of presentations) {
    const subject = allSubjects.find((s) => s.id === p.subjectId);
    const qual = subject?.qualifications.find((q) => q.id === p.qualificationId);
    const yg = qual?.yearGroups.find((y) => y.id === p.yearGroupId);
    const unit = yg?.units.find((u) => u.id === p.unitId);
    const lesson = unit?.lessons.find((l) => l.id === p.lessonId);

    const subjectTitle = subject?.title ?? p.subjectId;
    const qualTitle = qual?.title ?? p.qualificationId;
    const unitCode = unit?.code ?? '';
    const unitTitle = unit?.title ?? p.unitId;
    const lessonCode = lesson?.code ?? '';
    const lessonTitle = lesson?.title ?? p.title;

    if (!subjectMap.has(p.subjectId)) {
      subjectMap.set(p.subjectId, { subjectId: p.subjectId, subjectTitle, totalCount: 0, qualifications: [] });
    }
    const sGroup = subjectMap.get(p.subjectId)!;
    sGroup.totalCount++;

    let qGroup = sGroup.qualifications.find((q) => q.qualId === p.qualificationId);
    if (!qGroup) { qGroup = { qualId: p.qualificationId, qualTitle, units: [] }; sGroup.qualifications.push(qGroup); }

    let uGroup = qGroup.units.find((u) => u.unitId === p.unitId);
    if (!uGroup) { uGroup = { unitId: p.unitId, unitCode, unitTitle, lessons: [] }; qGroup.units.push(uGroup); }

    let lGroup = uGroup.lessons.find((l) => l.lessonId === p.lessonId);
    if (!lGroup) { lGroup = { lessonId: p.lessonId, lessonCode, lessonTitle, presentations: [] }; uGroup.lessons.push(lGroup); }

    lGroup.presentations.push(p);
  }

  return Array.from(subjectMap.values());
}