import { useCategories } from "../../../lib/hooks/useCategories";

export default function CategorySection() {
  const { data, isLoading } = useCategories(1, 8, "");

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;

  const categories = data?.items ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        دسته‌بندی محصولات
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
              bg-white
              border
              rounded-2xl
              p-6
              text-center
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition
              "
          >
            <div
              className="
              w-16 h-16
              mx-auto
              rounded-full
              bg-amber-100
              flex
              items-center
              justify-center
              text-3xl
              mb-4
              "
            >
              🏺
            </div>

            <h3 className="font-bold text-gray-800">{category.name}</h3>

            <p className="text-sm text-gray-500 mt-2">
              {category.productCount} محصول
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
