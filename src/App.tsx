import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import AuthLayout from "@components/layout/AuthLayout";
import DashboardLayout from "@components/layout/DashboardLayout";
import LoginForm from "@components/auth/LoginForm";
import OtpVerification from "@components/auth/OtpVerification";
import DashboardPage from "@pages/dashboard/DashboardPage";
import UsersPage from "@pages/users/UsersPage";
import VendorsPage from "@pages/vendors/VendorsPage";
import LoyaltyPointsPage from "@pages/admin/LoyaltyPointsPage";
import ProfilePage from "@pages/profile/ProfilePage";
import CreateUserPage from "./pages/users/CreateUserPage";
import CreateVendorPage from "./pages/vendors/CreateVendorPage";
import UserEarn from "./pages/users/UserEarn";
import UserRedeeme from "./pages/users/UserRedeeme";
import VendorDetails from "./pages/vendors/VendorDetails";
import CouponsPage from "@/pages/users/CouponsPage";
import Unauthorized from "./pages/errors/Unauthorized";
import VendorRedeem from "./pages/vendors/VendorRedeem";
import VendorReturn from "./pages/vendors/VendorReturn";
import VendorTransactions from "./pages/vendors/VendorTransactions";
import UserTransactions from "./pages/users/UserTransactions";
import UserEarnDetails from "./pages/users/UserEarnDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route
          element={
            <ProtectedRoute allowedRoles={["user", "vendor", "admin"]} />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
          <Route path="transactions" element={<VendorTransactions />} />
          <Route path="redeem" element={<VendorRedeem />} />
          <Route path="return" element={<VendorReturn />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="earn"   >
            <Route index element={<UserEarn />} />
            <Route path=":id" element={<UserEarnDetails />} />
          </Route>
          <Route path="transactions" element={<UserTransactions />} />
          <Route path="redeem">
            <Route index element={<UserRedeeme />} />
            <Route path=":id" element={<VendorDetails />} />
          </Route>
          <Route path="coupons" element={<CouponsPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/create" element={<CreateUserPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="vendors/create" element={<CreateVendorPage />} />
          <Route path="loyalty-points" element={<LoyaltyPointsPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="verify-otp" element={<OtpVerification />} />
      </Route>
      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
