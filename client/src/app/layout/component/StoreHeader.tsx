import { useEffect, useState } from "react";
import { IoSearch, IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function StoreHeader() {
  const [serach, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/products?search=${encodeURIComponent(serach)}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [serach]);

  return (
    <div className="sticky top-0 z-50 border-b border-copper-100 bg-cream/90 px-4 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 md:h-20">
        {/* Back Button */}
        <Link to="/">
          <div className="group flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-cream-200 active:scale-95">
            <IoArrowForward className="text-xl text-stone-600 transition-colors group-hover:text-copper-600" />
            <span className="text-sm font-medium text-ink-700 transition-colors group-hover:text-copper-700">
              بازگشت
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="group relative mx-4 max-w-xl flex-1">
          <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-stone-400 transition-colors group-focus-within:text-copper-600" />
          <input
            value={serach}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="جستجو در همه محصولات..."
            className="w-full rounded-2xl border-2 border-copper-200 bg-white/70 py-2.5 pr-12 pl-4 text-sm text-ink outline-none transition-all duration-300 placeholder:text-stone-400 hover:bg-white focus:border-copper-500 focus:bg-white focus:ring-4 focus:ring-copper-500/10"
          />
        </div>

        {/* Logo */}
        <Link to="/">
          <div className="shrink-0">
            <span className="font-display text-2xl tracking-wide text-copper-700 md:text-3xl">
              مس‌کده
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default StoreHeader;
