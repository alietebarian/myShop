import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useCategories } from "../../../lib/hooks/useCategories";
import { formatNumber } from "../../../lib/utils/format";
import SectionHeading from "../../components/ui/SectionHeading";

function VesselIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
      <path d="M5 9c0-3.5 3-6 7-6s7 2.5 7 6c0 4-3 6.5-7 6.5S5 13 5 9Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 15c0 3 2.2 5 5 5s5-2 5-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function CategorySection() {
  const { data, isLoading } = useCategories(1, 8, "");
  const categories = data?.items.filter((c) => c.status) ?? [];

  if (!isLoading && categories.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-20">
      <SectionHeading
        eyebrow="دسته‌بندی‌ها"
        title="هرچه لازم دارید، از مس"
        action={
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper-700 hover:text-copper-800">
            مشاهده همه <FiArrowLeft />
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <div key={i} className="skeleton h-[148px] rounded-2xl" />)
          : categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group card flex flex-col items-center p-5 text-center transition-[border-color,box-shadow] hover:border-copper-200 hover:shadow-soft sm:p-6"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-copper-50 text-copper-700 transition-colors group-hover:bg-copper-600 group-hover:text-white">
                  <VesselIcon />
                </span>
                <h3 className="font-bold text-ink">{category.name}</h3>
                <p className="mt-1 text-xs text-stone-500">{formatNumber(category.productCount)} محصول</p>
              </Link>
            ))}
      </div>
    </section>
  );
}
