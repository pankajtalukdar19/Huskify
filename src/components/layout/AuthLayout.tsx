import { useAppSelector } from "@/hooks/reduxHook";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <div className="min-h-screen flex align-items-center justify-content-center bg-blue-50">
      <div className="layout-card w-full max-w-30rem">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold m-0 mb-4">Welcome</h2>
          <p className="text-600 mt-0 mb-4">Sign in to continue</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
