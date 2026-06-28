import React from "react";
import { Link } from "react-router-dom";
import SallaLogo from "../../../components/header/SallaLogo";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
export default function DashboardSidebar() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="flex justify-center items-center py-4  gap-10 bg-white/10 ">
        <SallaLogo />
        <p className="text-2xl font-bold ml-2 text-[#A7F2E0] ">Salla</p>
      </div>

      <ul className="flex flex-col text-center justify-center  gap-4 text-white pt-5 ">
        <Link to="/dashboard/profile">
          <li className="p-3 items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
            <img
              src="https://images.icon-icons.com/1993/PNG/512/avatar_male_man_people_person_profile_user_icon_123199.png"
              className="w-7"
            />
            Profile
          </li>
        </Link>
        {user?.role === "admin" ? (
          <>
            <Link to="/dashboard/users">
              <li className="p-3 items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
                <img
                  src="https://www.svgrepo.com/show/505810/users.svg"
                  className="w-7"
                />
                Users
              </li>
            </Link>
            <Link to="/dashboard/products">
              <li className="p-3   items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
                <img
                  src="https://images.icon-icons.com/1708/PNG/512/3986735-online-shop-store-store-icon_112335.png"
                  className="w-7"
                />
                Products
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard/wishlist">
              <li className="p-3   items-center flex  trainsition-colors duration-300 hover:bg-[#A7F2E0] hover:text-black  gap-10">
                <img
                  src="https://images.icon-icons.com/494/PNG/512/heart_icon-icons.com_48290.png"
                  className="w-7"
                />
                Wishlist
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
