import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import type { Order } from "../../../lib/types/types";
import { formatDate, formatNumber, shortId } from "../../../lib/utils/format";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderCard({ order }: { order: Order }) {
  const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const names = order.items.map((i) => i.productName).join("، ");

  return (
    <Link
      to={`/orders/${order.id}`}
      className="group card block p-4 transition-[border-color,box-shadow] hover:border-copper-200 hover:shadow-soft sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-sm font-bold text-ink">
            سفارش <span dir="ltr" className="font-mono text-[13px]">#{shortId(order.id)}</span>
          </span>
          <span className="text-xs text-stone-500">{formatDate(order.createdAt)}</span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <p className="mt-3 line-clamp-1 text-sm text-stone-600">{names}</p>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs text-stone-500">{formatNumber(itemsCount)} کالا</span>
        <div className="flex items-center gap-3">
          <span className="flex items-baseline gap-1">
            <span className="font-extrabold text-ink">{formatNumber(order.totalPrice)}</span>
            <span className="text-xs text-stone-500">تومان</span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors group-hover:bg-copper-50 group-hover:text-copper-700">
            <FiChevronLeft />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
