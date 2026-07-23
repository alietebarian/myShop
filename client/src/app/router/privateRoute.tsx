import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/context/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {user} = useAuth();

  if (user?.role !== "Admin") {
    return <Navigate to="/" />
  }

  return children;
}