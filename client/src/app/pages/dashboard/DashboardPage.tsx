import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import DashboardSidebar from "./DashboardSidebar";
import { CopperMark } from "../../components/ui/Logo";

function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-cream-100/70">
      {/* Desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 border-l border-ink-700 transition-[width] duration-200 lg:block ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/50" onClick={() => setDrawerOpen(false)} aria-hidden />
          <aside className="absolute top-0 right-0 h-full w-72 animate-slide-in shadow-lift" role="dialog" aria-modal="true" aria-label="منوی مدیریت">
            <DashboardSidebar collapsed={false} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur lg:hidden">
          <button type="button" className="icon-btn -mr-2" onClick={() => setDrawerOpen(true)} aria-label="باز کردن منو">
            <HiOutlineMenuAlt3 className="text-2xl" />
          </button>
          <CopperMark className="h-7 w-7" />
          <span className="font-display text-lg text-copper-700">پنل مدیریت</span>
        </header>

        <main key={pathname} className="mx-auto w-full max-w-6xl animate-fade-in px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
