import React from "react";
import { useLanguage } from "../../context/LanguageContext";
export default function Footer() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#BAF2E5] text-center flex items-center justify-center text-[#0D1A1F]  mt-4 w-full  h-20   ">
      <p className=" text-xs sm:text-sm font-normal text-[#2c4744]">
        {t("allRightsReserved")}
        {/* All rights reserved by: The Beautiful Experience Store | 2023 */}
      </p>
    </div>
  );
}
