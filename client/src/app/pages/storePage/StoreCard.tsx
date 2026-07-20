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
    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100/80">
      <Link to={`/products/${id}`}>
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={img}
            alt={name}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {categoryName}
        </h3>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100/80">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">
              {price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-medium">تومان</span>
          </div>

          <button
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{isAddingToCart ? "در حال افزودن..." : "افزودن به سبد"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;