import { IoChevronForward, IoCheckmarkCircle } from "react-icons/io5";
import { useCategories } from "../../../lib/hooks/useCategories";

type FilteredStoreProps = {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

function FilteredStore({
  selectedCategory,
  onSelectCategory,
}: FilteredStoreProps) {
  const { data: categories } = useCategories(1, 10, "");

  return (
    <div className="sticky top-24 h-fit rounded-2xl border border-copper-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 border-b border-copper-100 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <span className="h-6 w-1 rounded-full bg-patina-500"></span>
          فیلترها
        </h2>
        <p className="mt-1 text-xs text-stone-400">دسته‌بندی محصولات</p>
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <div className="mb-3 px-2 text-sm font-medium text-stone-600">
          دسته‌بندی‌ها
        </div>

        <ul className="flex flex-col gap-2">
          {categories?.items.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <li key={category.id}>
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-right transition-all duration-200 active:scale-[0.98]
                    ${
                      isSelected
                        ? "border-copper-300 bg-copper-50 shadow-sm"
                        : "border-transparent hover:border-copper-100 hover:bg-copper-50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <IoCheckmarkCircle className="text-lg text-copper-600" />
                    )}

                    <span
                      className={`text-sm font-medium transition-colors ${
                        isSelected ? "text-copper-700" : "text-ink-700"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>

                  <IoChevronForward
                    className={`text-sm transition-all ${
                      isSelected
                        ? "text-copper-600"
                        : "text-stone-400 group-hover:text-copper-500"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Clear Filter */}
      {selectedCategory && (
        <div className="mt-5 border-t border-copper-100 pt-4">
          <button
            onClick={() => onSelectCategory("")}
            className="w-full rounded-lg py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            حذف فیلتر دسته‌بندی
          </button>
        </div>
      )}
    </div>
  );
}

export default FilteredStore;
