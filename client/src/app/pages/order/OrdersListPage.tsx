import ProductHeader from "../../layout/component/ProductHeader";
import { useMyOrders } from "../../../lib/hooks/useOrder";
import OrderCard from "./OrderCard";

function OrdersListPage() {
    const { data: orders, isLoading, isError } = useMyOrders();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <ProductHeader />
                <div className="mx-auto max-w-4xl px-6 py-10">
                    <div className="animate-pulse space-y-5">
                        <div className="h-8 w-52 rounded bg-gray-300" />
                        <div className="h-28 rounded-3xl bg-gray-300" />
                        <div className="h-28 rounded-3xl bg-gray-300" />
                        <div className="h-28 rounded-3xl bg-gray-300" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-100">
                <ProductHeader />
                <div className="flex h-[70vh] items-center justify-center">
                    <p className="text-lg text-red-500">خطا در دریافت سفارش‌ها</p>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100">
                <ProductHeader />
                <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
                    <div className="rounded-full bg-gray-200 p-8 text-4xl">📦</div>
                    <h2 className="text-3xl font-bold">هنوز سفارشی ثبت نکرده‌اید</h2>
                    <p className="text-gray-500">سفارش‌های شما اینجا نمایش داده می‌شوند.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <ProductHeader />

            <main className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="mb-8 text-right text-3xl font-black">سفارش‌های من</h1>

                <div className="space-y-5">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            id={order.id}
                            createdAt={order.createdAt}
                            totalPrice={order.totalPrice}
                            status={order.status}
                            itemsCount={order.items.length}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default OrdersListPage;