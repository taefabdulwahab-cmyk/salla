import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function LogoutButton({ onClick }) {
  const { t } = useLanguage();
  return (
    <div>
      <button
        onClick={onClick}
        className="text-rose-900 cursor-pointer text-xs md:text-sm  border-2 border-rose-900 rounded-md px-2 py-1 hover:bg-rose-900 hover:text-white transition-colors duration-300"
      >
        {t("Logout")}
      </button>
    </div>
  );
}
