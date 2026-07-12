import { useProducts } from "../../../lib/hooks/useProducts";
import StoreCard from "../storePage/StoreCard";

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts(1, 8, "");

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  const products = data?.items ?? [];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">محصولات محبوب</h2>

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
              img={product.image}
              categoryName={product.categoryName}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
