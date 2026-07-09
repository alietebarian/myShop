import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/productApi";
import type { CreateProduct, EditProduct } from "../types/types";

/* -----------------------------
   QUERY KEYS (CLEAN & SCALABLE)
------------------------------*/
export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (pageNumber: number, pageSize: number, search: string) =>
    [...productKeys.lists(), pageNumber, pageSize, search] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (id: string) => [...productKeys.details(), id] as const,
};

/* -----------------------------
   GET PRODUCTS (PAGINATION + SEARCH)
------------------------------*/
export const useProducts = (
  pageNumber: number,
  pageSize: number,
  search: string,
) => {
  return useQuery({
    queryKey: productKeys.list(pageNumber, pageSize, search),
    queryFn: () => productApi.get(pageNumber, pageSize, search),
  });
};

/* -----------------------------
   GET PRODUCT BY ID
------------------------------*/
export const useProductById = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });
};

/* -----------------------------
   CREATE PRODUCT
------------------------------*/
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProduct) => productApi.post(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
};

/* -----------------------------
   UPDATE PRODUCT
------------------------------*/
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditProduct }) =>
      productApi.put(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
};

/* -----------------------------
   DELETE PRODUCT
------------------------------*/
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
};
