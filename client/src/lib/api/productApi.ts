import type { PagedResult,  CreateProduct,  EditProduct,  Product } from "../types/types";
import agent from "./agent";

export const productApi = {
  get: (pageNumber: number, pageSize: number, search?: string) =>
    agent.get<PagedResult<Product>>("/Product", {
      params: {
        pageNumber,
        pageSize,
        search,
      },
    }),
  getById: (id: string) => agent.get<Product>(`/Product/${id}`),
  post: (data: CreateProduct) => agent.post("/Product", data),
  put: (id: string, data: EditProduct) => agent.put(`/Product/${id}`, data),
  delete: (id: string) => agent.delete(`/Product/${id}`),
};