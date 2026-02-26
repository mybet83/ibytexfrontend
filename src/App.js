import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";   // 👈 ADD THIS

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
import ScrollToTop from "./components/ScrollToTop";
import AdminWithdrawals from "./pages/AdminWithdrawals";
import AdminActiveUsers from "./pages/AdminActiveUsers";

function App() {
  return (
    <ThemeProvider>   {/* 👈 WRAP EVERYTHING */}
    
        <div className="App">
          <Toaster position="top-center" />
          <ScrollToTop />

          <Routes>

            <Route
              path="/"
              element={<Navigate to="/home" />}
            />

            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Finalpage />
                </PrivateRoute>
              }
            />

            <Route
              path="/finalpage"
              element={
                <PrivateRoute>
                  <Finalpage />
                </PrivateRoute>
              }
            />

            <Route
              path="/userorder"
              element={
                <PrivateRoute>
                  <UserOrder />
                </PrivateRoute>
              }
            />

            <Route
              path="/myorder"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />

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

            <Route
              path="/adminorderdashboard"
              element={
                <AdminRoute>
                  <AdminOrderDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/withdrawals"
              element={
                <AdminRoute>
                  <AdminWithdrawals />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/active-users"
              element={<AdminActiveUsers />}
            />



          </Routes>
        </div>
    
    </ThemeProvider>
  );
}

export default App;