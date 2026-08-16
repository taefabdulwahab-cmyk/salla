import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="bg-white p-2 border rounded-sm border-gray-200 w-15 h-9 sm:w-22 sm:h-10.5 text-xs sm:text-sm md:text-base"
    >
      <option value="en">English</option>
      <option value="ar">عربي</option>
    </select>
  );
}
