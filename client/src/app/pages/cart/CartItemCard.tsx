import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useRemoveCartItem, useUpdateCartItemQuantity } from "../../../lib/hooks/useCart";
import { useProductById } from "../../../lib/hooks/useProducts";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import { formatNumber } from "../../../lib/utils/format";
import QuantityStepper from "../../components/ui/QuantityStepper";
import type { CartItem } from "../../../lib/types/types";

function CartItemCard({ item }: { item: CartItem }) {
  // Cart items don't carry an image; product details are cached by React Query.
  const { data: product } = useProductById(item.productId);
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();
  const busy = isUpdating || isRemoving;

  const setQuantity = (quantity: number) =>
    updateQuantity({ id: item.id, data: { quantity } }, { onError: (e) => toast.error(getErrorMessage(e)) });

  const remove = () =>
    removeItem(item.id, {
      onSuccess: () => toast.success(`«${item.productName}» از سبد خرید حذف شد`),
      onError: (e) => toast.error(getErrorMessage(e)),
    });

  const href = `/products/${item.productId}`;

  return (
    <li className={`flex gap-4 p-4 transition-opacity sm:p-5 ${isRemoving ? "opacity-50" : ""}`}>
      <Link to={href} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-cream-100 sm:h-28 sm:w-28">
        {product ? (
          <img src={getImageUrl(product.image)} alt={item.productName} className="h-full w-full object-cover" />
        ) : (
          <div className="skeleton h-full w-full rounded-none" />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={href} className="line-clamp-2 font-bold text-ink transition-colors hover:text-copper-700">
              {item.productName}
            </Link>
            <p className="mt-1 text-xs text-stone-500">قیمت واحد: {formatNumber(item.price)} تومان</p>
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={busy}
            aria-label={`حذف ${item.productName} از سبد`}
            title="حذف از سبد"
            className="icon-btn -mt-1 -ml-2 h-9 w-9 text-stone-400 hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={item.quantity}
            max={product?.stock}
            loading={isUpdating}
            removeAtOne
            onIncrease={() => setQuantity(item.quantity + 1)}
            onDecrease={() => (item.quantity <= 1 ? remove() : setQuantity(item.quantity - 1))}
          />
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-ink">{formatNumber(item.price * item.quantity)}</span>
            <span className="text-xs text-stone-500">تومان</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItemCard;
