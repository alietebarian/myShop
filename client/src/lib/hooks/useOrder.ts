import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "../api/orderApi";
import { cartKeys } from "./useCart";

/* -----------------------------
   QUERY KEYS
------------------------------*/
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (pageNumber: number, pageSize: number) =>
    [...orderKeys.lists(), pageNumber, pageSize] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

/* -----------------------------
   GET MY ORDERS (PAGINATION)
------------------------------*/
export const useMyOrders = (pageNumber: number, pageSize: number) => {
  return useQuery({
    queryKey: orderKeys.list(pageNumber, pageSize),
    queryFn: () => orderApi.getMyOrders(pageNumber, pageSize),
  });
};

/* -----------------------------
   GET ORDER BY ID
------------------------------*/
export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderApi.getById(id),
    enabled: !!id,
  });
};

/* -----------------------------
   CHECKOUT
------------------------------*/
export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => orderApi.checkout(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

/* -----------------------------
   CANCEL ORDER
------------------------------*/
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderApi.cancel(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};
