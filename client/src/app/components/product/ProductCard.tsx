import { Link } from "react-router-dom";
import { PiShoppingBagOpen } from "react-icons/pi";
import type { Product } from "../../../lib/types/types";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import { formatNumber } from "../../../lib/utils/format";
import Spinner from "../ui/Spinner";

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  isAdding?: boolean;
}

export default function ProductCard({ product, onAddToCart, isAdding }: ProductCardProps) {
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 3;
  const href = `/products/${product.id}`;

  return (
    <article className="group card flex flex-col overflow-hidden transition-[box-shadow,border-color] duration-200 hover:border-copper-200 hover:shadow-lift">
      <Link to={href} className="relative block aspect-square overflow-hidden bg-cream-100" tabIndex={-1}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            outOfStock ? "opacity-60 grayscale" : ""
          }`}
        />

        {outOfStock && (
          <span className="absolute top-3 right-3 rounded-lg bg-ink/80 px-2.5 py-1 text-[11px] font-bold text-white">
            ناموجود
          </span>
        )}
        {lowStock && (
          <span className="absolute top-3 right-3 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold text-red-600 shadow-sm">
            تنها {formatNumber(product.stock)} عدد باقی مانده
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-copper-600">{product.categoryName}</span>

        <Link to={href} className="mt-1.5">
          <h3 className="line-clamp-2 min-h-12 text-[15px] leading-6 font-bold text-ink transition-colors group-hover:text-copper-700">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex flex-col">
            <span className="text-[11px] text-stone-500">قیمت</span>
            <div className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-lg font-extrabold text-ink">{formatNumber(product.price)}</span>
              <span className="text-xs text-stone-500">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            disabled={isAdding || outOfStock}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            title={outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-copper-600 text-xl text-white shadow-sm transition-colors hover:bg-copper-700 disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-stone-400"
          >
            {isAdding ? <Spinner className="h-5 w-5" /> : <PiShoppingBagOpen />}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="skeleton aspect-square rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-2/5" />
        <div className="flex items-end justify-between pt-3">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-11 w-11 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ children, cols = 4 }: { children: React.ReactNode; cols?: 3 | 4 }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-5 ${
        cols === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {children}
    </div>
  );
}
