import { useNavigate } from 'react-router-dom';
import { allSubjects } from '../../data/curriculum';
import type { Presentation } from '../../types';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function unitCode(p: Presentation): string {
  const subject = allSubjects.find((s) => s.id === p.subjectId);
  const qual = subject?.qualifications.find((q) => q.id === p.qualificationId);
  const yg = qual?.yearGroups.find((y) => y.id === p.yearGroupId);
  const unit = yg?.units.find((u) => u.id === p.unitId);
  return unit?.code ?? '';
}

interface Props {
  presentations: Presentation[];
}

export default function RecentPresentations({ presentations }: Props) {
  const navigate = useNavigate();

  if (presentations.length === 0) return null;

  const recent = [...presentations]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  return (
    <div className="mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Recent
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {recent.map((p) => {
          const displayTitle = p.variantName ? `${p.title} — ${p.variantName}` : p.title;
          const code = unitCode(p);
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/builder/${p.id}`)}
              className="group text-left bg-white border border-slate-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-brand-600">{code}</span>
                <span className="text-xs text-slate-300">
                  {p.slides.length} slide{p.slides.length !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                {displayTitle}
              </p>
              <p className="mt-2 text-xs text-slate-400">{timeAgo(p.updatedAt)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}