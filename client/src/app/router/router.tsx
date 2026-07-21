import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import AuthPage from "../pages/auth/AuthPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ManageProducts from "../pages/product/ManageProducts";
import ManageCategories from "../pages/dashboard/ManageCategories";
import PrivateRoute from "./privateRoute";
import StorePage from "../pages/storePage/StorePage";
import ProductPage from "../pages/storePage/ProductPage";
import CartPage from "../pages/cart/CartPage";
import OrdersListPage from "../pages/order/OrdersListPage";
import OrderDetailsPage from "../pages/order/OrderDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },

  {
    path: "/",
    element: <App />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="manageProducts" replace />,
      },
      {
        path: "manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "manageCategories",
        element: <ManageCategories />,
      },
    ],
  },

  {
    path: "/products",
    element: <StorePage/>
  },

  {
    path: "/products/:id",
    element: <ProductPage/>
  },

  {
    path: "/cart",
    element: <CartPage/>
  },

  {
    path: '/orders',
    element: <OrdersListPage/>
  },

  {
    path: '/orders/:id',
    element: <OrderDetailsPage/>
  }
]);
