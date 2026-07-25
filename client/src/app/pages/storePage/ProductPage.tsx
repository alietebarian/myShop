import { useParams } from "react-router-dom";
import ProductHeader from "../../layout/component/ProductHeader";
import { useProductById, useProducts } from "../../../lib/hooks/useProducts";
import { IoCartOutline, IoCheckmarkCircle } from "react-icons/io5";
import StoreCard from "./StoreCard";
import { useAddItemToCart } from "../../../lib/hooks/useCart";
import { useState } from "react";
import { toast } from "sonner";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";

function ProductPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useProductById(id);
  const { data: products } = useProducts(1, 1000, "");

  const { mutate: addItemToCart } = useAddItemToCart()
  const [addingId, setAddingId] = useState<string | null>(null)

  const handleAddToCart = (productId: string) => {
    setAddingId(productId);

    addItemToCart(
      {
        productId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          toast.success("به سبد خرید اضافه شد");
        },
        onError: () => {
          toast.error("خطا در افزودن به سبد خرید");
        },
        onSettled: () => {
          setAddingId(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductHeader />

        <div className="flex h-96 items-center justify-center">
          <p className="text-gray-500">در حال بارگذاری محصول...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductHeader />

        <div className="flex h-96 items-center justify-center">
          <p className="text-gray-500">محصول پیدا نشد</p>
        </div>
      </div>
    );
  }

  const sameProducts =
    products?.items
      .filter(
        (item) =>
          item.categoryId.toLowerCase() === product.categoryId.toLowerCase() &&
          item.id !== product.id,
      )
      .slice(0, 4) ?? [];
  return (
    <div className="min-h-screen bg-gray-100">
      <ProductHeader />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          خانه / {product.categoryName} / {product.name}
        </div>

        {/* Product Main */}
        <section
          className="
          grid
          grid-cols-1
          gap-10
          rounded-3xl
          bg-white
          p-6
          shadow-sm
          lg:grid-cols-2
          lg:p-10
        "
        >
          {/* Image */}
          <div
            className="
            flex
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-gray-50
            to-gray-100
            p-8
          "
          >
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="
              h-[480px]
              w-full
              object-contain
              transition-transform
              duration-500
              hover:scale-110
            "
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-7 text-right">
            {/* Category */}
            <div>
              <span
                className="
                inline-flex
                rounded-full
                bg-amber-100
                px-4
                py-2
                text-sm
                font-semibold
                text-amber-700
              "
              >
                {product.categoryName}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
              text-3xl
              font-black
              leading-relaxed
              text-gray-800
              md:text-4xl
            "
            >
              {product.name}
            </h1>

            {/* Price */}
            <div
              className="
              rounded-2xl
              bg-amber-50
              p-5
            "
            >
              <p className="mb-2 text-sm text-gray-500">قیمت محصول</p>

              <div className="flex items-center justify-end gap-2">
                <span
                  className="
                  text-4xl
                  font-black
                  text-amber-700
                "
                >
                  {product.price.toLocaleString()}
                </span>

                <span className="text-gray-600">تومان</span>
              </div>
            </div>

            {/* Stock */}
            <div className="flex justify-end">
              {product.stock > 0 ? (
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-green-50
                  px-5
                  py-2
                  text-green-700
                "
                >
                  <IoCheckmarkCircle className="text-xl" />

                  <span>موجود در انبار ({product.stock} عدد)</span>
                </div>
              ) : (
                <div
                  className="
                  rounded-full
                  bg-red-50
                  px-5
                  py-2
                  text-red-600
                "
                >
                  ناموجود
                </div>
              )}
            </div>

            {/* Description */}
            <div
              className="
              rounded-2xl
              border
              border-gray-100
              bg-gray-50
              p-6
            "
            >
              <h3
                className="
                mb-3
                text-lg
                font-bold
                text-gray-800
              "
              >
                توضیحات محصول
              </h3>

              <p
                className="
                leading-9
                text-gray-600
              "
              >
                {product.description ||
                  "توضیحاتی برای این محصول ثبت نشده است."}
              </p>
            </div>

            {/* Cart Button */}
            <button
              disabled={product.stock <= 0 || addingId === product.id}
              onClick={() => handleAddToCart(product.id)}
              className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-amber-600
              to-amber-500
              py-4
              text-lg
              font-bold
              text-white
              shadow-lg
              shadow-amber-200
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              active:scale-95
              disabled:bg-gray-300
            "
            >
              <IoCartOutline className="text-3xl" />
              {addingId === product.id
                ? "در حال افزودن..."
                : "افزودن به سبد خرید"}
            </button>
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-14">
          <div className="mb-7 flex items-center justify-between">
            <h2
              className="
              text-2xl
              font-black
              text-gray-800
            "
            >
              محصولات مشابه
            </h2>

            <div
              className="
              h-1
              w-20
              rounded-full
              bg-amber-600
            "
            />
          </div>

          <div
            className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
          >
            {sameProducts.map((item) => (
              <StoreCard
                id={item.id}
                key={item.id}
                img={getImageUrl(item.image)}
                categoryName={item.categoryName}
                name={item.name}
                price={item.price}
                onAddToCart={() => handleAddToCart(item.id)}
                isAddingToCart={addingId === item.id}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductPage;
