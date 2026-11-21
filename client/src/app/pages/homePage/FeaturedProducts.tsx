import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useProducts } from "../../../lib/hooks/useProducts";
import { useAddToCartAction } from "../../../lib/hooks/useAddToCartAction";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard, { ProductCardSkeleton, ProductGrid } from "../../components/product/ProductCard";

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts(1, 8, "");
  const { addToCart, addingId } = useAddToCartAction();
  const products = data?.items.filter((p) => p.status) ?? [];

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="border-y border-line bg-cream-100/60 py-16 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="تازه‌ها"
          title="محصولات منتخب مس‌کده"
          action={
            <Link to="/products" className="btn btn-secondary self-start sm:self-auto">
              مشاهده همه محصولات <FiArrowLeft />
            </Link>
          }
        />

        <ProductGrid>
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  isAdding={addingId === product.id}
                />
              ))}
        </ProductGrid>
      </div>
    </section>
  );
}
