import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductHeader from "../../layout/component/ProductHeader";
import { useOrderById, useCancelOrder } from "../../../lib/hooks/useOrder";
import { cancellableStatuses, getOrderStatus } from "./orderStatus";
// import { getOrderStatus, cancellableStatuses } from "../../../lib/utils/orderStatus";

function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: order, isLoading, isError } = useOrderById(id!);
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

    const handleCancel = () => {
        if (!id) return;

        cancelOrder(id, {
            onSuccess: () => {
                toast.success("سفارش لغو شد");
            },
            onError: () => {
                toast.error("خطا در لغو سفارش");
            },
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <ProductHeader />

                <div className="mx-auto max-w-3xl px-6 py-10">
                    <div className="animate-pulse space-y-5">
                        <div className="h-8 w-52 rounded bg-gray-300" />
                        <div className="h-40 rounded-3xl bg-gray-300" />
                        <div className="h-40 rounded-3xl bg-gray-300" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="min-h-screen bg-gray-100">
                <ProductHeader />

                <div className="flex h-[70vh] items-center justify-center">
                    <p className="text-lg text-red-500">سفارش یافت نشد</p>
                </div>
            </div>
        );
    }

    const { label, className } = getOrderStatus(order.status);
    const canCancel = cancellableStatuses.includes(order.status);

    return (
        <div className="min-h-screen bg-gray-100">
            <ProductHeader />

            <main className="mx-auto max-w-3xl px-6 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-right text-3xl font-black">جزئیات سفارش</h1>

                    <span
                        className={`rounded-full px-4 py-2 text-sm font-bold ${className}`}
                    >
                        {label}
                    </span>
                </div>

                <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-400">
                        تاریخ ثبت سفارش:{" "}
                        {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                </div>

                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm"
                        >
                            <div className="text-right">
                                <p className="font-bold text-gray-800">{item.productName}</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {item.price.toLocaleString()} تومان × {item.quantity}
                                </p>
                            </div>

                            <span className="font-black text-amber-700">
                                {(item.price * item.quantity).toLocaleString()} تومان
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex justify-between text-lg">
                        <span>مبلغ کل</span>
                        <span className="font-black text-amber-700">
                            {order.totalPrice.toLocaleString()} تومان
                        </span>
                    </div>
                </div>

                {canCancel && (
                    <button
                        onClick={handleCancel}
                        disabled={isCancelling}
                        className="
              mt-6
              w-full
              rounded-xl
              border
              border-red-300
              py-4
              font-bold
              text-red-600
              transition
              hover:bg-red-50
              disabled:opacity-50
            "
                    >
                        {isCancelling ? "در حال لغو..." : "لغو سفارش"}
                    </button>
                )}

                <button
                    onClick={() => navigate("/orders")}
                    className="mt-3 w-full rounded-xl bg-gray-200 py-4 font-bold text-gray-700 transition hover:bg-gray-300"
                >
                    بازگشت به سفارش‌ها
                </button>
            </main>
        </div>
    );
}

export default OrderDetailsPage;