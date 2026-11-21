import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import AuthPage from "../pages/auth/AuthPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ManageProducts from "../pages/product/ManageProducts";
import ManageCategories from "../pages/dashboard/ManageCategories";
import PrivateRoute, { RequireAuth } from "./privateRoute";
import StorePage from "../pages/storePage/StorePage";
import ProductPage from "../pages/storePage/ProductPage";
import CartPage from "../pages/cart/CartPage";
import OrdersListPage from "../pages/order/OrdersListPage";
import OrderDetailsPage from "../pages/order/OrderDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <StorePage /> },
      { path: "products/:id", element: <ProductPage /> },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      {
        path: "orders",
        element: (
          <RequireAuth>
            <OrdersListPage />
          </RequireAuth>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <RequireAuth>
            <OrderDetailsPage />
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="manageProducts" replace /> },
      { path: "manageProducts", element: <ManageProducts /> },
      { path: "manageCategories", element: <ManageCategories /> },
    ],
  },
]);
