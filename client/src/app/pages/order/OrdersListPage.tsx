import ProductHeader from "../../layout/component/ProductHeader";
import { useMyOrders } from "../../../lib/hooks/useOrder";
import OrderCard from "./OrderCard";
import { useState } from "react";

function OrdersListPage() {
    const [ pageNumber, setPageNumber ] = useState(1)
    const pageSize = 9
    const { data: orders, isLoading, isError } = useMyOrders(pageNumber, pageSize);
    const totalPages = orders?.totalPages

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

    if (!orders || orders.items.length === 0) {
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
                    {orders.items.map((order) => (
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
            {/* PAGINATION INFO */}
            {!isLoading && orders?.items.length ? (
                <div className="text-center text-sm text-gray-500">
                    نمایش{" "}
                    <span className="font-bold text-orange-600">
                        {orders?.items.length}
                    </span>{" "}
                    از{" "}
                    <span className="font-bold text-orange-600">
                        {orders?.totalCount}
                    </span>{" "}
                    محصول
                </div>
            ) : null}

            {/* PAGINATION */}
            {!isLoading && totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2 pb-10">
                    {/* Prev */}
                    <button
                        disabled={pageNumber === 1}
                        onClick={() => setPageNumber((p) => p - 1)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        ← قبلی
                    </button>

                    {/* Pages */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPageNumber(i + 1)}
                            className={`h-10 w-10 rounded-xl font-semibold transition-all ${pageNumber === i + 1
                                ? "bg-orange-500 text-white shadow-lg"
                                : "border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-600"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        disabled={pageNumber === totalPages}
                        onClick={() => setPageNumber((p) => p + 1)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        بعدی →
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrdersListPage;