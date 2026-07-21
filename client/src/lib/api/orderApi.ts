import type { Order } from "../types/types";
import agent from "./agent";

export const orderApi = {
  getMyOrders: () => agent.get<Order[]>("/Order"),
  getById: (id: string) => agent.get<Order>(`/Order/${id}`),
  checkout: () => agent.post<string>("/Order/checkout", {}),
  cancel: (id: string) => agent.patch(`/Order/${id}/cancel`),
};
