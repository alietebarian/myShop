import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

function ProductHeader() {
  return (
    <div className="sticky top-0 z-50 border-b border-copper-100 bg-cream/90 px-4 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 md:h-20">
        {/* Back Button */}
        <Link to="/products">
          <div className="group flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-cream-200 active:scale-95">
            <IoArrowForward className="text-xl text-stone-600 transition-colors group-hover:text-copper-600" />
            <span className="text-sm font-medium text-ink-700 transition-colors group-hover:text-copper-700">
              بازگشت
            </span>
          </div>
        </Link>

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

export default ProductHeader;
