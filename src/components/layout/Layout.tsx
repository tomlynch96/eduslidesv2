import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar nav */}
      <aside className="w-56 flex-shrink-0 bg-brand-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="font-display text-lg font-bold tracking-tight">
            Pedagogy<span className="text-brand-500">Builder</span>
          </span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink
            to="/lessons"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Lessons
          </NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-white/10 text-xs text-white/30">
          Phase 1 build
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
