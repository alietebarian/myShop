import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { LuShieldCheck } from "react-icons/lu";
import { useCheckout } from "../../../lib/hooks/useOrder";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import { formatNumber } from "../../../lib/utils/format";
import Spinner from "../../components/ui/Spinner";

interface Props {
  totalItems: number;
  totalPrice: number;
}

function CartSummary({ totalItems, totalPrice }: Props) {
  const navigate = useNavigate();
  const { mutate: checkout, isPending } = useCheckout();

  const handleCheckout = () =>
    checkout(undefined, {
      onSuccess: (orderId) => {
        toast.success("سفارش شما با موفقیت ثبت شد");
        navigate(`/orders/${orderId}`);
      },
      onError: (e) => toast.error(getErrorMessage(e)),
    });

  return (
    <div className="card p-5 sm:p-6 lg:sticky lg:top-36">
      <h2 className="text-base font-bold text-ink">خلاصه سفارش</h2>

      <dl className="mt-5 space-y-3.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-stone-600">تعداد کالاها</dt>
          <dd className="font-semibold text-ink">{formatNumber(totalItems)} عدد</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-stone-600">جمع سبد</dt>
          <dd className="font-semibold text-ink">{formatNumber(totalPrice)} تومان</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-line pt-4">
          <dt className="font-bold text-ink">مبلغ قابل پرداخت</dt>
          <dd className="flex items-baseline gap-1">
            <span className="text-xl font-black text-copper-700">{formatNumber(totalPrice)}</span>
            <span className="text-xs text-stone-500">تومان</span>
          </dd>
        </div>
      </dl>

      <button type="button" onClick={handleCheckout} disabled={isPending} className="btn btn-primary btn-lg mt-6 w-full">
        {isPending && <Spinner />}
        {isPending ? "در حال ثبت سفارش…" : "ثبت سفارش"}
      </button>

      <Link to="/products" className="btn btn-ghost mt-2 w-full">
        ادامه خرید
      </Link>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-500">
        <LuShieldCheck className="text-base text-patina-600" />
        خرید امن با ضمانت اصالت کالا
      </p>
    </div>
  );
}

export default CartSummary;
