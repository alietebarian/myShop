import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

function ProductHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/80 shadow-sm px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 md:h-20">
        {/* Back Button */}
        <Link to="/products">
          <div className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 rounded-xl hover:bg-gray-50/80 transition-all duration-200 active:scale-95">
            <IoArrowForward className="text-gray-500 text-xl group-hover:text-amber-600 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700 transition-colors">
              بازگشت
            </span>
          </div>
        </Link>

        {/* Logo */}
        <Link to="/">
          <div className="shrink-0">
            <span
              className="text-2xl md:text-3xl font-extrabold tracking-wide 
            bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent"
            >
              مس کده
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductHeader;
