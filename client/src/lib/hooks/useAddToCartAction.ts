import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../features/context/useAuth";
import { useAddItemToCart } from "./useCart";
import { getErrorMessage } from "./getErrorMessage";

/**
 * Shared "add to cart" behaviour for every product card / page:
 * sends guests to login instead of failing with a 401, tracks which
 * product is in flight, and shows a toast with a shortcut to the cart.
 */
export function useAddToCartAction() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useAddItemToCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const addToCart = (productId: string, quantity = 1) => {
    if (!token) {
      toast.info("برای افزودن به سبد خرید، ابتدا وارد حساب خود شوید.");
      navigate("/login");
      return;
    }

    setAddingId(productId);
    mutate(
      { productId, quantity },
      {
        onSuccess: () =>
          toast.success("به سبد خرید اضافه شد", {
            action: { label: "مشاهده سبد", onClick: () => navigate("/cart") },
          }),
        onError: (error) => toast.error(getErrorMessage(error)),
        onSettled: () => setAddingId(null),
      },
    );
  };

  return { addToCart, addingId };
}
