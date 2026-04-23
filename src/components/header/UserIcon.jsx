import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function UserIcon() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="flex gap-2 justify-center items-center">
      <Link
        to={user ? "/Salla" : "/login"}
        className="flex items-center justify-center relative  w-10 h-10  rounded-full bg-[#bcf0e4] "
      >
        <img
          className="w-5 h-5 object-contain"
          src="https://www.svgrepo.com/show/493626/user-profile-account-person.svg"
          alt="User Icon"
        />
      </Link>
      {user && (
        <>
          <span>{user.firstName}</span>

          <button
            onClick={logout}
            className="text-rose-900 cursor-pointer text-sm"
          >
            logout
          </button>
        </>
      )}
    </div>
  );
}
