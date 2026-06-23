import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/context/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {token} = useAuth();

  if (!token) {
    return <Navigate to="/login" />
  }

  return children;
}