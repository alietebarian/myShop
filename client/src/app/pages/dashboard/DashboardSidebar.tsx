import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiBox, FiFolder, FiUsers, FiExternalLink, FiLogOut, FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { useAuth } from "../../../features/context/useAuth";
import { CopperMark } from "../../components/ui/Logo";

interface Props {
  collapsed: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}

const nav = [
  { to: "/dashboard/manageProducts", label: "محصولات", icon: FiBox },
  { to: "/dashboard/manageCategories", label: "دسته‌بندی‌ها", icon: FiFolder },
];

function DashboardSidebar({ collapsed, onToggle, onNavigate }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initial = user?.fullName?.trim()?.[0] ?? "A";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      collapsed ? "justify-center" : ""
    } ${isActive ? "bg-copper-600 text-white" : "text-stone-400 hover:bg-ink-700 hover:text-cream"}`;

  return (
    <div className="flex h-full flex-col bg-ink text-cream">
      <div className={`flex h-16 items-center border-b border-ink-700 px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link to="/" className="flex items-center gap-2.5" title="مشاهده فروشگاه">
          <CopperMark className="h-8 w-8" />
          {!collapsed && (
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-copper-300">مس‌کده</span>
              <span className="text-[10px] text-stone-400">پنل مدیریت</span>
            </span>
          )}
        </Link>
        {onToggle && !collapsed && (
          <button type="button" onClick={onToggle} className="rounded-lg p-1.5 text-stone-400 hover:bg-ink-700 hover:text-cream" aria-label="جمع کردن منو" title="جمع کردن منو">
            <FiChevronsRight />
          </button>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="منوی مدیریت">
        {!collapsed && <span className="px-3 pt-1 pb-2 text-[11px] font-semibold text-stone-500">مدیریت فروشگاه</span>}
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={onNavigate} title={collapsed ? label : undefined}>
            <Icon className="shrink-0 text-lg" />
            {!collapsed && label}
          </NavLink>
        ))}
        <span
          className={`flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 ${collapsed ? "justify-center" : ""}`}
          title="مدیریت کاربران — به‌زودی"
          aria-disabled
        >
          <FiUsers className="shrink-0 text-lg" />
          {!collapsed && (
            <>
              کاربران
              <span className="mr-auto rounded-md bg-ink-700 px-1.5 py-0.5 text-[10px] text-stone-400">به‌زودی</span>
            </>
          )}
        </span>
      </nav>

      <div className="space-y-1 border-t border-ink-700 p-3">
        {onToggle && collapsed && (
          <button type="button" onClick={onToggle} className="flex w-full justify-center rounded-xl py-2.5 text-stone-400 hover:bg-ink-700 hover:text-cream" aria-label="باز کردن منو" title="باز کردن منو">
            <FiChevronsLeft className="text-lg" />
          </button>
        )}
        <Link to="/" className={linkClass({ isActive: false })} title={collapsed ? "مشاهده فروشگاه" : undefined}>
          <FiExternalLink className="shrink-0 text-lg" />
          {!collapsed && "مشاهده فروشگاه"}
        </Link>

        <div className={`mt-2 flex items-center gap-3 rounded-xl bg-ink-700/60 p-2.5 ${collapsed ? "justify-center" : ""}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper-600 text-sm font-bold">{initial}</span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{user?.fullName}</span>
                <span className="block truncate text-[11px] text-stone-400" dir="ltr">{user?.email}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-red-500/15 hover:text-red-400"
                aria-label="خروج از حساب"
                title="خروج از حساب"
              >
                <FiLogOut />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
