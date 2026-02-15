import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black text-white font-sn min-h-screen">
      <Navbar />
      <Outlet />
     
    </div>
  );
};

export default Layout;
