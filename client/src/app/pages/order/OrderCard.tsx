import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { getOrderStatus } from "./orderStatus";

interface Props {
    id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    itemsCount: number;
}

function OrderCard({ id, createdAt, totalPrice, status, itemsCount }: Props) {
    const { label, className } = getOrderStatus(status);

    return (
        <Link
            to={`/orders/${id}`}
            className="
        flex
        items-center
        justify-between
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-md
      "
        >
            <div className="text-right">
                <p className="text-sm text-gray-400">
                    {new Date(createdAt).toLocaleDateString("fa-IR")}
                </p>

                <p className="mt-2 font-bold text-gray-800">
                    {itemsCount} کالا
                </p>

                <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${className}`}
                >
                    {label}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-lg font-black text-amber-700">
                    {totalPrice.toLocaleString()} تومان
                </span>

                <FiChevronLeft className="text-gray-400" />
            </div>
        </Link>
    );
}

export default OrderCard;