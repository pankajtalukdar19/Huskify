import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "@/features/auth/authSlice";

interface Props { 
  allowedRoles?: ("user" | "customer" | "admin")[];
}

function ProtectedRoute({  allowedRoles = [] }: Props) {
  const { token, user } = useSelector(selectAuth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
