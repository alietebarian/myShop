interface ProductProps {
  img: string;
  categoryName: string;
  name: string;
  price: number;
  onAddToCart?: () => void; // Optional callback
}

function StoreCard({
  img,
  categoryName,
  name,
  price,
  onAddToCart,
}: ProductProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100/80">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={img}
          alt={name}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Category Badge */}
        {/* <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-amber-700 px-3 py-1 rounded-full shadow-sm border border-gray-100/50">
          {categoryName}
        </span> */}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {categoryName}
        </h3>

        {/* Price and Add to Cart Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100/80">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">
              {price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-medium">تومان</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-4 h-4"
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
            <span>افزودن به سبد</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
