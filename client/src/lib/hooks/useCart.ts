import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cartApi";
import type { AddItemToCart, UpdateCartItemQuantity } from "../types/types";

/* -----------------------------
   QUERY KEYS
------------------------------*/
export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
};

/* -----------------------------
   GET CART
------------------------------*/
export const useCart = (enabled = true) => {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: () => cartApi.get(),
    enabled,
  });
};

/* -----------------------------
   ADD ITEM TO CART
------------------------------*/
export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddItemToCart) => cartApi.addItem(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
};

/* -----------------------------
   UPDATE ITEM QUANTITY
------------------------------*/
export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCartItemQuantity }) =>
      cartApi.updateQuantity(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
};

/* -----------------------------
   REMOVE ITEM FROM CART
------------------------------*/
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cartApi.removeItem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
};

/* -----------------------------
   CLEAR CART
------------------------------*/
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clear(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
};
