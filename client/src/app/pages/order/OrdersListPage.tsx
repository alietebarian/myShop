import { Link, useSearchParams } from "react-router-dom";
import { FiAlertCircle, FiPackage } from "react-icons/fi";
import { useMyOrders } from "../../../lib/hooks/useOrder";
import { formatNumber } from "../../../lib/utils/format";
import OrderCard from "./OrderCard";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import Breadcrumb from "../../components/ui/Breadcrumb";

const PAGE_SIZE = 9;

function OrdersListPage() {
  const [params, setParams] = useSearchParams();
  const pageNumber = Math.max(1, Number(params.get("page")) || 1);
  const { data: orders, isLoading, isError, refetch } = useMyOrders(pageNumber, PAGE_SIZE);

  let content;
  if (isLoading) {
    content = (
      <div className="space-y-4" aria-busy>
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <EmptyState
        icon={<FiAlertCircle />}
        title="دریافت سفارش‌ها ممکن نشد"
        description="اتصال به سرور برقرار نشد. لحظاتی بعد دوباره تلاش کنید."
        action={<button type="button" className="btn btn-primary" onClick={() => refetch()}>تلاش دوباره</button>}
      />
    );
  } else if (!orders || orders.items.length === 0) {
    content = (
      <EmptyState
        icon={<FiPackage />}
        title="هنوز سفارشی ثبت نکرده‌اید"
        description="بعد از ثبت اولین سفارش، وضعیت و جزئیات آن را اینجا می‌بینید."
        action={<Link to="/products" className="btn btn-primary">مشاهده محصولات</Link>}
      />
    );
  } else {
    content = (
      <>
        <div className="space-y-4">
          {orders.items.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
        <div className="mt-10">
          <Pagination
            page={pageNumber}
            totalPages={orders.totalPages}
            onChange={(p) => setParams(p === 1 ? {} : { page: String(p) })}
          />
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:py-8">
      <Breadcrumb items={[{ label: "خانه", to: "/" }, { label: "سفارش‌های من" }]} />
      <div className="mb-6">
        <h1 className="font-display text-3xl text-ink">سفارش‌های من</h1>
        {orders && orders.totalCount > 0 && (
          <p className="mt-1 text-sm text-stone-500">{formatNumber(orders.totalCount)} سفارش</p>
        )}
      </div>
      {content}
    </div>
  );
}

export default OrdersListPage;
