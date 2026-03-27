import { usePresentationStore } from '../store/presentationStore';
import RecentPresentations from '../components/presentations/RecentPresentations';
import CurriculumTree from '../components/curriculum/CurriculumTree';

function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Curriculum</h1>
      <p className="text-slate-500 text-sm mt-1">Find a lesson, then create a presentation</p>
    </div>
  );
}

export default function LessonsPage() {
  const presentations = usePresentationStore((s) => s.presentations);
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <PageHeader />
      <RecentPresentations presentations={presentations} />
      <CurriculumTree presentations={presentations} />
    </div>
  );
}