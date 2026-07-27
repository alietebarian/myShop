import type { Order, PagedResult } from "../types/types";
import agent from "./agent";

export const orderApi = {
  getMyOrders: (pageNumber: number, pageSize: number) => agent.get<PagedResult<Order>>("/Order", {
    params: {
      pageNumber,
      pageSize
    }
  }),
  getById: (id: string) => agent.get<Order>(`/Order/${id}`),
  checkout: () => agent.post<string>("/Order/checkout", {}),
  cancel: (id: string) => agent.patch(`/Order/${id}/cancel`),
};
