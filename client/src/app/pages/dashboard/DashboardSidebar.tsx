import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
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
    } gap-4 rounded-xl p-3 transition-all duration-200 ${
      isActive
        ? "bg-amber-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`h-screen bg-slate-900 text-white flex flex-col justify-between transition-all duration-300 shadow-2xl border-l border-slate-800 ${
        closeSidebar ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          {!closeSidebar && (
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-amber-500">
                مس کده
              </span>

              <span className="text-xs text-slate-400 mt-1">پنل مدیریت</span>
            </div>
          )}

          <button
            onClick={() => setCloseSidebar(!closeSidebar)}
            className="text-2xl text-slate-300 hover:text-amber-500 transition cursor-pointer"
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4">
          <div
            className={`rounded-xl bg-slate-800 border border-slate-700 p-4 transition-all ${
              closeSidebar ? "flex justify-center" : ""
            }`}
          >
            {closeSidebar ? (
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-lg font-bold">
                A
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-lg font-bold">
                  A
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold">{user.fullName}</span>

                  <span className="text-xs text-slate-400">
                    {user.email}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="px-3 flex flex-col gap-2">
          <NavLink
            to="/dashboard/manageProducts"
            className={({ isActive }) => menuClass(isActive)}
          >
            <FaBoxOpen className="text-xl text-current" />

            {!closeSidebar && (
              <span className="font-medium">مدیریت محصولات</span>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/manageCategories"
            className={({ isActive }) => menuClass(isActive)}
          >
            <IoFolderOpen className="text-xl text-current" />

            {!closeSidebar && (
              <span className="font-medium">مدیریت دسته‌بندی</span>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) => menuClass(isActive)}
          >
            <MdManageAccounts className="text-xl text-current" />

            {!closeSidebar && (
              <span className="font-medium">مدیریت کاربران</span>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700">
        <Link to="/">
          <button
            className={`w-full flex items-center ${
              closeSidebar ? "justify-center" : ""
            } gap-4 rounded-xl p-3 text-red-400 hover:bg-red-500 hover:text-white transition`}
          >
            <IoIosExit className="text-2xl" />

            {!closeSidebar && <span className="font-medium">خروج از پنل</span>}
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
