import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin-Components/Admin/AdminHeader";
import Footer from "../components/footer/Footer";
import AdminSidebar from "../components/Admin-Components/Admin/AdminSidebar";
import { UserContext } from "../context/UserContext";
export default function AdminLayout() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <div className="min-h-screen flex flex-row w-full ">
        <div className="w-87.5 bg-[#004A57]/80  ">
          <AdminSidebar />
        </div>
        <div className="flex-auto grow w-full overflow-hidden">
          <AdminHeader />

          <main className="flex-auto grow w-full bg-white  ">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
