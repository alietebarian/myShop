import { BiSearch } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { PiBasketLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useCart } from "../../../lib/hooks/useCart";

function Header() {
  const { data: cartItem } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 md:h-20">
        {/* Logo - Left side (RTL) */}
        <Link to="/" className="shrink-0">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold text-amber-700 tracking-wide">
              مس کده
            </span>
            <span className="text-[10px] text-gray-400 font-light">
              ظروف و شمش مس
            </span>
          </div>
        </Link>

        {/* Search - Center */}
        <div className="flex-1 max-w-xl mx-4 hidden sm:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="جستجو محصول..."
              className="w-full px-5 py-2.5 pr-12 rounded-full border-amber-400 bg-gray-50 border-2 focus:border-amber-600 focus:bg-white focus:outline-none transition-all duration-300 text-sm text-gray-700 placeholder:text-gray-400"
            />
            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full transition-all duration-300 hover:scale-105"
              aria-label="جستجو"
            >
              <BiSearch size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button className="sm:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors">
          <BiSearch size={22} />
        </button>

        {/* User Actions - Right side */}
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/products"
              className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors border-b-2 border-transparent hover:border-amber-600 pb-0.5"
            >
              همه محصولات
            </Link>
          </nav>
          {/* Admin */}
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-all group"
          >
            <span className="text-xs font-medium text-amber-700 group-hover:text-amber-800">
              پنل مدیریت
            </span>
            <RiAdminLine className="text-amber-600 text-lg" />
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all group"
          >
            <span className="text-xs font-medium text-gray-600 group-hover:text-amber-700 transition-colors hidden sm:inline">
              ورود / ثبت نام
            </span>
            <CiUser className="text-gray-600 text-xl group-hover:text-amber-700 transition-colors" />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-50 transition-all group"
            aria-label="سبد خرید"
          >
            <PiBasketLight className="text-gray-600 text-2xl group-hover:text-amber-700 group-hover:scale-110 transition-all" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartItem?.items.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
