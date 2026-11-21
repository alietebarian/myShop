import { useCategories } from "../../../lib/hooks/useCategories";
import { formatNumber } from "../../../lib/utils/format";

type FilteredStoreProps = {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

/** Desktop: vertical list in a sidebar card. Mobile: horizontal scrolling chips. */
function FilteredStore({ selectedCategory, onSelectCategory }: FilteredStoreProps) {
  const { data, isLoading } = useCategories(1, 10, "");
  const categories = data?.items.filter((c) => c.status) ?? [];
  const options = [{ id: "", name: "همه محصولات", productCount: undefined as number | undefined }, ...categories];

  return (
    <>
      {/* Mobile chips */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar lg:hidden" role="radiogroup" aria-label="دسته‌بندی">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <div key={i} className="skeleton h-9 w-24 shrink-0 rounded-full" />)
          : options.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id || "all"}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onSelectCategory(c.id)}
                  className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "border-copper-600 bg-copper-600 text-white"
                      : "border-line bg-white text-ink-700 hover:border-copper-300"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
      </div>

      {/* Desktop sidebar */}
      <div className="card sticky top-36 hidden p-4 lg:block">
        <h2 className="px-2 pb-3 text-sm font-bold text-ink">دسته‌بندی‌ها</h2>
        <ul className="flex flex-col gap-0.5" role="radiogroup" aria-label="دسته‌بندی">
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => (
                <li key={i} className="skeleton my-1 h-8" />
              ))
            : options.map((c) => {
                const active = selectedCategory === c.id;
                return (
                  <li key={c.id || "all"}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onSelectCategory(c.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-right text-sm transition-colors ${
                        active
                          ? "bg-copper-50 font-semibold text-copper-700"
                          : "text-ink-700 hover:bg-cream-100"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`h-4 w-4 rounded-full border-2 transition-colors ${
                            active ? "border-copper-600 bg-copper-600 shadow-[inset_0_0_0_2px_white]" : "border-stone-400/60"
                          }`}
                        />
                        {c.name}
                      </span>
                      {c.productCount !== undefined && (
                        <span className="text-xs text-stone-400">{formatNumber(c.productCount)}</span>
                      )}
                    </button>
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
}

export default FilteredStore;
