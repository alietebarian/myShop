import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PiShoppingBagOpen, PiPackage } from "react-icons/pi";
import { LuShieldCheck, LuTruck, LuHammer } from "react-icons/lu";
import { useProductById, useProducts } from "../../../lib/hooks/useProducts";
import { useAddToCartAction } from "../../../lib/hooks/useAddToCartAction";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import { formatNumber } from "../../../lib/utils/format";
import Breadcrumb from "../../components/ui/Breadcrumb";
import EmptyState from "../../components/ui/EmptyState";
import QuantityStepper from "../../components/ui/QuantityStepper";
import Spinner from "../../components/ui/Spinner";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard, { ProductGrid } from "../../components/product/ProductCard";

function ProductPageSkeleton() {
  return (
    <div className="container-page py-6 md:py-8" aria-busy>
      <div className="skeleton mb-6 h-4 w-60" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="skeleton aspect-square rounded-3xl" />
        <div className="space-y-5">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton h-28 w-full rounded-2xl" />
          <div className="skeleton h-12 w-full rounded-xl" />
          <div className="skeleton h-32 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function ProductPage() {
  const { id = "" } = useParams();
  const { data: product, isLoading } = useProductById(id);
  const { data: products } = useProducts(1, 10, "");
  const { addToCart, addingId } = useAddToCartAction();
  const [quantity, setQuantity] = useState(1);
  const [quantityFor, setQuantityFor] = useState(id);

  // Reset quantity when navigating to another product.
  if (quantityFor !== id) {
    setQuantityFor(id);
    setQuantity(1);
  }

  if (isLoading) return <ProductPageSkeleton />;

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<PiPackage />}
          title="این محصول پیدا نشد"
          description="ممکن است محصول حذف شده باشد یا آدرس اشتباه وارد شده باشد."
          action={<Link to="/products" className="btn btn-primary">مشاهده همه محصولات</Link>}
        />
      </div>
    );
  }

  const inStock = product.stock > 0;
  const isAdding = addingId === product.id;
  const similar =
    products?.items
      .filter(
        (p) => p.status && p.id !== product.id && p.categoryId.toLowerCase() === product.categoryId.toLowerCase(),
      )
      .slice(0, 4) ?? [];

  const handleAdd = () => addToCart(product.id, quantity);

  return (
    <div className="container-page py-6 pb-28 md:py-8 lg:pb-8">
      <Breadcrumb
        items={[
          { label: "خانه", to: "/" },
          { label: product.categoryName, to: `/products?category=${product.categoryId}` },
          { label: product.name },
        ]}
      />

      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="card relative aspect-square overflow-hidden bg-gradient-to-br from-cream-100 to-copper-50 lg:sticky lg:top-36 lg:self-start">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className={`h-full w-full object-cover ${inStock ? "" : "opacity-60 grayscale"}`}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <Link
            to={`/products?category=${product.categoryId}`}
            className="self-start rounded-lg bg-copper-50 px-3 py-1.5 text-xs font-semibold text-copper-700 transition-colors hover:bg-copper-100"
          >
            {product.categoryName}
          </Link>

          <h1 className="mt-4 text-2xl leading-relaxed font-extrabold text-ink md:text-3xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-patina-50 px-2.5 py-1 font-medium text-patina-700">
                <span className="h-1.5 w-1.5 rounded-full bg-patina-500" />
                موجود در انبار
                {product.stock <= 5 && <span className="text-red-600">· تنها {formatNumber(product.stock)} عدد</span>}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1 font-medium text-red-700">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                ناموجود
              </span>
            )}
            {product.unit && <span className="text-stone-500">واحد فروش: {product.unit}</span>}
          </div>

          {/* Buy box */}
          <div className="card mt-6 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-stone-600">قیمت</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-ink">{formatNumber(product.price)}</span>
                <span className="text-sm text-stone-500">تومان</span>
              </div>
            </div>

            <div className="mt-5 hidden gap-3 lg:flex">
              {inStock && (
                <QuantityStepper
                  value={quantity}
                  max={product.stock}
                  onIncrease={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              )}
              <button
                type="button"
                onClick={handleAdd}
                disabled={!inStock || isAdding}
                className="btn btn-primary btn-lg h-11 flex-1 py-0"
              >
                {isAdding ? <Spinner /> : <PiShoppingBagOpen className="text-xl" />}
                {inStock ? (isAdding ? "در حال افزودن…" : "افزودن به سبد خرید") : "ناموجود"}
              </button>
            </div>
          </div>

          {/* Perks */}
          <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: LuShieldCheck, text: "ضمانت اصالت" },
              { icon: LuHammer, text: "دست‌ساز" },
              { icon: LuTruck, text: "ارسال ایمن" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex flex-col items-center gap-1.5 rounded-xl bg-cream-100 px-2 py-3 text-xs text-ink-700">
                <Icon className="text-xl text-copper-600" />
                {text}
              </li>
            ))}
          </ul>

          {/* Description */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-ink">معرفی محصول</h2>
            <p className="text-[15px] leading-8 whitespace-pre-line text-stone-600">
              {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
            </p>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mt-16 md:mt-20">
          <SectionHeading eyebrow="پیشنهاد ما" title="محصولات مشابه" />
          <ProductGrid>
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} onAddToCart={addToCart} isAdding={addingId === item.id} />
            ))}
          </ProductGrid>
        </section>
      )}

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          {inStock && (
            <QuantityStepper
              size="sm"
              value={quantity}
              max={product.stock}
              onIncrease={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          )}
          <button type="button" onClick={handleAdd} disabled={!inStock || isAdding} className="btn btn-primary h-11 flex-1">
            {isAdding ? <Spinner /> : <PiShoppingBagOpen className="text-lg" />}
            {inStock ? "افزودن به سبد" : "ناموجود"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
