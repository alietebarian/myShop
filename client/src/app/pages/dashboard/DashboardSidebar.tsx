import { useState } from "react";
import { HiOutlineMenuAlt2, HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { IoFolderOpen } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

function DashboardSidebar() {
  const [closeSidebar, setCloseSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menuClass = (isActive: boolean) =>
    `group flex items-center ${
      closeSidebar ? "justify-center" : ""
    } gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-copper-600 text-cream"
        : "text-stone-400 hover:bg-ink-700 hover:text-cream"
    }`;

  const initial = (user.fullName?.[0] ?? "A").toUpperCase();

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col justify-between border-l border-ink-700 bg-ink text-cream transition-[width] duration-200 ${
        closeSidebar ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-ink-700 px-5 py-5">
          {!closeSidebar && (
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-wide text-copper-300">
                مس‌کده
              </span>
              <span className="mt-0.5 text-[11px] text-stone-400">
                پنل مدیریت
              </span>
            </div>
          )}

          <button
            onClick={() => setCloseSidebar(!closeSidebar)}
            aria-label={closeSidebar ? "باز کردن منو" : "جمع کردن منو"}
            className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-ink-700 hover:text-cream"
          >
            {closeSidebar ? (
              <HiOutlineMenuAlt2 className="text-xl" />
            ) : (
              <HiOutlineChevronDoubleLeft className="text-xl" />
            )}
          </button>
        </div>

        {/* User Card */}
        <div className="p-4">
          <div
            className={`flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-700/60 p-3 ${
              closeSidebar ? "justify-center" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper-600 text-sm font-bold text-cream">
              {initial}
            </div>

            {!closeSidebar && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-cream">
                  {user.fullName}
                </span>
                <span className="truncate text-xs text-stone-400">
                  {user.email}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 px-3">
          {!closeSidebar && (
            <span className="px-3.5 pb-2 text-[11px] font-semibold tracking-wide text-stone-400">
              مدیریت فروشگاه
            </span>
          )}

          <NavLink
            to="/dashboard/manageProducts"
            className={({ isActive }) => menuClass(isActive)}
          >
            <FaBoxOpen className="shrink-0 text-lg" />
            {!closeSidebar && <span>مدیریت محصولات</span>}
          </NavLink>

          <NavLink
            to="/dashboard/manageCategories"
            className={({ isActive }) => menuClass(isActive)}
          >
            <IoFolderOpen className="shrink-0 text-lg" />
            {!closeSidebar && <span>مدیریت دسته‌بندی</span>}
          </NavLink>

          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) => menuClass(isActive)}
          >
            <MdManageAccounts className="shrink-0 text-lg" />
            {!closeSidebar && <span>مدیریت کاربران</span>}
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-ink-700 p-3">
        <Link to="/">
          <button
            className={`flex w-full items-center ${
              closeSidebar ? "justify-center" : ""
            } gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400`}
          >
            <IoIosExit className="shrink-0 text-lg" />
            {!closeSidebar && <span>خروج از پنل</span>}
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
