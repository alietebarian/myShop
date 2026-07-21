import { FaTrash } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
    useRemoveCartItem,
    useUpdateCartItemQuantity,
} from "../../../lib/hooks/useCart";
import { toast } from "sonner";

interface Props {
    id: string;
    productId: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

function CartItemCard({
    id,
    productId,
    image,
    name,
    price,
    quantity,
}: Props) {
    const { mutate: updateQuantity, isPending: isUpdating } =
        useUpdateCartItemQuantity();

    const { mutate: removeItem, isPending: isRemoving } =
        useRemoveCartItem();

    const increase = () => {
        updateQuantity(
            {
                id,
                data: {
                    quantity: quantity + 1,
                },
            },
            {
                onError: () => toast.error("خطا در بروزرسانی تعداد"),
            }
        );
    };

    const decrease = () => {
        if (quantity <= 1) {
            removeItem(id, {
                onSuccess: () => toast.success("محصول حذف شد"),
                onError: () => toast.error("خطا در حذف محصول"),
            });

            return;
        }

        updateQuantity(
            {
                id,
                data: {
                    quantity: quantity - 1,
                },
            },
            {
                onError: () => toast.error("خطا در بروزرسانی تعداد"),
            }
        );
    };

    const remove = () => {
        removeItem(id, {
            onSuccess: () => toast.success("محصول حذف شد"),
            onError: () => toast.error("خطا در حذف محصول"),
        });
    };

    return (
        <div
            className="
        flex
        flex-col
        gap-5
        rounded-3xl
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:shadow-md
        md:flex-row
      "
        >
            {/* Image */}
            <div className="flex justify-center">
                <img
                    src={image}
                    alt={name}
                    className="
            h-32
            w-32
            rounded-2xl
            object-cover
            bg-gray-100
            p-2
          "
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">

                <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-800">
                        {name}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {price.toLocaleString()} تومان
                    </p>
                </div>

                <div className="mt-5 flex items-center justify-between">

                    {/* Delete */}
                    <button
                        disabled={isRemoving}
                        onClick={remove}
                        className="
              flex
              items-center
              gap-2
              text-red-500
              transition
              hover:text-red-600
              disabled:opacity-50
            "
                    >
                        <FaTrash />
                        حذف
                    </button>

                    {/* Quantity */}
                    <div
                        className="
              flex
              items-center
              gap-4
              rounded-full
              border
              border-gray-200
              px-4
              py-2
            "
                    >
                        <button
                            disabled={isUpdating}
                            onClick={increase}
                            className="cursor-pointer"
                        >
                            <FiPlus />
                        </button>

                        <span className="font-bold">
                            {quantity}
                        </span>

                        <button
                            disabled={isUpdating}
                            onClick={decrease}
                            className="cursor-pointer"
                        >
                            <FiMinus />
                        </button>
                    </div>
                </div>
            </div>

            {/* Total */}
            <div
                className="
          flex
          items-center
          justify-end
          text-xl
          font-black
          text-amber-700
        "
            >
                {(price * quantity).toLocaleString()} تومان
            </div>
        </div>
    );
}

export default CartItemCard;