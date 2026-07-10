import { useEffect, useState } from "react";
import { IoSearch, IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function StoreHeader() {

  const [ serach, setSearch ] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/products?search=${encodeURIComponent(serach)}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [serach]);

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/80 shadow-sm px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 md:h-20">
        {/* Back Button */}
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 rounded-xl hover:bg-gray-50/80 transition-all duration-200 active:scale-95">
            <IoArrowForward className="text-gray-500 text-xl group-hover:text-amber-600 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700 transition-colors">
              بازگشت
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-4 relative group">
          <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-600 transition-colors text-xl" />
          <input
            value={serach}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="جستجو در همه محصولات..."
            className="w-full pr-12 pl-4 py-2.5 rounded-2xl bg-gray-50/80 border-2 border-amber-500
                     focus:bg-white focus:border-amber-800 focus:ring-4 focus:ring-amber-500/10 
                     outline-none transition-all duration-300 text-sm text-gray-700 
                     placeholder:text-gray-400 hover:bg-gray-50"
          />
        </div>

        {/* Logo */}
        <Link to="/">
          <div className="flex-shrink-0">
            <span
              className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-wide 
            bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent"
            >
              مس کده
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default StoreHeader;
