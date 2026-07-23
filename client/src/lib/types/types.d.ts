export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: string
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  email: string;
  fullName: string;
}

export interface Category {
  id: string;
  name: string;
  status: boolean;
  productCount: number;
}

export interface CreateCategory {
  name: string;
  status?: boolean;
}

export interface EditCategory {
  name: string;
  status: boolean;
}

export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  status: boolean;
  categoryName: string;
  stock: number;
  categoryId: string;
  description: string;
  unit: string;
}

export interface CreateProduct {
  image: File;
  name: string;
  price: number;
  categoryName: string;
  stock: number;
  description: string;
  unit: string;
}

export interface EditProduct {
  id: string;
  image: string;
  name: string;
  categoryName: string;
  price: number;
  stock: number;
  status: boolean;
  unit: string;
  description: string;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: string;
  totalPrice: number;
  items: CartItem[];
}

export interface AddItemToCart {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemQuantity {
  quantity: number;
}

export interface AuthResponse {
  accessToken: string;
  userId: string;
  email: string;
  fullName: string;
  role: string
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}