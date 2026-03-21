import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePresentationStore } from '../store/presentationStore';
import { allSubjects } from '../data/curriculum';
import type { Presentation } from '../types';

function displayName(p: Presentation) {
  return p.variantName ? `${p.title} — ${p.variantName}` : p.title;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function LessonsPage() {
  const presentations = usePresentationStore((s) => s.presentations);
  const setActive = usePresentationStore((s) => s.setActivePresentation);

  // Track open/closed state for each grouping node
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  const isOpen = (key: string, defaultOpen = true) =>
    key in openNodes ? openNodes[key] : defaultOpen;

  if (presentations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-10">
        <PageHeader />
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-slate-500 text-sm">No presentations yet. Create your first one.</p>
          <Link
            to="/lessons/new"
            className="mt-4 inline-block text-brand-500 text-sm font-medium hover:underline"
          >
            Create a presentation →
          </Link>
        </div>
      </div>
    );
  }

  // Build a grouped structure from flat presentations array
  const grouped = buildGroupedTree(presentations);

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <PageHeader />
      <div className="space-y-3">
        {grouped.map((subjectGroup) => {
          const subjectKey = subjectGroup.subjectId;
          const subjectOpen = isOpen(subjectKey);
          return (
            <div key={subjectKey} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {/* Subject row */}
              <button
                onClick={() => toggle(subjectKey)}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                <ChevronIcon open={subjectOpen} />
                <span>{subjectGroup.subjectTitle}</span>
                <span className="ml-auto text-xs text-white/40 font-normal">
                  {subjectGroup.totalCount} presentation{subjectGroup.totalCount !== 1 ? 's' : ''}
                </span>
              </button>

              {subjectOpen && subjectGroup.qualifications.map((qualGroup) => {
                const qualKey = `${subjectKey}-${qualGroup.qualId}`;
                const qualOpen = isOpen(qualKey);
                return (
                  <div key={qualKey}>
                    {/* Qualification row */}
                    <button
                      onClick={() => toggle(qualKey)}
                      className="w-full flex items-center gap-2.5 px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors border-t border-slate-200"
                    >
                      <ChevronIcon open={qualOpen} />
                      <span>{qualGroup.qualTitle}</span>
                    </button>

                    {qualOpen && qualGroup.yearGroups.map((ygGroup) => {
                      const ygKey = `${qualKey}-${ygGroup.ygId}`;
                      const ygOpen = isOpen(ygKey);
                      return (
                        <div key={ygKey}>
                          {/* Year Group row */}
                          <button
                            onClick={() => toggle(ygKey)}
                            className="w-full flex items-center gap-2.5 px-7 py-2 bg-slate-50 text-slate-600 text-xs font-medium hover:bg-slate-100 transition-colors border-t border-slate-100"
                          >
                            <ChevronIcon open={ygOpen} />
                            <span>{ygGroup.ygTitle}</span>
                          </button>

                          {ygOpen && ygGroup.units.map((unitGroup) => {
                            const unitKey = `${ygKey}-${unitGroup.unitId}`;
                            const unitOpen = isOpen(unitKey);
                            return (
                              <div key={unitKey}>
                                {/* Unit row */}
                                <button
                                  onClick={() => toggle(unitKey)}
                                  className="w-full flex items-center gap-2.5 px-9 py-2 text-slate-500 text-xs hover:bg-slate-50 transition-colors border-t border-slate-100"
                                >
                                  <ChevronIcon open={unitOpen} />
                                  <span className="font-medium text-brand-600">{unitGroup.unitCode}</span>
                                  <span>{unitGroup.unitTitle}</span>
                                </button>

                                {unitOpen && (
                                  <div className="border-t border-slate-100">
                                    {unitGroup.presentations.map((p) => (
                                      <Link
                                        key={p.id}
                                        to={`/builder/${p.id}`}
                                        onClick={() => setActive(p.id)}
                                        className="group flex items-center justify-between px-11 py-3 hover:bg-brand-50 transition-colors border-t border-slate-50"
                                      >
                                        <div>
                                          <p className="text-sm font-medium text-slate-800 group-hover:text-brand-600 transition-colors">
                                            {displayName(p)}
                                          </p>
                                          <p className="text-xs text-slate-400 mt-0.5">
                                            {p.slides.length} slide{p.slides.length !== 1 ? 's' : ''}
                                            {p.variantName && (
                                              <span className="ml-2 bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded text-xs font-medium">
                                                {p.variantName}
                                              </span>
                                            )}
                                          </p>
                                        </div>
                                        <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </Link>
                                    ))}
                                  </div>
                                )}
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

interface UnitGroup {
  unitId: string;
  unitCode: string;
  unitTitle: string;
  presentations: Presentation[];
}

interface YearGroupGroup {
  ygId: string;
  ygTitle: string;
  units: UnitGroup[];
}

interface QualGroup {
  qualId: string;
  qualTitle: string;
  yearGroups: YearGroupGroup[];
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
    // Look up labels from curriculum data
    const subject = allSubjects.find((s) => s.id === p.subjectId);
    const qual = subject?.qualifications.find((q) => q.id === p.qualificationId);
    const yg = qual?.yearGroups.find((y) => y.id === p.yearGroupId);
    const unit = yg?.units.find((u) => u.id === p.unitId);

    const subjectTitle = subject?.title ?? p.subjectId;
    const qualTitle = qual?.title ?? p.qualificationId;
    const ygTitle = yg?.title ?? p.yearGroupId;
    const unitCode = unit?.code ?? '';
    const unitTitle = unit?.title ?? p.unitId;

    if (!subjectMap.has(p.subjectId)) {
      subjectMap.set(p.subjectId, { subjectId: p.subjectId, subjectTitle, totalCount: 0, qualifications: [] });
    }
    const subjectGroup = subjectMap.get(p.subjectId)!;
    subjectGroup.totalCount++;

    let qualGroup = subjectGroup.qualifications.find((q) => q.qualId === p.qualificationId);
    if (!qualGroup) {
      qualGroup = { qualId: p.qualificationId, qualTitle, yearGroups: [] };
      subjectGroup.qualifications.push(qualGroup);
    }

    let ygGroup = qualGroup.yearGroups.find((y) => y.ygId === p.yearGroupId);
    if (!ygGroup) {
      ygGroup = { ygId: p.yearGroupId, ygTitle, units: [] };
      qualGroup.yearGroups.push(ygGroup);
    }

    let unitGroup = ygGroup.units.find((u) => u.unitId === p.unitId);
    if (!unitGroup) {
      unitGroup = { unitId: p.unitId, unitCode, unitTitle, presentations: [] };
      ygGroup.units.push(unitGroup);
    }

    unitGroup.presentations.push(p);
  }

  return Array.from(subjectMap.values());
}