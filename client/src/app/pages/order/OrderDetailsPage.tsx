import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FiCheck, FiPackage, FiXCircle } from "react-icons/fi";
import { useOrderById, useCancelOrder } from "../../../lib/hooks/useOrder";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import { formatDateTime, formatNumber, shortId } from "../../../lib/utils/format";
import { cancellableStatuses, getOrderStatus, orderSteps } from "./orderStatus";
import OrderStatusBadge from "./OrderStatusBadge";
import Breadcrumb from "../../components/ui/Breadcrumb";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

function OrderProgress({ status }: { status: string }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
        <FiXCircle className="shrink-0 text-xl" />
        این سفارش لغو شده است.
      </div>
    );
  }

  const current = orderSteps.indexOf(status as (typeof orderSteps)[number]);

  return (
    <ol className="flex items-start">
      {orderSteps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && (
              <span
                className={`absolute top-4 -right-1/2 left-1/2 h-0.5 ${i <= current ? "bg-copper-500" : "bg-line"}`}
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                done
                  ? "border-copper-500 bg-copper-500 text-white"
                  : active
                    ? "border-copper-500 bg-white text-copper-700 ring-4 ring-copper-100"
                    : "border-line bg-white text-stone-400"
              }`}
            >
              {done ? <FiCheck /> : formatNumber(i + 1)}
            </span>
            <span className={`mt-2 px-1 text-[11px] leading-4 sm:text-xs ${active ? "font-bold text-ink" : "text-stone-500"}`}>
              {getOrderStatus(step).label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function OrderDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderById(id);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-8 sm:px-6" aria-busy>
        <div className="skeleton h-8 w-52" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<FiPackage />}
          title="این سفارش پیدا نشد"
          description="ممکن است آدرس اشتباه باشد یا سفارش متعلق به حساب دیگری باشد."
          action={<Link to="/orders" className="btn btn-primary">بازگشت به سفارش‌ها</Link>}
        />
      </div>
    );
  }

  const canCancel = cancellableStatuses.includes(order.status);
  const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:py-8">
      <Breadcrumb
        items={[
          { label: "خانه", to: "/" },
          { label: "سفارش‌های من", to: "/orders" },
          { label: `#${shortId(order.id)}` },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-ink">
            سفارش <span dir="ltr">#{shortId(order.id)}</span>
          </h1>
          <p className="mt-1 text-sm text-stone-500">ثبت‌شده در {formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <section className="card p-5 sm:p-6">
        <h2 className="mb-5 text-sm font-bold text-ink">وضعیت سفارش</h2>
        <OrderProgress status={order.status} />
      </section>

      <section className="card mt-4">
        <h2 className="border-b border-line px-5 py-4 text-sm font-bold text-ink sm:px-6">
          اقلام سفارش <span className="font-normal text-stone-500">({formatNumber(itemsCount)} کالا)</span>
        </h2>
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.productId} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <Link to={`/products/${item.productId}`} className="font-semibold text-ink hover:text-copper-700">
                  {item.productName}
                </Link>
                <p className="mt-1 text-xs text-stone-500">
                  {formatNumber(item.quantity)} × {formatNumber(item.price)} تومان
                </p>
              </div>
              <span className="shrink-0 font-bold text-ink">
                {formatNumber(item.price * item.quantity)} <span className="text-xs font-normal text-stone-500">تومان</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-baseline justify-between border-t border-line bg-cream/60 px-5 py-4 sm:px-6">
          <span className="font-bold text-ink">مبلغ کل</span>
          <span className="flex items-baseline gap-1">
            <span className="text-xl font-black text-copper-700">{formatNumber(order.totalPrice)}</span>
            <span className="text-xs text-stone-500">تومان</span>
          </span>
        </div>
      </section>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link to="/orders" className="btn btn-secondary">
          بازگشت به سفارش‌ها
        </Link>
        {canCancel && (
          <button type="button" onClick={() => setConfirmCancel(true)} className="btn btn-danger-outline">
            لغو سفارش
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title={`لغو سفارش #${shortId(order.id)}`}
        message="با لغو این سفارش، پردازش آن متوقف می‌شود و این کار قابل بازگشت نیست. آیا مطمئن هستید؟"
        confirmText="لغو سفارش"
        cancelText="منصرف شدم"
        loading={isCancelling}
        onClose={() => setConfirmCancel(false)}
        onConfirm={() =>
          cancelOrder(order.id, {
            onSuccess: () => {
              toast.success("سفارش لغو شد");
              setConfirmCancel(false);
            },
            onError: (e) => toast.error(getErrorMessage(e)),
          })
        }
      />
    </div>
  );
}

export default OrderDetailsPage;
