import { useCategories } from "../../../lib/hooks/useCategories";

export default function CategorySection() {
  const { data, isLoading } = useCategories(1, 8, "");

  if (isLoading)
    return <div className="py-20 text-center text-stone-600">در حال بارگذاری...</div>;

  const categories = data?.items ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10">
        <span className="text-xs font-bold tracking-widest text-copper-600">
          دسته‌بندی‌ها
        </span>
        <div className="mt-2 flex items-center gap-3">
          <h2 className="font-display text-3xl text-ink">
            هرچه لازم دارید، از مس
          </h2>
          <span className="h-[3px] flex-1 max-w-24 rounded-full bg-patina-500/70" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group rounded-2xl border border-copper-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-copper-300 hover:shadow-lg"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-copper-50 text-2xl text-copper-700 transition group-hover:bg-copper-500 group-hover:text-cream">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                <path
                  d="M5 9c0-3.5 3-6 7-6s7 2.5 7 6c0 4-3 6.5-7 6.5S5 13 5 9Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M7 15c0 3 2.2 5 5 5s5-2 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </div>

            <h3 className="font-bold text-ink">{category.name}</h3>

            <p className="mt-2 text-sm text-stone-400">
              {category.productCount} محصول
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
