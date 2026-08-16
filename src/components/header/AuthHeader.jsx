import React from "react";
import { Link } from "react-router-dom";
import SallaLogo from "./SallaLogo";
import { useLanguage } from "../../context/LanguageContext";
export default function AuthHeader() {
  const { t } = useLanguage();
  return (
    <>
      <div className="md:py-6 py-4  w-full   ">
        <div className="flex justify-center flex-col">
          <div className="flex items-center justify-center flex-col gap-3 ">
            <SallaLogo />
            <div className="flex items-center justify-center flex-col  ">
              <h1 className=" text-sm md:text-basd lg:text-xl indent-1 leading-[1.3] ">
                {t("storeName")}
              </h1>
              <small className=" text-gray-400 tracking-[0.001em] md:tracking-[0.01em] text-xs md:text-sm lg:text-basd ">
                {t("storeDescription")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
