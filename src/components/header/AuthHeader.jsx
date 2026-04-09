import React from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import SallaLogo from "./SallaLogo";
export default function AuthHeader() {
  return (
    <>
      <div className="md:py-6 py-4  w-full   ">
        <div className="flex justify-center flex-col">
          <div className="flex items-center justify-center flex-col gap-4 ">
            <SallaLogo />
            <HeaderTitle />
          </div>
        </div>
      </div>
    </>
  );
}
