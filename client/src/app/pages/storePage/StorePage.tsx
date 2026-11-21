import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { PiPackage } from "react-icons/pi";
import { useProducts } from "../../../lib/hooks/useProducts";
import { useCategories } from "../../../lib/hooks/useCategories";
import { useAddToCartAction } from "../../../lib/hooks/useAddToCartAction";
import { formatNumber } from "../../../lib/utils/format";
import FilteredStore from "./FilteredStore";
import ProductCard, { ProductCardSkeleton, ProductGrid } from "../../components/product/ProductCard";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import Breadcrumb from "../../components/ui/Breadcrumb";

const PAGE_SIZE = 9;

function StorePage() {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") ?? "";
  const selectedCategory = params.get("category") ?? "";
  const pageNumber = Math.max(1, Number(params.get("page")) || 1);

  const { data: products, isLoading, isFetching } = useProducts(pageNumber, PAGE_SIZE, search);
  const { data: categories } = useCategories(1, 10, "");
  const { addToCart, addingId } = useAddToCartAction();

  const categoryName = categories?.items.find((c) => c.id === selectedCategory)?.name;

  const visibleProducts =
    products?.items.filter(
      (p) => p.status && (!selectedCategory || p.categoryId.toLowerCase() === selectedCategory.toLowerCase()),
    ) ?? [];

  const updateParams = (changes: Record<string, string | number | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === "" || (key === "page" && value === 1)) next.delete(key);
      else next.set(key, String(value));
    });
    setParams(next);
  };

  const title = search ? `نتایج جستجو برای «${search}»` : (categoryName ?? "همه محصولات");

  return (
    <div className="container-page py-6 md:py-8">
      <Breadcrumb
        items={[
          { label: "خانه", to: "/" },
          { label: "محصولات", to: categoryName || search ? "/products" : undefined },
          ...(categoryName ? [{ label: categoryName }] : []),
          ...(search ? [{ label: `جستجو: ${search}` }] : []),
        ]}
      />

      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        {!isLoading && products && (
          <p className="text-sm text-stone-500">
            {formatNumber(products.totalCount)} محصول
            {search && (
              <button
                type="button"
                onClick={() => updateParams({ search: null, page: null })}
                className="mr-3 font-semibold text-copper-700 hover:underline"
              >
                پاک کردن جستجو
              </button>
            )}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="lg:w-64 lg:shrink-0">
          <FilteredStore
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => updateParams({ category: id, page: null })}
          />
        </aside>

        <section className={`min-w-0 flex-1 transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
          {isLoading ? (
            <ProductGrid cols={3}>
              {Array.from({ length: PAGE_SIZE }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </ProductGrid>
          ) : visibleProducts.length === 0 ? (
            search ? (
              <EmptyState
                icon={<FiSearch />}
                title={`نتیجه‌ای برای «${search}» پیدا نشد`}
                description="املای عبارت را بررسی کنید یا با کلمه‌ای کلی‌تر دوباره جستجو کنید."
                action={
                  <button type="button" className="btn btn-primary" onClick={() => setParams({})}>
                    مشاهده همه محصولات
                  </button>
                }
              />
            ) : (
              <EmptyState
                icon={<PiPackage />}
                title={selectedCategory ? "محصولی از این دسته در این صفحه نیست" : "هنوز محصولی ثبت نشده است"}
                description={
                  selectedCategory ? "دسته دیگری را انتخاب کنید یا صفحات دیگر را ببینید." : "به‌زودی محصولات جدید اضافه می‌شوند."
                }
                action={
                  selectedCategory ? (
                    <button type="button" className="btn btn-secondary" onClick={() => updateParams({ category: null })}>
                      نمایش همه دسته‌ها
                    </button>
                  ) : undefined
                }
              />
            )
          ) : (
            <ProductGrid cols={3}>
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  isAdding={addingId === product.id}
                />
              ))}
            </ProductGrid>
          )}

          {!isLoading && products && (
            <div className="mt-10">
              <Pagination
                page={pageNumber}
                totalPages={products.totalPages}
                onChange={(p) => updateParams({ page: p })}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StorePage;
