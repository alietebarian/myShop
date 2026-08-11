import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  img: string;
  categoryName: string;
  name: string;
  price: number;
  onAddToCart?: () => void;
  isAddingToCart?: boolean;
}

function StoreCard({
  id,
  img,
  categoryName,
  name,
  price,
  onAddToCart,
  isAddingToCart,
}: ProductProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-copper-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-copper-300 hover:shadow-xl">
      <Link to={`/products/${id}`}>
        <div className="relative overflow-hidden bg-cream-100">
          <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-copper-700 shadow-sm backdrop-blur-sm">
            {categoryName}
          </span>
          <img
            src={img}
            alt={name}
            className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 md:h-56"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link to={`/products/${id}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-ink transition-colors group-hover:text-copper-700">
            {name}
          </h3>
        </Link>

        <div className="flex items-center justify-between border-t border-copper-50 pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-ink">
              {price.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-stone-400">تومان</span>
          </div>

          <button
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-copper-600 px-4 py-2 text-sm font-medium text-cream shadow-sm transition-all duration-300 hover:scale-105 hover:bg-copper-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-copper-200"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>{isAddingToCart ? "در حال افزودن..." : "افزودن به سبد"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
