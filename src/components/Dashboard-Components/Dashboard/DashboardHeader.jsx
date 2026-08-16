import React from "react";
import UserIcon from "../../header/UserIcon";
import ProductSearch from "../../home/ProductSearch";
import LanguageSelector from "../../header/LanguageSelector";
import { useLanguage } from "../../../context/LanguageContext";
export default function DashboardHeader({
  search,
  setSearch,
  setFilters,
  setIsSidebarOpen,
}) {
  const { t } = useLanguage();
  return (
    <div className=" flex flex-row justify-center items-between w-full bg-gray-200/50 py-4 px-6 gap-2 md:gap-4  ">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden text-2xl cursor-pointer"
      >
        ☰
      </button>
      <div className="grow">
        <ProductSearch
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (setFilters) {
              setFilters("");
            }
          }}
          placeholder={t("search")}
        />
      </div>
      <LanguageSelector />
      <UserIcon />
    </div>
  );
}
