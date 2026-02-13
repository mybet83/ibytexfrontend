// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgetPassword";
// import Finalpage from "./pages/Finalpage";
// import PrivateRoute from "./components/PrivateRoute";


// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />

//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />

//         {/* 🔐 PROTECTED FINAL PAGE */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Finalpage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;



import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";
import Finalpage from "./pages/Finalpage";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminOrderDashboard from "./pages/AdminOrderDashboard";
import UserOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/UserOrderStaus";
import AdminUsers from "./pages/AdminUsers";
import AdminHistory from "./pages/AdminHistory";




function App() {
  return (
    <div className="App">
       
          
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 4000 },
        }}
      />

      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/adminorderdashboard" element={<AdminOrderDashboard />} />
        <Route path="/userorder" element={<UserOrder />} />
        <Route path="/myorder" element={<MyOrders />} />
        <Route path="/finalpage" element={<Finalpage />} />
        <Route
  path="/admin/history"
  element={
    <AdminRoute>
      <AdminHistory />
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


        {/* 🔐 USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Finalpage />
            </PrivateRoute>
          }
        />

        {/* 🔐 ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
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
