import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProductHeader from "../components/header/ProductHeader";
import Footer from "../components/footer/Footer";

export default function ProductLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full  ">
      <ProductHeader />
      <main className="flex-auto grow  w-full  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
