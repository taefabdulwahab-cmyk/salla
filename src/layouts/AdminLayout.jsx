import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "../components/header/AdminHeader";
import Footer from "../components/footer/Footer";
import AdminSidebar from "../components/Admin/AdminSidebar";
import { useState } from "react";
export default function AdminLayout() {
  // const [view, setView] = useState("users");

  return (
    <div>
      <div className="min-h-screen flex flex-row w-full ">
        <div className="w-[350px] bg-[#004A57]/80  ">
          <AdminSidebar />
        </div>
        <div className="flex-auto grow w-full">
          <AdminHeader />

          <main className="flex-auto grow w-full bg-white ">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
