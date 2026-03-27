import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import type { Presentation } from '../../types';
import { usePresentationStore } from '../../store/presentationStore';
import { allSubjects } from '../../data/curriculum';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform flex-shrink-0 ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Layout() {
  const presentations = usePresentationStore((s) => s.presentations);

  // Active subject selector — defaults to first subject with presentations, or first subject overall
  const firstUsedSubjectId = presentations[0]?.subjectId ?? allSubjects[0]?.id;
  const [activeSubjectId, setActiveSubjectId] = useState<string>(firstUsedSubjectId ?? '');

  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  const isOpen = (key: string, def = true) => (key in openNodes ? openNodes[key] : def);

  const activeSubject = allSubjects.find((s) => s.id === activeSubjectId);

  // Filter presentations to active subject, build Qual > Unit tree
  const subjectPresentations = presentations.filter((p) => p.subjectId === activeSubjectId);
  const treeNodes = buildSidebarTree(subjectPresentations, activeSubjectId);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-brand-900 text-white flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 flex-shrink-0">
          <span className="font-display text-lg font-bold tracking-tight">
            Pedagogy<span className="text-brand-400">Builder</span>
          </span>
        </div>

        {/* Subject selector — pinned */}
        <div className="px-3 pt-4 pb-2 flex-shrink-0">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Subject</p>
          <div className="flex flex-col gap-0.5">
            {allSubjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSubjectId(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  s.id === activeSubjectId
                    ? 'bg-brand-500 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Qual > Unit > Presentations tree */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 border-t border-white/10 pt-3">
          <NavLink
            to="/lessons"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors mb-2 ${
                isActive ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Presentations
          </NavLink>

          {activeSubject && treeNodes.map((qualNode) => {
            const qKey = qualNode.qualId;
            const qOpen = isOpen(qKey);
            return (
              <div key={qKey}>
                {/* Qualification */}
                <button
                  onClick={() => toggle(qKey)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronIcon open={qOpen} />
                  <span className="truncate">{qualNode.qualTitle}</span>
                </button>

                {qOpen && qualNode.units.map((unitNode) => {
                  const uKey = `${qKey}-${unitNode.unitId}`;
                  const uOpen = isOpen(uKey);
                  return (
                    <div key={uKey} className="ml-2">
                      {/* Unit */}
                      <button
                        onClick={() => toggle(uKey)}
                        className="w-full flex items-center gap-2 px-3 py-1 text-xs text-white/40 hover:text-white/70 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <ChevronIcon open={uOpen} />
                        <span className="text-brand-400 font-medium flex-shrink-0">{unitNode.unitCode}</span>
                        <span className="truncate">{unitNode.unitTitle}</span>
                      </button>

                      {/* Presentations */}
                      {uOpen && unitNode.presentations.map((p) => (
                        <Link
                          key={p.id}
                          to={`/builder/${p.id}`}
                          className="ml-3 flex items-center gap-1.5 px-3 py-1 text-xs text-white/35 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                          <span className="truncate">
                            {p.variantName ? `${p.title} — ${p.variantName}` : p.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* New presentation shortcut */}
          <div className="mt-3 px-3">
            <Link
              to="/lessons/new"
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors py-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New presentation
            </Link>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10 text-xs text-white/30 flex-shrink-0">
          Phase 2 build
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

// ─── Sidebar tree builder ─────────────────────────────────────────────────────

interface SidebarUnitNode { unitId: string; unitCode: string; unitTitle: string; presentations: Presentation[] }
interface SidebarQualNode { qualId: string; qualTitle: string; units: SidebarUnitNode[] }

function buildSidebarTree(presentations: Presentation[], subjectId: string): SidebarQualNode[] {
  const subject = allSubjects.find((s) => s.id === subjectId);
  const qualMap = new Map<string, SidebarQualNode>();

  for (const p of presentations) {
    const qual = subject?.qualifications.find((q) => q.id === p.qualificationId);
    const yg = qual?.yearGroups.find((y) => y.id === p.yearGroupId);
    const unit = yg?.units.find((u) => u.id === p.unitId);

    const qualTitle = qual?.title ?? p.qualificationId;
    const unitCode = unit?.code ?? '';
    const unitTitle = unit?.title ?? p.unitId;

    if (!qualMap.has(p.qualificationId)) {
      qualMap.set(p.qualificationId, { qualId: p.qualificationId, qualTitle, units: [] });
    }
    const qNode = qualMap.get(p.qualificationId)!;

    let uNode = qNode.units.find((u) => u.unitId === p.unitId);
    if (!uNode) {
      uNode = { unitId: p.unitId, unitCode, unitTitle, presentations: [] };
      qNode.units.push(uNode);
    }
    uNode.presentations.push(p);
  }

  return Array.from(qualMap.values());
}