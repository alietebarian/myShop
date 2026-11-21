import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/context/useAuth";

/** Admin-only routes. Guests go to login; signed-in non-admins go home. */
export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user?.role !== "Admin") return <Navigate to="/" replace />;

  return children;
}

/** Routes that need any signed-in user (cart, orders). */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;

  return children;
}
