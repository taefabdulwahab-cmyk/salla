import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/AuthHeader";
import Footer from "../components/footer/Footer";
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
