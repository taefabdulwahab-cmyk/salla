import React from "react";
import { useLanguage } from "../../context/LanguageContext";
export default function HeaderTitle() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="">
        <h1 className=" text-sm md:text-basd lg:text-xl indent-1 leading-[1.3] ">
          {t("storeName")}
          {/* The Beautiful Experience Store */}
        </h1>
        <small className=" text-gray-400 tracking-[0.001em] md:tracking-[0.01em] text-xs md:text-sm lg:text-basd ">
          {t("storeDescription")}
          {/* Your Store for All Your Beautiful Experiences and Ideas */}
        </small>
      </div>
    </div>
  );
}
