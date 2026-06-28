import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardHeader from "../components/Dashboard-Components/Dashboard/DashboardHeader";
import Footer from "../components/footer/Footer";
import DashboardSidebar from "../components/Dashboard-Components/Dashboard/DashboardSidebar";
import { UserContext } from "../context/UserContext";
export default function DashboardLayout() {
  // const { user } = useContext(UserContext);
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  // if (user.role !== "admin") {
  //   return <Navigate to="/Salla" replace />;
  // }
  // console.log(user.role);
  return (
    <div>
      <div className="min-h-screen flex flex-row w-full ">
        <div className="w-87.5 bg-[#004A57]/80  ">
          <DashboardSidebar />
        </div>
        <div className="flex-auto grow w-full overflow-hidden">
          <DashboardHeader />

          <main className="flex-auto grow w-full bg-white  ">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
