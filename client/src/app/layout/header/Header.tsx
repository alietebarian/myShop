import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { PiBasketLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../../../lib/hooks/useCart";
import { useAuth } from "../../../features/context/useAuth";

function Header() {
  const { data: cartItem } = useCart();
  const { user, token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white px-4 shadow-sm md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 md:h-20">
        {/* Logo - Left side (RTL) */}
        <Link to="/" className="shrink-0">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold tracking-wide text-amber-700">
              مس کده
            </span>
            <span className="text-[10px] font-light text-gray-400">
              ظروف و شمش مس
            </span>
          </div>
        </Link>

        {/* Desktop User Actions - Right side */}
        <div className="hidden shrink-0 items-center gap-1 md:flex md:gap-2">
          {user?.role === "Admin" ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-amber-50 group"
            >
              <span className="text-xs font-medium text-amber-700 group-hover:text-amber-800">
                پنل مدیریت
              </span>
              <RiAdminLine className="text-lg text-amber-600" />
            </Link>
          ) : null}

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              to="/products"
              className="border-b-2 border-transparent pb-0.5 text-sm font-medium text-gray-600 transition-colors hover:text-amber-700"
            >
              همه محصولات
            </Link>
          </nav>

          {token && (
            <Link
              to="/orders"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-gray-50 group"
              aria-label="سفارش‌های من"
            >
              <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-amber-700">
                سفارش‌های من
              </span>
              <HiOutlineClipboardList className="text-xl text-gray-600 transition-colors group-hover:text-amber-700" />
            </Link>
          )}

          {token ? (
            <span
              onClick={logout}
              className="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:text-amber-700"
            >
              خروج از حساب کاربری
            </span>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-gray-50 group"
            >
              <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-amber-700">
                ورود / ثبت نام
              </span>
              <CiUser className="text-xl text-gray-600 transition-colors group-hover:text-amber-700" />
            </Link>
          )}

          {token && (
            <Link
              to="/cart"
              className="relative rounded-full p-2 transition-all hover:bg-gray-50 group"
              aria-label="سبد خرید"
            >
              <PiBasketLight className="text-2xl text-gray-600 transition-all group-hover:scale-110 group-hover:text-amber-700" />
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white shadow-sm">
                {cartItem?.items.length}
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Right Side - Cart + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {token && (
            <Link
              to="/cart"
              className="relative rounded-full p-2 transition-all hover:bg-gray-50"
              aria-label="سبد خرید"
            >
              <PiBasketLight className="text-2xl text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white shadow-sm">
                {cartItem?.items.length}
              </span>
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="باز کردن منو"
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-50"
          >
            <HiOutlineMenuAlt3 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile Drawer - از چپ باز می‌شه */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold text-amber-700">منو</span>
          <button
            onClick={closeMenu}
            aria-label="بستن منو"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex flex-col gap-1 p-4">
          <Link
            to="/products"
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-amber-50 hover:text-amber-700"
          >
            همه محصولات
          </Link>

          {user?.role === "Admin" && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-50"
            >
              <RiAdminLine className="text-lg" />
              پنل مدیریت
            </Link>
          )}

          {token && (
            <Link
              to="/orders"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-amber-50 hover:text-amber-700"
            >
              <HiOutlineClipboardList className="text-lg" />
              سفارش‌های من
            </Link>
          )}

          <div className="my-2 border-t border-gray-100" />

          {token ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="rounded-xl px-4 py-3 text-right text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              خروج از حساب کاربری
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-amber-50 hover:text-amber-700"
            >
              <CiUser className="text-lg" />
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;