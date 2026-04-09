import React from "react";
import { Link } from "react-router-dom";
export default function SallaLogo() {
  return (
    <Link to="/Salla">
      <div className="block w-20 h-20  border-4 p-2 border-[#A7F2E0] rounded-full">
        <img
          className="w-full h-full object-contain "
          src="https://cdn.salla.network/images/logo/logo-square.png"
          alt="Salla Logo"
        />
      </div>
    </Link>
  );
}
