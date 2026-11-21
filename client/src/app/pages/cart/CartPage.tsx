import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { PiShoppingBagOpen } from "react-icons/pi";
import { FiAlertCircle, FiTrash2 } from "react-icons/fi";
import { useCart, useClearCart } from "../../../lib/hooks/useCart";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import { formatNumber } from "../../../lib/utils/format";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

function CartPage() {
  const { data: cart, isLoading, isError, refetch } = useCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();
  const [confirmClear, setConfirmClear] = useState(false);

  if (isLoading) {
    return (
      <div className="container-page py-8" aria-busy>
        <div className="skeleton mb-8 h-8 w-40" />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card divide-y divide-line">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-5">
                <div className="skeleton h-28 w-28 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
          <div className="skeleton h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<FiAlertCircle />}
          title="دریافت سبد خرید ممکن نشد"
          description="اتصال به سرور برقرار نشد. لحظاتی بعد دوباره تلاش کنید."
          action={<button type="button" className="btn btn-primary" onClick={() => refetch()}>تلاش دوباره</button>}
        />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<PiShoppingBagOpen />}
          title="سبد خرید شما خالی است"
          description="می‌توانید از میان ظروف مسی دست‌ساز ما، محصول مورد علاقه‌تان را پیدا کنید."
          action={<Link to="/products" className="btn btn-primary">شروع خرید</Link>}
        />
      </div>
    );
  }

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <div className="container-page py-6 md:py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">سبد خرید</h1>
          <p className="mt-1 text-sm text-stone-500">{formatNumber(totalItems)} کالا در سبد شما</p>
        </div>
        <button type="button" onClick={() => setConfirmClear(true)} className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700">
          <FiTrash2 /> خالی کردن سبد
        </button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <ul className="card divide-y divide-line">
          {cart.items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </ul>

        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="خالی کردن سبد خرید"
        message={`همه ${formatNumber(cart.items.length)} محصول از سبد خرید شما حذف می‌شوند. این کار قابل بازگشت نیست.`}
        confirmText="حذف همه کالاها"
        loading={isClearing}
        onClose={() => setConfirmClear(false)}
        onConfirm={() =>
          clearCart(undefined, {
            onSuccess: () => {
              toast.success("سبد خرید خالی شد");
              setConfirmClear(false);
            },
            onError: (e) => toast.error(getErrorMessage(e)),
          })
        }
      />
    </div>
  );
}

export default CartPage;
