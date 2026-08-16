import React from "react";
import { Link } from "react-router-dom";
import SallaLogo from "../../../components/header/SallaLogo";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useLanguage } from "../../../context/LanguageContext";
export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const { t } = useLanguage();
  const { user } = useContext(UserContext);
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      {/* الخلفية السوداء على الجوال */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div
        className={`
          fixed md:static
          top-0 left-0
          h-full md:min-h-full
          w-64 
          bg-[#01252c] md:bg-[#004A57]/80
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* زر الإغلاق - الجوال فقط */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl cursor-pointer"
        >
          ×
        </button>

        <div className="flex justify-center items-center py-4 gap-1 md:gap-10 bg-white/10">
          <SallaLogo />

          <p className="text-2xl font-bold ml-2 text-[#A7F2E0]">Salla</p>
        </div>

        <ul className="flex flex-col text-center justify-center gap-4 text-white pt-5">
          <Link to="/dashboard/profile" onClick={handleLinkClick}>
            <li className="p-3 items-center flex transition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black gap-10">
              <img
                src="https://images.icon-icons.com/1993/PNG/512/avatar_male_man_people_person_profile_user_icon_123199.png"
                className="w-7"
              />
              {t("Profile")}
            </li>
          </Link>

          {user?.role === "admin" ? (
            <>
              <Link to="/dashboard/users" onClick={handleLinkClick}>
                <li className="p-3 items-center flex transition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black gap-10">
                  <img
                    src="https://www.svgrepo.com/show/505810/users.svg"
                    className="w-7"
                  />
                  {t("users")}
                </li>
              </Link>

              <Link to="/dashboard/products" onClick={handleLinkClick}>
                <li className="p-3 items-center flex transition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black gap-10">
                  <img
                    src="https://images.icon-icons.com/1708/PNG/512/3986735-online-shop-store-store-icon_112335.png"
                    className="w-7"
                  />
                  {t("products")}
                </li>
              </Link>
            </>
          ) : (
            <Link to="/dashboard/wishlist" onClick={handleLinkClick}>
              <li className="p-3 items-center flex transition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black gap-10">
                <img
                  src="https://images.icon-icons.com/494/PNG/512/heart_icon-icons.com_48290.png"
                  className="w-7"
                />
                {t("wishlist")}
              </li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
}
