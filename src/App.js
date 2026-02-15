import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";
import Finalpage from "./pages/Finalpage";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminOrderDashboard from "./pages/AdminOrderDashboard";
import UserOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/UserOrderStaus";
import AdminUsers from "./pages/AdminUsers";
import AdminHistory from "./pages/AdminHistory";
import TermsConditions from "./pages/TermsConditions";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Layout Wrapper */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Route>

        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/finalpage" element={<Finalpage />} />
        <Route path="/userorder" element={<UserOrder />} />
        <Route path="/myorder" element={<MyOrders />} />
        <Route path="/adminorderdashboard" element={<AdminOrderDashboard />} />

        {/* User Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Finalpage />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/history"
          element={
            <AdminRoute>
              <AdminHistory />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
