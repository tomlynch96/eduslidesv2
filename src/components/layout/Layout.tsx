import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isBuilder = location.pathname.startsWith('/builder/');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Sidebar — only shown in builder */}
      {isBuilder && (
        <aside className="w-56 flex-shrink-0 bg-brand-900 text-white flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/10 flex-shrink-0">
            <Link to="/lessons" className="font-display text-lg font-bold tracking-tight hover:opacity-80 transition-opacity">
              Pedagogy<span className="text-brand-400">Builder</span>
            </Link>
          </div>

          {/* Assistant placeholder */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 gap-3 text-center">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <p className="text-xs text-white/25 leading-relaxed">
              Lesson assistant<br />coming soon
            </p>
          </div>

          {/* Phase label */}
          <div className="px-4 py-4 border-t border-white/10 text-xs text-white/20 flex-shrink-0">
            Phase 3 build
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}