import { useState, type FormEvent } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar({ onSubmitted }: { onSubmitted?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const urlSearch = location.pathname === "/products" ? (params.get("search") ?? "") : "";

  const [value, setValue] = useState(urlSearch);
  const [syncedFrom, setSyncedFrom] = useState(urlSearch);

  // Keep the field in sync when the URL search term changes (e.g. back button).
  if (syncedFrom !== urlSearch) {
    setSyncedFrom(urlSearch);
    setValue(urlSearch);
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = value.trim();
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : "/products");
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} role="search" className="group relative w-full">
      <label htmlFor="site-search" className="sr-only">
        جستجو در محصولات
      </label>
      <IoSearch className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg text-stone-400 transition-colors group-focus-within:text-copper-600" />
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جستجو در محصولات مس‌کده…"
        autoComplete="off"
        className="h-11 w-full rounded-xl border border-transparent bg-cream-100 pr-11 pl-10 text-sm text-ink transition outline-none placeholder:text-stone-400 hover:bg-cream-200/60 focus:border-copper-300 focus:bg-white focus:ring-4 focus:ring-copper-100 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="پاک کردن جستجو"
          className="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 hover:bg-cream-200 hover:text-ink"
        >
          <IoClose />
        </button>
      )}
    </form>
  );
}
