import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiShoppingBagOpen, PiUser } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { FiGrid, FiLogOut, FiPackage, FiHome, FiShoppingBag } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useCart } from "../../../lib/hooks/useCart";
import { useCategories } from "../../../lib/hooks/useCategories";
import { useAuth } from "../../../features/context/useAuth";
import { formatNumber } from "../../../lib/utils/format";
import Logo from "../../components/ui/Logo";
import SearchBar from "./SearchBar";

function CartButton({ count }: { count: number }) {
  return (
    <Link to="/cart" className="icon-btn relative h-11 w-11" aria-label={`سبد خرید، ${formatNumber(count)} کالا`} title="سبد خرید">
      <PiShoppingBagOpen className="text-2xl" />
      {count > 0 && (
        <span className="absolute -top-0.5 -left-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-copper-600 px-1 text-[10px] font-bold text-white">
          {formatNumber(count)}
        </span>
      )}
    </Link>
  );
}

function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initial = user?.fullName?.trim()?.[0] ?? "؟";
  const item =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-cream-100 hover:text-copper-700";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-xl px-2 transition-colors hover:bg-cream-100"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-copper-100 text-sm font-bold text-copper-700">
          {initial}
        </span>
        <span className="hidden max-w-28 truncate text-sm font-medium text-ink-700 lg:block">{user?.fullName}</span>
        <IoChevronDown className={`text-stone-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 mt-2 w-60 animate-pop-in rounded-2xl border border-line bg-white p-2 shadow-lift"
        >
          <div className="border-b border-line px-3 pt-1.5 pb-3">
            <p className="truncate text-sm font-bold text-ink">{user?.fullName}</p>
            <p className="truncate text-xs text-stone-500" dir="ltr">
              {user?.email}
            </p>
          </div>
          <div className="pt-2">
            {user?.role === "Admin" && (
              <Link to="/dashboard" role="menuitem" className={item} onClick={() => setOpen(false)}>
                <RiAdminLine className="text-lg" /> پنل مدیریت
              </Link>
            )}
            <Link to="/orders" role="menuitem" className={item} onClick={() => setOpen(false)}>
              <FiPackage className="text-lg" /> سفارش‌های من
            </Link>
            <button
              type="button"
              role="menuitem"
              className={`${item} hover:bg-red-50 hover:text-red-600`}
              onClick={() => {
                setOpen(false);
                logout();
                navigate("/");
              }}
            >
              <FiLogOut className="text-lg" /> خروج از حساب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  const { user, token, logout } = useAuth();
  const { data: cart } = useCart(!!token);
  const { data: categories } = useCategories(1, 8, "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const activeCategories = categories?.items.filter((c) => c.status) ?? [];
  const currentCategory = new URLSearchParams(location.search).get("category");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `relative py-3 text-sm font-medium transition-colors ${
      isActive ? "text-copper-700" : "text-ink-700 hover:text-copper-700"
    }`;

  const drawerLink =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-cream-100 hover:text-copper-700";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Main bar */}
      <div className="container-page flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="باز کردن منو"
          className="icon-btn -mr-2 md:hidden"
        >
          <HiOutlineMenuAlt3 className="text-2xl" />
        </button>

        <Logo />

        <div className="hidden max-w-xl flex-1 md:block">
          <SearchBar />
        </div>

        <div className="mr-auto flex items-center gap-1">
          {token ? (
            <div className="hidden md:block">
              <AccountMenu />
            </div>
          ) : (
            <Link to="/login" className="btn btn-secondary hidden h-11 md:inline-flex">
              <PiUser className="text-lg" />
              ورود | ثبت‌نام
            </Link>
          )}

          <span className="mx-1 hidden h-6 w-px bg-line md:block" />

          <CartButton count={cartCount} />
        </div>
      </div>

      {/* Mobile search */}
      <div className="container-page pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Desktop category nav */}
      <nav className="hidden border-t border-line md:block" aria-label="دسته‌بندی‌ها">
        <div className="container-page flex items-center gap-7 overflow-x-auto no-scrollbar">
          <NavLink to="/" end className={navLink}>
            خانه
          </NavLink>
          <NavLink
            to="/products"
            end
            className={({ isActive }) => navLink({ isActive: isActive && !currentCategory })}
          >
            همه محصولات
          </NavLink>
          {activeCategories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.id}`}
              className={navLink({ isActive: currentCategory === c.id })}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile drawer (opens from the right in RTL) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/50" onClick={closeMenu} aria-hidden />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="منوی اصلی"
            className="absolute top-0 right-0 flex h-full w-[85%] max-w-xs animate-slide-in flex-col bg-white shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Logo onClick={closeMenu} showTagline={false} />
              <button type="button" onClick={closeMenu} aria-label="بستن منو" className="icon-btn">
                <IoClose className="text-2xl" />
              </button>
            </div>

            {token ? (
              <div className="mx-4 mt-4 flex items-center gap-3 rounded-xl bg-cream-100 p-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-copper-100 font-bold text-copper-700">
                  {user?.fullName?.trim()?.[0] ?? "؟"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{user?.fullName}</p>
                  <p className="truncate text-xs text-stone-500" dir="ltr">
                    {user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-4 pt-4">
                <Link to="/login" onClick={closeMenu} className="btn btn-primary w-full">
                  <PiUser className="text-lg" /> ورود | ثبت‌نام
                </Link>
              </div>
            )}

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
              <Link to="/" onClick={closeMenu} className={drawerLink}>
                <FiHome className="text-lg" /> خانه
              </Link>
              <Link to="/products" onClick={closeMenu} className={drawerLink}>
                <FiShoppingBag className="text-lg" /> همه محصولات
              </Link>
              {token && (
                <Link to="/orders" onClick={closeMenu} className={drawerLink}>
                  <FiPackage className="text-lg" /> سفارش‌های من
                </Link>
              )}
              {user?.role === "Admin" && (
                <Link to="/dashboard" onClick={closeMenu} className={drawerLink}>
                  <RiAdminLine className="text-lg" /> پنل مدیریت
                </Link>
              )}

              {activeCategories.length > 0 && (
                <>
                  <p className="mt-4 mb-1 flex items-center gap-2 px-4 text-xs font-semibold text-stone-500">
                    <FiGrid /> دسته‌بندی‌ها
                  </p>
                  {activeCategories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/products?category=${c.id}`}
                      onClick={closeMenu}
                      className="rounded-xl px-4 py-2.5 text-sm text-ink-700 transition-colors hover:bg-cream-100 hover:text-copper-700"
                    >
                      {c.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {token && (
              <div className="border-t border-line p-3">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                    navigate("/");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <FiLogOut className="text-lg" /> خروج از حساب
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </header>
  );
}

export default Header;
