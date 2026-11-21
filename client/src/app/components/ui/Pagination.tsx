import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatNumber } from "../../../lib/utils/format";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Builds [1, "…", 4, 5, 6, "…", 12] style page lists. */
function getPages(page: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "gap")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) pages.push("gap");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("gap");
  pages.push(total);

  return pages;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    onChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="صفحه‌بندی">
      {/* RTL: "previous" points right */}
      <button
        type="button"
        className="icon-btn border border-line bg-white"
        disabled={page === 1}
        onClick={() => go(page - 1)}
        aria-label="صفحه قبل"
      >
        <FiChevronRight />
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="w-8 text-center text-stone-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-xl px-2 text-sm font-semibold transition-colors ${
              p === page
                ? "bg-copper-600 text-white shadow-sm"
                : "border border-line bg-white text-ink-700 hover:border-copper-300 hover:text-copper-700"
            }`}
          >
            {formatNumber(p)}
          </button>
        ),
      )}

      <button
        type="button"
        className="icon-btn border border-line bg-white"
        disabled={page === totalPages}
        onClick={() => go(page + 1)}
        aria-label="صفحه بعد"
      >
        <FiChevronLeft />
      </button>
    </nav>
  );
}
