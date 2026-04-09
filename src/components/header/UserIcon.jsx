import React from "react";
import { Link } from "react-router-dom";

export default function UserIcon() {
  return (
    <Link to="/signup">
      <div className="flex items-center justify-center relative  w-10 h-10  rounded-full bg-[#bcf0e4] ">
        <img
          className="w-5 h-5 object-contain"
          src="https://www.svgrepo.com/show/493626/user-profile-account-person.svg"
          alt="User Icon"
        />
      </div>
    </Link>
  );
}
