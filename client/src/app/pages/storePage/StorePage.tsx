import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../lib/hooks/useProducts";
import StoreHeader from "../../layout/component/StoreHeader";
import FilteredStore from "./FilteredStore";
import StoreCard from "./StoreCard";
import { useState } from "react";
import { toast } from "sonner";
import { useAddItemToCart } from "../../../lib/hooks/useCart";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";

function StorePage() {

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 9
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const { data: products, isLoading } = useProducts(pageNumber, pageSize, search);
  const totalPages = products?.totalPages ?? 1

  const [selectedCategory, setSelectedCategory] = useState("");
  const { mutate: addItemToCart } = useAddItemToCart()
  const [addingId, setAddingId] = useState<string | null>(null)

  const filteredProducts =
    products?.items.filter((product) => {
      if (!selectedCategory) return true;

      return product.categoryId === selectedCategory;
    }) ?? [];

  const handleAddToCart = (productId: string) => {
    setAddingId(productId);

    addItemToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("به سبد اضافه شد");
        },
        onError: () => {
          toast.error("خطا در افزودن به سبد");
        },
        onSettled: () => {
          setAddingId(null);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader />

      {/* <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"> */}
      <main className="w-full px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">محصولات</h1>

          <p className="mt-1 text-sm text-gray-500">همه محصولات مس کده</p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col-reverse gap-6 lg:flex-row">
          {/* Filter Section (1/4) */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-6 rounded-2xl bg-white p-5 shadow-sm">
              <FilteredStore
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Products Section (3/4) */}
          <section className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts?.map((product) =>
                product.status ? (
                  <StoreCard
                    id={product.id}
                    key={product.id}
                    img={getImageUrl(product.image)}
                    categoryName={product.categoryName}
                    name={product.name}
                    price={product.price}
                    onAddToCart={() => handleAddToCart(product.id)}
                    isAddingToCart={addingId === product.id}
                  />
                ) : null,
              )}
            </div>
          </section>
        </div>
      </main>
      {/* PAGINATION INFO */}
      {!isLoading && products?.items.length ? (
        <div className="text-center text-sm text-gray-500">
          نمایش{" "}
          <span className="font-bold text-orange-600">
            {products?.items.length}
          </span>{" "}
          از{" "}
          <span className="font-bold text-orange-600">
            {products?.totalCount}
          </span>{" "}
          محصول
        </div>
      ) : null}

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 pb-10">
          {/* Prev */}
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← قبلی
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPageNumber(i + 1)}
              className={`h-10 w-10 rounded-xl font-semibold transition-all ${pageNumber === i + 1
                ? "bg-orange-500 text-white shadow-lg"
                : "border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-600"
                }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            بعدی →
          </button>
        </div>
      )}
    </div>
  );
}

export default StorePage;
