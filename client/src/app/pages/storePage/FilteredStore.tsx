import { useCategories } from "../../../lib/hooks/useCategories";
import { IoChevronForward } from "react-icons/io5";

function FilteredStore() {
  const { data: categories } = useCategories(1, 10, "");

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100/80 p-5 h-fit">
      {/* Header */}
      <div className="border-b border-gray-100/80 pb-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-6 bg-amber-600 rounded-full"></span>
          فیلترها
        </h2>
        <p className="text-xs text-gray-400 mt-1">دسته‌بندی محصولات</p>
      </div>

      {/* Categories List */}
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-500 mb-3 px-2">
          دسته‌بندی‌ها
        </div>
        <ul className="flex flex-col gap-1">
          {categories?.items.map((category) => (
            <li key={category.id}>
              <button className="w-full text-right flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-amber-50/80 transition-all duration-200 group active:scale-[0.98]">
                <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700 transition-colors">
                  {category.name}
                </span>
                <IoChevronForward className="text-gray-300 text-sm group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional: Clear Filters */}
      <div className="border-t border-gray-100/80 pt-4 mt-4">
        <button className="w-full text-center text-xs text-gray-400 hover:text-amber-600 transition-colors py-1.5 rounded-lg hover:bg-amber-50/50">
          حذف همه فیلترها
        </button>
      </div>
    </div>
  );
}

export default FilteredStore;
