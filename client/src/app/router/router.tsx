import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import LoginPage from "../../features/LoginPage";
import App from "../layout/App";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <App />,
  },

  //   {
  //     path: "/register",
  //     element: <RegisterPage />,
  //   },

  //   {
  //     path: "/",
  //     element: (
  //       <PrivateRoute>
  //         <DashboardLayout />
  //       </PrivateRoute>
  //     ),

  //     children: [
  //       {
  //         path: "dashboard",
  //         element: <DashboardPage />,
  //       },
  //     ],
  //   },
]);
