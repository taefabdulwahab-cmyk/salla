import React from "react";
import { Link } from "react-router-dom";
import SallaLogo from "../../header/SallaLogo";
export default function AdminSidebar() {
  return (
    <div>
      <div className="flex justify-center items-center py-4  gap-10 bg-white/10 ">
        <SallaLogo />
        <p className="text-2xl font-bold ml-2 text-[#A7F2E0] ">Salla</p>
      </div>

      <ul className="flex flex-col text-center justify-center  gap-4 text-white pt-5 ">
        <Link to="/dashboard/users">
          <li className="p-3 items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
            <img
              src="https://images.icon-icons.com/1993/PNG/512/avatar_male_man_people_person_profile_user_icon_123199.png"
              className="w-7"
            />
            Users
          </li>
        </Link>
        <Link to="/dashboard/products">
          <li className="p-3   items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
            <img
              src="https://images.icon-icons.com/3237/PNG/512/instagram_shop_shopping_social_media_brand_instagram_menu_icon_197292.png"
              className="w-7"
            />
            Products
          </li>
        </Link>
      </ul>
    </div>
  );
}
