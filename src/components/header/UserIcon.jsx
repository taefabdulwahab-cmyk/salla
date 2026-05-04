import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LogoutButton from "../button/LogoutButton";
export default function UserIcon() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="relative group flex gap-2 justify-center items-center">
      <Link
        to={user ? "/Salla" : "/login"}
        className="flex items-center justify-center relative  w-10 h-10  rounded-full bg-[#bcf0e4] "
      >
        {user && user.image ? (
          <img
            src={user.image}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full hover:scale-110 transition"
          />
        ) : (
          <img
            src="https://www.svgrepo.com/show/493626/user-profile-account-person.svg"
            alt="User Icon"
            className="w-5 h-5 hover:scale-125 transition"
          />
        )}
      </Link>
      {user && (
        <>
          <span className="cursor-pointer">{user.firstName}</span>
          <LogoutButton onClick={logout} />
        </>
      )}

      {user && (
        <div
          className="absolute right-0 top-12  bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition duration-200 z-50"
        >
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.gender}</p>

          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )}
    </div>
  );
}
