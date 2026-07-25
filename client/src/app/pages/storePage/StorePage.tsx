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
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const { data: products } = useProducts(1, 10, search);
  const [selectedCategory, setSelectedCategory] = useState("");
    const { mutate: addItemToCart } = useAddItemToCart()
    const [ addingId, setAddingId ] = useState<string | null>(null)

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
    </div>
  );
}

export default StorePage;
