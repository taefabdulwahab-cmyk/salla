import React from "react";
import { Link } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";
import CartIcon from "./CartIcon";
import UserIcon from "../header/UserIcon";
import HeaderTitle from "./HeaderTitle";
import SallaLogo from "./SallaLogo";
export default function MainHeader() {
  return (
    <>
      <div className=" max-w-300   w-full mx-auto  px-4    ">
        <div className="md:py-6 py-4 w-full  ">
          <div className="flex flex-row max-sm:flex-col justify-between items-center gap-4 ">
            <div className="flex items-center justify-center flex-row gap-4 ">
              <SallaLogo />
              <HeaderTitle />
            </div>
            <div className="flex flex-row items-center justify-content gap-4 ">
              <LanguageSelector />
              <UserIcon />
              <CartIcon />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
