import { useState } from "react";
import { useAddItemToCart } from "../../../lib/hooks/useCart";
import { useProducts } from "../../../lib/hooks/useProducts";
import StoreCard from "../storePage/StoreCard";
import { toast } from "sonner";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts(1, 8, "");
  const { mutate: addItemToCart } = useAddItemToCart()
  const [ addingId, setAddingId ] = useState<string | null>(null)

  if (isLoading)
    return (
      <div className="py-20 text-center text-stone-600">در حال بارگذاری...</div>
    );

  const products = data?.items ?? [];

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
  }

  return (
    <section className="bg-cream-100 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-copper-600">
            پرفروش‌ترین‌ها
          </span>
          <div className="mt-2 flex items-center gap-3">
            <h2 className="font-display text-3xl text-ink">
              محصولات محبوب مس‌کده
            </h2>
            <span className="h-[3px] max-w-24 flex-1 rounded-full bg-patina-500/70" />
          </div>
        </div>

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"
        >
          {products.map((product) => (
            <StoreCard
              key={product.id}
              id={product.id}
              img={getImageUrl(product.image)}
              categoryName={product.categoryName}
              name={product.name}
              price={product.price}
              onAddToCart={() => handleAddToCart(product.id)}
              isAddingToCart={addingId === product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
