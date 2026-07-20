import type {
  Cart,
  AddItemToCart,
  UpdateCartItemQuantity,
} from "../types/types";
import agent from "./agent";

export const cartApi = {
  get: () => agent.get<Cart>("/Cart"),
  addItem: (data: AddItemToCart) => agent.post("/Cart", data),
  updateQuantity: (id: string, data: UpdateCartItemQuantity) =>
    agent.put(`/Cart/${id}`, data),
  removeItem: (id: string) => agent.delete(`/Cart/${id}`),
  clear: () => agent.delete("/Cart"),
};
