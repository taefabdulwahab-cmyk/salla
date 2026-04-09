import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full  ">
      <MainHeader />
      <main className="flex-auto grow  w-full  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
