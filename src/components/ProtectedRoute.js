import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token nahi hai → login page
  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
