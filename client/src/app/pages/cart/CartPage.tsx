import ProductHeader from "../../layout/component/ProductHeader";
import { useCart } from "../../../lib/hooks/useCart";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

function CartPage() {
  const {
    data: cart,
    isLoading,
    isError,
  } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductHeader />

        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="animate-pulse space-y-5">

            <div className="h-8 w-52 rounded bg-gray-300" />

            <div className="grid gap-6 lg:grid-cols-3">

              <div className="space-y-5 lg:col-span-2">

                <div className="h-40 rounded-3xl bg-gray-300" />
                <div className="h-40 rounded-3xl bg-gray-300" />
                <div className="h-40 rounded-3xl bg-gray-300" />

              </div>

              <div className="h-96 rounded-3xl bg-gray-300" />

            </div>
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
          <p className="text-lg text-red-500">
            خطا در دریافت اطلاعات سبد خرید
          </p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductHeader />

        <div className="flex h-[70vh] flex-col items-center justify-center gap-6">

          <div className="rounded-full bg-gray-200 p-8">
            🛒
          </div>

          <h2 className="text-3xl font-bold">
            سبد خرید شما خالی است
          </h2>

          <p className="text-gray-500">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>

        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <>
        <ProductHeader />

        <div className="flex h-[70vh] flex-col items-center justify-center gap-6">

          <img
            src="/empty-cart.svg"
            className="w-72"
          />

          <h2 className="text-3xl font-bold">
            سبد خرید شما خالی است
          </h2>

          <p className="text-gray-500">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>

          <Link
            to="/store"
            className="
            rounded-xl
            bg-amber-600
            px-8
            py-4
            text-white
          "
          >
            مشاهده محصولات
          </Link>

        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ProductHeader />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="mb-8 text-right text-3xl font-black">
          سبد خرید
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}

          <section className="space-y-6 lg:col-span-2">
            {cart.items.map((item) => (
              <CartItemCard
                key={item.id}
                id={item.id}
                productId={item.productId}
                image={item.productName}
                name={item.productName}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </section>

          {/* Summary */}

          <aside>
            <CartSummary
              totalItems={cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
              totalPrice={cart.items.reduce(
                (sum, item) => sum + item.quantity * item.price,
                0
              )}
            />
          </aside>

        </div>

      </main>
    </div>
  );
}

export default CartPage;