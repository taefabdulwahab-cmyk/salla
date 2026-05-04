import React from "react";

export default function LogoutButton({ onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="text-rose-900 cursor-pointer text-sm border-2 border-rose-900 rounded-md px-2 py-1 hover:bg-rose-900 hover:text-white transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
}
