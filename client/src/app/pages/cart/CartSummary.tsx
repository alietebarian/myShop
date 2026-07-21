import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useClearCart } from "../../../lib/hooks/useCart";
import { useCheckout } from "../../../lib/hooks/useOrder";

interface Props {
    totalItems: number;
    totalPrice: number;
}

function CartSummary({
    totalItems,
    totalPrice,
}: Props) {
    const navigate = useNavigate();

    const { mutate: clearCart, isPending: isClearing } = useClearCart();
    const { mutate: checkout, isPending: isCheckingOut } = useCheckout();

    const handleClear = () => {
        clearCart(undefined, {
            onSuccess: () => {
                toast.success("سبد خرید پاک شد");
            },
            onError: () => {
                toast.error("خطا در حذف سبد خرید");
            },
        });
    };

    const handleCheckout = () => {
        checkout(undefined, {
            onSuccess: (orderId) => {
                toast.success("سفارش شما با موفقیت ثبت شد");
                navigate(`/orders/${orderId}`);
            },
            onError: () => {
                toast.error("خطا در ثبت سفارش");
            },
        });
    };

    return (
        <div
            className="
        sticky
        top-8
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
        >
            <h2 className="mb-8 text-xl font-bold">
                خلاصه سفارش
            </h2>

            <div className="space-y-5">

                <div className="flex justify-between">
                    <span>تعداد کالا</span>

                    <span className="font-bold">
                        {totalItems}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>جمع کل</span>

                    <span className="font-bold text-amber-700">
                        {totalPrice.toLocaleString()} تومان
                    </span>
                </div>

                <hr />

                <div className="flex justify-between text-lg">
                    <span>قابل پرداخت</span>

                    <span className="font-black text-amber-700">
                        {totalPrice.toLocaleString()} تومان
                    </span>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || isClearing}
                    className="
            mt-5
            w-full
            rounded-xl
            bg-amber-600
            py-4
            font-bold
            text-white
            transition
            hover:bg-amber-700
            disabled:opacity-50
          "
                >
                    {isCheckingOut ? "در حال ثبت سفارش..." : "ثبت سفارش"}
                </button>

                <button
                    onClick={handleClear}
                    disabled={isCheckingOut}
                    className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-300
            py-3
            text-red-600
            transition
            hover:bg-red-50
            disabled:opacity-50
          "
                >
                    <FiTrash2 />

                    پاک کردن سبد خرید
                </button>

            </div>
        </div>
    );
}

export default CartSummary;