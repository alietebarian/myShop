import type { Category, CreateCategory, PagedResult } from "../types/types";
import agent from "./agent";

export const categoryApi = {
  get: (pageNumber: number, pageSize: number, search?: string) =>
    agent.get<PagedResult<Category>>("/Category", {
      params: {
        pageNumber,
        pageSize,
        search,
      },
    }),
  post: (data: CreateCategory) => agent.post("/Category", data),
  put: (id: string, data: CreateCategory) => agent.put(`/Category/${id}`, data),
};
