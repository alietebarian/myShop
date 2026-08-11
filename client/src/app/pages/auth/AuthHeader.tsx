import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

function AuthHeader() {
  return (
    <header className="w-full border-b border-copper-100 bg-cream shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* RIGHT */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-copper-600"
        >
          <GoArrowLeft className="text-lg" />
          <span>بازگشت به فروشگاه</span>
        </Link>

        {/* LEFT */}
        <Link
          to="/"
          className="text-xl font-bold text-copper-600 transition-colors hover:text-copper-700"
        >
          مس کده
        </Link>
      </div>
    </header>
  );
}

export default AuthHeader;
