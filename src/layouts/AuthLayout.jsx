import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "../components/header/AuthHeader";
import Footer from "../components/footer/Footer";
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <AuthHeader />
      <main className="flex grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
