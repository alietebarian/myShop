import { useProducts } from "../../../lib/hooks/useProducts";
import StoreHeader from "../../layout/component/StoreHeader";
import FilteredStore from "./FilteredStore";
import StoreCard from "./StoreCard";

function StorePage() {

  const {data:products} = useProducts(1,10,"")

  const handleAddToCart = (productId: string) => {
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">محصولات</h1>

          <p className="mt-1 text-sm text-gray-500">همه محصولات مس کده</p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col-reverse gap-6 lg:flex-row">
          {/* Filter Section (1/4) */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-6 rounded-2xl bg-white p-5 shadow-sm">
              <FilteredStore />
            </div>
          </aside>

          {/* Products Section (3/4) */}
          <section className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products?.items.map((product) => (
                <StoreCard
                  key={product.id}
                  img={product.image}
                  categoryName={product.categoryName}
                  name={product.name}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default StorePage;
