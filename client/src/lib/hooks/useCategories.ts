import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../api/categoryApi";
import type { CreateCategory } from "../types/types";

export const categoryKeys = {
  all: ["categories"] as const,

  lists: () => [...categoryKeys.all, "list"] as const,

  list: (pageNumber: number, pageSize: number, search: string) =>
    [...categoryKeys.lists(), pageNumber, pageSize, search] as const,
};

export const useCategories = (
  pageNumber: number,
  pageSize: number,
  search: string,
) => {
  return useQuery({
    queryKey: categoryKeys.list(pageNumber, pageSize, search),

    queryFn: () => categoryApi.get(pageNumber, pageSize, search),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategory) => categoryApi.post(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategory }) =>
      categoryApi.put(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
};
