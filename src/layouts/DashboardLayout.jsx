import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Dashboard-Components/Dashboard/DashboardHeader";
import Footer from "../components/footer/Footer";
import DashboardSidebar from "../components/Dashboard-Components/Dashboard/DashboardSidebar";

export default function DashboardLayout() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <div className="min-h-screen flex flex-row w-full ">
        <div className=" flex flex-1">
          <DashboardSidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        </div>
        <div className="flex-auto grow w-full overflow-hidden">
          <DashboardHeader
            search={search}
            setSearch={setSearch}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <main className="flex-auto grow w-full bg-white  ">
            <Outlet context={{ search, setSearch }} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
