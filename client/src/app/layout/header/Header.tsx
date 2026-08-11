import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { PiBasketLight } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../../../lib/hooks/useCart";
import { useAuth } from "../../../features/context/useAuth";

function CopperMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9 shrink-0">
      <circle cx="24" cy="24" r="23" fill="#b96b2c" />
      <path
        d="M13 20c2-6 8-10 11-10s9 4 11 10c-2 3-6 4-11 4s-9-1-11-4Z"
        fill="#7c421f"
      />
      <ellipse cx="24" cy="20" rx="11" ry="3.4" fill="#e2ab77" />
      <path
        d="M14 22c0 7 4.5 13 10 13s10-6 10-13"
        stroke="#3f2316"
        strokeWidth="1.4"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function Header() {
  const { data: cartItem } = useCart();
  const { user, token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-copper-100 bg-cream/95 px-4 backdrop-blur-sm md:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 md:h-20">
        {/* Logo - Left side (RTL) */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <CopperMark />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl tracking-wide text-copper-700">
              مس‌کده
            </span>
            <span className="text-[10px] font-medium tracking-wide text-stone-400">
              ظروف و صنایع دستی مسی
            </span>
          </div>
        </Link>

        {/* Desktop User Actions - Right side */}
        <div className="hidden shrink-0 items-center gap-1 md:flex md:gap-2">
          {user?.role === "Admin" ? (
            <Link
              to="/dashboard"
              className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-copper-50"
            >
              <span className="text-xs font-medium text-copper-700 group-hover:text-copper-800">
                پنل مدیریت
              </span>
              <RiAdminLine className="text-lg text-copper-600" />
            </Link>
          ) : null}

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              to="/products"
              className="border-b-2 border-transparent pb-0.5 text-sm font-medium text-ink-700 transition-colors hover:border-copper-400 hover:text-copper-700"
            >
              همه محصولات
            </Link>
          </nav>

          {token && (
            <Link
              to="/orders"
              className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-cream-200"
              aria-label="سفارش‌های من"
            >
              <span className="text-xs font-medium text-ink-700 transition-colors group-hover:text-copper-700">
                سفارش‌های من
              </span>
              <HiOutlineClipboardList className="text-xl text-ink-700 transition-colors group-hover:text-copper-700" />
            </Link>
          )}

          {token ? (
            <span
              onClick={logout}
              className="cursor-pointer text-xs font-medium text-stone-600 transition-colors hover:text-copper-700"
            >
              خروج از حساب کاربری
            </span>
          ) : (
            <Link
              to="/login"
              className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:bg-cream-200"
            >
              <span className="text-xs font-medium text-ink-700 transition-colors group-hover:text-copper-700">
                ورود / ثبت نام
              </span>
              <CiUser className="text-xl text-ink-700 transition-colors group-hover:text-copper-700" />
            </Link>
          )}

          {token && (
            <Link
              to="/cart"
              className="group relative rounded-full p-2 transition-all hover:bg-cream-200"
              aria-label="سبد خرید"
            >
              <PiBasketLight className="text-2xl text-ink-700 transition-all group-hover:scale-110 group-hover:text-copper-700" />
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cream bg-patina-600 text-[10px] font-bold text-white shadow-sm">
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
              className="relative rounded-full p-2 transition-all hover:bg-cream-200"
              aria-label="سبد خرید"
            >
              <PiBasketLight className="text-2xl text-ink-700" />
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cream bg-patina-600 text-[10px] font-bold text-white shadow-sm">
                {cartItem?.items.length}
              </span>
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="باز کردن منو"
            className="rounded-full p-2 text-ink-700 transition hover:bg-cream-200"
          >
            <HiOutlineMenuAlt3 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-ink/50 md:hidden"
        />
      )}

      {/* Mobile Drawer - از چپ باز می‌شه */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-cream shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-copper-100 px-5 py-4">
          <span className="font-display text-xl text-copper-700">منو</span>
          <button
            onClick={closeMenu}
            aria-label="بستن منو"
            className="rounded-full p-2 text-stone-600 transition hover:bg-cream-200"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex flex-col gap-1 p-4">
          <Link
            to="/products"
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition hover:bg-copper-50 hover:text-copper-700"
          >
            همه محصولات
          </Link>

          {user?.role === "Admin" && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-copper-700 transition hover:bg-copper-50"
            >
              <RiAdminLine className="text-lg" />
              پنل مدیریت
            </Link>
          )}

          {token && (
            <Link
              to="/orders"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition hover:bg-copper-50 hover:text-copper-700"
            >
              <HiOutlineClipboardList className="text-lg" />
              سفارش‌های من
            </Link>
          )}

          <div className="my-2 border-t border-copper-100" />

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
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition hover:bg-copper-50 hover:text-copper-700"
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
