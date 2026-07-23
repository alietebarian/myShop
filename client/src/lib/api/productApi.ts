import type {
  PagedResult,
  CreateProduct,
  EditProduct,
  Product,
} from "../types/types";
import agent from "./agent";

const toFormData = (data: CreateProduct) => {
  const formData = new FormData();

  formData.append("Image", data.image);
  formData.append("Name", data.name);
  formData.append("CategoryName", data.categoryName);
  formData.append("Unit", data.unit);
  formData.append("Price", data.price.toString());
  formData.append("Stock", data.stock.toString());
  formData.append("Description", data.description);

  return formData;
};

export const productApi = {
  get: (pageNumber: number, pageSize: number, search?: string) =>
    agent.get<PagedResult<Product>>("/Product", {
      params: { pageNumber, pageSize, search },
    }),
  getById: (id: string) => agent.get<Product>(`/Product/${id}`),
  post: (data: CreateProduct) => agent.post("/Product", toFormData(data)),
  put: (id: string, data: EditProduct) => agent.put(`/Product/${id}`, data),
  delete: (id: string) => agent.delete(`/Product/${id}`),
};
