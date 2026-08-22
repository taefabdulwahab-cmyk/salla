import React, { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";
import CartIcon from "./CartIcon";
import UserIcon from "../header/UserIcon";
import { useLanguage } from "../../context/LanguageContext";
import { UserContext } from "../../context/UserContext";
export default function ProductHeader() {
  const { user, logout } = useContext(UserContext);
  const { t } = useLanguage();
  return (
    <>
      <div className=" max-w-300 w-full mx-auto  px-4">
        <div className=" md:py-6 py-4 w-full  ">
          <div className="flex flex-row max-sm:flex-col justify-between items-center gap-2 md:gap-4 ">
            <Link
              to="/"
              className="bg-gray-200 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              {t("Back")}
            </Link>
            <div className="flex flex-row items-center justify-content gap-4 ">
              <LanguageSelector />
              <UserIcon />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
